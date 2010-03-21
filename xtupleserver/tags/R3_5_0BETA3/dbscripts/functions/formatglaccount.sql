
CREATE OR REPLACE FUNCTION formatGLAccount(INTEGER) RETURNS TEXT IMMUTABLE AS '
DECLARE
  pAccntid ALIAS FOR $1;
  _number TEXT;
  _accnt RECORD;

BEGIN

  _number := '''';

  SELECT COALESCE(accnt_company, '''') AS accnt_company,
         COALESCE(accnt_profit, '''') AS accnt_profit,
         accnt_number,
         COALESCE(accnt_sub, '''') AS accnt_sub INTO _accnt
  FROM accnt
  WHERE (accnt_id=pAccntid);

  IF (NOT FOUND) THEN
    RETURN ''Error'';
  END IF;

  IF ( ( SELECT metric_value::INTEGER
         FROM metric
         WHERE (metric_name=''GLCompanySize'') ) > 0 ) THEN
    _number := _accnt.accnt_company || ''-'';
  END IF;

  IF ( ( SELECT metric_value::INTEGER
         FROM metric
         WHERE (metric_name=''GLProfitSize'') ) > 0 ) THEN
    _number := _number || _accnt.accnt_profit || ''-'';
  END IF;

  _number := _number || _accnt.accnt_number;

  IF ( ( SELECT metric_value::INTEGER
         FROM metric
         WHERE (metric_name=''GLSubaccountSize'') ) > 0 ) THEN
    _number := _number || ''-'' || _accnt.accnt_sub;
  END IF;

  RETURN _number;

END;
' LANGUAGE 'plpgsql';

