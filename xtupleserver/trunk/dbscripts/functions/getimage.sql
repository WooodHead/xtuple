CREATE OR REPLACE FUNCTION getImageId(text) RETURNS INTEGER AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pImage ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  IF (pImage IS NULL) THEN
	RETURN NULL;
  END IF;

  SELECT image_id INTO _returnVal
  FROM image
  WHERE (image_name=pImage);

  IF (_returnVal IS NULL) THEN
	RAISE EXCEPTION ''Image % not found.'', pImage;
  END IF;

  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
