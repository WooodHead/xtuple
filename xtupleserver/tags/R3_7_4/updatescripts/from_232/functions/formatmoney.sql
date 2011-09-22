CREATE OR REPLACE FUNCTION formatMoney(NUMERIC) RETURNS TEXT IMMUTABLE AS '
DECLARE
  _fmt          TEXT := ''FM999G999G999G990D'';
  _counter      INTEGER;
  _scale        INTEGER;
BEGIN
  SELECT locale_curr_scale INTO _scale
  FROM locale, usr
  WHERE ((usr_locale_id=locale_id)
     AND (usr_username=CURRENT_USER));
  IF (NOT FOUND OR _scale IS NULL) THEN
    _scale := 2;
  END IF;

  FOR _counter IN 1 .. _scale LOOP
    _fmt := _fmt || ''0'';
  END LOOP;

  RETURN TO_CHAR(COALESCE($1, 0), _fmt);
END;' LANGUAGE 'plpgsql';
