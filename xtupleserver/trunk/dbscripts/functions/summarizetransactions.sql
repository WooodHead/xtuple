CREATE OR REPLACE FUNCTION summarizeTransactions(INTEGER, DATE, DATE) RETURNS INTEGER AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pStartDate ALIAS FOR $2;
  pEndDate ALIAS FOR $3;
  _startDate DATE;
  _endDate DATE;
  _invhist RECORD;
  _itemuom TEXT;
  _transCounter INTEGER;

BEGIN

--  Cache the item_invuom
  SELECT item_invuom INTO _itemuom
  FROM itemsite, item
  WHERE ((itemsite_item_id=item_id)
    AND (itemsite_id=pItemsiteid));

  _transCounter := 0;

--  Can''t summarize into the future...
  IF (pEndDate > CURRENT_DATE) THEN
    _endDate := CURRENT_DATE;
  ELSE
    _endDate := pEndDate;
  END IF;

--  Verify date bounds
  IF (pStartDate > pEndDate) THEN
    _startDate := pEndDate;
  ELSE
    _startDate := pStartDate;
  END IF;

  FOR _invhist IN SELECT invhist_transtype, SUM(invhist_invqty) AS qty
                  FROM invhist
                  WHERE ((invhist_itemsite_id=pItemsiteid)
                   AND (invhist_transdate::DATE BETWEEN _startDate AND _endDate))
                  GROUP BY invhist_transtype LOOP

    DELETE FROM invhist
    WHERE ((invhist_transdate::DATE BETWEEN _startDate AND _endDate)
     AND (invhist_transtype=_invhist.invhist_transtype)
     AND (invhist_itemsite_id=pItemsiteid));

    INSERT INTO invhist
    ( invhist_itemsite_id, invhist_transdate, invhist_transtype,
      invhist_invqty, invhist_qoh_before, invhist_qoh_after,
      invhist_invuom, invhist_user, invhist_ordnumber )
    VALUES
    ( pItemsiteid, _endDate, _invhist.invhist_transtype,
      _invhist.qty, 0, 0,
      _itemuom, CURRENT_USER, ''Summary'' );

    _transCounter := (_transCounter + 1);

  END LOOP;

  RETURN _transCounter;

END;
' LANGUAGE 'plpgsql';
