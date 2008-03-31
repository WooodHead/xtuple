CREATE OR REPLACE FUNCTION postInvHist( INTEGER ) RETURNS BOOLEAN AS '
DECLARE
  pInvhistId ALIAS FOR $1;

BEGIN

    --Update itemsite qoh and change posted flag
    UPDATE itemsite SET 
      itemsite_qtyonhand = (itemsite_qtyonhand + invhist_invqty)
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
' LANGUAGE 'plpgsql';