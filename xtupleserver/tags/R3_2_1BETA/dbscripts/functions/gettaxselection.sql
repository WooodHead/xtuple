CREATE OR REPLACE FUNCTION getTaxSelection(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pTaxauthid ALIAS FOR $1;
  pTaxtypeid ALIAS FOR $2;
  _taxid INTEGER;

BEGIN
  IF( (COALESCE(pTaxauthid, -1) = -1) OR (COALESCE(pTaxtypeid,-1) = -1) ) THEN
    RETURN NULL;
  END IF;

  SELECT taxsel_tax_id
    INTO _taxid
    FROM taxsel
   WHERE ((taxsel_taxauth_id=pTaxauthid)
     AND  (taxsel_taxtype_id=pTaxtypeid));
  IF (NOT FOUND) THEN
    SELECT taxsel_tax_id
      INTO _taxid
      FROM taxsel
     WHERE ((taxsel_taxauth_id IS NULL)
       AND  (taxsel_taxtype_id=pTaxtypeid));
    IF (NOT FOUND) THEN
      SELECT taxsel_tax_id
        INTO _taxid
        FROM taxsel
       WHERE ((taxsel_taxauth_id=pTaxauthid)
         AND  (taxsel_taxtype_id IS NULL));
      IF (NOT FOUND) THEN
        SELECT taxsel_tax_id
          INTO _taxid
          FROM taxsel
         WHERE ((taxsel_taxauth_id IS NULL)
           AND  (taxsel_taxtype_id IS NULL));
        IF (NOT FOUND) THEN
          RETURN NULL;
        END IF;
      END IF;
    END IF;
  
  END IF;

  RETURN _taxid;
END;
' LANGUAGE 'plpgsql';
