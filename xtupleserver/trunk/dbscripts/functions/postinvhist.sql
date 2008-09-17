CREATE OR REPLACE FUNCTION postInvHist( INTEGER ) RETURNS BOOLEAN AS $$
DECLARE
  pInvhistId ALIAS FOR $1;

BEGIN

    --Update itemsite qoh and change posted flag
    UPDATE itemsite SET 
      itemsite_qtyonhand = (itemsite_qtyonhand + (invhist_invqty *
        (CASE WHEN invhist_transtype IN ('IM', 'IB', 'IT', 'SH', 'SI', 'EX', 'TS') THEN
          -1
        ELSE
           1
        END))),
      itemsite_value = (itemsite_value + (invhist_invqty * invhist_unitcost *
        (CASE WHEN invhist_transtype IN ('IM', 'IB', 'IT', 'SH', 'SI', 'EX', 'TS') THEN
          -1
        ELSE
           1
        END)))
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
