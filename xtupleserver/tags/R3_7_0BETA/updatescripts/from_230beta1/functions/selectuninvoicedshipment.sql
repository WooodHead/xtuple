CREATE OR REPLACE FUNCTION selectUninvoicedShipment(INTEGER) RETURNS INTEGER AS '
DECLARE
  pCosmiscid ALIAS FOR $1;
  _cobmiscid INTEGER;
  _r RECORD;
  _cobillid INTEGER;
  _taxtypeid INTEGER := NULL;
  _taxid INTEGER := NULL;
  _pcnta NUMERIC := 0.0;
  _pcntb NUMERIC := 0.0;
  _pcntc NUMERIC := 0.0;
BEGIN

--  Grab all of the uninvoiced coship records
  FOR _r IN SELECT cohead_id, coitem_id, SUM(coship_qty) AS qty,
                   coitem_price, coitem_price_invuomratio AS invpricerat, coitem_qty_invuomratio, item_id,
                   ( ((coitem_qtyord - coitem_qtyshipped + coitem_qtyreturned) <= 0)
                    OR (NOT cust_partialship) ) AS toclose, coitem_tax_id
            FROM cosmisc, coship, coitem, cohead, custinfo, itemsite, item
            WHERE ( (coship_cosmisc_id=cosmisc_id)
             AND (coship_coitem_id=coitem_id)
             AND (coitem_cohead_id=cohead_id)
             AND (cosmisc_shipped)
             AND (NOT coship_invoiced)
             AND (coitem_itemsite_id=itemsite_id)
             AND (itemsite_item_id=item_id)
             AND (cohead_cust_id=cust_id)
             AND (cosmisc_id=pCosmiscid) )
            GROUP BY cohead_id, coitem_id, cust_partialship, coitem_tax_id,
                     coitem_qtyord, coitem_qtyshipped, coitem_qtyreturned,
                     coitem_price, invpricerat, coitem_qty_invuomratio, item_id LOOP

--  Check to see if a cobmisc head exists for this cohead
    SELECT createBillingHeader(_r.cohead_id) INTO _cobmiscid;

    SELECT cobill_id INTO _cobillid
      FROM cobill, cobmisc, coitem
     WHERE ((cobill_cobmisc_id=cobmisc_id)
       AND  (cobmisc_cohead_id=coitem_cohead_id)
       AND  (cobill_coitem_id=coitem_id)
       AND  (NOT cobmisc_posted)
       AND  (cobill_cobmisc_id=_cobmiscid)
       AND  (coitem_id=_r.coitem_id))
     LIMIT 1;
    IF (FOUND) THEN
      UPDATE cobill
         SET cobill_selectdate = CURRENT_DATE,
             cobill_select_username = CURRENT_USER,
             cobill_qty = cobill_qty + _r.qty,
             cobill_toclose = _r.toclose,
             cobill_tax_ratea = calculateTax(cobill_tax_id, round(((cobill_qty + _r.qty) * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''A''),
             cobill_tax_rateb = calculateTax(cobill_tax_id, round(((cobill_qty + _r.qty) * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''B''),
             cobill_tax_ratec = calculateTax(cobill_tax_id, round(((cobill_qty + _r.qty) * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''C'')
       WHERE (cobill_id=_cobillid);
    ELSE
--  Now insert the cobill line
      _taxid := NULL;
      SELECT getItemTaxType(_r.item_id, cobmisc_taxauth_id) INTO _taxtypeid
        FROM cobmisc
       WHERE (cobmisc_id=_cobmiscid);
--      IF (_taxtypeid IS NOT NULL) THEN
--        SELECT getTaxSelection(cobmisc_taxauth_id, _taxtypeid) INTO _taxid
--          FROM cobmisc
--         WHERE (cobmisc_id=_cobmiscid);
        _taxid := _r.coitem_tax_id;
        SELECT tax_ratea, tax_rateb, tax_ratec
          INTO _pcnta, _pcntb, _pcntc
          FROM tax
         WHERE (tax_id=_taxid);
--      END IF;
      INSERT INTO cobill
      ( cobill_cobmisc_id, cobill_coitem_id,
        cobill_selectdate, cobill_select_username,
        cobill_qty, cobill_toclose,
        cobill_tax_id, cobill_taxtype_id,
        cobill_tax_pcta, cobill_tax_pctb, cobill_tax_pctc,
        cobill_tax_ratea, cobill_tax_rateb, cobill_tax_ratec )
      VALUES
      ( _cobmiscid, _r.coitem_id,
        CURRENT_DATE, CURRENT_USER,
        _r.qty, _r.toclose,
        _taxid, _taxtypeid,
        _pcnta, _pcntb, _pcntc,
        calculateTax(_taxid, round((_r.qty * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''A''),
        calculateTax(_taxid, round((_r.qty * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''B''),
        calculateTax(_taxid, round((_r.qty * _r.coitem_qty_invuomratio) * (_r.coitem_price / _r.invpricerat), 2), 0.0, ''C'') );
    END IF;

  END LOOP;

  RETURN _cobmiscid;

END;
' LANGUAGE 'plpgsql';
