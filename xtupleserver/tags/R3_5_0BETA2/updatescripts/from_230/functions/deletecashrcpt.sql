CREATE OR REPLACE FUNCTION deleteCashrcpt(INTEGER) RETURNS INTEGER AS '
DECLARE
  pcashrcptid ALIAS FOR $1;
  _ccreceipt    BOOLEAN;

BEGIN
  SELECT cashrcpt_fundstype IN (''A'', ''D'', ''M'', ''V'') INTO _ccreceipt
  FROM cashrcpt
  WHERE ((cashrcpt_id=pcashrcptid)
     AND (cashrcpt_usecustdeposit));
  IF (_ccreceipt) THEN
    RETURN -1;
  END IF;

  DELETE FROM cashrcptitem
  WHERE (cashrcptitem_cashrcpt_id=pcashrcptid);

  DELETE FROM cashrcptmisc
  WHERE (cashrcptmisc_cashrcpt_id=pcashrcptid);

  DELETE FROM cashrcpt
  WHERE (cashrcpt_id=pcashrcptid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
