
CREATE OR REPLACE FUNCTION unWoClockOut(INTEGER) RETURNS INTEGER AS '
DECLARE
  pWotcid	ALIAS FOR $1;
  _wotc_timein	TIMESTAMP WITH TIME ZONE;

BEGIN
  SELECT wotc_timein INTO _wotc_timein
  FROM wotc
  WHERE (wotc_id=pWotcid);

  IF (NOT FOUND) THEN
    RETURN -1;
  ELSIF (_wotc_timein IS NULL) THEN	-- clocked out without ever clocking in
    DELETE FROM wotc WHERE (wotc_id=pWotcid);
  ELSE
    UPDATE wotc
    SET wotc_timeout=NULL
    WHERE (wotc_id=pWotcid);
  END IF;

  RETURN pWotcid;
END;
' LANGUAGE 'plpgsql';
