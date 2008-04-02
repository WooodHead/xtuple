
CREATE OR REPLACE FUNCTION applyCashReceiptToBalance(INTEGER, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pCashrcptid ALIAS FOR $1;
  pAmount ALIAS FOR $2;

BEGIN
  RETURN applyCashReceiptToBalance(pCashrcptid, pAmount, baseCurrId() );
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION applyCashReceiptToBalance(INTEGER, NUMERIC, INTEGER) RETURNS INTEGER AS '
DECLARE
  pCashrcptid ALIAS FOR $1;
  pAmount ALIAS FOR $2;
  pCurrId ALIAS FOR $3;
  _amount NUMERIC;
  _applyAmount NUMERIC;
  _r RECORD;

BEGIN

--  Find the balance to apply
  SELECT (currToCurr(pCurrId, cashrcpt_curr_id, pAmount, cashrcpt_distdate) -
              COALESCE(SUM(cashrcptitem_amount), 0)) INTO _amount
  FROM cashrcpt LEFT OUTER JOIN cashrcptitem ON (cashrcptitem_cashrcpt_id = cashrcpt_id)
  WHERE (cashrcpt_id=pCashrcptid)
  GROUP BY cashrcpt_curr_id, cashrcpt_distdate;

  SELECT (_amount - COALESCE(SUM(cashrcptmisc_amount), 0)) INTO _amount
  FROM cashrcptmisc
  WHERE (cashrcptmisc_cashrcpt_id=pCashrcptid);

  IF (_amount = 0) THEN
    RETURN 1;
  END IF;

--  Loop through the aropen item in order of due date, searching only for
--  aropen items that are open, for the current customer and have an outstanding balance
  FOR _r IN SELECT aropen_id,
                   currToCurr(aropen_curr_id, cashrcpt_curr_id,
                              aropen_amount - aropen_paid, aropen_docdate) -
                   (SELECT COALESCE(SUM(p.cashrcptitem_amount), 0) FROM cashrcptitem p
                   WHERE p.cashrcptitem_aropen_id=aropen_id) AS balance,
                   s.cashrcptitem_id AS cashrcptitem_id
            FROM cashrcpt, aropen LEFT OUTER JOIN
                 cashrcptitem s ON (s.cashrcptitem_aropen_id=aropen_id AND s.cashrcptitem_cashrcpt_id=pCashrcptId)
            WHERE ( (aropen_cust_id=cashrcpt_cust_id)
             AND (aropen_doctype IN (''I'', ''D''))
             AND (aropen_open)
             AND (cashrcpt_id=pCashrcptid) )
            ORDER BY aropen_duedate, aropen_amount, balance LOOP

--  Determine the amount to apply
    IF (_r.balance > _amount) THEN
      _applyAmount := _amount;
    ELSE
      _applyAmount := _r.balance;
    END IF;

    IF (_applyAmount > 0) THEN
--  Does an cashrcptitem already exist?
      IF (_r.cashrcptitem_id IS NOT NULL) THEN
--  Update the cashrcptitem with the new amount to apply
        UPDATE cashrcptitem
        SET cashrcptitem_amount = round(cashrcptitem_amount + _applyAmount, 2)
        WHERE (cashrcptitem_id=_r.cashrcptitem_id);
      ELSE
--  Create a new cashrcptitem
        INSERT INTO cashrcptitem
        ( cashrcptitem_aropen_id, cashrcptitem_cashrcpt_id,
          cashrcptitem_amount )
        VALUES
        ( _r.aropen_id, pCashrcptid, round(_applyAmount, 2) );
      END IF;

      _amount := (_amount - _applyAmount);
      IF (round(_amount, 2) = 0) THEN
        EXIT;
      END IF;

    END IF;
  END LOOP;

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

