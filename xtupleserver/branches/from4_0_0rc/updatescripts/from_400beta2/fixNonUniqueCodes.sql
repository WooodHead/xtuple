CREATE OR REPLACE FUNCTION fixNonUniqueCodes() RETURNS INTEGER AS $$
/* fix non-unique code values where we can.
   we can't do much with user tables except stuff in reasonably unique
   numbers if the original is null.
 */
DECLARE
  _cnt INTEGER := 0;
  _e   RECORD;
  _m   INTEGER;
  _os  RECORD;
  _os1 RECORD;
  _tmp INTEGER;
BEGIN

  UPDATE "char" 
     SET char_name = 'UpgradeError' || CAST(char_id AS TEXT)
   WHERE COALESCE(char_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE addr 
     SET addr_number = 'UpgradeError' || CAST(addr_id AS TEXT)
   WHERE COALESCE(addr_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE atlasmap 
     SET atlasmap_name = 'UpgradeError' || CAST(atlasmap_id AS TEXT)
   WHERE COALESCE(atlasmap_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE bankaccnt 
     SET bankaccnt_name = 'UpgradeError' || CAST(bankaccnt_id AS TEXT)
   WHERE COALESCE(bankaccnt_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE bankadjtype 
     SET bankadjtype_name = 'UpgradeError' || CAST(bankadjtype_id AS TEXT)
   WHERE COALESCE(bankadjtype_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE budghead 
     SET budghead_name = 'UpgradeError' || CAST(budghead_id AS TEXT)
   WHERE COALESCE(budghead_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE calhead 
     SET calhead_name = 'UpgradeError' || CAST(calhead_id AS TEXT)
   WHERE COALESCE(calhead_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE cashrcpt 
     SET cashrcpt_number = 'UpgradeError' || CAST(cashrcpt_id AS TEXT)
   WHERE COALESCE(cashrcpt_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE classcode 
     SET classcode_code = 'UpgradeError' || CAST(classcode_id AS TEXT)
   WHERE COALESCE(classcode_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE cmhead 
     SET cmhead_number = 'UpgradeError' || CAST(cmhead_id AS TEXT)
   WHERE COALESCE(cmhead_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE cmnttype 
     SET cmnttype_name = 'UpgradeError' || CAST(cmnttype_id AS TEXT)
   WHERE COALESCE(cmnttype_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE cohead 
     SET cohead_number = 'UpgradeError' || CAST(cohead_id AS TEXT)
   WHERE COALESCE(cohead_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE company 
     SET company_number = 'UpgradeError' || CAST(company_id AS TEXT)
   WHERE COALESCE(company_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE costcat 
     SET costcat_code = 'UpgradeError' || CAST(costcat_id AS TEXT)
   WHERE COALESCE(costcat_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE costelem 
     SET costelem_type = 'UpgradeError' || CAST(costelem_id AS TEXT)
   WHERE COALESCE(costelem_type, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE crmacct 
     SET crmacct_number = 'UpgradeError' || CAST(crmacct_id AS TEXT)
   WHERE COALESCE(crmacct_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE custgrp 
     SET custgrp_name = 'UpgradeError' || CAST(custgrp_id AS TEXT)
   WHERE COALESCE(custgrp_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE custinfo 
     SET cust_number = 'UpgradeError' || CAST(cust_id AS TEXT)
   WHERE COALESCE(cust_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE custtype 
     SET custtype_code = 'UpgradeError' || CAST(custtype_id AS TEXT)
   WHERE COALESCE(custtype_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE dept 
     SET dept_number = 'UpgradeError' || CAST(dept_id AS TEXT)
   WHERE COALESCE(dept_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE emp 
     SET emp_code = 'UpgradeError' || CAST(emp_id AS TEXT)
   WHERE COALESCE(emp_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE emp 
     SET emp_number = 'UpgradeError' || CAST(emp_id AS TEXT)
   WHERE COALESCE(emp_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE empgrp 
     SET empgrp_name = 'UpgradeError' || CAST(empgrp_id AS TEXT)
   WHERE COALESCE(empgrp_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE evnttype 
     SET evnttype_name = 'UpgradeError' || CAST(evnttype_id AS TEXT)
   WHERE COALESCE(evnttype_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE expcat 
     SET expcat_code = 'UpgradeError' || CAST(expcat_id AS TEXT)
   WHERE COALESCE(expcat_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE flhead 
     SET flhead_name = 'UpgradeError' || CAST(flhead_id AS TEXT)
   WHERE COALESCE(flhead_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE form 
     SET form_name = 'UpgradeError' || CAST(form_id AS TEXT)
   WHERE COALESCE(form_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE freightclass 
     SET freightclass_code = 'UpgradeError' || CAST(freightclass_id AS TEXT)
   WHERE COALESCE(freightclass_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE grp 
     SET grp_name = 'UpgradeError' || CAST(grp_id AS TEXT)
   WHERE COALESCE(grp_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE hnfc 
     SET hnfc_code = 'UpgradeError' || CAST(hnfc_id AS TEXT)
   WHERE COALESCE(hnfc_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE incdtcat 
     SET incdtcat_name = 'UpgradeError' || CAST(incdtcat_id AS TEXT)
   WHERE COALESCE(incdtcat_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE incdtpriority 
     SET incdtpriority_name = 'UpgradeError' || CAST(incdtpriority_id AS TEXT)
   WHERE COALESCE(incdtpriority_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE incdtresolution 
     SET incdtresolution_name = 'UpgradeError' || CAST(incdtresolution_id AS TEXT)
   WHERE COALESCE(incdtresolution_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE incdtseverity 
     SET incdtseverity_name = 'UpgradeError' || CAST(incdtseverity_id AS TEXT)
   WHERE COALESCE(incdtseverity_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE invchead 
     SET invchead_invcnumber = 'UpgradeError' || CAST(invchead_id AS TEXT)
   WHERE COALESCE(invchead_invcnumber, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE ipshead 
     SET ipshead_name = 'UpgradeError' || CAST(ipshead_id AS TEXT)
   WHERE COALESCE(ipshead_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE item 
     SET item_number = 'UpgradeError' || CAST(item_id AS TEXT)
   WHERE COALESCE(item_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE itemalias
     SET itemalias_number = 'UpgradeError' || CAST(itemalias_id AS TEXT)
   WHERE COALESCE(itemalias_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE itemgrp 
     SET itemgrp_name = 'UpgradeError' || CAST(itemgrp_id AS TEXT)
   WHERE COALESCE(itemgrp_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE labelform 
     SET labelform_name = 'UpgradeError' || CAST(labelform_id AS TEXT)
   WHERE COALESCE(labelform_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE locale 
     SET locale_code = 'UpgradeError' || CAST(locale_id AS TEXT)
   WHERE COALESCE(locale_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE metric 
     SET metric_name = 'UpgradeError' || CAST(metric_id AS TEXT)
   WHERE COALESCE(metric_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE metricenc 
     SET metricenc_name = 'UpgradeError' || CAST(metricenc_id AS TEXT)
   WHERE COALESCE(metricenc_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE ophead 
     SET ophead_number = 'UpgradeError' || CAST(ophead_id AS TEXT)
   WHERE COALESCE(ophead_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE opsource 
     SET opsource_name = 'UpgradeError' || CAST(opsource_id AS TEXT)
   WHERE COALESCE(opsource_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE opstage 
     SET opstage_name = 'UpgradeError' || CAST(opstage_id AS TEXT)
   WHERE COALESCE(opstage_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE optype 
     SET optype_name = 'UpgradeError' || CAST(optype_id AS TEXT)
   WHERE COALESCE(optype_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE orderseq 
     SET orderseq_name = 'UpgradeError' || CAST(orderseq_id AS TEXT)
   WHERE COALESCE(orderseq_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE pkghead 
     SET pkghead_name = 'UpgradeError' || CAST(pkghead_id AS TEXT)
   WHERE COALESCE(pkghead_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE plancode 
     SET plancode_code = 'UpgradeError' || CAST(plancode_id AS TEXT)
   WHERE COALESCE(plancode_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE pohead 
     SET pohead_number = 'UpgradeError' || CAST(pohead_id AS TEXT)
   WHERE COALESCE(pohead_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE prftcntr 
     SET prftcntr_number = 'UpgradeError' || CAST(prftcntr_id AS TEXT)
   WHERE COALESCE(prftcntr_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE prj 
     SET prj_number = 'UpgradeError' || CAST(prj_id AS TEXT)
   WHERE COALESCE(prj_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE prodcat 
     SET prodcat_code = 'UpgradeError' || CAST(prodcat_id AS TEXT)
   WHERE COALESCE(prodcat_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE prospect 
     SET prospect_number = 'UpgradeError' || CAST(prospect_id AS TEXT)
   WHERE COALESCE(prospect_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE qryhead 
     SET qryhead_name = 'UpgradeError' || CAST(qryhead_id AS TEXT)
   WHERE COALESCE(qryhead_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE quhead 
     SET quhead_number = 'UpgradeError' || CAST(quhead_id AS TEXT)
   WHERE COALESCE(quhead_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE rjctcode 
     SET rjctcode_code = 'UpgradeError' || CAST(rjctcode_id AS TEXT)
   WHERE COALESCE(rjctcode_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE rsncode 
     SET rsncode_code = 'UpgradeError' || CAST(rsncode_id AS TEXT)
   WHERE COALESCE(rsncode_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE sale 
     SET sale_name = 'UpgradeError' || CAST(sale_id AS TEXT)
   WHERE COALESCE(sale_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE salescat 
     SET salescat_name = 'UpgradeError' || CAST(salescat_id AS TEXT)
   WHERE COALESCE(salescat_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE salesrep 
     SET salesrep_number = 'UpgradeError' || CAST(salesrep_id AS TEXT)
   WHERE COALESCE(salesrep_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE schemaord 
     SET schemaord_name = 'UpgradeError' || CAST(schemaord_id AS TEXT)
   WHERE COALESCE(schemaord_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE shift 
     SET shift_number = 'UpgradeError' || CAST(shift_id AS TEXT)
   WHERE COALESCE(shift_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE shipchrg 
     SET shipchrg_name = 'UpgradeError' || CAST(shipchrg_id AS TEXT)
   WHERE COALESCE(shipchrg_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE shipform 
     SET shipform_name = 'UpgradeError' || CAST(shipform_id AS TEXT)
   WHERE COALESCE(shipform_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE shiphead 
     SET shiphead_number = 'UpgradeError' || CAST(shiphead_id AS TEXT)
   WHERE COALESCE(shiphead_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE shipvia 
     SET shipvia_code = 'UpgradeError' || CAST(shipvia_id AS TEXT)
   WHERE COALESCE(shipvia_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE shipzone 
     SET shipzone_name = 'UpgradeError' || CAST(shipzone_id AS TEXT)
   WHERE COALESCE(shipzone_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE sitetype 
     SET sitetype_name = 'UpgradeError' || CAST(sitetype_id AS TEXT)
   WHERE COALESCE(sitetype_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE source 
     SET source_name = 'UpgradeError' || CAST(source_id AS TEXT)
   WHERE COALESCE(source_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE state 
     SET state_name = 'UpgradeError' || CAST(state_id AS TEXT)
   WHERE COALESCE(state_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE stdjrnl 
     SET stdjrnl_name = 'UpgradeError' || CAST(stdjrnl_id AS TEXT)
   WHERE COALESCE(stdjrnl_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE stdjrnlgrp 
     SET stdjrnlgrp_name = 'UpgradeError' || CAST(stdjrnlgrp_id AS TEXT)
   WHERE COALESCE(stdjrnlgrp_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE subaccnt 
     SET subaccnt_number = 'UpgradeError' || CAST(subaccnt_id AS TEXT)
   WHERE COALESCE(subaccnt_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE tax 
     SET tax_code = 'UpgradeError' || CAST(tax_id AS TEXT)
   WHERE COALESCE(tax_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE taxauth 
     SET taxauth_code = 'UpgradeError' || CAST(taxauth_id AS TEXT)
   WHERE COALESCE(taxauth_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE taxclass 
     SET taxclass_code = 'UpgradeError' || CAST(taxclass_id AS TEXT)
   WHERE COALESCE(taxclass_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE taxtype 
     SET taxtype_name = 'UpgradeError' || CAST(taxtype_id AS TEXT)
   WHERE COALESCE(taxtype_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE taxzone 
     SET taxzone_code = 'UpgradeError' || CAST(taxzone_id AS TEXT)
   WHERE COALESCE(taxzone_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE terms 
     SET terms_code = 'UpgradeError' || CAST(terms_id AS TEXT)
   WHERE COALESCE(terms_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE uom 
     SET uom_name = 'UpgradeError' || CAST(uom_id AS TEXT)
   WHERE COALESCE(uom_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE uomtype 
     SET uomtype_name = 'UpgradeError' || CAST(uomtype_id AS TEXT)
   WHERE COALESCE(uomtype_name, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE vendinfo 
     SET vend_number = 'UpgradeError' || CAST(vend_id AS TEXT)
   WHERE COALESCE(vend_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE vendtype 
     SET vendtype_code = 'UpgradeError' || CAST(vendtype_id AS TEXT)
   WHERE COALESCE(vendtype_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE vohead 
     SET vohead_number = 'UpgradeError' || CAST(vohead_id AS TEXT)
   WHERE COALESCE(vohead_number, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  UPDATE whsinfo 
     SET warehous_code = 'UpgradeError' || CAST(warehous_id AS TEXT)
   WHERE COALESCE(warehous_code, '') = '';
  GET DIAGNOSTICS _tmp = ROW_COUNT;
  _cnt = _cnt + _tmp;

  FOR _os IN SELECT orderseq_name, MAX(orderseq_number) AS maxseq, COUNT(*) AS cnt
               FROM orderseq
              GROUP BY orderseq_name
              HAVING COUNT(*) > 1
  LOOP
    DELETE FROM orderseq
     WHERE orderseq_name = _os.orderseq_name
       AND orderseq_number != _os.maxseq;
    GET DIAGNOSTICS _tmp = ROW_COUNT;
    _cnt := _cnt + _tmp;
    RAISE NOTICE 'orderseq % - deleted % extra copies', _os.orderseq_name, _tmp;
  END LOOP;

  FOR _e IN SELECT evnttype_name, COUNT(*)
              FROM evnttype
             GROUP BY evnttype_name
             HAVING COUNT(*) > 1
  LOOP
    SELECT MIN(evnttype_id) INTO _m
      FROM evnttype
     WHERE evnttype_name = _e.evnttype_name;

    UPDATE evntnot
      SET evntnot_evnttype_id = _m
     WHERE evntnot_evnttype_id IN (SELECT evnttype_id
	         FROM evnttype
	        WHERE evnttype_name = _e.evnttype_name
	          AND evnttype_id  != _m);
    GET DIAGNOSTICS _tmp = ROW_COUNT;
    _cnt := _cnt + _tmp;

    DELETE FROM evnttype
     WHERE evnttype_name = _e.evnttype_name
       AND evnttype_id != _m;

    GET DIAGNOSTICS _tmp = ROW_COUNT;
    RAISE NOTICE 'evnttype % - deleted % extra copies', _e.evnttype_name, _tmp;
  END LOOP;

  RETURN _cnt;
END;
$$ LANGUAGE PLPGSQL;

SELECT fixNonUniqueCodes();

DROP FUNCTION IF EXISTS fixNonUniqueCodes();
