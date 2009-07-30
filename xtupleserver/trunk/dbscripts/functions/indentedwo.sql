
CREATE OR REPLACE FUNCTION indentedwo(integer, boolean, boolean) RETURNS SETOF wodata AS $$
DECLARE
   pwoid ALIAS FOR $1;
   pshowindent ALIAS FOR $2;   
   pshowmatl ALIAS FOR $3; 
  _row wodata%ROWTYPE;
  _subrow wodata%ROWTYPE;
  _subsubrow wodata%ROWTYPE;    
  _x RECORD;
  _subx RECORD;
  _subsubx RECORD; 
  _level INTEGER;
   
BEGIN 
    --The wodata_id_type column is used to indicate the source of the wodata_id
    --there are three different tables used wo, womatl and womatlvar
    --wodata_id_type = 1 = wo_id
    --wodata_id_type = 2 = womatl_id
    --wodata_id_type = 3 = womatlvar_id
    --initialise values
    _level := 0;   
    --get top level works orders
    FOR _x IN
       SELECT * FROM wo, itemsite     
       WHERE (wo_id = pwoid)
         AND itemsite_id = wo_itemsite_id         
       ORDER BY wo_number, wo_subnumber
    LOOP
        _row.wodata_id := _x.wo_id;
        _row.wodata_id_type := 1;            
        _row.wodata_number := _x.wo_number;
        _row.wodata_subnumber := _x.wo_subnumber;
        _row.wodata_status := _x.wo_status;
        _row.wodata_startdate := _x.wo_startdate;
        _row.wodata_duedate := _x.wo_duedate;
        _row.wodata_adhoc := _x.wo_adhoc;     
        _row.wodata_itemsite_id := _x.wo_itemsite_id;         
        _row.wodata_qoh := _x.itemsite_qtyonhand;
        _row.wodata_short := noneg(_x.wo_qtyord - _x.wo_qtyrcv);
        _row.wodata_qtyper := null;
        _row.wodata_qtyiss := null;  
        _row.wodata_qtyrcv := _x.wo_qtyrcv;   
        _row.wodata_qtyordreq := _x.wo_qtyord;        
        _row.wodata_scrap := 0;        
        _row.wodata_notes := null;
        _row.wodata_ref := null;       
        _row.wodata_level := _level;                
        RETURN NEXT _row;
        IF (pshowmatl) THEN
          --expand materials      
          FOR _subx IN
             SELECT * FROM indentedwomatl(pwoid, _level)
          LOOP 
                _subrow.wodata_id  := _subx.wodata_id;                     
                _subrow.wodata_id_type := _subx.wodata_id_type;                             
                _subrow.wodata_number := _subx.wodata_number;
                _subrow.wodata_subnumber := _subx.wodata_subnumber;
                _subrow.wodata_status := _subx.wodata_status;
                _subrow.wodata_startdate := _subx.wodata_startdate;
                _subrow.wodata_duedate := _subx.wodata_duedate;
                _subrow.wodata_adhoc := _subx.wodata_adhoc;              
                _subrow.wodata_itemsite_id := _subx.wodata_itemsite_id;                
                _subrow.wodata_qoh := _subx.wodata_qoh;
                _subrow.wodata_short := _subx.wodata_short;                
                _subrow.wodata_qtyper := _subx.wodata_qtyper;
                _subrow.wodata_qtyrcv := _subx.wodata_qtyrcv; 
                _subrow.wodata_qtyiss := _subx.wodata_qtyiss;                
                _subrow.wodata_qtyordreq := _subx.wodata_qtyordreq;                
                _subrow.wodata_scrap := _subx.wodata_scrap;                
                _subrow.wodata_notes := _subx.wodata_notes;
                _subrow.wodata_ref := _subx.wodata_ref;          
                _subrow.wodata_level := _subx.wodata_level;                                           
              RETURN NEXT _subrow;
            END LOOP;
         END IF;          
         --expand next level down               
         FOR _subsubx IN
         SELECT * FROM indentedwo(_x.wo_id, _level + 1, pshowindent, pshowmatl) 
         LOOP 
              _subsubrow.wodata_id  := _subsubx.wodata_id;                     
              _subsubrow.wodata_id_type := _subsubx.wodata_id_type;                        
              _subsubrow.wodata_number := _subsubx.wodata_number;
              _subsubrow.wodata_subnumber := _subsubx.wodata_subnumber;
              _subsubrow.wodata_status := _subsubx.wodata_status;
              _subsubrow.wodata_startdate := _subsubx.wodata_startdate;
              _subsubrow.wodata_duedate := _subsubx.wodata_duedate;
              _subsubrow.wodata_adhoc := _subsubx.wodata_adhoc; 
              _subsubrow.wodata_itemsite_id := _subsubx.wodata_itemsite_id;             
              _subsubrow.wodata_qoh := _subsubx.wodata_qoh;
              _subsubrow.wodata_short := _subsubx.wodata_short;            
              _subsubrow.wodata_qtyper := _subsubx.wodata_qtyper;
              _subsubrow.wodata_qtyiss := _subsubx.wodata_qtyiss;
              _subsubrow.wodata_qtyrcv := _subsubx.wodata_qtyrcv;
              _subsubrow.wodata_qtyordreq := _subsubx.wodata_qtyordreq;            
              _subsubrow.wodata_scrap := _subsubx.wodata_scrap;              
              _subsubrow.wodata_notes :=  _subsubx.wodata_notes;
              _subsubrow.wodata_ref := _subsubx.wodata_ref;              
              _subsubrow.wodata_level := _subsubx.wodata_level;                                            
             RETURN NEXT _subsubrow; 
         END LOOP;                     
  END LOOP;                     
  RETURN;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION indentedwo(integer, integer, boolean, boolean) RETURNS SETOF wodata AS $$
DECLARE
   pwoid ALIAS FOR $1;   
   plevel ALIAS FOR $2;
   pshowindent ALIAS FOR $3;  
   pshowmatl ALIAS FOR $4;  
  _row wodata%ROWTYPE;
  _subrow wodata%ROWTYPE;
  _subsubrow wodata%ROWTYPE;    
  _x RECORD;
  _subx RECORD;
  _subsubx RECORD;
  _index INTEGER;
  _level INTEGER;
   
BEGIN 
    --The wodata id column is used to indicate the source of the id
    --there are three different tables used wo, womatl and womatlvar
    --wodata_id_type = 1 = wo_id
    --wodata_id_type = 2 = womatl_id
    --wodata_id_type = 3 = womatlvar_id
    _level := (plevel + 1);    
    --find all WO with the ordid of the next level up
    FOR _x IN
       SELECT *, getwoqtyscrap(wo_id) AS scrap, getwoqtyiss(wo_id) as iss FROM itemsite,  wo        
       WHERE ((wo_ordid = pwoid)
         AND (wo_ordtype = 'W')
         AND (wo_itemsite_id = itemsite_id))       
       ORDER BY wo_number, wo_subnumber
    LOOP
        _row.wodata_id := _x.wo_id;
        _row.wodata_id_type := 1;                     
        _row.wodata_number := _x.wo_number;
        _row.wodata_subnumber := _x.wo_subnumber;
        _row.wodata_status := _x.wo_status;
        _row.wodata_startdate := _x.wo_startdate;
        _row.wodata_duedate := _x.wo_duedate;
        _row.wodata_adhoc := _x.wo_adhoc;      
        _row.wodata_itemsite_id := _x.wo_itemsite_id;        
        _row.wodata_qoh := _x.itemsite_qtyonhand;
        _row.wodata_short := noneg(_x.wo_qtyord - _x.wo_qtyrcv);
        _row.wodata_qtyper := null; 
        _row.wodata_qtyiss := _x.iss;  
        _row.wodata_qtyrcv := _x.wo_qtyrcv;   
        _row.wodata_qtyordreq := _x.wo_qtyord; 
	_row.wodata_scrap := _x.scrap;  
        _row.wodata_notes := _x.wo_prodnotes;
        _row.wodata_ref := null;        
        _row.wodata_level := plevel;                
        RETURN NEXT _row;  
      --if indentation require expand next level
      IF (pshowindent) THEN    
		IF (pshowmatl) THEN
		   --get materials for this level
		  FOR _subx IN
		     SELECT * FROM indentedwomatl(_x.wo_id, plevel) 
		  LOOP 
			_subrow.wodata_id  := _subx.wodata_id;                     
			_subrow.wodata_id_type := _subx.wodata_id_type;			             
			_subrow.wodata_number := _subx.wodata_number;
			_subrow.wodata_subnumber := _subx.wodata_subnumber;
			_subrow.wodata_status := _subx.wodata_status;
			_subrow.wodata_startdate := _subx.wodata_startdate;
			_subrow.wodata_duedate := _subx.wodata_duedate;
			_subrow.wodata_adhoc := _subx.wodata_adhoc;              
			_subrow.wodata_itemsite_id := _subx.wodata_itemsite_id;		
			_subrow.wodata_qoh := _subx.wodata_qoh;
			_subrow.wodata_short := _subx.wodata_short;                
			_subrow.wodata_qtyper := _subx.wodata_qtyper;
			_subrow.wodata_qtyiss := _subx.wodata_qtyiss; 
			_subrow.wodata_qtyrcv := _subx.wodata_qtyrcv;                
			_subrow.wodata_qtyordreq := _subx.wodata_qtyordreq;                
			_subrow.wodata_scrap := _subx.wodata_scrap;
			_subrow.wodata_notes := _subx.wodata_notes;
			_subrow.wodata_ref := _subx.wodata_ref;          
			_subrow.wodata_level := _subx.wodata_level;                                          
			RETURN NEXT _subrow;
		    END LOOP;
		END IF;  
		  --expand lower levels 
		  FOR _subsubx IN
		    SELECT * FROM indentedwo(_x.wo_id, _level, true, pshowmatl)
		  LOOP 
		    _subsubrow.wodata_id  := _subsubx.wodata_id;                     
		    _subsubrow.wodata_id_type := _subsubx.wodata_id_type; 		      
		    _subsubrow.wodata_number := _subsubx.wodata_number;
		    _subsubrow.wodata_subnumber := _subsubx.wodata_subnumber;
		    _subsubrow.wodata_status := _subsubx.wodata_status;
		    _subsubrow.wodata_startdate := _subsubx.wodata_startdate;
		    _subsubrow.wodata_duedate := _subsubx.wodata_duedate;
		    _subsubrow.wodata_adhoc := _subsubx.wodata_adhoc; 
		    _subsubrow.wodata_itemsite_id := _subsubx.wodata_itemsite_id;		    
		    _subsubrow.wodata_qoh := _subsubx.wodata_qoh;
		    _subsubrow.wodata_short := _subsubx.wodata_short;            
		    _subsubrow.wodata_qtyper := _subsubx.wodata_qtyper;
		    _subsubrow.wodata_qtyiss := _subsubx.wodata_qtyiss;
		    _subsubrow.wodata_qtyrcv := _subsubx.wodata_qtyrcv;
		    _subsubrow.wodata_qtyordreq := _subsubx.wodata_qtyordreq;            
		    _subsubrow.wodata_scrap := _subsubx.wodata_scrap;		    
		    _subsubrow.wodata_notes :=  _subsubx.wodata_notes;
		    _subsubrow.wodata_ref := _subsubx.wodata_ref;              
		    _subsubrow.wodata_level := _subsubx.wodata_level;                                          
		    RETURN NEXT _subsubrow; 
		  END LOOP;    
      END IF;                   
    END LOOP;                          
  RETURN;
END;
$$ LANGUAGE 'plpgsql';

