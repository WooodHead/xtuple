CREATE OR REPLACE FUNCTION fetchCRMAccountNumber() RETURNS INTEGER AS $$
DECLARE
  _accountNumber INTEGER;
  _test INTEGER;

BEGIN

  LOOP

    SELECT COALESCE(orderseq_number,0) INTO _accountNumber
      FROM orderseq
     WHERE (orderseq_name='CRMAccountNumber');

    UPDATE orderseq
       SET orderseq_number = (COALESCE(orderseq_number,0) + 1)
     WHERE (orderseq_name='CRMAccountNumber');

    SELECT id INTO _test
      FROM ( SELECT crmacct_id AS id
               FROM crmacct
              WHERE(crmacct_number=text(_accountNumber))
              UNION
             SELECT cust_id
               FROM custinfo
              WHERE (cust_number=text(_accountNumber))
              UNION
             SELECT prospect_id
               FROM prospect
              WHERE (prospect_number=text(_accountNumber))
              UNION
             SELECT vend_id
               FROM vendinfo
              WHERE (vend_number=text(_accountNumber))
              UNION
             SELECT taxauth_id
               FROM taxauth
              WHERE (taxauth_code=text(_accountNumber))
           ) AS data;

    IF (NOT FOUND) THEN
      EXIT;
    END IF;

  END LOOP;

  RETURN _accountNumber;

END;
$$ LANGUAGE 'plpgsql';

