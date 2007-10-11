CREATE OR REPLACE FUNCTION booitem(INTEGER) RETURNS SETOF booitem AS '
DECLARE
  pItemid ALIAS FOR $1;
  _row booitem%ROWTYPE;
  _revid INTEGER;
  _r RECORD;

BEGIN
  --See if revcontrol turned on
  IF (fetchmetricbool(''RevControl'')) THEN
    SELECT rev_id INTO _revid
    FROM rev 
    WHERE ((rev_target_type=''BOO'') 
    AND (rev_target_id=pItemid) 
    AND (rev_status=''A''));
    IF (NOT FOUND) THEN
      _revid:=-1;
    END IF;
  ELSE
    _revid:=-1;
  END IF;
  
  FOR _r IN SELECT *
            FROM booitem(pItemid,_revid)
  LOOP
    _row.booitem_id:=_r.booitem_id;
    _row.booitem_item_id:=_r.booitem_item_id;
    _row.booitem_seqnumber:=_r.booitem_seqnumber;
    _row.booitem_wrkcnt_id:=_r.booitem_wrkcnt_id;
    _row.booitem_stdopn_id:=_r.booitem_stdopn_id;
    _row.booitem_descrip1:=_r.booitem_descrip1;
    _row.booitem_descrip2:=_r.booitem_descrip2;
    _row.booitem_toolref:=_r.booitem_toolref;
    _row.booitem_sutime:=_r.booitem_sutime;
    _row.booitem_sucosttype:=_r.booitem_sucosttype;
    _row.booitem_surpt:=_r.booitem_surpt;
    _row.booitem_rntime:=_r.booitem_rntime;
    _row.booitem_rncosttype:=_r.booitem_rncosttype;
    _row.booitem_rnrpt:=_r.booitem_rnrpt;
    _row.booitem_rnqtyper:=_r.booitem_rnqtyper;
    _row.booitem_produom:=_r.booitem_produom;
    _row.booitem_invproduomratio:=_r.booitem_invproduomratio;
    _row.booitem_issuecomp:=_r.booitem_issuecomp;
    _row.booitem_rcvinv:=_r.booitem_rcvinv;
    _row.booitem_instruc:=_r.booitem_instruc;
    _row.booitem_effective:=_r.booitem_effective;
    _row.booitem_expires:=_r.booitem_expires;
    _row.booitem_configtype:=_r.booitem_configtype;
    _row.booitem_configid:=_r.booitem_configid;
    _row.booitem_pullthrough:=_r.booitem_pullthrough;
    _row.booitem_execday:=_r.booitem_execday;
    _row.booitem_overlap:=_r.booitem_overlap;
    _row.booitem_configflag:=_r.booitem_configflag;
    _row.booitem_issuecomp:=_r.booitem_issuecomp;
    _row.booitem_wip_location_id:=_r.booitem_wip_location_id;
    _row.booitem_rev_id:=_r.booitem_rev_id;
    _row.booitem_seq_id:=_r.booitem_seq_id;

    RETURN NEXT _row;
  END LOOP;

  RETURN;
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION booitem(INTEGER,INTEGER) RETURNS SETOF booitem AS '
DECLARE
  pItemid ALIAS FOR $1;
  pRevid ALIAS FOR $2;
  _row booitem%ROWTYPE;
  _r RECORD;

BEGIN
  --See if revcontrol turned on
  
  FOR _r IN SELECT *
            FROM booitem
            WHERE ((booitem_item_id=pItemid)
            AND (booitem_rev_id=pRevid))
  LOOP
    _row.booitem_id:=_r.booitem_id;
    _row.booitem_item_id:=_r.booitem_item_id;
    _row.booitem_seqnumber:=_r.booitem_seqnumber;
    _row.booitem_wrkcnt_id:=_r.booitem_wrkcnt_id;
    _row.booitem_stdopn_id:=_r.booitem_stdopn_id;
    _row.booitem_descrip1:=_r.booitem_descrip1;
    _row.booitem_descrip2:=_r.booitem_descrip2;
    _row.booitem_toolref:=_r.booitem_toolref;
    _row.booitem_sutime:=_r.booitem_sutime;
    _row.booitem_sucosttype:=_r.booitem_sucosttype;
    _row.booitem_surpt:=_r.booitem_surpt;
    _row.booitem_rntime:=_r.booitem_rntime;
    _row.booitem_rncosttype:=_r.booitem_rncosttype;
    _row.booitem_rnrpt:=_r.booitem_rnrpt;
    _row.booitem_rnqtyper:=_r.booitem_rnqtyper;
    _row.booitem_produom:=_r.booitem_produom;
    _row.booitem_invproduomratio:=_r.booitem_invproduomratio;
    _row.booitem_issuecomp:=_r.booitem_issuecomp;
    _row.booitem_rcvinv:=_r.booitem_rcvinv;
    _row.booitem_instruc:=_r.booitem_instruc;
    _row.booitem_effective:=_r.booitem_effective;
    _row.booitem_expires:=_r.booitem_expires;
    _row.booitem_configtype:=_r.booitem_configtype;
    _row.booitem_configid:=_r.booitem_configid;
    _row.booitem_pullthrough:=_r.booitem_pullthrough;
    _row.booitem_execday:=_r.booitem_execday;
    _row.booitem_overlap:=_r.booitem_overlap;
    _row.booitem_configflag:=_r.booitem_configflag;
    _row.booitem_issuecomp:=_r.booitem_issuecomp;
    _row.booitem_wip_location_id:=_r.booitem_wip_location_id;
    _row.booitem_rev_id:=_r.booitem_rev_id;
    _row.booitem_seq_id:=_r.booitem_seq_id;

    RETURN NEXT _row;
  END LOOP;

  RETURN;
END;
' LANGUAGE 'plpgsql';