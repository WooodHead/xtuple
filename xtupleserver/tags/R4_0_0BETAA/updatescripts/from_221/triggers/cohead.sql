CREATE OR REPLACE FUNCTION _soheadTrigger() RETURNS TRIGGER AS '
DECLARE
  _cmnttypeid INTEGER;
  _oldHoldType TEXT;
  _newHoldType TEXT;
  _p RECORD;
  _a RECORD;
  _shiptoId INTEGER;
  _addrId INTEGER;
  _prjId INTEGER;
  _check BOOLEAN;
  _numGen CHAR(1);

BEGIN
  -- Checks
  -- Start with privileges
  IF (TG_OP = ''INSERT'') THEN
    SELECT checkPrivilege(''CreateSales'') INTO _check;
    IF NOT (_check) THEN
      RAISE EXCEPTION ''You do not have privileges to create a Sales Order.'';
    END IF;
  ELSE
    SELECT checkPrivilege(''MaintainSalesOrders'') INTO _check;
    IF NOT (_check) THEN
      RAISE EXCEPTION ''You do not have privileges to alter a Sales Order.'';
    END IF;
  END IF;

  -- If this is imported, check the order number
  IF (TG_OP = ''INSERT'') THEN
    IF (NEW.cohead_imported) THEN
      SELECT fetchMetricText(''CONumberGeneration'') INTO _numGen;
      IF ((NEW.cohead_number IS NULL) AND (_numGen=''M'')) THEN
        RAISE EXCEPTION ''You must supply an Order Number.'';
      ELSE
        IF ((NEW.cohead_number IS NOT NULL) AND (_numGen=''A'')) THEN
          RAISE EXCEPTION ''You may not supply a new Order Number;
                          OpenMFG will generate the number.'';
        ELSE
          IF (NEW.cohead_number IS NULL) THEN
            SELECT fetchsonumber() INTO NEW.cohead_number;
          END IF;
        END IF;
      END IF;
    END IF;
  ELSE
    IF (TG_OP = ''UPDATE'') THEN
      IF (NEW.cohead_number <> OLD.cohead_number) THEN
        RAISE EXCEPTION ''The order number may not be changed.'';
      END IF;
    END IF;
  END IF;

  IF (TG_OP IN (''INSERT'',''UPDATE'')) THEN

    IF (NEW.cohead_cust_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a Customer ID.'';
    END IF;

    IF (NEW.cohead_salesrep_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a Sales Rep ID.'';
    END IF;

    IF (NEW.cohead_shipform_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a Ship Form ID.'';
    END IF;

    IF (NEW.cohead_terms_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a Terms Code ID.'';
    END IF;

    IF (NEW.cohead_shipto_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a Shipto ID.'';
    END IF;
 
    IF ((NEW.cohead_misc > 0) AND NOT (NEW.cohead_misc_accnt_id > 0 )) THEN
      RAISE EXCEPTION ''You may not enter a Misc. Charge without
                          indicating the G/L Sales Account number for the
                          charge.  Please set the Misc. Charge amount to 0
                          or select a Misc. Charge Sales Account.'';
    END IF;

    -- Get Customer data
    SELECT * INTO _p
    FROM custinfo
      LEFT OUTER JOIN cntct ON (cust_cntct_id=cntct_id)
      LEFT OUTER JOIN addr ON (cntct_addr_id=addr_id)
      LEFT OUTER JOIN shiptoinfo ON ((cust_id=shipto_cust_id) AND shipto_default)
    WHERE (cust_id=NEW.cohead_cust_id);

    -- If there is customer data, then we can get to work
    IF (FOUND) THEN

      -- Check Credit
      IF (TG_OP = ''INSERT'') THEN
          IF (_p.cust_creditstatus = ''H'') THEN
            SELECT checkPrivilege(''CreateSOForHoldCustomer'') INTO _check;
            IF NOT (_check) THEN
              RAISE EXCEPTION ''Customer % has been placed 
                               on a Credit Hold and you do not have 
                               privilege to create Sales Orders for 
                               Customers on Credit Hold.  The selected 
                               Customer must be taken off of Credit Hold 
                               before you may create a new Sales Order 
                               for the Customer.'',_p.cust_number;
            ELSE
              NEW.cohead_holdtype=''C'';
            END IF;
          END IF;
          IF (_p.cust_creditstatus = ''W'') THEN
            SELECT checkPrivilege(''CreateSOForWarnCustomer'') INTO _check;
            IF NOT (_check) THEN
              RAISE EXCEPTION ''Customer % has been placed on 
                              a Credit Warning and you do not have 
                              privilege to create Sales Orders for 
                              Customers on Credit Warning.  The 
                              selected Customer must be taken off of 
                              Credit Warning before you may create a 
                              new Sales Order for the Customer.'',_p.cust_number;
            ELSE
              NEW.cohead_holdtype=''C'';
            END IF;
          END IF;
      END IF;

      -- Only Check P/O logic for imports, because UI checks when entire order is saved
      IF (NEW.cohead_imported) THEN

        -- Check for required Purchase Order
        IF (_p.cust_usespos AND ((NEW.cohead_custponumber IS NULL) OR (TRIM(BOTH FROM NEW.cohead_custponumber)=''''))) THEN
            RAISE EXCEPTION ''You must enter a Customer P/O for this Sales Order.'';
        END IF;
 
        -- Check for duplicate Purchase Orders if not allowed
        IF (_p.cust_usespos AND NOT (_p.cust_blanketpos)) THEN
          SELECT cohead_id INTO _a
          FROM cohead
          WHERE ((cohead_cust_id=NEW.cohead_cust_id)
          AND  (cohead_id<>NEW.cohead_id)
          AND  (UPPER(cohead_custponumber) = UPPER(NEW.cohead_custponumber)) )
          UNION
          SELECT quhead_id
          FROM quhead
          WHERE ((quhead_cust_id=NEW.cohead_cust_id)
          AND  (quhead_id<>NEW.cohead_id)
          AND  (UPPER(quhead_custponumber) = UPPER(NEW.cohead_custponumber)) );
          IF (FOUND) THEN
	    RAISE EXCEPTION ''This Customer does not use Blanket P/O
                            Numbers and the P/O Number you entered has 
                            already been used for another Sales Order.
                            Please verify the P/O Number and either
                            enter a new P/O Number or add to the
                            existing Sales Order.'';
         END IF;
        END IF;
      END IF;

      --Auto create project if applicable
      IF ((TG_OP = ''INSERT'') AND (NEW.cohead_prj_id=-1)) THEN
        SELECT fetchMetricBool(''AutoCreateProjectsForOrders'') INTO _check;
        IF (_check) THEN
          SELECT NEXTVAL(''prj_prj_id_seq'') INTO _prjId;
          NEW.cohead_prj_id := _prjId;
          INSERT INTO prj (prj_id, prj_number, prj_name, prj_descrip, prj_so, prj_wo, prj_po)
               VALUES(_prjId, NEW.cohead_number, NEW.cohead_number, ''Auto Generated Project from Sales Order.'', TRUE, TRUE, TRUE);
        END IF;
      END IF;

      IF (TG_OP = ''UPDATE'') THEN
        SELECT true INTO _check
        FROM coitem
        WHERE ( (coitem_status=''C'')
        AND (coitem_cohead_id=NEW.cohead_id) ) 
        LIMIT 1;

        IF (NOT FOUND) THEN

        --Update project references on supply
        UPDATE pr SET pr_prj_id=NEW.cohead_prj_id
                   FROM coitem
                   WHERE ((coitem_cohead_id=NEW.cohead_id) 
                   AND  (coitem_order_type=''R'') 
                   AND  (coitem_order_id=pr_id));

        PERFORM changeWoProject(coitem_order_id, NEW.cohead_prj_id, TRUE)
                    FROM coitem
                    WHERE ((coitem_cohead_id=NEW.cohead_id)
                    AND  (coitem_order_type=''W''));
        ELSE
          IF NEW.cohead_prj_id <> COALESCE(OLD.cohead_prj_id,-1) THEN
            RAISE EXCEPTION ''You can not change the project ID on orders with closed lines.'';
          END IF;
        END IF;
      END IF;

      -- Deal with Billing Address
      IF (TG_OP = ''INSERT'') THEN
        IF (_p.cust_ffbillto) THEN
          -- If they didn''t supply data, we''ll put in the bill to address
          NEW.cohead_billtoname=COALESCE(NEW.cohead_billtoname,_p.cust_name,'''');
          NEW.cohead_billtoaddress1=COALESCE(NEW.cohead_billtoaddress1,_p.addr_line1,'''');
          NEW.cohead_billtoaddress2=COALESCE(NEW.cohead_billtoaddress2,_p.addr_line2,'''');
          NEW.cohead_billtoaddress3=COALESCE(NEW.cohead_billtoaddress3,_p.addr_line3,'''');    
          NEW.cohead_billtocity=COALESCE(NEW.cohead_billtocity,_p.addr_city,''''); 
          NEW.cohead_billtostate=COALESCE(NEW.cohead_billtostate,_p.addr_state,'''');
          NEW.cohead_billtozipcode=COALESCE(NEW.cohead_billtozipcode,_p.addr_postalcode,'''');
          NEW.cohead_billtocountry=COALESCE(NEW.cohead_billtocountry,_p.addr_country,'''');   
        ELSE
          -- Free form not allowed, we''re going to put in the address regardless
          NEW.cohead_billtoname=COALESCE(_p.cust_name,'''');
          NEW.cohead_billtoaddress1=COALESCE(_p.addr_line1,'''');
          NEW.cohead_billtoaddress2=COALESCE(_p.addr_line2,'''');
          NEW.cohead_billtoaddress3=COALESCE(_p.addr_line3,'''');    
          NEW.cohead_billtocity=COALESCE(_p.addr_city,''''); 
          NEW.cohead_billtostate=COALESCE(_p.addr_state,'''');
          NEW.cohead_billtozipcode=COALESCE(_p.addr_postalcode,'''');
          NEW.cohead_billtocountry=COALESCE(_p.addr_country,'''');
        END IF;
      END IF;

      -- Now let''s look at Shipto Address
      -- If there''s nothing in the address fields and there is a shipto id 
      -- or there is a default address available, let''s put in some shipto address data
      IF ((TG_OP = ''INSERT'') 
        AND NOT ((NEW.cohead_shipto_id = -1) AND NOT _p.cust_ffshipto)
        AND (NEW.cohead_shiptoname IS NULL)
        AND (NEW.cohead_shiptoaddress1 IS NULL)
        AND (NEW.cohead_shiptoaddress2 IS NULL)
        AND (NEW.cohead_shiptoaddress3 IS NULL)
        AND (NEW.cohead_shiptocity IS NULL)
        AND (NEW.cohead_shiptostate IS NULL)
        AND (NEW.cohead_shiptocountry IS NULL)) THEN
        IF ((NEW.cohead_shipto_id=-1) AND (_p.shipto_id IS NOT NULL)) THEN
          _shiptoId := _p.shipto_addr_id;
        ELSE
          _shiptoId := NEW.cohead_shipto_id;
        END IF;

        SELECT * INTO _a 
        FROM shiptoinfo, addr 
        WHERE ((shipto_id=_shiptoId)
        AND (addr_id=shipto_addr_id));

        NEW.cohead_shiptoname := COALESCE(_p.shipto_name,'''');
        NEW.cohead_shiptoaddress1 := COALESCE(_a.addr_line1,'''');
        NEW.cohead_shiptoaddress2 := COALESCE(_a.addr_line2,'''');
        NEW.cohead_shiptoaddress3 := COALESCE(_a.addr_line3,'''');    
        NEW.cohead_shiptocity := COALESCE(_a.addr_city,''''); 
        NEW.cohead_shiptostate := COALESCE(_a.addr_state,'''');
        NEW.cohead_shiptozipcode := COALESCE(_a.addr_postalcode,'''');
        NEW.cohead_shiptocountry := COALESCE(_a.addr_country,'''');
      ELSE
        IF (_p.cust_ffshipto) THEN
          -- Use Address Save function to see if the new address entered matches
          -- data for the shipto number.  If not that will insert new address for CRM
          SELECT SaveAddr(
            NULL,
            NEW.cohead_shiptoaddress1,
            NEW.cohead_shiptoaddress2,
            NEW.cohead_shiptoaddress3,
            NEW.cohead_shiptocity,
            NEW.cohead_shiptostate,
            NEW.cohead_shiptozipcode,
            NEW.cohead_shiptocountry,
            ''CHANGEONE'') INTO _addrId;
          SELECT shipto_addr_id INTO _shiptoid FROM shiptoinfo WHERE (shipto_id=NEW.cohead_shipto_id);
          -- If the address passed doesn''t match shipto address, then it''s something else
          IF (_shiptoid <> _addrId) THEN
            NEW.cohead_shipto_id := -1;
          END IF;
        ELSE
          SELECT cohead_shipto_id INTO _shiptoid FROM cohead WHERE (cohead_id=NEW.cohead_id);
          -- Get the shipto address
          IF (NEW.cohead_shipto_id <> COALESCE(_shiptoid,-1)) THEN
            SELECT * INTO _a 
            FROM shiptoinfo
              LEFT OUTER JOIN cntct ON (shipto_cntct_id=cntct_id)
              LEFT OUTER JOIN addr ON (shipto_addr_id=addr_id)
            WHERE (shipto_id=NEW.cohead_shipto_id);
            IF (FOUND) THEN
              -- Free form not allowed so we''re going to make sure address matches Shipto data
              NEW.cohead_shiptoname := COALESCE(_a.shipto_name,'''');
              NEW.cohead_shiptophone := COALESCE(_a.cntct_phone,'''');
              NEW.cohead_shiptoaddress1 := COALESCE(_a.addr_line1,'''');
              NEW.cohead_shiptoaddress2 := COALESCE(_a.addr_line2,'''');
              NEW.cohead_shiptoaddress3 := COALESCE(_a.addr_line3,'''');    
              NEW.cohead_shiptocity := COALESCE(_a.addr_city,''''); 
              NEW.cohead_shiptostate := COALESCE(_a.addr_state,'''');
              NEW.cohead_shiptozipcode := COALESCE(_a.addr_postalcode,'''');
              NEW.cohead_shiptocountry := COALESCE(_a.addr_country,''''); 
            ELSE
              -- If no shipto data and free form not allowed, this won''t work
              RAISE EXCEPTION ''Free form Shipto is not allowed on this Customer. You must supply a valid Shipto ID.'';
            END IF;
          END IF;
        END IF;
      END IF;
    END IF;
  END IF;

  IF ( SELECT (metric_value=''t'')
       FROM metric
       WHERE (metric_name=''SalesOrderChangeLog'') ) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name=''ChangeLog'');
    IF (FOUND) THEN
      IF (TG_OP = ''INSERT'') THEN
        PERFORM postComment(_cmnttypeid, ''S'', NEW.cohead_id, ''Created'');

      ELSIF (TG_OP = ''UPDATE'') THEN

        IF (OLD.cohead_terms_id <> NEW.cohead_terms_id) THEN
          PERFORM postComment( _cmnttypeid, ''S'', NEW.cohead_id,
                               (''Terms Changed from "'' || oldterms.terms_code || ''" to "'' || newterms.terms_code || ''"'') )
          FROM terms AS oldterms, terms AS newterms
          WHERE ( (oldterms.terms_id=OLD.cohead_terms_id)
           AND (newterms.terms_id=NEW.cohead_terms_id) );
        END IF;

        IF (OLD.cohead_holdtype <> NEW.cohead_holdtype) THEN

          IF (OLD.cohead_holdtype = ''N'') THEN
            _oldHoldType := ''No Hold'';
          ELSIF (OLD.cohead_holdtype = ''C'') THEN
            _oldHoldType := ''Credit Hold'';
          ELSIF (OLD.cohead_holdtype = ''P'') THEN
            _oldHoldType := ''Packing Hold'';
          ELSIF (OLD.cohead_holdtype = ''S'') THEN
            _oldHoldType := ''Shipping Hold'';
          ELSE
            _oldHoldType := ''Unknown/Error'';
          END IF;

          IF (NEW.cohead_holdtype = ''N'') THEN
            _newHoldType := ''No Hold'';
          ELSIF (NEW.cohead_holdtype = ''C'') THEN
            _newHoldType := ''Credit Hold'';
          ELSIF (NEW.cohead_holdtype = ''P'') THEN
            _newHoldType := ''Packing Hold'';
          ELSIF (NEW.cohead_holdtype = ''S'') THEN
            _newHoldType := ''Shipping Hold'';
          ELSE
            _newHoldType := ''Unknown/Error'';
          END IF;

          PERFORM postComment( _cmnttypeid, ''S'', NEW.cohead_id,
                               (''Hold Type Changed from "'' || _oldHoldType || ''" to "'' || _newHoldType || ''"'') );
        END IF;

      ELSIF (TG_OP = ''DELETE'') THEN
        DELETE FROM comment
        WHERE ( (comment_source=''S'')
         AND (comment_source_id=OLD.cohead_id) );
      END IF;
    END IF;
  END IF;

  IF (TG_OP = ''UPDATE'') THEN
    IF ( (NOT (OLD.cohead_holdtype = ''N'')) AND
         (NEW.cohead_holdtype=''N'') ) THEN
      INSERT INTO evntlog ( evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
                            evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id, evntlog_number )
      SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
             ''S'', NEW.cohead_id, NEW.cohead_warehous_id, NEW.cohead_number::TEXT
      FROM evntnot, evnttype
      WHERE ( (evntnot_evnttype_id=evnttype_id)
       AND (evntnot_warehous_id=NEW.cohead_warehous_id)
       AND (evnttype_name=''SoReleased'') );
    END IF;

    IF (OLD.cohead_ordercomments <> NEW.cohead_ordercomments) THEN
      INSERT INTO evntlog ( evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
                            evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id, evntlog_number )
      SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
             ''S'', NEW.cohead_id, NEW.cohead_warehous_id, NEW.cohead_number::TEXT
      FROM evntnot, evnttype
      WHERE ( (evntnot_evnttype_id=evnttype_id)
       AND (evntnot_warehous_id=NEW.cohead_warehous_id)
       AND (evnttype_name=''SoNotesChanged'') );
    END IF;
  END IF;


  IF (TG_OP = ''DELETE'') THEN
    RETURN OLD;
  ELSE
    NEW.cohead_lastupdated = CURRENT_TIMESTAMP;

    RETURN NEW;
  END IF;

END;
' LANGUAGE 'plpgsql';

DROP TRIGGER soheadTrigger ON cohead;
CREATE TRIGGER soheadTrigger BEFORE INSERT OR UPDATE OR DELETE ON cohead FOR EACH ROW EXECUTE PROCEDURE _soheadTrigger();
