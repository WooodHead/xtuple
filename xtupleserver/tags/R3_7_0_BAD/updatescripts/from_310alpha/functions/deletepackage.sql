CREATE OR REPLACE FUNCTION deletePackage(INTEGER) RETURNS INTEGER AS '
DECLARE
  ppkgheadid    ALIAS FOR $1;

BEGIN

  IF (EXISTS(SELECT *
             FROM pkgdep
             WHERE (pkgdep_parent_pkghead_id=ppkgheadid))) THEN
    RETURN -1;
  END IF;

  DELETE FROM pkghead
  WHERE (pkghead_id=ppkgheadid);

  RETURN ppkgheadid;

END;
' LANGUAGE 'plpgsql';
