CREATE OR REPLACE FUNCTION calculatetaxdetailsummary(text, integer, text)
  RETURNS SETOF taxdetail AS
$BODY$
DECLARE
  pOrderType ALIAS FOR $1;
  pOrderId ALIAS FOR $2;
  pDisplayType ALIAS FOR $3;
  _row taxdetail%ROWTYPE;
  _qry text;
  _qry1 text;
  _totaltax numeric;
  _x RECORD;
  _y RECORD;
  
BEGIN
   _totaltax=0.0;
 IF pOrderType = 'S' OR pOrderType = 'Q' THEN
   
   IF pOrderType = 'S' THEN
     _qry := 'SELECT ' || 'COALESCE(cohead_taxzone_id, -1) AS taxzone_id, cohead_orderdate AS order_date,' ;
     _qry := _qry || 'cohead_curr_id AS curr_id, COALESCE(coitem_taxtype_id, -1) AS taxtype_id, ';
     _qry := _qry || 'ROUND((coitem_qtyord * coitem_qty_invuomratio) * (coitem_price / coitem_price_invuomratio),2) AS amount ';
     _qry := _qry || ' FROM cohead, coitem ';
     _qry := _qry || ' Where coitem_cohead_id = ' || pOrderId ;
     _qry := _qry || ' AND ' || 'cohead_id = coitem_cohead_id';
   ELSEIF  pOrderType = 'Q' THEN
     _qry := 'SELECT ' || 'COALESCE(quhead_taxzone_id, -1) AS taxzone_id, quhead_quotedate AS order_date,' ;
     _qry := _qry || 'quhead_curr_id AS curr_id, COALESCE(quitem_taxtype_id, -1) AS taxtype_id, ';
     _qry := _qry || 'ROUND((quitem_qtyord * quitem_qty_invuomratio) * (quitem_price / quitem_price_invuomratio),2) AS amount ';
     _qry := _qry || ' FROM quhead, quitem ';
     _qry := _qry || ' Where quitem_quhead_id = ' || pOrderId ;
     _qry := _qry || ' AND ' || 'quhead_id = quitem_quhead_id'; 
  END IF;

  
     
  FOR _x IN EXECUTE _qry
  LOOP  
   _qry1 := 'SELECT * from calculatetaxdetail(' || _x.taxzone_id || ',' || _x.taxtype_id || ',''' || _x.order_date || ''',' || _x.curr_id  || ',' || _x.amount || ')';
   FOR _y IN  EXECUTE _qry1
   LOOP
   _row.taxdetail_tax_id=_y.taxdetail_tax_id;
   _row.taxdetail_tax_code = _y.taxdetail_tax_code;
   _row.taxdetail_tax_descrip = _y.taxdetail_tax_descrip;
   _row.taxdetail_tax = _y.taxdetail_tax;
   _row.taxdetail_level=_y.taxdetail_level;
   _row.taxdetail_taxclass_sequence= _y.taxdetail_taxclass_sequence;
   _totaltax = _totaltax + _y.taxdetail_tax;
  RETURN NEXT _row;
  END LOOP;
  END LOOP;

  IF pDisplayType = 'T' THEN
   IF pOrderType = 'S' THEN 
    _qry := 'SELECT COALESCE(cohead_taxzone_id, -1) AS taxzone_id, cohead_orderdate AS order_date,' ;
    _qry := _qry || 'cohead_curr_id AS curr_id, cohead_freight AS freight ';
    _qry := _qry || 'FROM cohead WHERE cohead_id = ' || pOrderId ;
   ELSEIF  pOrderType = 'Q' THEN 
    _qry := 'SELECT COALESCE(quhead_taxzone_id, -1) AS taxzone_id, quhead_quotedate AS order_date,' ;
    _qry := _qry || 'quhead_curr_id AS curr_id, quhead_freight AS freight ';
    _qry := _qry || 'FROM quhead WHERE quhead_id = ' || pOrderId;
   END IF;
   EXECUTE _qry INTO _x; 
   _qry1 := 'SELECT * from calculatetaxdetail(' || _x.taxzone_id || ', getfreighttaxtypeid(),''' || _x.order_date || ''',' || _x.curr_id  || ',' || _x.freight || ')';

  FOR _y IN  EXECUTE _qry1
   LOOP
   _row.taxdetail_tax_id=_y.taxdetail_tax_id;
   _row.taxdetail_tax_code = _y.taxdetail_tax_code;
   _row.taxdetail_tax_descrip = _y.taxdetail_tax_descrip;
   _row.taxdetail_tax = _y.taxdetail_tax;
   _row.taxdetail_level=_y.taxdetail_level;
   _row.taxdetail_taxclass_sequence= _y.taxdetail_taxclass_sequence;
   _totaltax = _totaltax + _y.taxdetail_tax;
   RETURN NEXT _row;
   END LOOP;
  END IF;
  

 ELSEIF pOrderType = 'I' OR pOrderType = 'B' THEN
   IF pOrderType = 'I' AND (pDisplayType='L' OR pDisplayType='T') THEN
    _qry := 'SELECT taxhist_tax_id as tax_id, tax_code, tax_descrip, taxhist_tax, taxhist_sequence ';
    _qry := _qry || 'FROM invchead, invcitemtax LEFT OUTER JOIN tax ON (taxhist_tax_id=tax_id) ';
    _qry := _qry || 'LEFT OUTER JOIN invcitem ON (invcitem_id=taxhist_parent_id) ';
    _qry := _qry || ' Where invcitem_invchead_id = ' || pOrderId ;
    _qry := _qry || ' AND ' || 'invchead_id = invcitem_invchead_id';
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
  IF pOrderType = 'I' AND (pDisplayType='F' OR pDisplayType='T') THEN
    _qry := 'SELECT taxhist_tax_id as tax_id, tax_code, tax_descrip, taxhist_tax, taxhist_sequence ';
    _qry := _qry || 'FROM invcheadtax LEFT OUTER JOIN tax ON (taxhist_tax_id=tax_id) ';
    _qry := _qry || 'LEFT OUTER JOIN invchead ON (invchead_id=taxhist_parent_id) ';
    _qry := _qry || ' Where (invchead_id = ' || pOrderId || ') AND (taxhist_taxtype_id=getfreighttaxtypeid())';
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
 IF pOrderType = 'I' AND (pDisplayType='A' OR pDisplayType='T') THEN
   _qry := 'SELECT taxhist_tax_id as tax_id, tax_code, tax_descrip, taxhist_tax, taxhist_sequence ';
    _qry := _qry || 'FROM invcheadtax LEFT OUTER JOIN tax ON (taxhist_tax_id=tax_id) ';
    _qry := _qry || 'LEFT OUTER JOIN invchead ON (invchead_id=taxhist_parent_id) ';
    _qry := _qry || ' WHERE (invchead_id = ' || pOrderId || ') AND (taxhist_taxtype_id=getadjustmenttaxtypeid())';
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
   IF pOrderType = 'B' AND (pDisplayType='L' OR pDisplayType='T') THEN
    _qry := 'SELECT taxhist_tax_id as tax_id, tax_code, tax_descrip, taxhist_tax, taxhist_sequence ';
    _qry := _qry || 'FROM cobmisc, cobilltax LEFT OUTER JOIN tax ON (taxhist_tax_id=tax_id) ';
    _qry := _qry || 'LEFT OUTER JOIN cobill ON (cobill_id=taxhist_parent_id) ';
    _qry := _qry || ' Where cobill_cobmisc_id = ' || pOrderId ;
    _qry := _qry || ' AND ' || 'cobmisc_id = cobill_cobmisc_id';
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
  IF pOrderType = 'B' AND (pDisplayType='F' OR pDisplayType='T') THEN
    _qry := 'SELECT taxhist_tax_id as tax_id, tax_code, tax_descrip, taxhist_tax, taxhist_sequence ';
    _qry := _qry || 'FROM cobmisctax LEFT OUTER JOIN tax ON (taxhist_tax_id=tax_id) ';
    _qry := _qry || 'LEFT OUTER JOIN cobmisc ON (cobmisc_id=taxhist_parent_id) ';
    _qry := _qry || ' Where (cobmisc_id = ' || pOrderId || ') AND (taxhist_taxtype_id=getfreighttaxtypeid())';
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
 IF pOrderType = 'B' AND (pDisplayType='A' OR pDisplayType='T') THEN
   _qry := 'SELECT taxhist_tax_id as tax_id, tax_code, tax_descrip, taxhist_tax, taxhist_sequence ';
    _qry := _qry || 'FROM cobmisctax LEFT OUTER JOIN tax ON (taxhist_tax_id=tax_id) ';
    _qry := _qry || 'LEFT OUTER JOIN cobmisc ON (cobmisc_id=taxhist_parent_id) ';
    _qry := _qry || ' WHERE (cobmisc_id = ' || pOrderId || ') AND (taxhist_taxtype_id=getadjustmenttaxtypeid())';
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


END IF;
 IF _totaltax <> 0.0 THEN
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