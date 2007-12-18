CREATE OR REPLACE FUNCTION _soitemTrigger() RETURNS TRIGGER AS '
DECLARE
  _cmnttypeid INTEGER;
  _check BOOLEAN;
  _atShipping NUMERIC;

BEGIN
  -- Check
  SELECT checkPrivilege(''MaintainSalesOrders'') OR checkPrivilege(''ShipOrders'') INTO _check;
  IF NOT (_check) THEN
    RAISE EXCEPTION ''You do not have privileges to alter a Sales Order.'';
  END IF;

  IF (TG_OP IN (''INSERT'',''UPDATE'')) THEN
    IF (NEW.coitem_scheddate IS NULL) THEN
      RAISE EXCEPTION ''A schedule date is required.'';
    END IF;
  END IF;
  
  IF (TG_OP =''UPDATE'') THEN
    IF ((OLD.coitem_status <> ''C'') AND (NEW.coitem_status = ''C'')) THEN
      SELECT (COALESCE(SUM(coship_qty), 0) - coitem_qtyshipped) INTO _atShipping
      FROM coitem LEFT OUTER JOIN coship ON (coship_coitem_id=coitem_id)
      WHERE (coitem_id=NEW.coitem_id)
      GROUP BY coitem_qtyshipped;
      IF (_atShipping > 0) THEN
        RAISE EXCEPTION ''Line % cannot be Closed at this time as there is inventory at shipping.'',NEW.coitem_linenumber;
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
  ELSE
    _cmnttypeid := -1;
  END IF;

  IF (TG_OP = ''INSERT'') THEN
    INSERT INTO evntlog ( evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
                          evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id, evntlog_number )
    SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
           ''S'', NEW.coitem_id, itemsite_warehous_id, (cohead_number || ''-'' || NEW.coitem_linenumber)
    FROM evntnot, evnttype, itemsite, item, cohead
    WHERE ( (evntnot_evnttype_id=evnttype_id)
     AND (evntnot_warehous_id=itemsite_warehous_id)
     AND (itemsite_id=NEW.coitem_itemsite_id)
     AND (itemsite_item_id=item_id)
     AND (NEW.coitem_cohead_id=cohead_id)
     AND (NEW.coitem_scheddate <= (CURRENT_DATE + itemsite_eventfence))
     AND (evnttype_name=''SoitemCreated'') );

    IF (_cmnttypeid <> -1) THEN
      PERFORM postComment(_cmnttypeid, ''SI'', NEW.coitem_id, ''Created'');
    END IF;

    RETURN NEW;

  ELSIF (TG_OP = ''DELETE'') THEN

      DELETE FROM comment
      WHERE ( (comment_source=''SI'')
       AND (comment_source_id=OLD.coitem_id) );

      DELETE FROM charass
       WHERE ((charass_target_type=''SI'')
         AND  (charass_target_id=OLD.coitem_id));
 
      IF ((OLD.coitem_order_type = ''W'') AND
	  (SELECT wo_status IN (''O'', ''E'')
	    FROM wo
	    WHERE (wo_id=OLD.coitem_order_id))) THEN
        PERFORM deleteWo(OLD.coitem_order_id, TRUE);

      ELSIF (OLD.coitem_order_type = ''R'') THEN 
        PERFORM deletePr(OLD.coitem_order_id);
      END IF;

    INSERT INTO evntlog ( evntlog_evnttime, evntlog_username,
			  evntlog_evnttype_id, evntlog_ordtype,
			  evntlog_ord_id, evntlog_warehous_id, evntlog_number )
    SELECT CURRENT_TIMESTAMP, evntnot_username,
	   evnttype_id, ''S'',
	   OLD.coitem_id, itemsite_warehous_id,
	   (cohead_number || ''-'' || OLD.coitem_linenumber)
    FROM evntnot, evnttype, itemsite, item, cohead
    WHERE ( (evntnot_evnttype_id=evnttype_id)
     AND (evntnot_warehous_id=itemsite_warehous_id)
     AND (itemsite_id=OLD.coitem_itemsite_id)
     AND (itemsite_item_id=item_id)
     AND (OLD.coitem_cohead_id=cohead_id)
     AND (OLD.coitem_scheddate <= (CURRENT_DATE + itemsite_eventfence))
     AND (evnttype_name=''SoitemCancelled'') );

  ELSIF (TG_OP = ''UPDATE'') THEN

    IF (NEW.coitem_qtyord <> OLD.coitem_qtyord) THEN
      INSERT INTO evntlog ( evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
			    evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id, evntlog_number,
			    evntlog_oldvalue, evntlog_newvalue )
      SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
	     ''S'', NEW.coitem_id, itemsite_warehous_id, (cohead_number || ''-'' || NEW.coitem_linenumber),
	     OLD.coitem_qtyord, NEW.coitem_qtyord
      FROM evntnot, evnttype, itemsite, item, cohead
      WHERE ( (evntnot_evnttype_id=evnttype_id)
       AND (evntnot_warehous_id=itemsite_warehous_id)
       AND (itemsite_id=NEW.coitem_itemsite_id)
       AND (itemsite_item_id=item_id)
       AND (NEW.coitem_cohead_id=cohead_id)
       AND ( (NEW.coitem_scheddate <= (CURRENT_DATE + itemsite_eventfence))
	OR   (OLD.coitem_scheddate <= (CURRENT_DATE + itemsite_eventfence)) )
       AND (evnttype_name=''SoitemQtyChanged'') );

      IF (_cmnttypeid <> -1) THEN
	PERFORM postComment( _cmnttypeid, ''SI'', NEW.coitem_id,
			     ( ''Changed Qty. Ordered from '' || formatQty(OLD.coitem_qtyord) ||
			       '' to '' || formatQty(NEW.coitem_qtyord) ) );
      END IF;

    END IF;

    IF (NEW.coitem_scheddate <> OLD.coitem_scheddate) THEN
      INSERT INTO evntlog ( evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
			    evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id, evntlog_number,
			    evntlog_olddate, evntlog_newdate )
      SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
	     ''S'', NEW.coitem_id, itemsite_warehous_id, (cohead_number || ''-'' || NEW.coitem_linenumber),
	     OLD.coitem_scheddate, NEW.coitem_scheddate
      FROM evntnot, evnttype, itemsite, item, cohead
      WHERE ( (evntnot_evnttype_id=evnttype_id)
       AND (evntnot_warehous_id=itemsite_warehous_id)
       AND (itemsite_id=NEW.coitem_itemsite_id)
       AND (itemsite_item_id=item_id)
       AND (NEW.coitem_cohead_id=cohead_id)
       AND ( (NEW.coitem_scheddate <= (CURRENT_DATE + itemsite_eventfence))
	OR   (OLD.coitem_scheddate <= (CURRENT_DATE + itemsite_eventfence)) )
       AND (evnttype_name=''SoitemSchedDateChanged'') );

      IF (_cmnttypeid <> -1) THEN
	PERFORM postComment( _cmnttypeid, ''SI'', NEW.coitem_id,
			     ( ''Changed Sched. Date from '' || formatDate(OLD.coitem_scheddate) ||
			       '' to '' || formatDate(NEW.coitem_scheddate)) );
      END IF;

    END IF;

    IF ((NEW.coitem_status = ''C'') AND (OLD.coitem_status <> ''C'')) THEN
      NEW.coitem_closedate = CURRENT_TIMESTAMP;
      NEW.coitem_close_username = CURRENT_USER;
      NEW.coitem_qtyreserved := 0;

      IF (_cmnttypeid <> -1) THEN
	PERFORM postComment(_cmnttypeid, ''SI'', NEW.coitem_id, ''Closed'');
      END IF;
    END IF;

    IF ((NEW.coitem_status = ''X'') AND (OLD.coitem_status <> ''X'')) THEN
      NEW.coitem_qtyreserved := 0;

      IF (_cmnttypeid <> -1) THEN
	PERFORM postComment(_cmnttypeid, ''SI'', NEW.coitem_id, ''Canceled'');
	PERFORM postComment(_cmnttypeid, ''S'', NEW.coitem_cohead_id, ''Line # ''|| NEW.coitem_linenumber ||'' Canceled'');
      END IF;

      INSERT INTO evntlog ( evntlog_evnttime, evntlog_username,
			    evntlog_evnttype_id, evntlog_ordtype,
			    evntlog_ord_id, evntlog_warehous_id, evntlog_number )
      SELECT CURRENT_TIMESTAMP, evntnot_username,
	     evnttype_id, ''S'',
	     OLD.coitem_id, itemsite_warehous_id,
	     (cohead_number || ''-'' || OLD.coitem_linenumber)
      FROM evntnot, evnttype, itemsite, item, cohead
      WHERE ( (evntnot_evnttype_id=evnttype_id)
       AND (evntnot_warehous_id=itemsite_warehous_id)
       AND (itemsite_id=OLD.coitem_itemsite_id)
       AND (itemsite_item_id=item_id)
       AND (OLD.coitem_cohead_id=cohead_id)
       AND (OLD.coitem_scheddate <= (CURRENT_DATE + itemsite_eventfence))
       AND (evnttype_name=''SoitemCancelled'') );

    END IF;

    IF ((NEW.coitem_qtyreserved <> OLD.coitem_qtyreserved) AND (_cmnttypeid <> -1)) THEN
      PERFORM postComment(_cmnttypeid, ''SI'', NEW.coitem_id, ''Changed Qty Reserved to ''|| NEW.coitem_qtyreserved);
    END IF;

  END IF;

  IF (TG_OP = ''DELETE'') THEN
    RETURN OLD;
  END IF;

  NEW.coitem_lastupdated = CURRENT_TIMESTAMP;

  RETURN NEW;

END;
' LANGUAGE 'plpgsql';

DROP TRIGGER soitemTrigger ON coitem;
CREATE TRIGGER soitemTrigger BEFORE INSERT OR UPDATE OR DELETE ON coitem FOR EACH ROW EXECUTE PROCEDURE _soitemTrigger();

CREATE OR REPLACE FUNCTION _soitemAfterTrigger() RETURNS TRIGGER AS '
DECLARE
  _check NUMERIC;
  _itemNumber TEXT;
  _r RECORD;
BEGIN
  -- If this is imported, go ahead and insert default characteristics
   IF ((TG_OP = ''INSERT'') AND NEW.coitem_imported) THEN
     PERFORM updateCharAssignment(''SI'', NEW.coitem_id, char_id, charass_value) 
     FROM (
       SELECT DISTINCT char_id, char_name, charass_value
       FROM charass, char, itemsite, item
       WHERE ((itemsite_id=NEW.coitem_itemsite_id)
       AND (itemsite_item_id=item_id)
       AND (charass_target_type=''I'') 
       AND (charass_target_id=item_id)
       AND (charass_default)
       AND (char_id=charass_char_id))
       ORDER BY char_name) AS data;
   END IF;

  -- Create work order and process if flagged to do so
  IF ((NEW.coitem_order_type=''W'') AND (NEW.coitem_order_id=-1)) THEN
    SELECT createwo(cohead_number,NEW.coitem_itemsite_id,NEW.coitem_qtyord,itemsite_leadtime,
                           NEW.coitem_scheddate,NEW.coitem_memo) INTO NEW.coitem_order_id
    FROM cohead, itemsite 
    WHERE ((cohead_id=NEW.coitem_cohead_id)
    AND (itemsite_id=NEW.coitem_itemsite_id));

    UPDATE wo
    SET wo_ordid=NEW.coitem_id, wo_ordtype=''S''
    WHERE (wo_id=NEW.coitem_order_id);

    INSERT INTO charass
      (charass_target_type, charass_target_id,
       charass_char_id, charass_value) 
       SELECT ''W'', NEW.coitem_order_id, charass_char_id, charass_value
       FROM charass
       WHERE ((charass_target_type=''SI'')
       AND  (charass_target_id=NEW.coitem_id));
  END IF;
   
  -- Create Purchase Request if flagged to do so
  IF ((NEW.coitem_order_type=''R'') AND (NEW.coitem_order_id=-1)) THEN
    SELECT createpr(cohead_number,NEW.coitem_itemsite_id,NEW.coitem_qtyord,NEW.coitem_scheddate,
                    NEW.coitem_memo,''S'', NEW.coitem_id) INTO NEW.coitem_order_id
    FROM cohead
    WHERE (cohead_id=NEW.coitem_cohead_id);
  END IF;

  IF (TG_OP = ''UPDATE'') THEN
--  If closing or cancelling and there is a job item work order, then close job and distribute remaining costs
    IF ((NEW.coitem_status = ''C'' AND OLD.coitem_status <> ''C'')
     OR (NEW.coitem_status = ''X'' AND OLD.coitem_status <> ''X''))
     AND (OLD.coitem_order_id > -1) THEN

      SELECT wo_id, wo_wipvalue INTO _r
       FROM wo,itemsite,item
      WHERE ((wo_ordtype=''S'')
      AND (wo_ordid=OLD.coitem_id)
      AND (itemsite_id=wo_itemsite_id)
      AND (item_id=itemsite_item_id)
      AND (item_type = ''J''));

      IF (FOUND) THEN
        IF (_r.wo_wipvalue > 0) THEN
        --  Distribute to G/L, debit Cost of Sales, credit WIP
          PERFORM MIN(insertGLTransaction( ''W/O'', ''WO'', formatWoNumber(NEW.coitem_order_id), ''Job Closed Incomplete'',
                                       costcat_wip_accnt_id,
				        CASE WHEN(COALESCE(NEW.coitem_cos_accnt_id, -1) != -1) THEN NEW.coitem_cos_accnt_id
                                          WHEN(NEW.coitem_warranty=TRUE) THEN resolveCOWAccount(itemsite_id, cohead_cust_id)
                                          ELSE resolveCOSAccount(itemsite_id, cohead_cust_id)
                                       END,
                                       -1,  _r.wo_wipvalue, current_date ))
          FROM itemsite, costcat, cohead
          WHERE ((itemsite_id=NEW.coitem_itemsite_id)
           AND (itemsite_costcat_id=costcat_id)
           AND (cohead_id=NEW.coitem_cohead_id));
        END IF;

        UPDATE wo SET
          wo_status = ''C'',
          wo_wipvalue = 0
        WHERE (wo_id = _r.wo_id);

      END IF;
    END IF;

--  Likewise, reopen the job if line reopened
    IF ((NEW.coitem_status != ''C'' AND OLD.coitem_status = ''C'')
     OR (NEW.coitem_status != ''X'' AND OLD.coitem_status = ''X''))
     AND (OLD.coitem_order_id > -1) THEN
        UPDATE wo SET
          wo_status = ''I''
        FROM itemsite, item
        WHERE ((wo_ordtype = ''S'')
         AND (wo_ordid=NEW.coitem_id)
         AND (wo_itemsite_id=itemsite_id)
         AND (itemsite_item_id=item_id)
         AND (item_type=''J''));
    END IF;

--  Handle links to Return Authorization
    IF (fetchMetricBool(''EnableReturnAuth'')) THEN 
      SELECT * INTO _r 
      FROM raitem,rahead 
      WHERE ((raitem_new_coitem_id=NEW.coitem_id)
      AND (rahead_id=raitem_rahead_id));
      IF (FOUND) THEN
        IF (_r.raitem_qtyauthorized <> NEW.coitem_qtyord OR
            _r.raitem_qty_uom_id <> NEW.coitem_qty_uom_id OR
            _r.raitem_qty_invuomratio <> NEW.coitem_qty_invuomratio OR
            _r.raitem_price_uom_id <> NEW.coitem_price_uom_id OR
            _r.raitem_price_invuomratio <> NEW.coitem_price_invuomratio) THEN
          RAISE EXCEPTION ''Quantities for line item % may only be changed on the Return Authorization that created it.'',NEW.coitem_linenumber;
        END IF;
        IF (OLD.coitem_warranty <> NEW.coitem_warranty) THEN
          UPDATE raitem SET raitem_warranty = NEW.coitem_warranty
           WHERE((raitem_new_coitem_id=NEW.coitem_id)
             AND (raitem_warranty != NEW.coitem_warranty));
        END IF;
        IF (OLD.coitem_cos_accnt_id <> NEW.coitem_cos_accnt_id) THEN
          UPDATE raitem SET raitem_cos_accnt_id = NEW.coitem_cos_accnt_id
           WHERE((raitem_new_coitem_id=NEW.coitem_id)
             AND (COALESCE(raitem_cos_accnt_id,-1) != COALESCE(NEW.coitem_cos_accnt_id,-1)));
        END IF;
        IF (OLD.coitem_tax_id <> NEW.coitem_tax_id) THEN
          UPDATE raitem SET raitem_tax_id = NEW.coitem_tax_id
           WHERE((raitem_new_coitem_id=NEW.coitem_id)
             AND (COALESCE(raitem_tax_id,-1) != COALESCE(NEW.coitem_tax_id,-1)));
        END IF;
        IF (OLD.coitem_scheddate <> NEW.coitem_scheddate) THEN
          UPDATE raitem SET raitem_scheddate = NEW.coitem_scheddate
           WHERE((raitem_new_coitem_id=NEW.coitem_id)
             AND (raitem_scheddate != NEW.coitem_scheddate));
        END IF;
        IF ((OLD.coitem_qtyshipped <> NEW.coitem_qtyshipped) AND 
           (NEW.coitem_qtyshipped >= _r.raitem_qtyauthorized) AND
           (_r.raitem_status = ''O'') AND
           (_r.raitem_disposition IN (''P'',''V'')) AND
           (_r.raitem_qtyreceived >= _r.raitem_qtyauthorized)) THEN
          UPDATE raitem SET raitem_status = ''C'' 
          WHERE (raitem_new_coitem_id=NEW.coitem_id);
        END IF;
      END IF;
    END IF; 
  END IF; 

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER soitemAfterTrigger ON coitem;
CREATE TRIGGER soitemAfterTrigger BEFORE INSERT OR UPDATE ON coitem FOR EACH ROW EXECUTE PROCEDURE _soitemAfterTrigger();
-- TODO: this is a BEFORE trigger but is called an AFTER trigger. should these be merged?
