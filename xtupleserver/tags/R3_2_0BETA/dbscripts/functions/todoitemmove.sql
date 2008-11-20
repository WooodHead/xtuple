
CREATE OR REPLACE FUNCTION todoItemMove(INTEGER, INTEGER) RETURNS INTEGER AS '
  DECLARE
    ptodoItemId ALIAS FOR $1;
    pHowFar     ALIAS FOR $2;   -- -1 moves toward front of list, +1 toward back
    _howFar     INTEGER := pHowFar;
    _usr_id     INTEGER;
    _currseq    INTEGER;
  BEGIN
    SELECT todoitem_usr_id, todoitem_seq INTO _usr_id, _currseq
    FROM todoitem
    WHERE todoitem_id = ptodoItemId;

    IF NOT FOUND THEN
      RETURN -1;
    END IF;

    IF (_currseq + pHowFar <= 0) THEN
      _howFar = 1 - _currseq;   -- move to beginning
    END IF;

    UPDATE todoitem
    SET todoitem_seq=todoitem_seq - _howFar
    WHERE todoitem_seq >= _currseq + _howFar
      AND todoitem_id != ptodoItemId
      AND todoitem_usr_id = _usr_id
      AND todoitem_status != ''C'';

    UPDATE todoitem
    SET todoitem_seq=_currseq + _howFar
    WHERE todoitem_id = ptodoItemId;

    RETURN 0;
  END;
' LANGUAGE 'plpgsql';

