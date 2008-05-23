
CREATE OR REPLACE FUNCTION applyCashReceiptLineBalance(INTEGER, INTEGER, NUMERIC, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pCashrcptId ALIAS FOR $1;
  pAropenid ALIAS FOR $2;
  pAmount ALIAS FOR $3;
  pCurrId ALIAS FOR $4;
  _balance NUMERIC;
  _amount NUMERIC;
  _applyAmount NUMERIC;
  _r RECORD;

BEGIN

--  Clear previously applied
  DELETE FROM cashrcptitem WHERE ((cashrcptitem_cashrcpt_id=pCashrcptId) AND (cashrcptitem_aropen_id=pAropenId));

--  Find the balance to apply
  SELECT (currToCurr(pCurrId, cashrcpt_curr_id, pAmount, cashrcpt_distdate) -
              COALESCE(SUM(cashrcptitem_amount), 0)) INTO _amount
  FROM cashrcpt LEFT OUTER JOIN cashrcptitem ON (cashrcptitem_cashrcpt_id = cashrcpt_id)
  WHERE (cashrcpt_id=pCashrcptid)
  GROUP BY cashrcpt_curr_id, cashrcpt_distdate;

  SELECT (_amount - COALESCE(SUM(cashrcptmisc_amount), 0)) INTO _amount
  FROM cashrcptmisc
  WHERE (cashrcptmisc_cashrcpt_id=pCashrcptid);

RAISE NOTICE ''Amount (%)'', _amount;

  IF (_amount = 0) THEN
    RETURN 0;
  END IF;

--  Determine Line balance
        SELECT   currToCurr(aropen_curr_id, pCurrId,
                 aropen_amount - aropen_paid, aropen_docdate) -
                 COALESCE((SELECT SUM(cashrcptitem_amount) FROM cashrcptitem WHERE cashrcptitem_aropen_id=pAropenId), 0) INTO _balance
            FROM aropen
            WHERE (aropen_id=pAropenId);

RAISE NOTICE ''Line Bal (%)'', _balance;

--  Determine the amount to apply
    IF (_balance > _amount) THEN
      _applyAmount := _amount;
    ELSE
      _applyAmount := _balance;
    END IF;

    IF (_applyAmount > 0) THEN
--  Create a new cashrcptitem
        INSERT INTO cashrcptitem
        ( cashrcptitem_aropen_id, cashrcptitem_cashrcpt_id,
          cashrcptitem_amount )
        VALUES
        ( pAropenid, pCashrcptid, round(_applyAmount, 2) );
    END IF;

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

