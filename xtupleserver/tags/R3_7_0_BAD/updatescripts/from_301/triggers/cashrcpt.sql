CREATE OR REPLACE FUNCTION _cashRcptTrigger () RETURNS TRIGGER AS '
DECLARE
  _check      BOOLEAN;
  _checkId    INTEGER;
  _currId     INTEGER;
  _bankCurrId INTEGER;

BEGIN

  -- Checks
  -- Start with privileges
  IF (TG_OP = ''INSERT'') THEN
    SELECT checkPrivilege(''MaintainCashReceipts'') INTO _check;
    IF NOT (_check) THEN
      RAISE EXCEPTION ''You do not have privileges to add new Cash Receipts.'';
    END IF;
  ELSE
    SELECT checkPrivilege(''MaintainCashReceipts'') INTO _check;
    IF NOT (_check) THEN
      RAISE EXCEPTION ''You do not have privileges to alter a Cash Receipt.'';
    END IF;
  END IF;

  -- Currency must be same as Bank Currency
  IF (TG_OP = ''INSERT'') THEN
    _currId = COALESCE(NEW.cashrcpt_curr_id, basecurrid());
  ELSE
    _currId = NEW.cashrcpt_curr_id;
  END IF;
  SELECT bankaccnt_curr_id INTO _bankCurrId
  FROM bankaccnt
  WHERE (bankaccnt_id=NEW.cashrcpt_bankaccnt_id);
  IF (_currId<>_bankCurrId) THEN
    RAISE EXCEPTION ''Currency supplied does not match Bank Currency.'';
  END IF;

  RETURN NEW;

END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'cashRcptTrigger');
CREATE TRIGGER cashRcptTrigger BEFORE INSERT OR UPDATE ON cashrcpt FOR EACH ROW EXECUTE PROCEDURE _cashRcptTrigger();
