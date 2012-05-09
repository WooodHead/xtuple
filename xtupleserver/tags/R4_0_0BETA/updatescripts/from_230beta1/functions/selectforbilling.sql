CREATE OR REPLACE FUNCTION selectForBilling(INTEGER, NUMERIC, BOOLEAN) RETURNS INTEGER AS '
  DECLARE
    pSoitemid	ALIAS FOR $1;
    pQty	ALIAS FOR $2;
    pClose	ALIAS FOR $3;
    _itemid	INTEGER := NULL;
    _taxauthid	INTEGER := NULL;
    _taxid	INTEGER := NULL;
    _taxtypeid	INTEGER := NULL;

  BEGIN
    SELECT cobmisc_taxauth_id, coitem_tax_id, item_id INTO _taxauthid, _taxid, _itemid
      FROM cobmisc, coitem, itemsite, item
     WHERE ( (cobmisc_cohead_id=coitem_cohead_id)
       AND   (NOT cobmisc_posted)
       AND   (coitem_itemsite_id=itemsite_id)
       AND   (itemsite_item_id=item_id)
       AND   (coitem_id=pSoitemid) )
     LIMIT 1;

    _taxtypeid := getItemTaxType(_itemid, _taxauthid);
    --IF (_taxtypeid IS NOT NULL) THEN
    --  _taxid := getTaxSelection(_taxauthid, _taxtypeid);
    --END IF;
    RETURN selectForBilling(pSoitemid, pQty, pClose, _taxtypeid, _taxid);
  END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION selectForBilling(INTEGER, NUMERIC, BOOLEAN, INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pSoitemid	ALIAS FOR $1;
  pQty		ALIAS FOR $2;
  pClose	ALIAS FOR $3;
  ptaxtypeid	ALIAS FOR $4;
  ptaxid	ALIAS FOR $5;

  _cobillid INTEGER;
  _r RECORD;
  _pcnta NUMERIC := 0.0;
  _pcntb NUMERIC := 0.0;
  _pcntc NUMERIC := 0.0;
BEGIN

-- Get some information
  SELECT cobmisc_id, cobmisc_taxauth_id,
         coitem_id, coitem_price,
         coitem_price_invuomratio AS invpricerat, coitem_qty_invuomratio, item_id
    INTO _r
    FROM cobmisc, coitem, itemsite, item
   WHERE ( (cobmisc_cohead_id=coitem_cohead_id)
     AND   (NOT cobmisc_posted)
     AND   (coitem_itemsite_id=itemsite_id)
     AND   (itemsite_item_id=item_id)
     AND   (coitem_id=pSoitemid) )
   LIMIT 1;

-- check to make sure the qty to bill for is not less than
-- the total un-invoiced shipped amount
  IF ( (SELECT (pQty < SUM(coship_qty))
        FROM coship, cosmisc, coitem
        WHERE ( (coship_cosmisc_id=cosmisc_id)
         AND (cosmisc_cohead_id=coitem_cohead_id)
         AND (coship_coitem_id=coitem_id)
         AND (cosmisc_shipped)
         AND (NOT coship_invoiced)
         AND (coitem_id=pSoitemid) ) ) ) THEN
    RETURN -1;
  END IF;

  SELECT cobill_id INTO _cobillid
  FROM cobill, cobmisc, coitem
  WHERE ( (cobill_cobmisc_id=cobmisc_id)
   AND (cobmisc_cohead_id=coitem_cohead_id)
   AND (cobill_coitem_id=coitem_id)
   AND (NOT cobmisc_posted)
   AND (coitem_id=pSoitemid) );

  IF (FOUND) THEN
    UPDATE cobill
    SET cobill_selectdate=CURRENT_DATE,
        cobill_select_username=CURRENT_USER,
        cobill_qty=pQty, cobill_toclose=pClose,
	cobill_taxtype_id=ptaxtypeid,	cobill_tax_id=ptaxid,
        cobill_tax_ratea = calculateTax(ptaxid, round((pQty * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''A''),
        cobill_tax_rateb = calculateTax(ptaxid, round((pQty * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''B''),
        cobill_tax_ratec = calculateTax(ptaxid, round((pQty * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''C'')
    WHERE (cobill_id=_cobillid);

  ELSE
    SELECT tax_ratea, tax_rateb, tax_ratec
      INTO _pcnta, _pcntb, _pcntc
      FROM tax
     WHERE (tax_id=ptaxid);

    SELECT NEXTVAL(''cobill_cobill_id_seq'') INTO _cobillid;
    INSERT INTO cobill
    ( cobill_id, cobill_coitem_id, cobill_cobmisc_id,
      cobill_selectdate, cobill_select_username,
      cobill_qty, cobill_toclose,
      cobill_tax_id, cobill_taxtype_id,
      cobill_tax_pcta, cobill_tax_pctb, cobill_tax_pctc,
      cobill_tax_ratea, cobill_tax_rateb, cobill_tax_ratec )
    VALUES
    ( _cobillid, _r.coitem_id, _r.cobmisc_id,
      CURRENT_DATE, CURRENT_USER,
      pQty, pClose,
      ptaxid, ptaxtypeid,
      _pcnta, _pcntb, _pcntc,
      calculateTax(ptaxid, round((pQty * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''A''),
      calculateTax(ptaxid, round((pQty * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''B''),
      calculateTax(ptaxid, round((pQty * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''C'') );
  END IF;

  RETURN _cobillid;

END;
' LANGUAGE 'plpgsql';
