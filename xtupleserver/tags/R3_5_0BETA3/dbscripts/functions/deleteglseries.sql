
CREATE OR REPLACE FUNCTION deleteGLSeries(INTEGER) RETURNS INTEGER AS '
DECLARE
  pSequence ALIAS FOR $1;

BEGIN

  DELETE FROM glseries
  WHERE (glseries_sequence=pSequence);

  RETURN pSequence;

END;
' LANGUAGE 'plpgsql';

