BEGIN;

-- Insert the existing records of taxauth into taxzone

INSERT INTO taxzone(taxzone_id, taxzone_code, taxzone_descrip)
SELECT taxauth_id, taxauth_code, taxauth_name 
FROM taxauth;

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
UPDATE rahead       SET rahead_taxzone_id=rahead_taxauth_id;
UPDATE shiptoinfo   SET shipto_taxzone_id=shipto_taxauth_id;
UPDATE taxreg       SET taxreg_taxzone_id = taxreg_taxauth_id;
UPDATE tohead       SET tohead_taxzone_id=tohead_taxauth_id;
UPDATE vendaddrinfo SET vendaddr_taxzone_id=vendaddr_taxauth_id;
UPDATE vendinfo     SET vend_taxzone_id=vend_taxauth_id;
UPDATE vohead       SET vohead_taxzone_id=vohead_taxauth_id;
UPDATE whsinfo      SET warehous_taxzone_id=warehous_taxauth_id;

-- Populate taxclass with legacy A, B, and C classes

INSERT INTO taxclass
  ( taxclass_code, taxclass_descrip, taxclass_sequence )
VALUES
  ( 'A', 'Legacy A Class', 1 ),
  ( 'B', 'Legacy B Class', 1 ),
  ( 'C', 'Legacy C Class', 1 );

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
UPDATE rahead SET rahead_taxtype_id=getFreightTaxTypeId();
-- UPDATE raitem
UPDATE tohead SET tohead_taxtype_id=getFreightTaxTypeId();
UPDATE toitem SET toitem_taxtype_id=(SELECT getItemTaxType(toitem_item_id, tohead_taxzone_id)
                                     FROM tohead
                                     WHERE (tohead_id=toitem_tohead_id));
UPDATE vohead SET vohead_taxtype_id=getFreightTaxTypeId();
-- UPDATE voitem

-- Split legacy tax A,B,C rates into separate records

CREATE OR REPLACE FUNCTION fixTax() RETURNS INTEGER AS $$
DECLARE
  _r RECORD;
  _taxid INTEGER;
  _result INTEGER;

BEGIN

  FOR _r IN SELECT * FROM obsolete_tax LOOP

-- A rate
    SELECT NEXTVAL('tax_tax_id_seq') INTO _taxid;
    INSERT INTO tax
      ( tax_id, tax_code, tax_descrip, tax_sales_accnt_id,
        tax_taxclass_id, tax_taxauth_id, tax_basis_tax_id )
    SELECT _taxid, (_r.tax_code || '-A'), _r.tax_descrip, _r.tax_sales_accnt_id,
           taxclass_id, NULL, NULL
    FROM taxclass
    WHERE (taxclass_code='A');

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
    SELECT asohist_id, COALESCE(asohist_taxtype_id, -1), _taxid,
           (asohist_qtyshipped * asohist_unitprice), NULL, 0,
           asohist_tax_pcta, 0, asohist_tax_ratea,
           asohist_invcdate, asohist_invcdate
    FROM asohist
    WHERE (asohist_tax_id=_r.tax_id);

    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, COALESCE(cmhead_taxtype_id, -1), _taxid,
           cmhead_freight, NULL, 0,
           cmhead_freighttax_pcta, 0, cmhead_freighttax_ratea,
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE (cmhead_freighttax_id=_r.tax_id);

    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, COALESCE(cmhead_taxtype_id, -1), _taxid,
           0, NULL, 0,
           cmhead_adjtax_pcta, 0, cmhead_adjtax_ratea,
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE (cmhead_adjtax_id=_r.tax_id);

    INSERT INTO cmitemtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmitem_id, COALESCE(cmitem_taxtype_id, -1), _taxid,
           (cmitem_qtycredit * cmitem_unitprice), NULL, 0,
           cmitem_tax_pcta, 0, cmitem_tax_ratea,
           cmhead_docdate, cmhead_gldistdate
    FROM cmitem JOIN cmhead ON (cmhead_id=cmitem_cmhead_id)
    WHERE (cmitem_tax_id=_r.tax_id);

    INSERT INTO cobilltax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobill_id, COALESCE(cobill_taxtype_id, -1), _taxid,
           (cobill_qty * coitem_price), NULL, 0,
           cobill_tax_pcta, 0, cobill_tax_ratea,
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobill JOIN cobmisc ON (cobmisc_id=cobill_cobmisc_id)
                JOIN coitem ON (coitem_id=cobill_coitem_id)
    WHERE (cobill_tax_id=_r.tax_id);

    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, COALESCE(cobmisc_taxtype_id, -1), _taxid,
           cobmisc_freight, NULL, 0,
           cobmisc_freighttax_pcta, 0, cobmisc_freighttax_ratea,
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE (cobmisc_freighttax_id=_r.tax_id);

    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, COALESCE(cobmisc_taxtype_id, -1), _taxid,
           0, NULL, 0,
           cobmisc_adjtax_pcta, 0, cobmisc_adjtax_ratea,
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE (cobmisc_adjtax_id=_r.tax_id);

    INSERT INTO cohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cohist_id, COALESCE(cohist_taxtype_id, -1), _taxid,
           (cohist_qtyshipped * cohist_unitprice), NULL, 0,
           COALESCE(cohist_tax_pcta, 0), 0, COALESCE(cohist_tax_ratea, 0),
           cohist_invcdate, cohist_invcdate
    FROM cohist
    WHERE (cohist_tax_id=_r.tax_id);

    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, COALESCE(invchead_taxtype_id, -1), _taxid,
           invchead_freight, NULL, 0,
           invchead_freighttax_pcta, 0, invchead_freighttax_ratea,
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE (invchead_freighttax_id=_r.tax_id);

    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, COALESCE(invchead_taxtype_id, -1), _taxid,
           0, NULL, 0,
           invchead_adjtax_pcta, 0, invchead_adjtax_ratea,
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE (invchead_adjtax_id=_r.tax_id);

    INSERT INTO invcitemtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invcitem_id, COALESCE(invcitem_taxtype_id, -1), _taxid,
           (invcitem_billed * invcitem_price), NULL, 0,
           invcitem_tax_pcta, 0, invcitem_tax_ratea,
           invchead_invcdate, invchead_gldistdate
    FROM invcitem JOIN invchead ON (invchead_id=invcitem_invchead_id)
    WHERE (invcitem_tax_id=_r.tax_id);

    INSERT INTO toheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT tohead_id, COALESCE(tohead_taxtype_id, -1), _taxid,
           tohead_freight, NULL, 0,
           tohead_freighttax_pcta, 0, tohead_freighttax_ratea,
           tohead_orderdate, tohead_orderdate
    FROM tohead
    WHERE (tohead_freighttax_id=_r.tax_id);

    INSERT INTO toitemtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT toitem_id, COALESCE(toitem_taxtype_id, -1), _taxid,
           toitem_freight, NULL, 0,
           toitem_freighttax_pcta, 0, toitem_freighttax_ratea,
           tohead_orderdate, tohead_orderdate
    FROM toitem JOIN tohead ON (tohead_id=toitem_tohead_id)
    WHERE (toitem_freighttax_id=_r.tax_id);

-- vohead taxes not populated?
--    INSERT INTO voheadtax
--      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
--        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
--        taxhist_percent, taxhist_amount, taxhist_tax,
--        taxhist_docdate, taxhist_distdate )
--    SELECT vohead_id, COALESCE(vohead_taxtype_id, -1), _taxid,
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
--    SELECT vohead_id, COALESCE(vohead_taxtype_id, -1), _taxid,
--           0, NULL, 0,
--           vohead_adjtax_pcta, 0, vohead_adjtax_ratea,
--           vohead_docdate, vohead_gldistdate
--    FROM vohead
--    WHERE (vohead_adjtax_id=_r.tax_id);

    INSERT INTO voitemtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT voitem_id, COALESCE(voitem_taxtype_id, -1), _taxid,
           (voitem_qty * poitem_unitprice), NULL, 0,
           voitem_tax_pcta, 0, voitem_tax_ratea,
           vohead_docdate, vohead_gldistdate
    FROM voitem JOIN vohead ON (vohead_id=voitem_vohead_id)
                JOIN poitem ON (poitem_id=voitem_poitem_id)
    WHERE (voitem_tax_id=_r.tax_id);


-- B rate
    IF (COALESCE(_r.tax_rateb, 0) > 0) THEN
      SELECT NEXTVAL('tax_tax_id_seq') INTO _taxid;
      INSERT INTO tax
        ( tax_id, tax_code, tax_descrip, tax_sales_accnt_id,
          tax_taxclass_id, tax_taxauth_id, tax_basis_tax_id )
      SELECT _taxid, (_r.tax_code || '-B'), _r.tax_descrip, _r.tax_salesb_accnt_id,
             taxclass_id, NULL, NULL
      FROM taxclass
      WHERE (taxclass_code='B');
      INSERT INTO taxrate
        ( taxrate_tax_id, taxrate_percent, taxrate_curr_id,
          taxrate_amount, taxrate_effective, taxrate_expires )
      VALUES
        ( _taxid, _r.tax_rateb, baseCurrid(),
          0, '01/01/1970', '12/31/2100' );
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
      WHERE (taxclass_code='C');
      INSERT INTO taxrate
        ( taxrate_tax_id, taxrate_percent, taxrate_curr_id,
          taxrate_amount, taxrate_effective, taxrate_expires )
      VALUES
        ( _taxid, _r.tax_ratec, baseCurrid(),
          0, '01/01/1970', '12/31/2100' );
    END IF;
  END LOOP;

  RETURN 0;

END;
$$ LANGUAGE 'plpgsql';

SELECT fixTax();
DROP FUNCTION fixTax();

-- Need to delete old tax information after conversion
-- DELETE FROM tax;

COMMIT;