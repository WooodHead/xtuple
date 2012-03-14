CREATE OR REPLACE FUNCTION _itemTrigger () RETURNS TRIGGER AS '
DECLARE
  _cmnttypeid INTEGER;

BEGIN

  IF ( SELECT (metric_value=''t'')
       FROM metric
       WHERE (metric_name=''ItemChangeLog'') ) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name=''ChangeLog'');
    IF (FOUND) THEN
      IF (TG_OP = ''INSERT'') THEN
        PERFORM postComment(_cmnttypeid, ''I'', NEW.item_id, ''Created'');

      ELSIF (TG_OP = ''UPDATE'') THEN
        IF (OLD.item_active <> NEW.item_active) THEN
          IF (NEW.item_active) THEN
            PERFORM postComment(_cmnttypeid, ''I'', NEW.item_id, ''Activated'');
          ELSE
            PERFORM postComment(_cmnttypeid, ''I'', NEW.item_id, ''Deactivated'');
          END IF;
        END IF;

        IF (OLD.item_descrip1 <> NEW.item_descrip1) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Description 1 Changed from "'' || OLD.item_descrip1 ||
                                 ''" to "'' || NEW.item_descrip1 || ''"'' ) );
        END IF;

        IF (OLD.item_descrip2 <> NEW.item_descrip2) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Description 2 Changed from "'' || OLD.item_descrip2 ||
                                 ''" to "'' || NEW.item_descrip2 || ''"'' ) );
        END IF;

        IF (OLD.item_invuom <> NEW.item_invuom) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Inventory UOM Changed from "'' || OLD.item_invuom ||
                                 ''" to "'' || NEW.item_invuom || ''"'' ) );
        END IF;

        IF (OLD.item_inv_uom_id <> NEW.item_inv_uom_id) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Inventory UOM Changed from "'' ||
                                 (SELECT uom_name FROM uom WHERE uom_id=OLD.item_inv_uom_id) ||
                                 ''" ('' || OLD.item_inv_uom_id ||
                                 '') to "'' ||
                                 (SELECT uom_name FROM uom WHERE uom_id=NEW.item_inv_uom_id) ||
                                 ''" ('' || NEW.item_inv_uom_id || '')'' ) );
        END IF;

        IF (OLD.item_sold <> NEW.item_sold) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               CASE WHEN (NEW.item_sold) THEN ''Sold Changed from FALSE to TRUE''
                                    ELSE ''Sold Changed from TRUE to FALSE''
                               END );
        END IF;

        IF (OLD.item_picklist <> NEW.item_picklist) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               CASE WHEN (NEW.item_picklist) THEN ''Pick List Changed from FALSE to TRUE''
                                    ELSE ''Pick List Changed from TRUE to FALSE''
                               END );
        END IF;

        IF (OLD.item_listprice <> NEW.item_listprice) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''List Price Changed from "'' || OLD.item_listprice ||
                                 ''" to "'' || NEW.item_listprice || ''"'' ) );
        END IF;

-- Add New stuff
        IF (OLD.item_capuom <> NEW.item_capuom) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Capacity UOM Changed from "'' || OLD.item_capuom ||
                                 ''" to "'' || NEW.item_capuom || ''"'' ) );
        END IF;

        IF (OLD.item_altcapuom <> NEW.item_altcapuom) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Alt. Capacity UOM Changed from "'' || OLD.item_altcapuom ||
                                 ''" to "'' || NEW.item_altcapuom || ''"'' ) );
        END IF;

        IF (OLD.item_shipuom <> NEW.item_shipuom) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Shipping UOM Changed from "'' || OLD.item_shipuom ||
                                 ''" to "'' || NEW.item_shipuom || ''"'' ) );
        END IF;

        IF (OLD.item_type <> NEW.item_type) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Type Changed from "'' || OLD.item_type ||
                                 ''" to "'' || NEW.item_type || ''"'' ) );
        END IF;

        IF (OLD.item_priceuom <> NEW.item_priceuom) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Price UOM Changed from "'' || OLD.item_priceuom ||
                                 ''" to "'' || NEW.item_priceuom || ''"'' ) );
        END IF;

        IF (OLD.item_price_uom_id <> NEW.item_price_uom_id) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Price UOM Changed from "'' ||
                                 (SELECT uom_name FROM uom WHERE uom_id=OLD.item_price_uom_id) ||
                                 ''" ('' || OLD.item_price_uom_id ||
                                 '') to "'' ||
                                 (SELECT uom_name FROM uom WHERE uom_id=NEW.item_price_uom_id) ||
                                 ''" ('' || NEW.item_price_uom_id || '')'' ) );
        END IF;

        IF (OLD.item_upccode <> NEW.item_upccode) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''UPC Code Changed from "'' || OLD.item_upccode ||
                                 ''" to "'' || NEW.item_upccode || ''"'' ) );
        END IF;

        IF (OLD.item_prodweight <> NEW.item_prodweight) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Product Weight Changed from "'' || OLD.item_prodweight ||
                                 ''" to "'' || NEW.item_prodweight || ''"'' ) );
        END IF;

        IF (OLD.item_packweight <> NEW.item_packweight) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Packaging Weight Changed from "'' || OLD.item_packweight ||
                                 ''" to "'' || NEW.item_packweight || ''"'' ) );
        END IF;

        IF (OLD.item_invpricerat <> NEW.item_invpricerat) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Inventory/Price UOM Ratio Changed from "'' || OLD.item_invpricerat ||
                                 ''" to "'' || NEW.item_invpricerat || ''"'' ) );
        END IF;

        IF (OLD.item_capinvrat <> NEW.item_capinvrat) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Capacity/Inventory UOM Ratio Changed from "'' || OLD.item_capinvrat ||
                                 ''" to "'' || NEW.item_capinvrat || ''"'' ) );
        END IF;

        IF (OLD.item_altcapinvrat <> NEW.item_altcapinvrat) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Alt. Capacity/Inventory UOM Ratio Changed from "'' || OLD.item_altcapinvrat ||
                                 ''" to "'' || NEW.item_altcapinvrat || ''"'' ) );
        END IF;

        IF (OLD.item_shipinvrat <> NEW.item_shipinvrat) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Shipping/Inventory UOM Ratio Changed from "'' || OLD.item_shipinvrat ||
                                 ''" to "'' || NEW.item_shipinvrat || ''"'' ) );
        END IF;

        IF (OLD.item_maxcost <> NEW.item_maxcost) THEN
          PERFORM postComment( _cmnttypeid, ''I'', NEW.item_id,
                               ( ''Maximum Disired Cost Changed from "'' || OLD.item_maxcost ||
                                 ''" to "'' || NEW.item_maxcost || ''"'' ) );
        END IF;
-- End changes

      END IF;
    END IF;
  END IF;
  
  RETURN NEW;

END;
' LANGUAGE 'plpgsql';

DROP TRIGGER itemTrigger ON item;
CREATE TRIGGER itemTrigger BEFORE INSERT OR UPDATE ON item FOR EACH ROW EXECUTE PROCEDURE _itemTrigger();
