
CREATE OR REPLACE FUNCTION calcAsOfQoh(integer, date) RETURNS NUMERIC AS $$
DECLARE
  pItemsiteId ALIAS FOR $1;
  pAsOfDate   ALIAS FOR $2;

BEGIN
  RETURN calcAsOfQoh(pItemsiteId, NULL, pAsOfDate);

END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION calcAsOfQoh(integer, integer, date) RETURNS NUMERIC AS $$
DECLARE
  pItemsiteId ALIAS FOR $1;
  pItemlocId ALIAS FOR $2;
  pAsOfDate   ALIAS FOR $3;
  qoh         NUMERIC := 0.0;

BEGIN

  IF (pItemlocID IS NULL) THEN
    SELECT CASE WHEN (pAsOfDate = CURRENT_DATE) THEN COALESCE(itemsite_qtyonhand, 0.0)
                ELSE COALESCE( (SELECT invhist_qoh_after
                                FROM invhist
                                WHERE ( (invhist_itemsite_id = itemsite_id)
                                  AND   (invhist_transdate <= pAsOfDate) )
                                ORDER BY invhist_transdate DESC
                                LIMIT 1), 0.0)
           END INTO qoh
    FROM itemsite
    WHERE (itemsite_id=pItemsiteId);
  ELSE
    SELECT CASE WHEN (pAsOfDate = CURRENT_DATE) THEN COALESCE(itemloc_qty, 0.0)
                ELSE COALESCE( (SELECT invdetail_qty_after
                                FROM invhist JOIN invdetail ON (invhist_id=invdetail_invhist_id)
                                WHERE ( (invhist_itemsite_id = itemloc_itemsite_id)
                                  AND   (invdetail_location_id = itemloc_location_id)
                                  AND   (invdetail_ls_id = itemloc_ls_id)
                                  AND   (invhist_transdate <= pAsOfDate) )
                                ORDER BY invhist_transdate DESC
                                LIMIT 1), 0.0)
           END INTO qoh
    FROM itemloc
    WHERE (itemloc_id=pItemlocId);
  END IF;

  RETURN qoh;

END;
$$ LANGUAGE 'plpgsql';
