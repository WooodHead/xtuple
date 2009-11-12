
CREATE OR REPLACE FUNCTION copyAssortment(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pSourceid ALIAS FOR $1;
  pTargetid ALIAS FOR $2;

BEGIN

--  Check to see if the Target Assortment has a current definition
  IF ( ( SELECT COUNT(*)
         FROM assitem
         WHERE ( (assitem_expires > CURRENT_DATE)
          AND (assitem_parent_item_id=pTargetid) ) ) > 0 ) THEN
    RETURN -1;
  END IF;

--  Make sure that the Source Assortment has a current definition
  IF ( ( SELECT COUNT(*)
         FROM assitem
         WHERE ( (assitem_expires > CURRENT_DATE)
          AND (assitem_parent_item_id=pSourceid) ) ) = 0 ) THEN
    RETURN -2;
  END IF;

--  Copy the definition
  INSERT INTO assitem
  ( assitem_parent_item_id, assitem_item_id, assitem_seqnumber,
    assitem_qtyper, assitem_effective, assitem_expires )
  SELECT pTargetid, assitem_item_id, assitem_seqnumber,
         assitem_qtyper, CURRENT_DATE, assitem_expires
  FROM assitem
  WHERE ( (assitem_expires > CURRENT_DATE)
   AND (assitem_parent_item_id=pSourceid) );

  RETURN pTargetid;

END;
' LANGUAGE 'plpgsql';

