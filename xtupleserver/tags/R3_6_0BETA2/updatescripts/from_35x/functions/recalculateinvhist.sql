CREATE OR REPLACE FUNCTION recalculateinvhist(integer) RETURNS integer AS $$
DECLARE
  pInvhistid     ALIAS FOR $1;
  _nextQohBefore NUMERIC;
  _currrow       RECORD;
  _row           RECORD;
  _sense         INTEGER;

BEGIN

  -- Get current row
  SELECT * INTO _currrow
  FROM invhist
  WHERE (invhist_id=pInvhistid);
  IF (NOT FOUND) THEN
    RAISE EXCEPTION 'invhist_id % not found', pInvhistid;
  END IF;

  -- Initialize _nextQohBefore with invhist_qoh_after of previous row
  SELECT invhist_qoh_after INTO _nextQohBefore
  FROM invhist
  WHERE ((invhist_itemsite_id=_currrow.invhist_itemsite_id)
    AND  (invhist_transdate<_currrow.invhist_transdate))
  ORDER BY invhist_transdate DESC
  LIMIT 1;
  IF (NOT FOUND) THEN
    _nextQohBefore := 0.0;
  END IF;

  FOR _row IN (SELECT invhist.*, itemsite_warehous_id
               FROM invhist JOIN itemsite ON (itemsite_id=invhist_itemsite_id)
               WHERE ((invhist_itemsite_id=_currrow.invhist_itemsite_id)
                 AND  (invhist_transdate>=_currrow.invhist_transdate))
               ORDER BY invhist_transdate)
  LOOP

    -- increase inventory: AD RM RT RP RR RS RX RB TR
    -- decrease inventory: IM IB IT SH SI EX
    -- TS and TR are special: shipShipment and recallShipment should not change
    -- QOH at the Transfer Order src whs (as this was done by issueToShipping)
    -- but postReceipt should change QOH at the transit whs
    IF (_row.invhist_transtype='TS') THEN
      _sense := CASE WHEN (SELECT tohead_trns_warehous_id=_row.itemsite_warehous_id
                                  FROM tohead
                                  WHERE (tohead_number=_row.invhist_ordnumber)) THEN -1
                  ELSE 0
                END;
    ELSIF (_row.invhist_transtype='TR') THEN
      _sense := CASE WHEN (SELECT tohead_src_warehous_id=_row.itemsite_warehous_id
                                  FROM tohead
                                  WHERE (tohead_number=_row.invhist_ordnumber)) THEN 0
                  ELSE 1
                END;
    ELSIF (_row.invhist_transtype IN ('IM', 'IB', 'IT', 'SH', 'SI', 'EX')) THEN
      _sense := -1;
    ELSE
      _sense := 1;
    END IF;

    UPDATE invhist
    SET invhist_qoh_before=_nextQohBefore, invhist_qoh_after=_nextQohBefore + _sense * _row.invhist_invqty,
        invhist_value_before=_nextQohBefore * _row.invhist_unitcost,
        invhist_value_after=(_nextQohBefore + _sense * _row.invhist_invqty) * _row.invhist_unitcost
    WHERE (invhist_id=_row.invhist_id);

    _nextQohBefore := _nextQohBefore + _sense * _row.invhist_invqty;
  END LOOP;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';