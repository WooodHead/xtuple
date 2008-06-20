BEGIN;
CREATE FUNCTION patchDataFor6925() RETURNS INTEGER AS '
DECLARE
  _count        INTEGER := 0;
  _result       INTEGER;
  _r            RECORD;
BEGIN
  FOR _r IN SELECT cntct_id
            FROM cntct
            WHERE COALESCE(cntct_first_name, '''') = ''''
              AND COALESCE(cntct_last_name, '''') = ''''
              AND COALESCE(cntct_honorific, '''') = ''''
              AND COALESCE(cntct_phone, '''') = ''''
              AND COALESCE(cntct_phone2, '''') = ''''
              AND COALESCE(cntct_fax, '''') = ''''
              AND COALESCE(cntct_email, '''') = ''''
              AND COALESCE(cntct_webaddr, '''') = ''''
              AND COALESCE(cntct_initials, '''') = ''''
              AND COALESCE(cntct_notes, '''') = ''''
              AND COALESCE(cntct_title, '''') = '''' LOOP

    UPDATE crmAcct SET crmacct_cntct_id_1 = NULL
      WHERE crmacct_cntct_id_1=_r.cntct_id;
    UPDATE crmAcct SET crmacct_cntct_id_2 = NULL
      WHERE crmacct_cntct_id_2=_r.cntct_id;
    UPDATE custinfo SET cust_cntct_id = NULL
      WHERE cust_cntct_id=_r.cntct_id;
    UPDATE custinfo SET cust_corrcntct_id = NULL
      WHERE cust_corrcntct_id=_r.cntct_id;
    UPDATE vendinfo SET vend_cntct1_id = NULL
      WHERE vend_cntct1_id=_r.cntct_id;
    UPDATE vendinfo SET vend_cntct2_id = NULL
      WHERE vend_cntct2_id=_r.cntct_id;
    UPDATE shiptoinfo SET shipto_cntct_id = NULL
      WHERE shipto_cntct_id=_r.cntct_id;
    UPDATE vendaddrinfo SET vendaddr_cntct_id = NULL
      WHERE vendaddr_cntct_id=_r.cntct_id;
    UPDATE whsinfo SET warehous_cntct_id = NULL
      WHERE warehous_cntct_id=_r.cntct_id;
    UPDATE prospect SET prospect_cntct_id = NULL
      WHERE prospect_cntct_id=_r.cntct_id;

    _result := deleteContact(_r.cntct_id);
    IF (_result < 0) THEN
      RAISE NOTICE ''deleteContact(%) returned %'', _r.cntct_id, _result;
    END IF;

    _count := _count + 1;
  END LOOP;

  RETURN _count;
END;
' LANGUAGE 'plpgsql';

SELECT patchDataFor6925();
DROP FUNCTION patchDataFor6925();

COMMIT;
