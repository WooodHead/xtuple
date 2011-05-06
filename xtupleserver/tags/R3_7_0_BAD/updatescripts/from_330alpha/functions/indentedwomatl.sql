
CREATE OR REPLACE FUNCTION indentedwomatl(integer, integer) RETURNS SETOF wodata AS $$
DECLARE
   pwoid ALIAS FOR $1;   
   plevel ALIAS FOR $2;
  _status TEXT; 
  _subrow wodata%ROWTYPE;  
  _subx RECORD;
  _level INTEGER;
   
BEGIN
  --The wodata id column is used to indicate the source of the id
  --there are three different tables used wo, womatl and womatlvar
  --wodata_id_type = 1 = wo_id
  --wodata_id_type = 2 = womatl_id
  --wodata_id_type = 3 = womatlvar_id
  _level := plevel + 1;
  --find if works order is closed
  SELECT wo_status FROM wo WHERE wo_id = pwoid  LIMIT 1 INTO _status;
  --if works order is close get material history
  IF(_status = 'C') THEN            
    FOR _subx IN
    SELECT * FROM  womatlvar, wo, itemsite
     WHERE womatlvar_number = wo_number
     AND   womatlvar_subnumber = wo_subnumber
     AND   wo_id = pwoid
     AND   womatlvar_component_itemsite_id = itemsite_id
     AND NOT womatlvar_component_itemsite_id IN (select wo_itemsite_id FROM wo WHERE wo_ordid = pwoid)   
     ORDER BY womatlvar_number, womatlvar_subnumber
     LOOP 
       _subrow.wodata_id := _subx.womatlvar_id;                    
       _subrow.wodata_id_type := 3;      
       _subrow.wodata_number := _subx.womatlvar_number;
       _subrow.wodata_subnumber := _subx.womatlvar_subnumber;
       _subrow.wodata_status := _status;
       _subrow.wodata_startdate := _subx.wo_startdate;
       _subrow.wodata_duedate := _subx.wo_duedate;
       _subrow.wodata_adhoc := null;             
       _subrow.wodata_itemsite_id := _subx.womatlvar_component_itemsite_id;       
       _subrow.wodata_qoh := _subx.itemsite_qtyonhand;
       _subrow.wodata_short := 0;        
       _subrow.wodata_qtyper := _subx.womatlvar_qtyper;
       _subrow.wodata_qtyiss := _subx.womatlvar_qtyiss;
       _subrow.wodata_qtyrcv := null;
       _subrow.wodata_qtyordreq := noneg(_subx.womatlvar_qtyord * _subx.womatlvar_qtyper);        
       _subrow.wodata_scrap := _subx.womatlvar_scrap;       
       _subrow.wodata_notes := _subx.womatlvar_notes;
       _subrow.wodata_ref := _subx.womatlvar_ref;      
       _subrow.wodata_level := _level;                                          
       RETURN NEXT _subrow;
     END LOOP;             
  ELSE
     FOR _subx IN
     SELECT * FROM womatl, wo, itemsite
     WHERE wo_id = womatl_wo_id
     AND wo_id = pwoid
     AND womatl_itemsite_id = itemsite_id
     AND NOT womatl_itemsite_id IN (select wo_itemsite_id FROM wo WHERE wo_ordid = pwoid) 
     LOOP
       _subrow.wodata_id := _subx.womatl_id;
       _subrow.wodata_id_type  := 2;       
       _subrow.wodata_number := _subx.wo_number;
       _subrow.wodata_subnumber := _subx.wo_subnumber;
       _subrow.wodata_status := _status;
       _subrow.wodata_startdate := _subx.wo_startdate;
       _subrow.wodata_duedate := _subx.wo_duedate;
       _subrow.wodata_adhoc := null; 
       _subrow.wodata_itemsite_id := _subx.womatl_itemsite_id;    
       _subrow.wodata_qoh := _subx.itemsite_qtyonhand;
       if((_subx.itemsite_qtyonhand > (_subx.womatl_qtyreq - _subx.womatl_qtyiss))) THEN
           _subrow.wodata_short := 0;
         ELSE
           _subrow.wodata_short := (_subx.womatl_qtyreq - _subx.womatl_qtyiss) -  _subx.itemsite_qtyonhand;
       END IF;
       _subrow.wodata_qtyper := _subx.womatl_qtyper;
       _subrow.wodata_qtyiss := _subx.womatl_qtyiss;  
       _subrow.wodata_qtyrcv := null;       
       _subrow.wodata_qtyordreq := _subx.womatl_qtyreq;        
       _subrow.wodata_scrap := _subx.womatl_scrap;        
       _subrow.wodata_notes := _subx.womatl_notes;
       _subrow.wodata_ref := _subx.womatl_ref;       
       _subrow.wodata_level := _level;                                   
       RETURN NEXT _subrow;
     END LOOP;            
  END IF;       
  RETURN;
END;
$$ LANGUAGE 'plpgsql';

