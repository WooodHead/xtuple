CREATE OR REPLACE FUNCTION deleteVendor(INTEGER) RETURNS INTEGER  AS '
DECLARE
  pVendid ALIAS FOR $1;
  _test INTEGER;

BEGIN

--  Check to see if the passed vendor is used in pohead
  SELECT pohead_id INTO _test
  FROM pohead
  WHERE (pohead_vend_id=pVendid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -1;
  END IF;

--  Check to see if the passed vendor has any receiving history posted against it
  SELECT recv_vend_id INTO _test
  FROM recv
  WHERE (recv_vend_id=pVendid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -2;
  END IF;

--  Check to see if the passed vendor has any return history posted against it
  SELECT poreject_vend_id INTO _test
  FROM poreject
  WHERE (poreject_vend_id=pVendid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -3;
  END IF;

--  Check to see if the passed vendor has any vouchers
  SELECT vohead_vend_id INTO _test
    FROM vohead
   WHERE (vohead_vend_id=pVendid)
   LIMIT 1;
   IF (FOUND) THEN
     RETURN -4;
   END IF;

--  Check to see if the passed vendor has any apopen items
  SELECT apopen_vend_id INTO _test
    FROM apopen
   WHERE (apopen_vend_id=pVendid)
   LIMIT 1;
   IF (FOUND) THEN
     RETURN -5;
   END IF;

--  Check to see if the passed vendor has any apapply items
  SELECT apapply_vend_id INTO _test
    FROM apapply
   WHERE (apapply_vend_id=pVendid)
   LIMIT 1;
   IF (FOUND) THEN
     RETURN -6;
   END IF;

--  Check to see if the passed vendor has any checkhead items
  SELECT checkhead_recip_id INTO _test
    FROM checkhead
   WHERE ((checkhead_recip_id=pVendid)
     AND  (checkhead_recip_type=''V''))
   LIMIT 1;
   IF (FOUND) THEN
     RETURN -7;
   END IF;

--  Delete the passed vendor and any support
  DELETE FROM itemsrcp
  WHERE (itemsrcp_id IN ( SELECT itemsrcp_id
                          FROM itemsrcp, itemsrc
                          WHERE ( (itemsrcp_itemsrc_id=itemsrc_id)
                           AND (itemsrc_vend_id=pVendid) ) ) );

  DELETE FROM taxreg
   WHERE ((taxreg_rel_type=''V'')
     AND  (taxreg_rel_id=pVendid));

  DELETE FROM itemsrc
  WHERE (itemsrc_vend_id=pVendid);

  DELETE FROM vendaddrinfo
  WHERE (vendaddr_vend_id=pVendid);

  UPDATE crmacct SET crmacct_vend_id = NULL
  WHERE (crmacct_vend_id = pVendid);

  DELETE FROM vendinfo
  WHERE (vend_id=pVendid);

  RETURN 0;

END;
' LANGUAGE 'plpgsql';
