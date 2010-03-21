CREATE OR REPLACE FUNCTION calcpendingarapplications(INTEGER) RETURNS NUMERIC AS '
DECLARE
  paropenid     ALIAS FOR $1;
  _arcreditsum  NUMERIC;
  _aropencurrid INTEGER;
  _cashrcptsum  NUMERIC;

BEGIN
  SELECT aropen_curr_id INTO _aropencurrid
  FROM aropen
  WHERE (aropen_id=paropenid);

  SELECT SUM(currToCurr(cashrcpt_curr_id, _aropencurrid,
                        cashrcptitem_amount, CURRENT_DATE)) INTO _cashrcptsum
  FROM cashrcptitem, cashrcpt
  WHERE ((cashrcptitem_cashrcpt_id=cashrcpt_id)
    AND  (cashrcptitem_aropen_id=paropenid)
    );

  SELECT SUM(currToCurr(arcreditapply_curr_id, _aropencurrid,
                        arcreditapply_amount, CURRENT_DATE)) INTO _arcreditsum
  FROM arcreditapply
  WHERE ((arcreditapply_target_aropen_id=paropenid)
    );

  RETURN COALESCE(_cashrcptsum, 0) + COALESCE(_arcreditsum, 0);
END;
' LANGUAGE 'plpgsql';
