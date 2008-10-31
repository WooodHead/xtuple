
CREATE OR REPLACE FUNCTION hasAlarms() RETURNS BOOLEAN AS $$
DECLARE
  _whsId INTEGER := -1;
  _fromEmail TEXT := '';
  _batchId INTEGER := -1;
  _msgId INTEGER;
  _alarm RECORD;
  _todoitem RECORD;
  _recipient TEXT;
  _recipientPart INTEGER;
  _returnVal BOOLEAN := FALSE;
BEGIN

  FOR _alarm IN SELECT * FROM alarm
  WHERE ( (alarm_creator=CURRENT_USER)
   AND (CURRENT_TIMESTAMP > alarm_trigger) ) LOOP
    _returnVal := TRUE;
    IF (_alarm.alarm_event) THEN
-- Event alarm
-- Loop thru the event recipients
      _recipientPart := 1;
      LOOP
        _recipient := SPLIT_PART(_alarm.alarm_event_recipient, ',', _recipientPart);
        IF (LENGTH(_recipient) = 0) THEN
          EXIT;
        END IF;
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
        _recipientPart := _recipientPart + 1;
      END LOOP;
    END IF;
    IF (_alarm.alarm_email) THEN
-- Email alarm
-- Loop thru the email recipients
      _recipientPart := 1;
      LOOP
        _recipient := SPLIT_PART(_alarm.alarm_email_recipient, ',', _recipientPart);
        IF (LENGTH(_recipient) = 0) THEN
          EXIT;
        END IF;
-- Find the email address for the creator
        SELECT usr_email INTO _fromEmail
        FROM usr
        WHERE (usr_username = _alarm.alarm_creator);
        IF (_alarm.alarm_source = 'TODO') THEN
          SELECT * INTO _todoitem
          FROM todoitem
          WHERE (todoitem_id = _alarm.alarm_source_id);
          SELECT submitReportToBatch('TodoItem', _fromEmail, _recipient, '', _todoitem.todoitem_name,
                                     'Alarm reminder for To-Do Item.  Please see attached for details.',
                                     'TODOALARM', CURRENT_TIMESTAMP, FALSE) INTO _batchId;
          INSERT INTO batchparam
                      (batchparam_batch_id, batchparam_order, batchparam_name, batchparam_value)
                 VALUES 
                      (_batchId, 1, 'todoitem_id', _todoitem.todoitem_id);
        END IF;
        _recipientPart := _recipientPart + 1;
      END LOOP;
    END IF;
    IF (_alarm.alarm_sysmsg) THEN
-- System Message alarm
-- Loop thru the sysmsg recipients
      _recipientPart := 1;
      LOOP
        _recipient := SPLIT_PART(_alarm.alarm_sysmsg_recipient, ',', _recipientPart);
        IF (LENGTH(_recipient) = 0) THEN
          EXIT;
        END IF;
        IF (_alarm.alarm_source = 'TODO') THEN
          SELECT * INTO _todoitem
          FROM todoitem
          WHERE (todoitem_id = _alarm.alarm_source_id);
          SELECT postMessage(_recipient, ('ToDo - ' || _todoitem.todoitem_name)) INTO _msgId;
        END IF;
        _recipientPart := _recipientPart + 1;
      END LOOP;
    END IF;
-- Delete alarm
    DELETE FROM alarm WHERE alarm_id=_alarm.alarm_id;
  END LOOP;
  RETURN _returnVal;

END;
$$ LANGUAGE 'plpgsql';

