CREATE OR REPLACE FUNCTION fixTax() RETURNS INTEGER AS $$
DECLARE
  _r RECORD;
  _taxid INTEGER;
  _result INTEGER;
  _edition      INTEGER;

BEGIN
  SELECT CASE WHEN fetchMetricText('Application') = 'Manufacturing' THEN 3
              WHEN fetchMetricText('Application') = 'Standard'      THEN 2
              ELSE 1
          END INTO _edition;

-- Reconvert Freight and Adjustment taxes

  DELETE FROM taxhist WHERE taxhist_tax=0;

  DELETE FROM cmheadtax;
  DELETE FROM cobmisctax;
  DELETE FROM invcheadtax;
  IF (_edition > 1) THEN
    DELETE FROM toheadtax;
    DELETE FROM toitemtax;
  END IF;

  DELETE FROM asohisttax
  WHERE (taxhist_parent_id IN (SELECT asohist_id
                               FROM asohist
                               WHERE (asohist_misc_type IN ('F', 'T'))));
  DELETE FROM cohisttax
  WHERE (taxhist_parent_id IN (SELECT cohist_id
                               FROM cohist
                               WHERE (cohist_misc_type IN ('F', 'T'))));

  FOR _r IN SELECT * FROM obsolete_tax LOOP

-- A rate
    SELECT tax.tax_id INTO _taxid
    FROM tax
    WHERE (tax.tax_code = (_r.tax_code || '-A'));
    RAISE NOTICE 'Working on old Tax Code %', _r.tax_code;

    RAISE NOTICE 'inserting A into asohisttax';
    INSERT INTO asohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT asohist_id, getFreightTaxtypeId(), _taxid,
           COALESCE((asohist_qtyshipped * asohist_unitprice), 0), NULL, 0,
           COALESCE(asohist_tax_pcta, 0), 0, COALESCE(asohist_tax_ratea, 0),
           asohist_invcdate, asohist_invcdate
    FROM asohist
    WHERE ( (asohist_tax_id=_r.tax_id)
      AND   (COALESCE(asohist_tax_ratea, 0) > 0)
      AND   (asohist_misc_type = 'F') );

    INSERT INTO asohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT asohist_id, getAdjustmentTaxtypeId(), _taxid,
           COALESCE((asohist_qtyshipped * asohist_unitprice), 0), NULL, 0,
           COALESCE(asohist_tax_pcta, 0), 0, COALESCE(asohist_tax_ratea, 0),
           asohist_invcdate, asohist_invcdate
    FROM asohist
    WHERE ( (asohist_tax_id=_r.tax_id)
      AND   (COALESCE(asohist_tax_ratea, 0) > 0)
      AND   (asohist_misc_type = 'T') );

    RAISE NOTICE 'inserting freight A into cmheadtax';
    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, getFreightTaxtypeId(), _taxid,
           COALESCE(cmhead_freight, 0), NULL, 0,
           COALESCE(cmhead_freighttax_pcta, 0), 0, COALESCE(cmhead_freighttax_ratea, 0),
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE ( (cmhead_freighttax_id=_r.tax_id)
      AND   (COALESCE(cmhead_freighttax_ratea, 0) > 0) );

    RAISE NOTICE 'inserting adj A into cmheadtax';
    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, getAdjustmentTaxtypeId(), _taxid,
           0, NULL, 0,
           COALESCE(cmhead_adjtax_pcta, 0), 0, COALESCE(cmhead_adjtax_ratea, 0),
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE ( (cmhead_adjtax_id=_r.tax_id)
      AND   (COALESCE(cmhead_adjtax_ratea, 0) > 0) );

-- cobmisc_tax_ratea/b/c is a duplicate of freight
    RAISE NOTICE 'inserting freight A into cobmisctax';
    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, getFreightTaxtypeId(), _taxid,
           COALESCE(cobmisc_freight, 0), NULL, 0,
           COALESCE(cobmisc_freighttax_pcta, 0), 0, COALESCE(cobmisc_freighttax_ratea, 0),
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE ( (cobmisc_freighttax_id=_r.tax_id)
      AND   (COALESCE(cobmisc_freighttax_ratea, 0) > 0) );

-- Don't think cobmisc_adjtax_id is ever set
    RAISE NOTICE 'inserting adj A into cobmisctax';
    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, getAdjustmentTaxtypeId(), _taxid,
           0, NULL, 0,
           COALESCE(cobmisc_adjtax_pcta, 0), 0, COALESCE(cobmisc_adjtax_ratea, 0),
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE ( (cobmisc_adjtax_id=_r.tax_id)
      AND   (COALESCE(cobmisc_adjtax_ratea, 0) > 0) );

    RAISE NOTICE 'inserting A into cohisttax';
    INSERT INTO cohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cohist_id, getFreightTaxtypeId(), _taxid,
           COALESCE((cohist_qtyshipped * cohist_unitprice), 0), NULL, 0,
           COALESCE(cohist_tax_pcta, 0), 0, COALESCE(cohist_tax_ratea, 0),
           cohist_invcdate, cohist_invcdate
    FROM cohist
    WHERE ( (cohist_tax_id=_r.tax_id)
      AND   (COALESCE(cohist_tax_ratea, 0) > 0)
      AND   (cohist_misc_type = 'F') );

    INSERT INTO cohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cohist_id, getAdjustmentTaxtypeId(), _taxid,
           COALESCE((cohist_qtyshipped * cohist_unitprice), 0), NULL, 0,
           COALESCE(cohist_tax_pcta, 0), 0, COALESCE(cohist_tax_ratea, 0),
           cohist_invcdate, cohist_invcdate
    FROM cohist
    WHERE ( (cohist_tax_id=_r.tax_id)
      AND   (COALESCE(cohist_tax_ratea, 0) > 0)
      AND   (cohist_misc_type = 'T') );

    RAISE NOTICE 'inserting freight A into invcheadtax';
    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, getFreightTaxtypeId(), _taxid,
           COALESCE(invchead_freight, 0), NULL, 0,
           COALESCE(invchead_freighttax_pcta, 0), 0, COALESCE(invchead_freighttax_ratea, 0),
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE ( (invchead_freighttax_id=_r.tax_id)
      AND   (COALESCE(invchead_freighttax_ratea, 0) > 0) );

    RAISE NOTICE 'inserting adj A into invcheadtax';
    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, getAdjustmentTaxtypeId(), _taxid,
           0, NULL, 0,
           COALESCE(invchead_adjtax_pcta, 0), 0, COALESCE(invchead_adjtax_ratea, 0),
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE ( (invchead_adjtax_id=_r.tax_id)
      AND   (COALESCE(invchead_adjtax_ratea, 0) > 0) );

    IF (_edition > 1) THEN
      RAISE NOTICE 'inserting A into toheadtax';
      INSERT INTO toheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT tohead_id, getFreightTaxtypeId(), _taxid,
             COALESCE(tohead_freight, 0), NULL, 0,
             COALESCE(tohead_freighttax_pcta, 0), 0, COALESCE(tohead_freighttax_ratea, 0),
             tohead_orderdate, tohead_orderdate
      FROM tohead
      WHERE ( (tohead_freighttax_id=_r.tax_id)
        AND   (COALESCE(tohead_freighttax_ratea, 0) > 0) );

      RAISE NOTICE 'inserting A into toitemtax';
      INSERT INTO toitemtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT toitem_id, getFreightTaxtypeId(), _taxid,
             COALESCE(toitem_freight, 0), NULL, 0,
             COALESCE(toitem_freighttax_pcta, 0), 0, COALESCE(toitem_freighttax_ratea, 0),
             tohead_orderdate, tohead_orderdate
      FROM toitem JOIN tohead ON (tohead_id=toitem_tohead_id)
      WHERE ( (toitem_freighttax_id=_r.tax_id)
        AND   (COALESCE(toitem_freighttax_ratea, 0) > 0) );
    END IF;

-- B rate
    SELECT tax.tax_id INTO _taxid
    FROM tax
    WHERE (tax.tax_code = (_r.tax_code || '-B'));
    RAISE NOTICE 'Working on old Tax Code %', _r.tax_code;

    RAISE NOTICE 'inserting B into asohisttax';
    INSERT INTO asohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT asohist_id, getFreightTaxtypeId(), _taxid,
           COALESCE((asohist_qtyshipped * asohist_unitprice), 0), NULL, 0,
           COALESCE(asohist_tax_pctb, 0), 0, COALESCE(asohist_tax_rateb, 0),
           asohist_invcdate, asohist_invcdate
    FROM asohist
    WHERE ( (asohist_tax_id=_r.tax_id)
      AND   (COALESCE(asohist_tax_rateb, 0) > 0)
      AND   (asohist_misc_type = 'F') );

    INSERT INTO asohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT asohist_id, getAdjustmentTaxtypeId(), _taxid,
           COALESCE((asohist_qtyshipped * asohist_unitprice), 0), NULL, 0,
           COALESCE(asohist_tax_pctb, 0), 0, COALESCE(asohist_tax_rateb, 0),
           asohist_invcdate, asohist_invcdate
    FROM asohist
    WHERE ( (asohist_tax_id=_r.tax_id)
      AND   (COALESCE(asohist_tax_rateb, 0) > 0)
      AND   (asohist_misc_type = 'T') );

    RAISE NOTICE 'inserting freight B into cmheadtax';
    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, getFreightTaxtypeId(), _taxid,
           COALESCE(cmhead_freight, 0), NULL, 0,
           COALESCE(cmhead_freighttax_pctb, 0), 0, COALESCE(cmhead_freighttax_rateb, 0),
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE ( (cmhead_freighttax_id=_r.tax_id)
      AND   (COALESCE(cmhead_freighttax_rateb, 0) > 0) );

    RAISE NOTICE 'inserting adj B into cmheadtax';
    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, getAdjustmentTaxtypeId(), _taxid,
           0, NULL, 0,
           COALESCE(cmhead_adjtax_pctb, 0), 0, COALESCE(cmhead_adjtax_rateb, 0),
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE ( (cmhead_adjtax_id=_r.tax_id)
      AND   (COALESCE(cmhead_adjtax_rateb, 0) > 0) );

-- cobmisc_tax_ratea/b/c is a duplicate of freight
    RAISE NOTICE 'inserting freight B into cobmisctax';
    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, getFreightTaxtypeId(), _taxid,
           COALESCE(cobmisc_freight, 0), NULL, 0,
           COALESCE(cobmisc_freighttax_pctb, 0), 0, COALESCE(cobmisc_freighttax_rateb, 0),
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE ( (cobmisc_freighttax_id=_r.tax_id)
      AND   (COALESCE(cobmisc_freighttax_rateb, 0) > 0) );

-- Don't think cobmisc_adjtax_id is ever set
    RAISE NOTICE 'inserting adj B into cobmisctax';
    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, getAdjustmentTaxtypeId(), _taxid,
           0, NULL, 0,
           COALESCE(cobmisc_adjtax_pctb, 0), 0, COALESCE(cobmisc_adjtax_rateb, 0),
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE ( (cobmisc_adjtax_id=_r.tax_id)
      AND   (COALESCE(cobmisc_adjtax_rateb, 0) > 0) );

    RAISE NOTICE 'inserting B into cohisttax';
    INSERT INTO cohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cohist_id, getFreightTaxtypeId(), _taxid,
           COALESCE((cohist_qtyshipped * cohist_unitprice), 0), NULL, 0,
           COALESCE(cohist_tax_pctb, 0), 0, COALESCE(cohist_tax_rateb, 0),
           cohist_invcdate, cohist_invcdate
    FROM cohist
    WHERE ( (cohist_tax_id=_r.tax_id)
      AND   (COALESCE(cohist_tax_rateb, 0) > 0)
      AND   (cohist_misc_type = 'F') );

    INSERT INTO cohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cohist_id, getAdjustmentTaxtypeId(), _taxid,
           COALESCE((cohist_qtyshipped * cohist_unitprice), 0), NULL, 0,
           COALESCE(cohist_tax_pctb, 0), 0, COALESCE(cohist_tax_rateb, 0),
           cohist_invcdate, cohist_invcdate
    FROM cohist
    WHERE ( (cohist_tax_id=_r.tax_id)
      AND   (COALESCE(cohist_tax_rateb, 0) > 0)
      AND   (cohist_misc_type = 'T') );

    RAISE NOTICE 'inserting freight B into invcheadtax';
    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, getFreightTaxtypeId(), _taxid,
           COALESCE(invchead_freight, 0), NULL, 0,
           COALESCE(invchead_freighttax_pctb, 0), 0, COALESCE(invchead_freighttax_rateb, 0),
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE ( (invchead_freighttax_id=_r.tax_id)
      AND   (COALESCE(invchead_freighttax_rateb, 0) > 0) );

    RAISE NOTICE 'inserting adj B into invcheadtax';
    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, getAdjustmentTaxtypeId(), _taxid,
           0, NULL, 0,
           COALESCE(invchead_adjtax_pctb, 0), 0, COALESCE(invchead_adjtax_rateb, 0),
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE ( (invchead_adjtax_id=_r.tax_id)
      AND   (COALESCE(invchead_adjtax_rateb, 0) > 0) );

    IF (_edition > 1) THEN
      RAISE NOTICE 'inserting B into toheadtax';
      INSERT INTO toheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT tohead_id, getFreightTaxtypeId(), _taxid,
             COALESCE(tohead_freight, 0), NULL, 0,
             COALESCE(tohead_freighttax_pctb, 0), 0, COALESCE(tohead_freighttax_rateb, 0),
             tohead_orderdate, tohead_orderdate
      FROM tohead
      WHERE ( (tohead_freighttax_id=_r.tax_id)
        AND   (COALESCE(tohead_freighttax_rateb, 0) > 0) );

      RAISE NOTICE 'inserting B into toitemtax';
      INSERT INTO toitemtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT toitem_id, getFreightTaxtypeId(), _taxid,
             COALESCE(toitem_freight, 0), NULL, 0,
             COALESCE(toitem_freighttax_pctb, 0), 0, COALESCE(toitem_freighttax_rateb, 0),
             tohead_orderdate, tohead_orderdate
      FROM toitem JOIN tohead ON (tohead_id=toitem_tohead_id)
      WHERE ( (toitem_freighttax_id=_r.tax_id)
        AND   (COALESCE(toitem_freighttax_rateb, 0) > 0) );
    END IF;

-- C rate
    SELECT tax.tax_id INTO _taxid
    FROM tax
    WHERE (tax.tax_code = (_r.tax_code || '-C'));
    RAISE NOTICE 'Working on old Tax Code %', _r.tax_code;

    RAISE NOTICE 'inserting C into asohisttax';
    INSERT INTO asohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT asohist_id, getFreightTaxtypeId(), _taxid,
           COALESCE((asohist_qtyshipped * asohist_unitprice), 0), NULL, 0,
           COALESCE(asohist_tax_pctc, 0), 0, COALESCE(asohist_tax_ratec, 0),
           asohist_invcdate, asohist_invcdate
    FROM asohist
    WHERE ( (asohist_tax_id=_r.tax_id)
      AND   (COALESCE(asohist_tax_ratec, 0) > 0)
      AND   (asohist_misc_type = 'F') );

    INSERT INTO asohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT asohist_id, getAdjustmentTaxtypeId(), _taxid,
           COALESCE((asohist_qtyshipped * asohist_unitprice), 0), NULL, 0,
           COALESCE(asohist_tax_pctc, 0), 0, COALESCE(asohist_tax_ratec, 0),
           asohist_invcdate, asohist_invcdate
    FROM asohist
    WHERE ( (asohist_tax_id=_r.tax_id)
      AND   (COALESCE(asohist_tax_ratec, 0) > 0)
      AND   (asohist_misc_type = 'T') );

    RAISE NOTICE 'inserting freight C into cmheadtax';
    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, getFreightTaxtypeId(), _taxid,
           COALESCE(cmhead_freight, 0), NULL, 0,
           COALESCE(cmhead_freighttax_pctc, 0), 0, COALESCE(cmhead_freighttax_ratec, 0),
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE ( (cmhead_freighttax_id=_r.tax_id)
      AND   (COALESCE(cmhead_freighttax_ratec, 0) > 0) );

    RAISE NOTICE 'inserting adj C into cmheadtax';
    INSERT INTO cmheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cmhead_id, getAdjustmentTaxtypeId(), _taxid,
           0, NULL, 0,
           COALESCE(cmhead_adjtax_pctc, 0), 0, COALESCE(cmhead_adjtax_ratec, 0),
           cmhead_docdate, cmhead_gldistdate
    FROM cmhead
    WHERE ( (cmhead_adjtax_id=_r.tax_id)
      AND   (COALESCE(cmhead_adjtax_ratec, 0) > 0) );

-- cobmisc_tax_ratea/b/c is a duplicate of freight
    RAISE NOTICE 'inserting freight C into cobmisctax';
    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, getFreightTaxtypeId(), _taxid,
           COALESCE(cobmisc_freight, 0), NULL, 0,
           COALESCE(cobmisc_freighttax_pctc, 0), 0, COALESCE(cobmisc_freighttax_ratec, 0),
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE ( (cobmisc_freighttax_id=_r.tax_id)
      AND   (COALESCE(cobmisc_freighttax_ratec, 0) > 0) );

-- Don't think cobmisc_adjtax_id is ever set
    RAISE NOTICE 'inserting adj C into cobmisctax';
    INSERT INTO cobmisctax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cobmisc_id, getAdjustmentTaxtypeId(), _taxid,
           0, NULL, 0,
           COALESCE(cobmisc_adjtax_pctc, 0), 0, COALESCE(cobmisc_adjtax_ratec, 0),
           cobmisc_invcdate, cobmisc_invcdate
    FROM cobmisc
    WHERE ( (cobmisc_adjtax_id=_r.tax_id)
      AND   (COALESCE(cobmisc_adjtax_ratec, 0) > 0) );

    RAISE NOTICE 'inserting C into cohisttax';
    INSERT INTO cohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cohist_id, getFreightTaxtypeId(), _taxid,
           COALESCE((cohist_qtyshipped * cohist_unitprice), 0), NULL, 0,
           COALESCE(cohist_tax_pctc, 0), 0, COALESCE(cohist_tax_ratec, 0),
           cohist_invcdate, cohist_invcdate
    FROM cohist
    WHERE ( (cohist_tax_id=_r.tax_id)
      AND   (COALESCE(cohist_tax_ratec, 0) > 0)
      AND   (cohist_misc_type = 'F') );

    INSERT INTO cohisttax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT cohist_id, getAdjustmentTaxtypeId(), _taxid,
           COALESCE((cohist_qtyshipped * cohist_unitprice), 0), NULL, 0,
           COALESCE(cohist_tax_pctc, 0), 0, COALESCE(cohist_tax_ratec, 0),
           cohist_invcdate, cohist_invcdate
    FROM cohist
    WHERE ( (cohist_tax_id=_r.tax_id)
      AND   (COALESCE(cohist_tax_ratec, 0) > 0)
      AND   (cohist_misc_type = 'T') );

    RAISE NOTICE 'inserting freight C into invcheadtax';
    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, getFreightTaxtypeId(), _taxid,
           COALESCE(invchead_freight, 0), NULL, 0,
           COALESCE(invchead_freighttax_pctc, 0), 0, COALESCE(invchead_freighttax_ratec, 0),
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE ( (invchead_freighttax_id=_r.tax_id)
      AND   (COALESCE(invchead_freighttax_ratec, 0) > 0) );

    RAISE NOTICE 'inserting adj C into invcheadtax';
    INSERT INTO invcheadtax
      ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
        taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
        taxhist_percent, taxhist_amount, taxhist_tax,
        taxhist_docdate, taxhist_distdate )
    SELECT invchead_id, getAdjustmentTaxtypeId(), _taxid,
           0, NULL, 0,
           COALESCE(invchead_adjtax_pctc, 0), 0, COALESCE(invchead_adjtax_ratec, 0),
           invchead_invcdate, invchead_gldistdate
    FROM invchead
    WHERE ( (invchead_adjtax_id=_r.tax_id)
      AND   (COALESCE(invchead_adjtax_ratec, 0) > 0) );

    IF (_edition > 1) THEN
      RAISE NOTICE 'inserting C into toheadtax';
      INSERT INTO toheadtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT tohead_id, getFreightTaxtypeId(), _taxid,
             COALESCE(tohead_freight, 0), NULL, 0,
             COALESCE(tohead_freighttax_pctc, 0), 0, COALESCE(tohead_freighttax_ratec, 0),
             tohead_orderdate, tohead_orderdate
      FROM tohead
      WHERE ( (tohead_freighttax_id=_r.tax_id)
        AND   (COALESCE(tohead_freighttax_ratec, 0) > 0) );

      RAISE NOTICE 'inserting C into toitemtax';
      INSERT INTO toitemtax
        ( taxhist_parent_id, taxhist_taxtype_id, taxhist_tax_id,
          taxhist_basis, taxhist_basis_tax_id, taxhist_sequence,
          taxhist_percent, taxhist_amount, taxhist_tax,
          taxhist_docdate, taxhist_distdate )
      SELECT toitem_id, getFreightTaxtypeId(), _taxid,
             COALESCE(toitem_freight, 0), NULL, 0,
             COALESCE(toitem_freighttax_pctc, 0), 0, COALESCE(toitem_freighttax_ratec, 0),
             tohead_orderdate, tohead_orderdate
      FROM toitem JOIN tohead ON (tohead_id=toitem_tohead_id)
      WHERE ( (toitem_freighttax_id=_r.tax_id)
        AND   (COALESCE(toitem_freighttax_ratec, 0) > 0) );
    END IF;

  END LOOP;

  RETURN 0;

END;
$$ LANGUAGE 'plpgsql';

SELECT fixTax();
DROP FUNCTION fixTax();

