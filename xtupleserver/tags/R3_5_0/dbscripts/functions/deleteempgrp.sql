CREATE OR REPLACE FUNCTION deleteEmpGrp(INTEGER) RETURNS INTEGER AS '
DECLARE
  pempgrpid ALIAS FOR $1;

BEGIN
  DELETE FROM empgrpitem WHERE (empgrpitem_empgrp_id=pempgrpid);
  DELETE FROM empgrp     WHERE (empgrp_id=pempgrpid);

  RETURN 0;
END;
' LANGUAGE 'plpgsql';
