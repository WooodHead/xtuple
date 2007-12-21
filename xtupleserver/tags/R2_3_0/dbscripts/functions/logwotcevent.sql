

CREATE OR REPLACE FUNCTION logWOTCEvent(INTEGER, INTEGER, TEXT) RETURNS INTEGER AS '
DECLARE
    pWoid	ALIAS FOR $1;
    pUsrid	ALIAS FOR $2;
    pEvntname	ALIAS FOR $3;
    _username	TEXT;

BEGIN
    SELECT usr_username INTO _username
    FROM usr
    WHERE usr_id = pUsrid;

    INSERT INTO evntlog
	( evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
	  evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id,
	  evntlog_number )
    SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
	   ''W'', wo_id, warehous_id,
	   (_username || ''/'' || wo_number)
    FROM wo, itemsite, warehous, evntnot, evnttype
    WHERE ((wo_id = pWoid)
      AND  (wo_itemsite_id = itemsite_id)
      AND  (itemsite_warehous_id=warehous_id)
      AND  (evntnot_evnttype_id=evnttype_id)
      AND  (evntnot_warehous_id=warehous_id)
      AND  (evnttype_name=pEvntname));

    RETURN 0;
END;
' LANGUAGE 'plpgsql';