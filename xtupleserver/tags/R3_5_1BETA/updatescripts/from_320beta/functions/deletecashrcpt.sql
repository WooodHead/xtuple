CREATE OR REPLACE FUNCTION deleteCashrcpt(INTEGER) RETURNS INTEGER AS $$
DECLARE
  pcashrcptid ALIAS FOR $1;
  _ccreceipt    BOOLEAN;

BEGIN

  IF EXISTS(SELECT cashrcpt_id
            FROM cashrcpt, ccpay
            WHERE ((cashrcpt_fundstype IN ('A', 'D', 'M', 'V'))
               AND (CAST(cashrcpt_id AS TEXT)=ccpay_order_number)
               AND (ccpay_status NOT IN ('D', 'X'))
               AND (cashrcpt_id=pcashrcptid))) THEN
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
$$ LANGUAGE 'plpgsql';
