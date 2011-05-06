
CREATE OR REPLACE FUNCTION toggleBankrecCleared(INTEGER, TEXT, INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pBankrecid ALIAS FOR $1;
  pSource    ALIAS FOR $2;
  pSourceid  ALIAS FOR $3;
  _cleared BOOLEAN;
  _r RECORD;

BEGIN

  SELECT bankrecitem_id, bankrecitem_cleared INTO _r
    FROM bankrecitem
   WHERE ( (bankrecitem_bankrec_id=pBankrecid)
     AND   (bankrecitem_source=pSource)
     AND   (bankrecitem_source_id=pSourceid) );
  IF ( NOT FOUND ) THEN
    _cleared := TRUE;
    INSERT INTO bankrecitem
    (bankrecitem_bankrec_id, bankrecitem_source,
     bankrecitem_source_id, bankrecitem_cleared)
    VALUES
    (pBankrecid, pSource, pSourceid, _cleared);
  ELSE
    _cleared := (NOT _r.bankrecitem_cleared);
    UPDATE bankrecitem
       SET bankrecitem_cleared=_cleared
     WHERE (bankrecitem_id=_r.bankrecitem_id);
  END IF;

  RETURN _cleared;
END;
' LANGUAGE 'plpgsql';

