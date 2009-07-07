CREATE OR REPLACE FUNCTION _bomitemTrigger() RETURNS TRIGGER AS '
DECLARE
  _cmnttypeid INTEGER;
BEGIN

-- Privilege Checks
  IF (NOT checkPrivilege(''MaintainBOMs'')) THEN
    RAISE EXCEPTION ''You do not have privileges to maintain Bills of Material.'';
  END IF;

  IF (TG_OP IN (''INSERT'',''UPDATE'')) THEN
-- Make sure sequence is unique.  Need to do this going forward here rather than as table
-- constraint because lax enforcement in previous versions could make upgrading a
-- substantial headache for legacy users.
    IF (SELECT (COUNT(*) != 0) 
        FROM bomitem(NEW.bomitem_parent_item_id,NEW.bomitem_rev_id)
        WHERE ((bomitem_id != NEW.bomitem_id)
        AND (bomitem_item_id = NEW.bomitem_item_id)
        AND (bomitem_seqnumber=NEW.bomitem_seqnumber))) THEN
      RAISE EXCEPTION ''BOM Item sequence number must be unique for effectivity range.'';
    END IF;

-- Check for valid UOM
    IF (SELECT (count(*) != 1)
        FROM
               (SELECT uom_id
                  FROM item
                  JOIN uom ON (item_inv_uom_id=uom_id)
                 WHERE(item_id=NEW.bomitem_item_id)
                 UNION 
                SELECT uom_id
                  FROM item
                  JOIN itemuomconv ON (itemuomconv_item_id=item_id)
                  JOIN uom ON (itemuomconv_to_uom_id=uom_id),
                  itemuom, uomtype 
                 WHERE((itemuomconv_from_uom_id=item_inv_uom_id)
                   AND (item_id=NEW.bomitem_item_id) 
                   AND (itemuom_itemuomconv_id=itemuomconv_id) 
                   AND (uomtype_id=itemuom_uomtype_id) 
                   AND (uomtype_name=''MaterialIssue''))
                 UNION 
                SELECT uom_id
                  FROM item
                  JOIN itemuomconv ON (itemuomconv_item_id=item_id)
                  JOIN uom ON (itemuomconv_from_uom_id=uom_id),
                  itemuom, uomtype 
                 WHERE((itemuomconv_to_uom_id=item_inv_uom_id)
                   AND (item_id=NEW.bomitem_item_id) 
                   AND (itemuom_itemuomconv_id=itemuomconv_id) 
                   AND (uomtype_id=itemuom_uomtype_id) 
                   AND (uomtype_name=''MaterialIssue''))) AS data
          WHERE (uom_id=NEW.bomitem_uom_id)) THEN
      RAISE EXCEPTION ''Unit of Measure Invalid for Material Issue.'';
    END IF;

-- Disallow changes that would compromise revision control integrity
    IF (TG_OP = ''UPDATE'') THEN
      IF (NEW.bomitem_parent_item_id != OLD.bomitem_parent_item_id) THEN
        RAISE EXCEPTION ''Parent Item ID may not be changed.'';
      END IF;

      IF (NEW.bomitem_item_id != OLD.bomitem_item_id) THEN
        RAISE EXCEPTION ''Item ID may not be changed.'';
      END IF;

      IF ((fetchMetricBool(''RevControl'')) AND (OLD.bomitem_rev_id > -1)) THEN
        IF (SELECT (rev_status = ''I'') FROM rev WHERE (rev_id=OLD.bomitem_rev_id)) THEN
          RAISE EXCEPTION ''Bill of material is Inactive and may not be modified'';
        END IF;
      END IF;
    END IF;

-- Over ride logic to disallow invalid data
    IF (NEW.bomitem_createwo) THEN
      IF (SELECT (item_type != ''M'') 
          FROM item 
          WHERE (item_id=NEW.bomitem_item_id)) THEN
        NEW.bomitem_createwo := FALSE;
      END IF;
      IF (NEW.bomitem_booitem_seq_id = -1) THEN
        NEW.bomitem_schedatwooper := FALSE;
      END IF;
    END IF;
  END IF;
  

  IF ( SELECT (metric_value=''t'')
       FROM metric
       WHERE (metric_name=''ItemChangeLog'') ) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name=''ChangeLog'');
    IF (FOUND) THEN
      IF (TG_OP = ''INSERT'') THEN
        PERFORM postComment(_cmnttypeid, ''BMI'', NEW.bomitem_id, (''Created BOM Item'' || NEW.bomitem_seqnumber::TEXT));

      ELSIF (TG_OP = ''UPDATE'') THEN
        IF (NEW.bomitem_effective <> OLD.bomitem_effective) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Effective Date Changed from '' || formatDate(OLD.bomitem_effective, ''Always'') ||
                                 '' to '' || formatDate(NEW.bomitem_effective, ''Always'' ) ) );
        END IF;

        IF (NEW.bomitem_expires <> OLD.bomitem_expires) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Expiration Date Changed from '' || formatDate(OLD.bomitem_expires, ''Never'') ||
                                 '' to '' || formatDate(NEW.bomitem_expires, ''Never'' ) ) );
        END IF;

        IF (NEW.bomitem_qtyper <> OLD.bomitem_qtyper) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Qty. Per Changed from '' || formatQtyPer(OLD.bomitem_qtyper) ||
                                 '' to '' || formatQtyPer(NEW.bomitem_qtyper ) ) );
        END IF;

        IF (NEW.bomitem_scrap <> OLD.bomitem_scrap) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Scrap % Changed from '' || formatPrcnt(OLD.bomitem_scrap) ||
                                 '' to '' || formatPrcnt(NEW.bomitem_scrap ) ) );
        END IF;

        IF (NEW.bomitem_issuemethod <> OLD.bomitem_issuemethod) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''Issue Method Changed from '' || (CASE WHEN(OLD.bomitem_issuemethod=''S'') THEN ''Push''
                                                                         WHEN(OLD.bomitem_issuemethod=''L'') THEN ''Pull''
                                                                         WHEN(OLD.bomitem_issuemethod=''M'') THEN ''Mixed''
                                                                         ELSE OLD.bomitem_issuemethod END) ||
                                 '' to '' || (CASE WHEN(NEW.bomitem_issuemethod=''S'') THEN ''Push''
                                                   WHEN(NEW.bomitem_issuemethod=''L'') THEN ''Pull''
                                                   WHEN(NEW.bomitem_issuemethod=''M'') THEN ''Mixed''
                                                   ELSE NEW.bomitem_issuemethod END) ) );
        END IF;

        IF (NEW.bomitem_ecn <> OLD.bomitem_ecn) THEN
          PERFORM postComment( _cmnttypeid, ''BMI'', NEW.bomitem_id,
                               ( ''ECN Changed from '' || OLD.bomitem_ecn ||
                                 '' to '' || NEW.bomitem_ecn ) );
        END IF;

      END IF;
    END IF;
  END IF;

  IF (TG_OP = ''DELETE'') THEN
    DELETE FROM comment
     WHERE ( (comment_source=''BMI'')
       AND   (comment_source_id=OLD.bomitem_id) );

    RETURN OLD;
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER bomitemTrigger ON bomitem;
CREATE TRIGGER bomitemTrigger BEFORE INSERT OR UPDATE OR DELETE ON bomitem FOR EACH ROW EXECUTE PROCEDURE _bomitemTrigger();
