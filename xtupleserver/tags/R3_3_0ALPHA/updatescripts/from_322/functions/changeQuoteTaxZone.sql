CREATE OR REPLACE FUNCTION changequotetaxzone(integer, integer)
  RETURNS integer AS
$BODY$
  DECLARE
    pquheadId		ALIAS FOR $1;
    pTaxzoneId		ALIAS FOR $2;
    _taxzoneid		INTEGER;
    

  BEGIN
    SELECT quhead_taxzone_id
	     INTO _taxzoneid
    FROM quhead LEFT OUTER JOIN taxzone ON (quhead_taxzone_id=taxzone_id)
    WHERE (quhead_id=pquheadId);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxzoneid = pTaxzoneId) THEN
      RETURN pquheadId;
    END IF;

    IF (pTaxzoneId < 0) THEN
      _taxzoneid = NULL;
    ELSE
      _taxzoneid = pTaxzoneId;
    END IF;

    IF (_taxzoneid IS NULL) THEN
      UPDATE quhead SET quhead_taxzone_id=NULL
      WHERE quhead_id=pquheadId;
  
    ELSE 
      UPDATE quhead SET quhead_taxzone_id=_taxzoneid
      WHERE quhead_id=pquheadId;
    END IF;

    RETURN pquheadId;
  END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;