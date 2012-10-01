CREATE OR REPLACE FUNCTION te.vouchersheet(integer) RETURNS integer AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pHeadID ALIAS FOR $1;
  _distamt  NUMERIC;
  _glaccnt  INTEGER;
  _notes    TEXT;
  _s        RECORD;
  _total    NUMERIC := 0;
  _v        RECORD;
  _vodistid INTEGER;
  _voheadid INTEGER;

BEGIN
  FOR _v IN
    -- distinct filters duplicate rows returned because of the teitem join
    -- TODO: can we push the teitem down into the loop and avoid the distinct?
    SELECT DISTINCT
           tehead_id, tehead_number,   tehead_weekending,          tehead_notes,
           teitem_curr_id,
           emp_wage, emp_wage_period,
           vend_id,   vend_taxzone_id, vend_terms_id, vend_number, vend_1099,
           COALESCE(teemp_contractor, false) AS isContractor
      FROM te.tehead
      JOIN te.teitem ON (teitem_tehead_id=tehead_id)
      JOIN emp       ON (tehead_emp_id=emp_id)
      JOIN vendinfo  ON (UPPER(emp_number)=UPPER(vend_number))
      LEFT OUTER JOIN te.teemp ON (emp_id=teemp_emp_id)
    WHERE ((tehead_id      = pHeadID)
       AND (teitem_prepaid = false)
       AND (teitem_vodist_id IS NULL)
       AND (teitem_type = 'E' OR (COALESCE(teemp_contractor,false) AND (teitem_empcost > 0 OR emp_wage > 0 ))))  LOOP

     INSERT INTO vohead (vohead_id,        vohead_number,     vohead_vend_id,
                         vohead_distdate,  vohead_docdate,
                         vohead_duedate,
                         vohead_terms_id,  vohead_taxzone_id, vohead_invcnumber,
                         vohead_reference, vohead_amount,     vohead_1099,
                         vohead_curr_id,   vohead_notes,      vohead_posted,
                         vohead_misc,      vohead_pohead_id)
                 VALUES (DEFAULT,              fetchVoNumber(),    _v.vend_id,
                         _v.tehead_weekending, _v.tehead_weekending,
                         determineDueDate(_v.vend_terms_id, _v.tehead_weekending),
                         _v.vend_terms_id,     _v.vend_taxzone_id, 'N/A',
                         ('T&E Sheet ' || _v.tehead_number),    0, _v.vend_1099,
                         _v.teitem_curr_id,    _v.tehead_notes, false,
                         true,                 -1)
     RETURNING vohead_id INTO _voheadid;

     FOR _s IN
       SELECT teitem_id,       teitem_linenumber, teitem_workdate, teitem_type,
              item_number,     teitem_item_id,    teitem_qty,      prjtask_prj_id,
              CASE
                WHEN teitem_empcost > 0 THEN teitem_empcost
                ELSE te.calcRate(_v.emp_wage, _v.emp_wage_period)
              END AS rate,
              teitem_total,    teitem_type,
              teexp_expcat_id, teexp_accnt_id
         FROM te.teitem
         JOIN te.teexp ON (teitem_item_id=teexp_id)
         JOIN item     ON (teitem_item_id=item_id)
         JOIN prjtask  ON (teitem_prjtask_id=prjtask_id)
        WHERE ((teitem_tehead_id = _v.tehead_id)
           AND (teitem_curr_id   = _v.teitem_curr_id)
           AND (teitem_prepaid   = false)
           AND (teitem_vodist_id IS NULL)
           AND (teitem_type = 'E' OR (_v.isContractor AND (teitem_empcost > 0 OR _v.emp_wage > 0 )))) 


       -- Loop thru records and create vouchers by supplier for the provided headid
     LOOP
        -- insert vodist records here
        _vodistid = nextval('vodist_vodist_id_seq');

        -- Map expense directly to account so we can get project account mapping if applicable
        IF (_s.teexp_accnt_id > 1) THEN
          _glaccnt := getPrjAccntId(_s.prjtask_prj_id, _s.teexp_accnt_id);
        ELSE
          SELECT getPrjAccntId(_s.prjtask_prj_id, expcat_exp_accnt_id) INTO _glaccnt
            FROM expcat
           WHERE (expcat_id=_s.teexp_expcat_id);
        END IF;

        IF (_s.teitem_type = 'T') THEN -- Time sheet record
          _notes := formatdate(_s.teitem_workdate) || E'\t' || _s.item_number ||
                    E'\t' || formatQty(_s.teitem_qty) || ' hours' || E'\t';
          _distamt := _s.rate * _s.teitem_qty;
        ELSE -- Expense record
          _notes := formatdate(_s.teitem_workdate) || E'\t' || _s.item_number ||
                    E'\t' || E'\t';
          _distamt := _s.teitem_total;
        END IF;

        INSERT INTO vodist (vodist_id,          vodist_vohead_id, vodist_poitem_id,
                            vodist_costelem_id, vodist_accnt_id,  vodist_amount,
                            vodist_expcat_id,   vodist_notes)
                    VALUES (_vodistid, _voheadid, -1,
                            -1,        _glaccnt,  _distamt,
                            -1,        _notes);
        _total := _total + _distamt;

        -- Update the te.teitem record with the relationship
        UPDATE te.teitem SET teitem_vodist_id = _vodistid WHERE teitem_id = _s.teitem_id;
     END LOOP;

    UPDATE vohead SET vohead_amount = _total WHERE (vohead_id=_voheadid);
     _total := 0;

  END LOOP;

  RETURN 1;
END;
$$ LANGUAGE 'plpgsql' VOLATILE
