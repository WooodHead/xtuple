
CREATE OR REPLACE FUNCTION firstLine(TEXT) RETURNS TEXT IMMUTABLE AS '
DECLARE
  pSource ALIAS FOR $1;
  _result TEXT := '''';
  _cursor INTEGER := 1;
  _state INTEGER := 0;
  _length INTEGER;
  _character TEXT;

  _position INTEGER;

BEGIN

  _length := LENGTH(pSource);

  WHILE ( (_state <> 2) AND (_cursor <= _length) ) LOOP
    _character := substr(pSource, _cursor, 1);

    IF (_state = 0) THEN
      IF (_character NOT IN  (''\n'', '' '')) THEN
        _state := 1;
        _result = (_result || _character);
      END IF;

    ELSIF (_state = 1) THEN
      IF (_character = ''\n'') THEN
        _state := 2;
      ELSE
        _result = (_result || _character);
      END IF;
    END IF;

    _cursor := (_cursor + 1);

  END LOOP;

  RETURN _result;

END;
' LANGUAGE 'plpgsql';

