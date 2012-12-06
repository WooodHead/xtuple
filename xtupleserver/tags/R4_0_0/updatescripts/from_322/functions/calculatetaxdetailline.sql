CREATE OR REPLACE FUNCTION calculatetaxdetailline(text, integer)
  RETURNS SETOF taxdetail AS
$BODY$
DECLARE
  pOrderType ALIAS FOR $1;
  pOrderId ALIAS FOR $2;
  _row taxdetail%ROWTYPE;
  _qry text;
  _totaltax numeric;
  _y RECORD;
  
BEGIN
   _totaltax=0.0;

   IF pOrderType = 'II'  THEN
    _qry := 'SELECT taxhist_tax_id as tax_id, tax_code, tax_descrip, taxhist_tax, taxhist_sequence ';
    _qry := _qry || 'FROM invcitemtax LEFT OUTER JOIN tax ON (taxhist_tax_id=tax_id) ';
    _qry := _qry || 'LEFT OUTER JOIN invcitem ON (invcitem_id=taxhist_parent_id) ';
    _qry := _qry || ' Where invcitem_id = ' || pOrderId ;
    
   FOR _y IN  EXECUTE _qry
   LOOP
   _row.taxdetail_tax_id=_y.tax_id;
   _row.taxdetail_tax_code = _y.tax_code;
   _row.taxdetail_tax_descrip = _y.tax_descrip;
   _row.taxdetail_tax = _y.taxhist_tax;
   _row.taxdetail_level= 0 ;
   _row.taxdetail_taxclass_sequence= _y.taxhist_sequence;
   _totaltax = _totaltax + _y.taxhist_tax;
   RETURN NEXT _row;
   END LOOP;
 END IF;
  
  IF pOrderType = 'BI' THEN
    _qry := 'SELECT taxhist_tax_id as tax_id, tax_code, tax_descrip, COALESE(taxhist_tax, taxhist_amount, taxhist_sequence ';
    _qry := _qry || 'FROM cobilltax LEFT OUTER JOIN tax ON (taxhist_tax_id=tax_id) ';
    _qry := _qry || 'LEFT OUTER JOIN cobill ON (cobill_id=taxhist_parent_id) ';
    _qry := _qry || ' Where cobill_id = ' || pOrderId ;
   FOR _y IN  EXECUTE _qry
   LOOP
   _row.taxdetail_tax_id=_y.tax_id;
   _row.taxdetail_tax_code = _y.tax_code;
   _row.taxdetail_tax_descrip = _y.tax_descrip;
   _row.taxdetail_tax = _y.taxhist_tax;
   _row.taxdetail_level= 0 ;
   _row.taxdetail_taxclass_sequence= _y.taxhist_sequence;
   _totaltax = _totaltax + _y.taxhist_tax;
   RETURN NEXT _row;
   END LOOP;
 END IF;
  
 IF _totaltax > 0.0 THEN
  _row.taxdetail_tax_id=-1;
  _row.taxdetail_tax_code = 'Total';
  _row.taxdetail_tax_descrip = NULL;
  _row.taxdetail_tax = _totaltax;
  _row.taxdetail_level=0;
  _row.taxdetail_taxclass_sequence= NULL;
  RETURN NEXT _row;
 END IF;
 END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;