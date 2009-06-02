BEGIN;

-- Populate taxzone column in documents

-- UPDATE asohist
UPDATE cmhead       SET cmhead_taxzone_id=cmhead_taxauth_id;
UPDATE cobmisc      SET cobmisc_taxzone_id=cobmisc_taxauth_id;
UPDATE cohead       SET cohead_taxzone_id=cohead_taxauth_id;
-- UPDATE cohist
UPDATE custinfo     SET cust_taxzone_id=cust_taxauth_id;
UPDATE invchead     SET invchead_taxzone_id=invchead_taxauth_id;
UPDATE itemtax      SET itemtax_taxzone_id=itemtax_taxauth_id;
UPDATE prospect     SET prospect_taxzone_id=prospect_taxauth_id;
-- UPDATE pohead
UPDATE quhead       SET quhead_taxzone_id=quhead_taxauth_id;
UPDATE shiptoinfo   SET shipto_taxzone_id=shipto_taxauth_id;
UPDATE taxreg       SET taxreg_taxzone_id = taxreg_taxauth_id;
UPDATE vendaddrinfo SET vendaddr_taxzone_id=vendaddr_taxauth_id;
UPDATE vendinfo     SET vend_taxzone_id=vend_taxauth_id;
UPDATE vohead       SET vohead_taxzone_id=vohead_taxauth_id;
UPDATE whsinfo      SET warehous_taxzone_id=warehous_taxauth_id;

-- Populate taxclass with legacy A, B, and C classes

DELETE FROM taxclass WHERE (taxclass_code IN ('1', '2', '3'));
INSERT INTO taxclass
  ( taxclass_code, taxclass_descrip, taxclass_sequence )
VALUES
  ( '1', 'Legacy Class 1', 0 ),
  ( '2', 'Legacy Class 2', 0 ),
  ( '3', 'Legacy Class 3', 0 );

-- Populate taxtype column in documents

-- UPDATE asohist
UPDATE cmhead SET cmhead_taxtype_id=getFreightTaxTypeId();
-- UPDATE cmitem
-- UPDATE cobill
UPDATE cobmisc SET cobmisc_taxtype_id=getFreightTaxTypeId();
UPDATE cohead SET cohead_taxtype_id=getFreightTaxTypeId();
UPDATE coitem SET coitem_taxtype_id=(SELECT getItemTaxType(itemsite_item_id, cohead_taxzone_id)
                                     FROM itemsite, cohead
                                     WHERE ( (itemsite_id=coitem_itemsite_id)
                                       AND   (cohead_id=coitem_cohead_id) ));
UPDATE invchead SET invchead_taxtype_id=getFreightTaxTypeId();
-- UPDATE invcitem
UPDATE pohead SET pohead_taxtype_id=getFreightTaxTypeId();
UPDATE poitem SET poitem_taxtype_id=(SELECT getItemTaxType(itemsite_item_id, pohead_taxzone_id)
                                     FROM itemsite, pohead
                                     WHERE ( (itemsite_id=poitem_itemsite_id)
                                       AND   (pohead_id=poitem_pohead_id) ));
UPDATE quhead SET quhead_taxtype_id=getFreightTaxTypeId();
UPDATE quitem SET quitem_taxtype_id=(SELECT getItemTaxType(itemsite_item_id, quhead_taxzone_id)
                                     FROM itemsite, quhead
                                     WHERE ( (itemsite_id=quitem_itemsite_id)
                                       AND   (quhead_id=quitem_quhead_id) ));
UPDATE vohead SET vohead_taxtype_id=getFreightTaxTypeId();
-- UPDATE voitem

-- Split legacy tax A,B,C rates into separate records

CREATE OR REPLACE FUNCTION fixTax() RETURNS INTEGER AS $$
DECLARE
  _r RECORD;
  _taxid INTEGER;
  _result INTEGER;

BEGIN

-- Clean tables
  DELETE FROM taxhist;
  DELETE FROM taxass;
  DELETE FROM taxrate;
  DELETE FROM tax WHERE (tax_taxclass_id IS NOT NULL);

-- Split legacy tax codes into A, B, C tax codes
  FOR _r IN SELECT * FROM obsolete_tax LOOP

-- A rate
    SELECT NEXTVAL('tax_tax_id_seq') INTO _taxid;
    INSERT INTO tax
      ( tax_id, tax_code, tax_descrip, tax_sales_accnt_id,
        tax_taxclass_id, tax_taxauth_id, tax_basis_tax_id )
    SELECT _taxid, (_r.tax_code || '-A'), _r.tax_descrip, _r.tax_sales_accnt_id,
           taxclass_id, NULL, NULL
    FROM taxclass
    WHERE (taxclass_code='1');

    INSERT INTO taxrate
      ( taxrate_tax_id, taxrate_percent, taxrate_curr_id,
        taxrate_amount, taxrate_effective, taxrate_expires )
    VALUES
      ( _taxid, _r.tax_ratea, baseCurrid(),
        0, '01/01/1970', '12/31/2100' );

    INSERT INTO taxass
      ( taxass_id, taxass_taxzone_id, taxass_taxtype_id, taxass_tax_id )
    SELECT taxsel_id, taxsel_taxauth_id, taxsel_taxtype_id, _taxid
    FROM taxsel
    WHERE (taxsel_tax_id=_r.tax_id);

    INSERT INTO asohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT asohist_id, asohist_taxtype_id, _taxid,
           COALESCE((asohist_qtyshipped * asohist_unitprice), 0), NULL, 0,
           COALESCE(asohist_tax_pcta, 0), 0, COALESCE(asohist_tax_ratea, 0),
           asohist_invcdate, asohist_invcdate
    FROM asohist
    WHERE (asohist_tax_id=_r.tax_id);

    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, cmhead_taxtype_id, _taxid,
           COALESCE(cmhead_freight, 0), NULL, 0,
           COALESCE(cmhead_freighttax_pcta, 0), 0, COALESCE(cmhead_freighttax_ratea, 0),
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE (cmhead_freighttax_id=_r.tax_id);

    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, cmhead_taxtype_id, _taxid,
           0, NULL, 0,
           COALESCE(cmhead_adjtax_pcta, 0), 0, COALESCE(cmhead_adjtax_ratea, 0),
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE (cmhead_adjtax_id=_r.tax_id);

    INSERT INTO cmitemtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmitem_id, cmitem_taxtype_id, _taxid,
           COALESCE(round((cmitem_qtycredit * cmitem_qty_invuomratio) * (cmitem_unitprice / cmitem_price_invuomratio), 2), 0), NULL, 0,
           COALESCE(cmitem_tax_pcta, 0), 0, COALESCE(cmitem_tax_ratea, 0),
           cmhead_docdate, cmhead_gldistdate
    FROM cmitem JOIN cmhead ON (cmhead_id=cmitem_cmhead_id)
    WHERE (cmitem_tax_id=_r.tax_id);

    INSERT INTO cobilltax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobill_id, cobill_taxtype_id, _taxid,
           COALESCE(round((cobill_qty * coitem_qty_invuomratio) * (coitem_price / coitem_price_invuomratio), 2), 0), NULL, 0,
           COALESCE(cobill_tax_pcta, 0), 0, COALESCE(cobill_tax_ratea, 0),
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobill JOIN cobmisc ON (cobmisc_id=cobill_cobmisc_id)
                JOIN coitem ON (coitem_id=cobill_coitem_id)
    WHERE (cobill_tax_id=_r.tax_id);

-- cobmisc_tax_ratea/b/c is a duplicate of freight
    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, cobmisc_taxtype_id, _taxid,
           COALESCE(cobmisc_freight, 0), NULL, 0,
           COALESCE(cobmisc_freighttax_pcta, 0), 0, COALESCE(cobmisc_freighttax_ratea, 0),
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE (cobmisc_freighttax_id=_r.tax_id);

-- Don't think cobmisc_adjtax_id is ever set
    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, cobmisc_taxtype_id, _taxid,
           0, NULL, 0,
           COALESCE(cobmisc_adjtax_pcta, 0), 0, COALESCE(cobmisc_adjtax_ratea, 0),
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE (cobmisc_adjtax_id=_r.tax_id);

    INSERT INTO cohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cohist_id, cohist_taxtype_id, _taxid,
           COALESCE((cohist_qtyshipped * cohist_unitprice), 0), NULL, 0,
           COALESCE(cohist_tax_pcta, 0), 0, COALESCE(cohist_tax_ratea, 0),
           cohist_invcdate, cohist_invcdate
    FROM cohist
    WHERE (cohist_tax_id=_r.tax_id);

    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, invchead_taxtype_id, _taxid,
           COALESCE(invchead_freight, 0), NULL, 0,
           COALESCE(invchead_freighttax_pcta, 0), 0, COALESCE(invchead_freighttax_ratea, 0),
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE (invchead_freighttax_id=_r.tax_id);

    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, invchead_taxtype_id, _taxid,
           0, NULL, 0,
           COALESCE(invchead_adjtax_pcta, 0), 0, COALESCE(invchead_adjtax_ratea, 0),
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE (invchead_adjtax_id=_r.tax_id);

    INSERT INTO invcitemtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invcitem_id, invcitem_taxtype_id, _taxid,
           COALESCE(round((invcitem_billed * invcitem_qty_invuomratio) * (invcitem_price / invcitem_price_invuomratio), 2), 0), NULL, 0,
           COALESCE(invcitem_tax_pcta, 0), 0, COALESCE(invcitem_tax_ratea, 0),
           invchead_invcdate, invchead_gldistdate
    FROM invcitem JOIN invchead ON (invchead_id=invcitem_invchead_id)
    WHERE (invcitem_tax_id=_r.tax_id);

-- vohead, voitem taxes not populated?
--    INSERT INTO voheadtax
--      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
--        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
--        taxhist_percent, taxhist_amount, taxhist_tax,
--        taxhist_docdate, taxhist_distdate )
--    SELECT vohead_id, vohead_taxtype_id, _taxid,
--           vohead_freight, NULL, 0,
--           vohead_freighttax_pcta, 0, vohead_freighttax_ratea,
--           vohead_docdate, vohead_gldistdate
--    FROM vohead
--    WHERE (vohead_freighttax_id=_r.tax_id);
--
--    INSERT INTO voheadtax
--      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
--        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
--        taxhist_percent, taxhist_amount, taxhist_tax,
--        taxhist_docdate, taxhist_distdate )
--    SELECT vohead_id, vohead_taxtype_id, _taxid,
--           0, NULL, 0,
--           vohead_adjtax_pcta, 0, vohead_adjtax_ratea,
--           vohead_docdate, vohead_gldistdate
--    FROM vohead
--    WHERE (vohead_adjtax_id=_r.tax_id);
--
--    INSERT INTO voitemtax
--      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
--        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
--        taxhist_percent, taxhist_amount, taxhist_tax,
--        taxhist_docdate, taxhist_distdate )
--    SELECT voitem_id, voitem_taxtype_id, _taxid,
--           (voitem_qty * poitem_unitprice), NULL, 0,
--           voitem_tax_pcta, 0, voitem_tax_ratea,
--           vohead_docdate, vohead_gldistdate
--    FROM voitem JOIN vohead ON (vohead_id=voitem_vohead_id)
--                JOIN poitem ON (poitem_id=voitem_poitem_id)
--    WHERE (voitem_tax_id=_r.tax_id);


-- B rate
    IF (COALESCE(_r.tax_rateb, 0) > 0) THEN
      SELECT NEXTVAL('tax_tax_id_seq') INTO _taxid;
      INSERT INTO tax
        ( tax_id, tax_code, tax_descrip, tax_sales_accnt_id,
          tax_taxclass_id, tax_taxauth_id, tax_basis_tax_id )
      SELECT _taxid, (_r.tax_code || '-B'), _r.tax_descrip, _r.tax_salesb_accnt_id,
             taxclass_id, NULL, NULL
      FROM taxclass
      WHERE (taxclass_code=CASE WHEN (_r.tax_cumulative) THEN '2' ELSE '1' END);

      INSERT INTO taxrate
        ( taxrate_tax_id, taxrate_percent, taxrate_curr_id,
          taxrate_amount, taxrate_effective, taxrate_expires )
      VALUES
        ( _taxid, _r.tax_rateb, baseCurrid(),
          0, '01/01/1970', '12/31/2100' );

      INSERT INTO taxass
        ( taxass_id, taxass_taxzone_id, taxass_taxtype_id, taxass_tax_id )
      SELECT taxsel_id, taxsel_taxauth_id, taxsel_taxtype_id, _taxid
      FROM taxsel
      WHERE (taxsel_tax_id=_r.tax_id);

      INSERT INTO asohisttax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT asohist_id, asohist_taxtype_id, _taxid,
             COALESCE((asohist_qtyshipped * asohist_unitprice), 0), NULL, 0,
             COALESCE(asohist_tax_pctb, 0), 0, COALESCE(asohist_tax_rateb, 0),
             asohist_invcdate, asohist_invcdate
      FROM asohist
      WHERE (asohist_tax_id=_r.tax_id);

      INSERT INTO cmheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cmhead_id, cmhead_taxtype_id, _taxid,
             COALESCE(cmhead_freight, 0), NULL, 0,
             COALESCE(cmhead_freighttax_pctb, 0), 0, COALESCE(cmhead_freighttax_rateb, 0),
             cmhead_docdate, cmhead_gldistdate
      FROM cmhead
      WHERE (cmhead_freighttax_id=_r.tax_id);

      INSERT INTO cmheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cmhead_id, cmhead_taxtype_id, _taxid,
             0, NULL, 0,
             COALESCE(cmhead_adjtax_pctb, 0), 0, COALESCE(cmhead_adjtax_rateb, 0),
             cmhead_docdate, cmhead_gldistdate
      FROM cmhead
      WHERE (cmhead_adjtax_id=_r.tax_id);

      INSERT INTO cmitemtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cmitem_id, cmitem_taxtype_id, _taxid,
             COALESCE(round((cmitem_qtycredit * cmitem_qty_invuomratio) * (cmitem_unitprice / cmitem_price_invuomratio), 2), 0), NULL, 0,
             COALESCE(cmitem_tax_pctb, 0), 0, COALESCE(cmitem_tax_rateb, 0),
             cmhead_docdate, cmhead_gldistdate
      FROM cmitem JOIN cmhead ON (cmhead_id=cmitem_cmhead_id)
      WHERE (cmitem_tax_id=_r.tax_id);

      INSERT INTO cobilltax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cobill_id, cobill_taxtype_id, _taxid,
             COALESCE(round((cobill_qty * coitem_qty_invuomratio) * (coitem_price / coitem_price_invuomratio), 2), 0), NULL, 0,
             COALESCE(cobill_tax_pctb, 0), 0, COALESCE(cobill_tax_rateb, 0),
             cobmisc_invcdate, cobmisc_invcdate
      FROM cobill JOIN cobmisc ON (cobmisc_id=cobill_cobmisc_id)
                  JOIN coitem ON (coitem_id=cobill_coitem_id)
      WHERE (cobill_tax_id=_r.tax_id);

      INSERT INTO cobmisctax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cobmisc_id, cobmisc_taxtype_id, _taxid,
             COALESCE(cobmisc_freight, 0), NULL, 0,
             COALESCE(cobmisc_freighttax_pctb, 0), 0, COALESCE(cobmisc_freighttax_rateb, 0),
             cobmisc_invcdate, cobmisc_invcdate
      FROM cobmisc
      WHERE (cobmisc_freighttax_id=_r.tax_id);

      INSERT INTO cobmisctax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cobmisc_id, cobmisc_taxtype_id, _taxid,
             0, NULL, 0,
             COALESCE(cobmisc_adjtax_pctb, 0), 0, COALESCE(cobmisc_adjtax_rateb, 0),
             cobmisc_invcdate, cobmisc_invcdate
      FROM cobmisc
      WHERE (cobmisc_adjtax_id=_r.tax_id);

      INSERT INTO cohisttax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cohist_id, cohist_taxtype_id, _taxid,
             COALESCE((cohist_qtyshipped * cohist_unitprice), 0), NULL, 0,
             COALESCE(cohist_tax_pctb, 0), 0, COALESCE(cohist_tax_rateb, 0),
             cohist_invcdate, cohist_invcdate
      FROM cohist
      WHERE (cohist_tax_id=_r.tax_id);

      INSERT INTO invcheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT invchead_id, invchead_taxtype_id, _taxid,
             COALESCE(invchead_freight, 0), NULL, 0,
             COALESCE(invchead_freighttax_pctb, 0), 0, COALESCE(invchead_freighttax_rateb, 0),
             invchead_invcdate, invchead_gldistdate
      FROM invchead
      WHERE (invchead_freighttax_id=_r.tax_id);

      INSERT INTO invcheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT invchead_id, invchead_taxtype_id, _taxid,
             0, NULL, 0,
             COALESCE(invchead_adjtax_pctb, 0), 0, COALESCE(invchead_adjtax_rateb, 0),
             invchead_invcdate, invchead_gldistdate
      FROM invchead
      WHERE (invchead_adjtax_id=_r.tax_id);

      INSERT INTO invcitemtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT invcitem_id, invcitem_taxtype_id, _taxid,
             COALESCE(round((invcitem_billed * invcitem_qty_invuomratio) * (invcitem_price / invcitem_price_invuomratio), 2), 0), NULL, 0,
             COALESCE(invcitem_tax_pctb, 0), 0, COALESCE(invcitem_tax_rateb, 0),
             invchead_invcdate, invchead_gldistdate
      FROM invcitem JOIN invchead ON (invchead_id=invcitem_invchead_id)
      WHERE (invcitem_tax_id=_r.tax_id);

    END IF;

-- C rate
    IF (COALESCE(_r.tax_ratec, 0) > 0) THEN
      SELECT NEXTVAL('tax_tax_id_seq') INTO _taxid;
      INSERT INTO tax
        ( tax_id, tax_code, tax_descrip, tax_sales_accnt_id,
          tax_taxclass_id, tax_taxauth_id, tax_basis_tax_id )
      SELECT _taxid, (_r.tax_code || '-C'), _r.tax_descrip, _r.tax_salesc_accnt_id,
             taxclass_id, NULL, NULL
      FROM taxclass
      WHERE (taxclass_code=CASE WHEN (_r.tax_cumulative) THEN '3' ELSE '1' END);

      INSERT INTO taxrate
        ( taxrate_tax_id, taxrate_percent, taxrate_curr_id,
          taxrate_amount, taxrate_effective, taxrate_expires )
      VALUES
        ( _taxid, _r.tax_ratec, baseCurrid(),
          0, '01/01/1970', '12/31/2100' );

      INSERT INTO taxass
        ( taxass_id, taxass_taxzone_id, taxass_taxtype_id, taxass_tax_id )
      SELECT taxsel_id, taxsel_taxauth_id, taxsel_taxtype_id, _taxid
      FROM taxsel
      WHERE (taxsel_tax_id=_r.tax_id);

      INSERT INTO asohisttax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT asohist_id, asohist_taxtype_id, _taxid,
             COALESCE((asohist_qtyshipped * asohist_unitprice), 0), NULL, 0,
             COALESCE(asohist_tax_pctc, 0), 0, COALESCE(asohist_tax_ratec, 0),
             asohist_invcdate, asohist_invcdate
      FROM asohist
      WHERE (asohist_tax_id=_r.tax_id);

      INSERT INTO cmheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cmhead_id, cmhead_taxtype_id, _taxid,
             COALESCE(cmhead_freight, 0), NULL, 0,
             COALESCE(cmhead_freighttax_pctc, 0), 0, COALESCE(cmhead_freighttax_ratec, 0),
             cmhead_docdate, cmhead_gldistdate
      FROM cmhead
      WHERE (cmhead_freighttax_id=_r.tax_id);

      INSERT INTO cmheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cmhead_id, cmhead_taxtype_id, _taxid,
             0, NULL, 0,
             COALESCE(cmhead_adjtax_pctc, 0), 0, COALESCE(cmhead_adjtax_ratec, 0),
             cmhead_docdate, cmhead_gldistdate
      FROM cmhead
      WHERE (cmhead_adjtax_id=_r.tax_id);

      INSERT INTO cmitemtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cmitem_id, cmitem_taxtype_id, _taxid,
             COALESCE(round((cmitem_qtycredit * cmitem_qty_invuomratio) * (cmitem_unitprice / cmitem_price_invuomratio), 2), 0), NULL, 0,
             COALESCE(cmitem_tax_pctc, 0), 0, COALESCE(cmitem_tax_ratec, 0),
             cmhead_docdate, cmhead_gldistdate
      FROM cmitem JOIN cmhead ON (cmhead_id=cmitem_cmhead_id)
      WHERE (cmitem_tax_id=_r.tax_id);

      INSERT INTO cobilltax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cobill_id, cobill_taxtype_id, _taxid,
             COALESCE(round((cobill_qty * coitem_qty_invuomratio) * (coitem_price / coitem_price_invuomratio), 2), 0), NULL, 0,
             COALESCE(cobill_tax_pctc, 0), 0, COALESCE(cobill_tax_ratec, 0),
             cobmisc_invcdate, cobmisc_invcdate
      FROM cobill JOIN cobmisc ON (cobmisc_id=cobill_cobmisc_id)
                  JOIN coitem ON (coitem_id=cobill_coitem_id)
      WHERE (cobill_tax_id=_r.tax_id);

      INSERT INTO cobmisctax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cobmisc_id, cobmisc_taxtype_id, _taxid,
             COALESCE(cobmisc_freight, 0), NULL, 0,
             COALESCE(cobmisc_freighttax_pctc, 0), 0, COALESCE(cobmisc_freighttax_ratec, 0),
             cobmisc_invcdate, cobmisc_invcdate
      FROM cobmisc
      WHERE (cobmisc_freighttax_id=_r.tax_id);

      INSERT INTO cobmisctax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cobmisc_id, cobmisc_taxtype_id, _taxid,
             0, NULL, 0,
             COALESCE(cobmisc_adjtax_pctc, 0), 0, COALESCE(cobmisc_adjtax_ratec, 0),
             cobmisc_invcdate, cobmisc_invcdate
      FROM cobmisc
      WHERE (cobmisc_adjtax_id=_r.tax_id);

      INSERT INTO cohisttax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT cohist_id, cohist_taxtype_id, _taxid,
             COALESCE((cohist_qtyshipped * cohist_unitprice), 0), NULL, 0,
             COALESCE(cohist_tax_pctc, 0), 0, COALESCE(cohist_tax_ratec, 0),
             cohist_invcdate, cohist_invcdate
      FROM cohist
      WHERE (cohist_tax_id=_r.tax_id);

      INSERT INTO invcheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT invchead_id, invchead_taxtype_id, _taxid,
             COALESCE(invchead_freight, 0), NULL, 0,
             COALESCE(invchead_freighttax_pctc, 0), 0, COALESCE(invchead_freighttax_ratec, 0),
             invchead_invcdate, invchead_gldistdate
      FROM invchead
      WHERE (invchead_freighttax_id=_r.tax_id);

      INSERT INTO invcheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT invchead_id, invchead_taxtype_id, _taxid,
             0, NULL, 0,
             COALESCE(invchead_adjtax_pctc, 0), 0, COALESCE(invchead_adjtax_ratec, 0),
             invchead_invcdate, invchead_gldistdate
      FROM invchead
      WHERE (invchead_adjtax_id=_r.tax_id);

      INSERT INTO invcitemtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT invcitem_id, invcitem_taxtype_id, _taxid,
             COALESCE(round((invcitem_billed * invcitem_qty_invuomratio) * (invcitem_price / invcitem_price_invuomratio), 2), 0), NULL, 0,
             COALESCE(invcitem_tax_pctc, 0), 0, COALESCE(invcitem_tax_ratec, 0),
             invchead_invcdate, invchead_gldistdate
      FROM invcitem JOIN invchead ON (invchead_id=invcitem_invchead_id)
      WHERE (invcitem_tax_id=_r.tax_id);

    END IF;
  END LOOP;

  RETURN 0;

END;
$$ LANGUAGE 'plpgsql';

SELECT fixTax();
DROP FUNCTION fixTax();

COMMIT;
