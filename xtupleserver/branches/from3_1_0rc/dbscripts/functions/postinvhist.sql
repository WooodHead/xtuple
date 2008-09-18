CREATE OR REPLACE FUNCTION postInvHist( INTEGER ) RETURNS BOOLEAN AS $$
DECLARE
  pInvhistId ALIAS FOR $1;
  _r RECORD;
  _sense INTEGER;
BEGIN

    SELECT invhist_ordnumber, invhist_transtype, itemsite_warehous_id INTO _r
    FROM invhist, itemsite
    WHERE ((invhist_id=pInvhistId)
    AND (itemsite_id=invhist_itemsite_id));
  
    -- increase inventory: AD RM RT RP RR RS RX RB TR
    -- decrease inventory: IM IB IT SH SI EX
    -- TS and TR are special: shipShipment and recallShipment should not change
    -- QOH at the Transfer Order src whs (as this was done by issueToShipping)
    -- but postReceipt should change QOH at the transit whs
    IF (_r.invhist_transtype='TS') THEN
      _sense := CASE WHEN (SELECT tohead_trns_warehous_id=_r.itemsite_warehous_id
			   FROM tohead
			   WHERE (tohead_number=_r.invhist_ordnumber)) THEN -1
			   ELSE 0
			   END;
    ELSIF (_r.invhist_transtype='TR') THEN
      _sense := CASE WHEN (SELECT tohead_src_warehous_id=_r.itemsite_warehous_id
			   FROM tohead
			   WHERE (tohead_number=_r.invhist_ordnumber)) THEN 0
			   ELSE 1
			   END;
    ELSIF (_r.invhist_transtype IN ('IM', 'IB', 'IT', 'SH', 'SI', 'EX')) THEN
      _sense := -1;
    ELSE
      _sense := 1;
    END IF;
    
    --Update itemsite qoh and change posted flag
    UPDATE itemsite SET 
      itemsite_qtyonhand = (itemsite_qtyonhand + (invhist_invqty * _sense)),
      itemsite_value = (itemsite_value + (invhist_invqty * invhist_unitcost * _sense))
    FROM invhist
    WHERE ( (itemsite_id=invhist_itemsite_id)
    AND (invhist_id=pInvhistId)
    AND (NOT invhist_posted) );

    --Flag as posted
    UPDATE invhist SET
      invhist_posted=TRUE
    WHERE ( (invhist_id=pInvhistId)
    AND (invhist_posted=FALSE) );

RETURN TRUE;

END;
$$ LANGUAGE 'plpgsql';
