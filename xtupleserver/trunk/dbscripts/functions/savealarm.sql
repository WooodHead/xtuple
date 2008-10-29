CREATE OR REPLACE FUNCTION saveAlarm(int,text,text,timestamp,int,text,text,text,int,text) RETURNS INTEGER AS '
DECLARE
  pAlarmId ALIAS FOR $1;
  pAlarmNumber ALIAS FOR $2;
  pType ALIAS FOR $3;
  pTime ALIAS FOR $4;
  pOffset ALIAS FOR $5;
  pQualifier ALIAS FOR $6;
  pRecipient ALIAS FOR $7;
  pSource ALIAS FOR $8;
  pSourceId ALIAS FOR $9;
  pFlag ALIAS FOR $10;
  _alarmId INTEGER;
  _alarmNumber TEXT;
  _alarmTime TIMESTAMP;
  _alarmInterval INTERVAL;
  _alarmTrigger TIMESTAMP;
  _isNew BOOLEAN;
  _flag TEXT;
  _alarmCount INTEGER := 0;
  _debug BOOLEAN := false;

BEGIN
  IF (_debug) THEN
    RAISE NOTICE ''pAlarmId = %'', pAlarmId;
    RAISE NOTICE ''pAlarmNumber = %'', pAlarmNumber;
    RAISE NOTICE ''pType = %'', pType;
    RAISE NOTICE ''pTime = %'', pTime;
    RAISE NOTICE ''pOffset = %'', pOffset;
    RAISE NOTICE ''pQualifier = %'', pQualifier;
    RAISE NOTICE ''pRecipient = %'', pRecipient;
    RAISE NOTICE ''pSource = %'', pSource;
    RAISE NOTICE ''pSourceId = %'', pSourceId;
    RAISE NOTICE ''pFlag = %'', pFlag;
  END IF;
  --Validate
  IF ((pFlag IS NULL) OR (pFlag = '''') OR (pFlag = ''CHECK'') OR (pFlag = ''CHANGEONE'') OR (pFlag = ''CHANGEALL'')) THEN
    IF (pFlag='''') THEN
      _flag := ''CHECK'';
    ELSE
      _flag := COALESCE(pFlag,''CHECK'');
    END IF;
  ELSE
	RAISE EXCEPTION ''Invalid Flag (%). Valid flags are CHECK, CHANGEONE or CHANGEALL'', pFlag;
  END IF;
  
  --If there is nothing here get out
  IF ( (pAlarmId IS NULL OR pAlarmId = -1)
	AND (pOffset IS NULL)
        AND (pSourceId IS NULL)
	AND (COALESCE(pType, '''') = '''')
	AND (COALESCE(pQualifier, '''') = '''')
	AND (COALESCE(pRecipient, '''') = '''')
	AND (COALESCE(pSource, '''') = '''') ) THEN
	
	RETURN NULL;

  END IF;
  
  IF (pAlarmId IS NULL OR pAlarmId = -1) THEN 
    _isNew := true;
    _alarmId := nextval(''alarm_alarm_id_seq'');
    _alarmNumber := fetchNextNumber(''AlarmNumber'');
  ELSE
    SELECT COUNT(alarm_id) INTO _alarmCount
      FROM alarm
      WHERE ((alarm_id=pAlarmId)
      AND (alarm_source=pSource)
      AND (alarm_source_id=pSourceId));

    -- ask whether new or update if name changes
    -- but only if this isn''t a new record with a pre-allocated id
    IF (_alarmCount < 1 AND _flag = ''CHECK'') THEN
      IF (EXISTS(SELECT alarm_id
                 FROM alarm
                 WHERE (alarm_id=pAlarmId))) THEN
        RETURN -10;
      ELSE
        _isNew := true;
        _alarmNumber := fetchNextNumber(''AlarmNumber'');
      END IF;
    ELSIF (_flag = ''CHANGEONE'') THEN
      _isNew := true;
      _alarmId := nextval(''alarm_alarm_id_seq'');
      _alarmNumber := fetchNextNumber(''AlarmNumber'');
    END IF;
  END IF;

  _alarmNumber := COALESCE(_alarmNumber,pAlarmNumber,fetchNextNumber(''AlarmNumber''));

  _alarmTime := COALESCE(pTime, CURRENT_DATE);
  IF (COALESCE(pOffset, 0) > 0) THEN
    _alarmInterval := CASE WHEN (pQualifier IN (''MB'', ''MA'')) THEN CAST(pOffset AS TEXT) || '' minutes''
                           WHEN (pQualifier IN (''HB'', ''HA'')) THEN CAST(pOffset AS TEXT) || '' hours''
                           WHEN (pQualifier IN (''DB'', ''DA'')) THEN CAST(pOffset AS TEXT) || '' days''
                           ELSE ''''
                     END;
    _alarmTrigger := CASE WHEN (pQualifier IN (''MB'', ''HB'', ''DB'')) THEN _alarmTime - _alarmInterval 
                          WHEN (pQualifier IN (''MA'', ''HA'', ''DA'')) THEN _alarmTime + _alarmInterval
                          ELSE _alarmTime
                     END; 
  ELSE
    _alarmTrigger := _alarmTime;
  END IF;

  IF (_isNew) THEN
    _alarmId := COALESCE(_alarmId,pAlarmId,nextval(''alarm_alarm_id_seq''));
 
    INSERT INTO alarm (
      alarm_id,alarm_number,
      alarm_type, alarm_trigger,
      alarm_time, alarm_time_offset, alarm_time_qualifier,
      alarm_creator, alarm_recipient,
      alarm_source, alarm_source_id )
    VALUES (
      _alarmId, _alarmNumber,
      pType, _alarmTrigger,
      _alarmTime, pOffset, pQualifier,
      CURRENT_USER, pRecipient,
      pSource, pSourceId );

    RETURN _alarmId;

  ELSE
    UPDATE alarm SET
      alarm_number=_alarmNumber,
      alarm_type=COALESCE(pType, alarm_type),
      alarm_trigger=_alarmTrigger,
      alarm_time=_alarmTime,
      alarm_time_offset=COALESCE(pOffset, alarm_time_offset),
      alarm_time_qualifier=COALESCE(pQualifier, alarm_time_qualifier),
      alarm_recipient=COALESCE(pRecipient, alarm_recipient)
    WHERE (alarm_id=pAlarmId);
    
    RETURN pAlarmId;

  END IF;
END;
' LANGUAGE 'plpgsql';

