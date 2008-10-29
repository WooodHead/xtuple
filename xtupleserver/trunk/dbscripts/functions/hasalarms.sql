
CREATE OR REPLACE FUNCTION hasAlarms() RETURNS BOOLEAN AS $$
DECLARE
  _whsId INTEGER := -1;
  _fromEmail TEXT := '';
  _batchId INTEGER := -1;
  _alarm RECORD;
  _todoitem RECORD;
  _recipient TEXT;
  _recipientPart INTEGER := 1;
  _returnVal BOOLEAN := FALSE;
BEGIN

  FOR _alarm IN SELECT * FROM alarm
  WHERE ( (alarm_creator=CURRENT_USER)
   AND (CURRENT_TIMESTAMP > alarm_trigger) ) LOOP
    _returnVal := TRUE;
-- Loop thru the recipients
    LOOP
      _recipient := SPLIT_PART(_alarm.alarm_recipient, ',', _recipientPart);
      IF (LENGTH(_recipient) = 0) THEN
        EXIT;
      END IF;
      IF (_alarm.alarm_type = 'V') THEN
-- Event alarm
-- Find the warehouse for the recipient
        SELECT usrpref_value  INTO _whsId
        FROM usrpref
        WHERE ( (usrpref_username = _recipient)
          AND   (usrpref_name = 'PreferredWarehouse') );
        IF (_alarm.alarm_source = 'TODO') THEN
          INSERT INTO evntlog ( evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
                                evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id, evntlog_number )
          SELECT CURRENT_TIMESTAMP, _recipient, evnttype_id,
                 'T', todoitem_id, _whsId, todoitem_name
          FROM evnttype, todoitem
          WHERE ( (todoitem_id=_alarm.alarm_source_id)
            AND   (evnttype_name='TodoAlarm') );
        END IF;
      ELSE IF (_alarm.alarm_type = 'M') THEN
-- Email alarm
-- Find the email address for the creator
          SELECT usr_email INTO _fromEmail
          FROM usr
          WHERE (usr_username = _alarm.alarm_creator);
          SELECT * INTO _todoitem
          FROM todoitem
          WHERE (todoitem_id = _alarm.alarm_source_id);
          IF (_alarm.alarm_source = 'TODO') THEN
            SELECT submitReportToBatch('TodoItem', _fromEmail, _recipient, '', _todoitem.todoitem_name,
                                       'Alarm reminder for To-Do Item.  Please see attached for details.',
                                       'TODOALARM', CURRENT_TIMESTAMP, FALSE) INTO _batchId;
            INSERT INTO batchparam
                        (batchparam_batch_id, batchparam_order, batchparam_name, batchparam_value)
                   VALUES 
                        (_batchId, 1, 'todoitem_id', _todoitem.todoitem_id);
          END IF;
        END IF;
      END IF;
      _recipientPart := _recipientPart + 1;
    END LOOP;
-- Delete alarm
    DELETE FROM alarm WHERE alarm_id=_alarm.alarm_id;
  END LOOP;
  RETURN _returnVal;

END;
$$ LANGUAGE 'plpgsql';

