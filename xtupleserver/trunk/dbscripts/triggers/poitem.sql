CREATE OR REPLACE FUNCTION _poitemTrigger() RETURNS TRIGGER AS $$
DECLARE
  _cmnttypeid 	INTEGER;
  _status      	CHAR(1);
  _check      	BOOLEAN;
  _s 		RECORD;
BEGIN

  -- Check
  SELECT checkPrivilege('MaintainPurchaseOrders') INTO _check;
  IF NOT (_check) THEN
    RAISE EXCEPTION 'You do not have privileges to alter a Purchase Order.';
  END IF;

  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    SELECT pohead_status INTO _status
    FROM pohead
    WHERE (pohead_id=NEW.poitem_pohead_id);
  END IF;

  IF (TG_OP = 'INSERT') THEN

    IF (_status='C') THEN
      RAISE EXCEPTION 'New lines may not be inserted into a closed purchase order';
    ELSIF (COALESCE(NEW.poitem_itemsite_id,-1) != -1 AND COALESCE(NEW.poitem_expcat_id,-1) != -1) THEN
      RAISE EXCEPTION 'A purchase order line may not include both an inventory and non-inventory item';
    ELSIF (COALESCE(NEW.poitem_itemsite_id,-1) = -1 AND COALESCE(NEW.poitem_expcat_id,-1) = -1) THEN
      RAISE EXCEPTION 'A purchase order line must specify either an inventory item or a non-inventory expense category';
    ELSIF (NEW.poitem_qty_ordered IS NULL) THEN
      RAISE EXCEPTION 'A purchase order line must specify a quantity';
    ELSIF (COALESCE(NEW.poitem_itemsite_id,-1) != -1) THEN
      SELECT (COUNT(item_id)=1) INTO _check
      FROM itemsite, item
      WHERE ((itemsite_id=NEW.poitem_itemsite_id)
      AND (itemsite_item_id=item_id)
      AND (item_type IN ('P','O','M')));
      IF NOT (_check) THEN
        RAISE EXCEPTION 'The item is not a purchasable item type';
      END IF;
    END IF;
    
    --Fetch and apply default item source data if applicable    
    IF ((NEW.poitem_itemsrc_id IS NULL) AND (NEW.poitem_itemsite_id IS NOT NULL)) THEN
      SELECT itemsrc.* INTO _s
      FROM pohead,itemsrc,itemsite
      WHERE ((pohead_id=NEW.poitem_pohead_id)
      AND (pohead_vend_id=itemsrc_vend_id)
      AND (itemsite_id=NEW.poitem_itemsite_id)
      AND (itemsite_item_id=itemsrc_item_id));
      IF (FOUND) THEN
        NEW.poitem_itemsrc_id 		:= _s.itemsrc_id;
        NEW.poitem_vend_uom            := _s.itemsrc_vend_uom;
        NEW.poitem_invvenduomratio     := _s.itemsrc_invvendoruomratio;
        NEW.poitem_duedate		:= COALESCE(NEW.poitem_duedate, CURRENT_DATE + _s.itemsrc_leadtime);
        NEW.poitem_vend_item_number 	:= COALESCE(NEW.poitem_vend_item_number,_s.itemsrc_vend_item_number);
        NEW.poitem_vend_item_descrip   := COALESCE(NEW.poitem_vend_item_descrip,_s.itemsrc_vend_item_descrip);
      END IF;
    END IF;

    IF (NEW.poitem_duedate IS NULL) THEN
      RAISE EXCEPTION  'A due date is required';
    END IF;
    
    --Set defaults
    NEW.poitem_linenumber    		:= COALESCE(NEW.poitem_linenumber,(
						SELECT COALESCE(MAX(poitem_linenumber),0) + 1
						FROM poitem
						WHERE (poitem_pohead_id=NEW.poitem_pohead_id)));
    NEW.poitem_status                  := _status;
    NEW.poitem_invvenduomratio 	:= COALESCE(NEW.poitem_invvenduomratio,1);
    NEW.poitem_vend_item_number 	:= COALESCE(NEW.poitem_vend_item_number,'');
    NEW.poitem_vend_item_descrip   	:= COALESCE(NEW.poitem_vend_item_descrip,'');
    NEW.poitem_unitprice       	:= COALESCE(NEW.poitem_unitprice,(
						SELECT currToCurr(itemsrcp_curr_id, pohead_curr_id, itemsrcp_price, pohead_orderdate)
						FROM itemsrcp, pohead
						WHERE ( (itemsrcp_itemsrc_id=NEW.poitem_itemsrc_id)
						AND (itemsrcp_qtybreak <= NEW.poitem_qty_ordered)
						AND (pohead_id=NEW.poitem_pohead_id) ) 
						ORDER BY itemsrcp_qtybreak DESC
						LIMIT 1), 0);
    NEW.poitem_stdcost			:= COALESCE(NEW.poitem_stdcost,(
						SELECT stdcost(itemsite_item_id)
						FROM itemsite
						WHERE (itemsite_id=NEW.poitem_itemsite_id)));
    NEW.poitem_bom_rev_id		:= COALESCE(NEW.poitem_bom_rev_id,(
						SELECT getActiveRevId('BOM',itemsite_item_id)
						FROM itemsite
						WHERE (itemsite_id=NEW.poitem_itemsite_id)));
    NEW.poitem_boo_rev_id		:= COALESCE(NEW.poitem_bom_rev_id,(
						SELECT getActiveRevId('BOO',itemsite_item_id)
						FROM itemsite
						WHERE (itemsite_id=NEW.poitem_itemsite_id)));
    NEW.poitem_comments		:= COALESCE(NEW.poitem_comments,'');
    NEW.poitem_freight			:= COALESCE(NEW.poitem_freight,0);
    NEW.poitem_qty_received		:= 0;
    NEW.poitem_qty_returned		:= 0;
    NEW.poitem_qty_vouchered		:= 0;
      
--   Insert Event Start
       
    INSERT INTO evntlog ( evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
                          evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id, evntlog_number )
    SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
                     'P', NEW.poitem_id, itemsite_warehous_id, (pohead_number || '-' || NEW.poitem_linenumber || ': ' || item_number)
    FROM evntnot, evnttype, itemsite, item, pohead
     WHERE ( (evntnot_evnttype_id=evnttype_id)
     AND (evntnot_warehous_id=itemsite_warehous_id)
     AND (itemsite_id=NEW.poitem_itemsite_id)
     AND (itemsite_item_id=item_id)
     AND (NEW.poitem_pohead_id=pohead_id)
     AND (NEW.poitem_duedate <= (CURRENT_DATE + itemsite_eventfence))
     AND (evnttype_name='POitemCreate') );

--   Insert Event End

  END IF;

  IF ( SELECT (metric_value='t')
       FROM metric
       WHERE (metric_name='POChangeLog') ) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name='ChangeLog');
    IF (FOUND) THEN
      IF (TG_OP = 'INSERT') THEN
        PERFORM postComment(_cmnttypeid, 'P', NEW.poitem_pohead_id, ('Created Line #' || NEW.poitem_linenumber::TEXT));

      ELSIF (TG_OP = 'UPDATE') THEN
        IF (NEW.poitem_qty_ordered <> OLD.poitem_qty_ordered) THEN
          PERFORM postComment( _cmnttypeid, 'PI', NEW.poitem_id,
                               ( 'Qty. Ordered Changed from ' || formatQty(OLD.poitem_qty_ordered) ||
                                 ' to ' || formatQty(NEW.poitem_qty_ordered ) ) );
        END IF;

      ELSIF (TG_OP = 'DELETE') THEN
        PERFORM postComment(_cmnttypeid, 'P', OLD.poitem_pohead_id, ('Deleted Line #' || OLD.poitem_linenumber::TEXT));
      END IF;
    END IF;
  END IF;

  IF (TG_OP = 'DELETE') THEN
    DELETE FROM comment
     WHERE ( (comment_source='PI')
       AND   (comment_source_id=OLD.poitem_id) );

    DELETE FROM charass
     WHERE ((charass_target_type='PI')
       AND  (charass_target_id=OLD.poitem_id));

    IF (OLD.poitem_status = 'O') THEN
      IF ( (SELECT (count(*) < 1)
              FROM poitem
             WHERE ((poitem_pohead_id=OLD.poitem_pohead_id)
               AND  (poitem_id != OLD.poitem_id)
               AND  (poitem_status <> 'C')) ) ) THEN
        UPDATE pohead SET pohead_status = 'C'
         WHERE ((pohead_id=OLD.poitem_pohead_id)
           AND  (pohead_status='O'));
      END IF;
    END IF;

    RETURN OLD;
  ELSE
    IF (TG_OP = 'UPDATE') THEN

      IF (_status='C' OR (OLD.poitem_status = 'C' AND NEW.poitem_status='C')) THEN
        RAISE EXCEPTION 'Status is closed, line items may not be updated.';
      END IF;
    
      IF (OLD.poitem_status <> NEW.poitem_status) THEN
        IF ( (SELECT (count(*) < 1)
                FROM poitem
               WHERE ((poitem_pohead_id=NEW.poitem_pohead_id)
                 AND  (poitem_id != NEW.poitem_id)
                 AND  (poitem_status<>'C')) ) AND (NEW.poitem_status='C') ) THEN
          UPDATE pohead SET pohead_status = 'C'
           WHERE ((pohead_id=NEW.poitem_pohead_id)
             AND  (pohead_status='O'));
        ELSE
          UPDATE pohead SET pohead_status = 'O'
           WHERE ((pohead_id=NEW.poitem_pohead_id)
             AND  (pohead_status='C'));
        END IF;
      END IF;
    END IF;

    RETURN NEW;
  END IF;

END;
$$ LANGUAGE 'plpgsql';

SELECT dropifexists('TRIGGER', 'poitemTrigger');
CREATE TRIGGER poitemTrigger BEFORE INSERT OR UPDATE OR DELETE ON poitem FOR EACH ROW EXECUTE PROCEDURE _poitemTrigger();
