CREATE OR REPLACE FUNCTION bomitem(INTEGER) RETURNS SETOF bomitem AS '
DECLARE
  pItemid ALIAS FOR $1;
  _row bomitem%ROWTYPE;
  _revid INTEGER;
  _r RECORD;

BEGIN
  --See if revcontrol turned on
  IF (fetchmetricbool(''RevControl'')) THEN
    SELECT rev_id INTO _revid
    FROM rev 
    WHERE ((target_type=''BOM'') 
    AND (target_id=pItemid) 
    AND (rev_status=''A''));
    IF (NOT FOUND) THEN
      _revid:=-1;
    END IF;
  ELSE
    _revid:=-1;
  END IF;
  
  FOR _r IN SELECT *
            FROM bomitem(pItemid,_revid)
  LOOP
    _row.bomitem_id:=_r.bomitem_id;
    _row.bomitem_parent_item_id:=_r.bomitem_parent_item_id;
    _row.bomitem_seqnumber:=_r.bomitem_seqnumber;
    _row.bomitem_item_id:=_r.bomitem_item_id;
    _row.bomitem_qtyper:=_r.bomitem_qtyper;
    _row.bomitem_scrap:=_r.bomitem_scrap;
    _row.bomitem_booitem_id:=_r.bomitem_booitem_id;
    _row.bomitem_status:=_r.bomitem_status;
    _row.bomitem_effective:=_r.bomitem_effective;
    _row.bomitem_expires:=_r.bomitem_expires;
    _row.bomitem_createwo:=_r.bomitem_createwo;
    _row.bomitem_issuemethod:=_r.bomitem_issuemethod;
    _row.bomitem_configtype:=_r.bomitem_configtype;
    _row.bomitem_configid:=_r.bomitem_configid;
    _row.bomitem_schedatwooper:=_r.bomitem_schedatwooper;
    _row.bomitem_ecn:=_r.bomitem_ecn;
    _row.bomitem_moddate:=_r.bomitem_moddate;
    _row.bomitem_configflag:=_r.bomitem_configflag;
    _row.bomitem_subtype:=_r.bomitem_subtype;
    _row.bomitem_uom_id:=_r.bomitem_uom_id;
    _row.bomitem_rev_id:=_r.bomitem_rev_id;

    RETURN NEXT _row;
  END LOOP;

  RETURN;
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION bomitem(INTEGER,INTEGER) RETURNS SETOF bomitem AS '
DECLARE
  pItemid ALIAS FOR $1;
  pRevid ALIAS FOR $2;
  _row bomitem%ROWTYPE;
  _r RECORD;

BEGIN
  --See if revcontrol turned on
  
  FOR _r IN SELECT *
            FROM bomitem
            WHERE ((bomitem_parent_item_id=pItemid)
            AND (bomitem_rev_id=pRevid))
  LOOP
    _row.bomitem_id:=_r.bomitem_id;
    _row.bomitem_parent_item_id:=_r.bomitem_parent_item_id;
    _row.bomitem_seqnumber:=_r.bomitem_seqnumber;
    _row.bomitem_item_id:=_r.bomitem_item_id;
    _row.bomitem_qtyper:=_r.bomitem_qtyper;
    _row.bomitem_scrap:=_r.bomitem_scrap;
    _row.bomitem_booitem_id:=_r.bomitem_booitem_id;
    _row.bomitem_status:=_r.bomitem_status;
    _row.bomitem_effective:=_r.bomitem_effective;
    _row.bomitem_expires:=_r.bomitem_expires;
    _row.bomitem_createwo:=_r.bomitem_createwo;
    _row.bomitem_issuemethod:=_r.bomitem_issuemethod;
    _row.bomitem_configtype:=_r.bomitem_configtype;
    _row.bomitem_configid:=_r.bomitem_configid;
    _row.bomitem_schedatwooper:=_r.bomitem_schedatwooper;
    _row.bomitem_ecn:=_r.bomitem_ecn;
    _row.bomitem_moddate:=_r.bomitem_moddate;
    _row.bomitem_configflag:=_r.bomitem_configflag;
    _row.bomitem_subtype:=_r.bomitem_subtype;
    _row.bomitem_uom_id:=_r.bomitem_uom_id;
    _row.bomitem_rev_id:=_r.bomitem_rev_id;

    RETURN NEXT _row;
  END LOOP;

  RETURN;
END;
' LANGUAGE 'plpgsql';