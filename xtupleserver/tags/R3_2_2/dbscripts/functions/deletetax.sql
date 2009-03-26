CREATE OR REPLACE FUNCTION deleteTax(INTEGER) RETURNS INTEGER AS '
DECLARE
  ptaxid	ALIAS FOR $1;
BEGIN
  -- these checks allow nice error reporting instead of throwing an SQL error
  IF EXISTS(SELECT taxsel_id FROM taxsel WHERE (taxsel_tax_id=ptaxid)) THEN
    RETURN -10;

  -- pohead? -11
  -- poitem? -12

  ELSEIF EXISTS(SELECT vohead_id
		FROM vohead
		WHERE ((vohead_adjtax_id=ptaxid)
		   OR (vohead_freighttax_id=ptaxid))) THEN
    RETURN -13;

  ELSEIF EXISTS(SELECT voitem_id FROM voitem WHERE (voitem_tax_id=ptaxid)) THEN
    RETURN -14;

  -- debit memo? -15
  -- debit memo item? -16
  -- quhead? -17

  ELSEIF EXISTS(SELECT quitem_id FROM quitem WHERE (quitem_tax_id=ptaxid)) THEN
    RETURN -18;

  -- cohead? -19
  ELSEIF EXISTS(SELECT coitem_id FROM coitem WHERE (coitem_tax_id=ptaxid)) THEN
    RETURN -20;

  ELSEIF EXISTS(SELECT cobmisc_id
		FROM cobmisc
		WHERE ((cobmisc_adjtax_id=ptaxid)
		   OR (cobmisc_freighttax_id=ptaxid))) THEN
    RETURN -21;

  ELSEIF EXISTS(SELECT cobill_id FROM cobill WHERE (cobill_tax_id=ptaxid)) THEN
    RETURN -22;

  ELSEIF EXISTS(SELECT invchead_id
		FROM invchead
		WHERE ((invchead_adjtax_id=ptaxid)
		   OR (invchead_freighttax_id=ptaxid))) THEN
    RETURN -23;

  ELSEIF EXISTS(SELECT invcitem_id FROM invcitem WHERE (invcitem_tax_id=ptaxid)) THEN
    RETURN -24;

  ELSEIF EXISTS(SELECT cmhead_id
	    FROM cmhead
	    WHERE ((cmhead_adjtax_id=ptaxid)
	       OR (cmhead_freighttax_id=ptaxid))) THEN
    RETURN -25;

  ELSEIF EXISTS(SELECT cmitem_id FROM cmitem WHERE (cmitem_tax_id=ptaxid)) THEN
    RETURN -26;

  END IF;

  DELETE FROM tax WHERE (tax_id=ptaxid);

  RETURN ptaxid;

END;
' LANGUAGE 'plpgsql';
