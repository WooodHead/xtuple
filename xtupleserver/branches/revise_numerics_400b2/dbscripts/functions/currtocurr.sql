CREATE OR REPLACE FUNCTION currToCurr(pFromCurr  INTEGER,
                                      pToCurr    INTEGER,
                                      pValue     NUMERIC,
                                      pEffective DATE)
    RETURNS NUMERIC AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _effective      DATE := COALESCE(pEffective, CURRENT_DATE);
  _fromRate       NUMERIC;
  _toRate         NUMERIC;
  _result         NUMERIC;
BEGIN
  IF pFromCurr = pToCurr THEN
    _result := pValue;

  ELSIF COALESCE(pValue, 0) = 0 THEN
    _result := 0;

  ELSE
    SELECT curr_rate INTO _fromRate
      FROM curr_rate
     WHERE curr_id = pFromCurr
       AND _effective BETWEEN curr_effective AND curr_expires;

    IF (_fromRate IS NULL) THEN
      RAISE EXCEPTION 'No exchange rate for % on % [xtuple: currToCurr, -1, %, %]',
                      pFromCurr, _effective, pFromCurr, _effective;
    END IF;

    SELECT curr_rate INTO _toRate
      FROM curr_rate
     WHERE curr_id = pToCurr
       AND _effective BETWEEN curr_effective AND curr_expires;

    IF (_toRate IS NULL) THEN
      RAISE EXCEPTION 'No exchange rate for % on % [xtuple: currToCurr, -1, %, %]',
                      pToCurr, _effective, pToCurr, _effective;
    END IF;

    _result := pValue * _toRate / _fromRate;
  END IF;

  RETURN _result;
END;
$$ LANGUAGE PLPGSQL STABLE;

CREATE OR REPLACE FUNCTION currToCurr(pFromCurr  INTEGER,
                                      pToCurr    INTEGER,
                                      pValue     xmoney,
                                      pEffective DATE) RETURNS xmoney AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xmoney(currToCurr($1, $2, $3.amount, $4));
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION currToCurr(pFromCurr  INTEGER,
                                      pToCurr    INTEGER,
                                      pValue     xcost,
                                      pEffective DATE) RETURNS xcost AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xcost(currToCurr($1, $2, $3.amount, $4));
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION currToCurr(pFromCurr  INTEGER,
                                      pToCurr    INTEGER,
                                      pValue     xpurchp,
                                      pEffective DATE) RETURNS xpurchp AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xpurchp(currToCurr($1, $2, $3.amount, $4));
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION currToCurr(pFromCurr  INTEGER,
                                      pToCurr    INTEGER,
                                      pValue     xsalep,
                                      pEffective DATE) RETURNS xsalep AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xsalep(currToCurr($1, $2, $3.amount, $4));
$$ LANGUAGE SQL STABLE;
