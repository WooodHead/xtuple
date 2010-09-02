
CREATE OR REPLACE FUNCTION detag(TEXT) RETURNS TEXT AS '
DECLARE
  pSource ALIAS FOR $1;
  _result TEXT := '''';
  _cursor INTEGER := 1;
  _state INTEGER := 0;
  _length INTEGER;
  _character TEXT;

BEGIN

  _length := LENGTH(pSource);

  WHILE (_cursor <= _length) LOOP
    _character := substr(pSource, _cursor, 1);

    IF (_state = 0) THEN
      IF (_character = ''<'') THEN
        _state := 1;
      ELSE
        _result = (_result || _character);
      END IF;

    ELSIF (_state = 1) THEN
      IF (_character = ''>'') THEN
        _state := 0;
      END IF;
    END IF;

    _cursor := (_cursor + 1);

  END LOOP;

  RETURN _result;

END;
' LANGUAGE 'plpgsql';

