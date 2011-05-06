CREATE OR REPLACE FUNCTION changesotaxzone(integer, integer)
  RETURNS integer AS
$BODY$
  DECLARE
    pcoheadId		ALIAS FOR $1;
    pTaxzoneId		ALIAS FOR $2;
    _taxzoneid		INTEGER;
    

  BEGIN
    SELECT cohead_taxzone_id 
	     INTO _taxzoneid
    FROM cohead LEFT OUTER JOIN taxzone ON (cohead_taxzone_id=taxzone_id)
    WHERE (cohead_id=pcoheadId);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxzoneid = pTaxzoneId) THEN
      RETURN pcoheadId;
    END IF;

    IF (pTaxzoneId < 0) THEN
      _taxzoneid = NULL;
    ELSE
      _taxzoneid = pTaxzoneId;
    END IF;

    IF (_taxzoneid IS NULL) THEN
      UPDATE cohead SET cohead_taxzone_id=NULL
      WHERE cohead_id=pcoheadId;

    ELSE 
      UPDATE cohead SET cohead_taxzone_id=_taxzoneid
      WHERE cohead_id=pcoheadId;
    END IF;

    RETURN pcoheadId;
  END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;