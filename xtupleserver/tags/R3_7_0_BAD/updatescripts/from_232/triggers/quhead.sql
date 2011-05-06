CREATE OR REPLACE FUNCTION _quheadtrigger() RETURNS "trigger" AS '
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

  --  Checks
  SELECT checkPrivilege(''MaintainQuotes'') INTO _check;
  IF NOT (_check) THEN
    RAISE EXCEPTION ''You do not have privileges to maintain Quotes.'';
  END IF;

  -- If this is imported, check the quote number
  IF (TG_OP = ''INSERT'') THEN
    IF (NEW.quhead_imported) THEN
      SELECT fetchMetricText(''QUNumberGeneration'') INTO _numGen;
      IF ((NEW.quhead_number IS NULL) AND (_numGen=''M'')) THEN
        RAISE EXCEPTION ''You must supply a Quote Number.'';
      ELSE
        IF ((NEW.quhead_number IS NOT NULL) AND (_numGen=''A'')) THEN
          RAISE EXCEPTION ''You may not supply a new Quote Number;
                          OpenMFG will generate the number.'';
        ELSE
          IF ((NEW.quhead_number IS NULL) AND (_numGen=''O'')) THEN
            SELECT fetchqunumber() INTO NEW.quhead_number;
          ELSE
            IF (NEW.quhead_number IS NULL) THEN
              SELECT fetchsonumber() INTO NEW.quhead_number;
            END IF;
          END IF;
        END IF;
      END IF;
    END IF;
  ELSE
    IF (TG_OP = ''UPDATE'') THEN
       IF (NEW.quhead_number <> OLD.quhead_number) THEN
         RAISE EXCEPTION ''The order number may not be changed.'';
       END IF;
    END IF;
  END IF;

  IF (TG_OP IN (''INSERT'',''UPDATE'')) THEN
    IF (NEW.quhead_cust_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a Customer ID.'';
    END IF;

    IF (NEW.quhead_salesrep_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a Sales Rep ID.'';
    END IF;

    IF (NEW.quhead_terms_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a Terms Code ID.'';
    END IF;

    IF (NEW.quhead_shipto_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a Shipto ID.'';
    END IF;
 
    IF ((NEW.quhead_misc > 0) AND NOT (NEW.quhead_misc_accnt_id > 0 )) THEN
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
    WHERE (cust_id=NEW.quhead_cust_id);

    -- If there is customer data, then we can get to work
    IF (FOUND) THEN
      -- Only check PO number for imports because UI checks when whole quote is saved
      IF (NEW.quhead_imported) THEN
        -- Check for required Purchase Order
          IF (_p.cust_usespos AND ((NEW.quhead_custponumber IS NULL) OR (TRIM(BOTH FROM NEW.quhead_custponumber)=''''))) THEN
            RAISE EXCEPTION ''You must enter a Customer P/O for this Quote.'';
          END IF;
    
        -- Check for duplicate Purchase Orders if not allowed
        IF (_p.cust_usespos AND NOT (_p.cust_blanketpos)) THEN
            SELECT cohead_id INTO _a
            FROM cohead
            WHERE ((cohead_cust_id=NEW.quhead_cust_id)
            AND  (cohead_id<>NEW.quhead_id)
            AND  (UPPER(cohead_custponumber) = UPPER(NEW.quhead_custponumber)) )
            UNION
            SELECT quhead_id
            FROM quhead
            WHERE ((quhead_cust_id=NEW.quhead_cust_id)
            AND  (quhead_id<>NEW.quhead_id)
            AND  (UPPER(quhead_custponumber) = UPPER(NEW.quhead_custponumber)) );
          IF (FOUND) THEN
	    RAISE EXCEPTION ''This Customer does not use Blanket P/O
                            Numbers and the P/O Number you entered has 
                            already been used for another Sales Order or Quote.
                            Please verify the P/O Number and either
                            enter a new P/O Number or add to the
                            existing Sales Order or Quote.'';
          END IF;
        END IF;
      END IF;

      --Auto create project if applicable
      IF ((TG_OP = ''INSERT'') AND (NEW.quhead_prj_id=-1)) THEN
        SELECT fetchMetricBool(''AutoCreateProjectsForOrders'') INTO _check;
        IF (_check) THEN
          SELECT NEXTVAL(''prj_prj_id_seq'') INTO _prjId;
          NEW.quhead_prj_id := _prjId;
          INSERT INTO prj (prj_id, prj_number, prj_name, prj_descrip, prj_so, prj_wo, prj_po)
               VALUES(_prjId, NEW.quhead_number, NEW.quhead_number, ''Auto Generated Project from Quote.'', TRUE, TRUE, TRUE);
        END IF;
      END IF;

      -- Deal with Billing Address
      IF (TG_OP = ''INSERT'') THEN
        IF (_p.cust_ffbillto) THEN
          -- If they didn''t supply data, we''ll put in the bill to address
          NEW.quhead_billtoname=COALESCE(NEW.quhead_billtoname,_p.cust_name,'''');
          NEW.quhead_billtoaddress1=COALESCE(NEW.quhead_billtoaddress1,_p.addr_line1,'''');
          NEW.quhead_billtoaddress2=COALESCE(NEW.quhead_billtoaddress2,_p.addr_line2,'''');
          NEW.quhead_billtoaddress3=COALESCE(NEW.quhead_billtoaddress3,_p.addr_line3,'''');    
          NEW.quhead_billtocity=COALESCE(NEW.quhead_billtocity,_p.addr_city,''''); 
          NEW.quhead_billtostate=COALESCE(NEW.quhead_billtostate,_p.addr_state,'''');
          NEW.quhead_billtozip=COALESCE(NEW.quhead_billtozip,_p.addr_postalcode,'''');
          NEW.quhead_billtocountry=COALESCE(NEW.quhead_billtocountry,_p.addr_country,'''');   
        ELSE
          -- Free form not allowed, we''re going to put in the address regardless
          NEW.quhead_billtoname=COALESCE(_p.cust_name,'''');
          NEW.quhead_billtoaddress1=COALESCE(_p.addr_line1,'''');
          NEW.quhead_billtoaddress2=COALESCE(_p.addr_line2,'''');
          NEW.quhead_billtoaddress3=COALESCE(_p.addr_line3,'''');    
          NEW.quhead_billtocity=COALESCE(_p.addr_city,''''); 
          NEW.quhead_billtostate=COALESCE(_p.addr_state,'''');
          NEW.quhead_billtozip=COALESCE(_p.addr_postalcode,'''');
          NEW.quhead_billtocountry=COALESCE(_p.addr_country,'''');
        END IF;
      END IF;

      -- Now let''s look at Shipto Address
      -- If there''s nothing in the address fields and there is a shipto id 
      -- or there is a default address available, let''s put in some shipto address data
      IF ((TG_OP = ''INSERT'') 
       AND NOT ((NEW.quhead_shipto_id = -1) AND NOT _p.cust_ffshipto)
       AND (NEW.quhead_shiptoname IS NULL)
       AND (NEW.quhead_shiptoaddress1 IS NULL)
       AND (NEW.quhead_shiptoaddress2 IS NULL)
       AND (NEW.quhead_shiptoaddress3 IS NULL)
       AND (NEW.quhead_shiptocity IS NULL)
       AND (NEW.quhead_shiptostate IS NULL)
       AND (NEW.quhead_shiptocountry IS NULL)) THEN
        IF ((NEW.quhead_shipto_id=-1) AND (_p.shipto_id IS NOT NULL)) THEN
          _shiptoId := _p.shipto_addr_id;
        ELSE
          _shiptoId := NEW.quhead_shipto_id;
        END IF;

        SELECT * INTO _a 
        FROM shiptoinfo, addr 
        WHERE ((shipto_id=_shiptoId)
        AND (addr_id=shipto_addr_id));

        NEW.quhead_shiptoname := COALESCE(_p.shipto_name,'''');
        NEW.quhead_shiptoaddress1 := COALESCE(_a.addr_line1,'''');
        NEW.quhead_shiptoaddress2 := COALESCE(_a.addr_line2,'''');
        NEW.quhead_shiptoaddress3 := COALESCE(_a.addr_line3,'''');    
        NEW.quhead_shiptocity := COALESCE(_a.addr_city,''''); 
        NEW.quhead_shiptostate := COALESCE(_a.addr_state,'''');
        NEW.quhead_shiptozipcode := COALESCE(_a.addr_postalcode,'''');
        NEW.quhead_shiptocountry := COALESCE(_a.addr_country,'''');
      ELSE
        IF (_p.cust_ffshipto) THEN
          -- Use Address Save function to see if the new address entered matches
          -- data for the shipto number.  If not that will insert new address for CRM
          SELECT SaveAddr(
            NULL,
            NULL,
            NEW.quhead_shiptoaddress1,
            NEW.quhead_shiptoaddress2,
            NEW.quhead_shiptoaddress3,
            NEW.quhead_shiptocity,
            NEW.quhead_shiptostate,
            NEW.quhead_shiptozipcode,
            NEW.quhead_shiptocountry,
            ''CHANGEONE'') INTO _addrId;
          SELECT shipto_addr_id INTO _shiptoid FROM shiptoinfo WHERE (shipto_id=NEW.quhead_shipto_id);
           -- If the address passed doesn''t match shipto address, then it''s something else
           IF (_shiptoid <> _addrId) THEN
             NEW.quhead_shipto_id := -1;
           END IF;
        ELSE
          SELECT quhead_shipto_id INTO _shiptoid FROM quhead WHERE (quhead_id=NEW.quhead_id);
          -- Get the shipto address
            IF (NEW.quhead_shipto_id <> COALESCE(_shiptoid,-1)) THEN
            SELECT * INTO _a 
            FROM shiptoinfo
            LEFT OUTER JOIN cntct ON (shipto_cntct_id=cntct_id)
            LEFT OUTER JOIN addr ON (shipto_addr_id=addr_id)
            WHERE (shipto_id=NEW.quhead_shipto_id);
            IF (FOUND) THEN
              -- Free form not allowed so we''re going to make sure address matches Shipto data
              NEW.quhead_shiptoname := COALESCE(_a.shipto_name,'''');
              NEW.quhead_shiptophone := COALESCE(_a.cntct_phone,'''');
              NEW.quhead_shiptoaddress1 := COALESCE(_a.addr_line1,'''');
              NEW.quhead_shiptoaddress2 := COALESCE(_a.addr_line2,'''');
              NEW.quhead_shiptoaddress3 := COALESCE(_a.addr_line3,'''');    
              NEW.quhead_shiptocity := COALESCE(_a.addr_city,''''); 
              NEW.quhead_shiptostate := COALESCE(_a.addr_state,'''');
              NEW.quhead_shiptozipcode := COALESCE(_a.addr_postalcode,'''');
              NEW.quhead_shiptocountry := COALESCE(_a.addr_country,''''); 
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
        PERFORM postComment(_cmnttypeid, ''Q'', NEW.quhead_id, ''Created'');

      ELSIF (TG_OP = ''UPDATE'') THEN

        IF (OLD.quhead_terms_id <> NEW.quhead_terms_id) THEN
          PERFORM postComment( _cmnttypeid, ''Q'', NEW.quhead_id,
                               (''Terms Changed from "'' || oldterms.terms_code || ''" to "'' || newterms.terms_code || ''"'') )
          FROM terms AS oldterms, terms AS newterms
          WHERE ( (oldterms.terms_id=OLD.quhead_terms_id)
           AND (newterms.terms_id=NEW.quhead_terms_id) );
        END IF;

      ELSIF (TG_OP = ''DELETE'') THEN
        DELETE FROM comment
        WHERE ( (comment_source=''Q'')
         AND (comment_source_id=OLD.quhead_id) );
      END IF;
    END IF;
  END IF;

  IF (TG_OP = ''DELETE'') THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;

END;
' LANGUAGE 'plpgsql';

DROP TRIGGER quheadtrigger ON quhead;
CREATE TRIGGER quheadtrigger
  BEFORE INSERT OR UPDATE OR DELETE
  ON quhead
  FOR EACH ROW
  EXECUTE PROCEDURE _quheadtrigger();
