CREATE OR REPLACE FUNCTION postProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN) RETURNS INTEGER AS $$
DECLARE
  pWoid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pBackflush ALIAS FOR $3;
  pBackflushOperations ALIAS FOR $4;
  _itemlocSeries INTEGER;

BEGIN

  SELECT postProduction( pWoid, pQty, pBackflush,
                         pBackflushOperations, 0, '', '' ) INTO _itemlocSeries;

  RETURN _itemlocSeries;

END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION postProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN, INTEGER) RETURNS INTEGER AS $$
DECLARE
  pWoid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pBackflush ALIAS FOR $3;
  pBackflushOperations ALIAS FOR $4;
  pItemlocSeries ALIAS FOR $5;

BEGIN

  RETURN postProduction(pWoid, pQty, pBackflush, pBackflushOperations, pItemlocSeries, '', '');

END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION postProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN, INTEGER, TEXT, TEXT) RETURNS INTEGER AS $$
DECLARE
  pWoid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pBackflush ALIAS FOR $3;
  pBackflushOperations ALIAS FOR $4;
  pItemlocSeries ALIAS FOR $5;
  pSuUser ALIAS FOR $6;
  pRnUser ALIAS FOR $7;
  _woNumber TEXT;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;
  _r RECORD;
  _wooperitem RECORD;
  _parentQty NUMERIC;
  _qty NUMERIC;
  _brddistid INTEGER;
  _suTime NUMERIC;
  _rnTime NUMERIC;
  _check CHAR;
  _wipPost NUMERIC;
BEGIN

  IF (pQty <= 0) THEN
    RETURN 0;
  END IF;

  IF ( ( SELECT wo_status
         FROM wo
         WHERE (wo_id=pWoid) ) NOT IN  ('R','E','I') ) THEN
    RETURN -1;
  END IF;

  --If this is item type Job then we are using the wrong function
  SELECT item_type INTO _check
  FROM wo,itemsite,item
  WHERE ((wo_id=pWoid)
  AND (wo_itemsite_id=itemsite_id)
  AND (itemsite_item_id=item_id)
  AND (item_type = 'J'));
  IF (FOUND) THEN
    RAISE EXCEPTION 'Work orders for job items are posted when quantities are shipped on the associated sales order';
  END IF;
  
  SELECT formatWoNumber(pWoid) INTO _woNumber;

  SELECT roundQty(item_fractional, pQty) INTO _parentQty
  FROM wo, itemsite, item
  WHERE ((wo_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (wo_id=pWoid));

--  Create the material receipt transaction
  IF (pItemlocSeries = 0) THEN
    SELECT NEXTVAL('itemloc_series_seq') INTO _itemlocSeries;
  ELSE
    _itemlocSeries = pItemlocSeries;
  END IF;

  IF (pBackflush) THEN
    FOR _r IN SELECT womatl_id, womatl_qtyper, womatl_scrap, womatl_qtywipscrap,
		     womatl_qtyreq - roundQty(item_fractional, womatl_qtyper * wo_qtyord) AS preAlloc
	      FROM womatl, wo, itemsite, item
	      WHERE ((womatl_issuemethod IN ('L', 'M'))
		AND  (womatl_wo_id=pWoid)
		AND  (womatl_wo_id=wo_id)
		AND  (womatl_itemsite_id=itemsite_id)
		AND  (itemsite_item_id=item_id)) LOOP
      -- CASE says: don't use scrap % if someone already entered actual scrap
      SELECT issueWoMaterial(_r.womatl_id,
			     CASE WHEN _r.womatl_qtywipscrap > _r.preAlloc THEN
			       _parentQty * _r.womatl_qtyper + (_r.womatl_qtywipscrap - _r.preAlloc)
			     ELSE
			       _parentQty * _r.womatl_qtyper * (1 + _r.womatl_scrap)
			     END, _itemlocSeries) INTO _itemlocSeries;

      UPDATE womatl
      SET womatl_issuemethod='L'
      WHERE ( (womatl_issuemethod='M')
       AND (womatl_id=_r.womatl_id) );

    END LOOP;
  END IF;


--  If request, backflush the wooper load
  IF (pBackflushOperations) THEN
    FOR _wooperitem IN SELECT wooper_id, wooper_sutime,
                              wooper_suconsumed, wooper_sucomplete,
                              wooper_rncomplete, wooper_rnqtyper,
                              wooper_invproduomratio,
                              wooper_wo_id, wooper_seqnumber
                       FROM wooper
                       WHERE (wooper_wo_id=pWoid)
                       ORDER BY wooper_seqnumber LOOP

--  Backflush any remaining Setup Time
      IF ( (NOT _wooperitem.wooper_sucomplete) AND
           ( noNeg(_wooperitem.wooper_sutime - 
             _wooperitem.wooper_suconsumed ) > 0) ) THEN
        _suTime := _wooperitem.wooper_sutime;
        PERFORM postSutime(wooper_id, _suTime, TRUE, pSuUser)
        FROM wooper
        WHERE (wooper_id=_wooperitem.wooper_id);
      END IF;

--  Backflush Run Time for the reported Qty.
      IF ( (NOT _wooperitem.wooper_rncomplete) AND 
           (_wooperitem.wooper_invproduomratio <> 0) ) THEN

        _rnTime := (_wooperitem.wooper_rnqtyper / _wooperitem.wooper_invproduomratio * _parentQty);
        PERFORM postRntime(wooper_id, _rnTime, FALSE, pQty, pRnUser )
        FROM wooper
        WHERE (wooper_id=_wooperitem.wooper_id);

        UPDATE wooper
        SET wooper_qtyrcv = (COALESCE(wooper_qtyrcv,0) + _parentQty)
        WHERE (wooper_id=_wooperitem.wooper_id);

      END IF;

--  Insert the wooperpost record
      INSERT INTO wooperpost
             (wooperpost_wo_id, wooperpost_seqnumber,
              wooperpost_username, wooperpost_timestamp,
              wooperpost_qty, wooperpost_su_username, wooperpost_sutime,
              wooperpost_rn_username, wooperpost_rntime)
      VALUES (_wooperitem.wooper_wo_id, _wooperitem.wooper_seqnumber,
              CURRENT_USER, CURRENT_TIMESTAMP,
              _parentQty, pSuUser, _suTime, pRnUser, _rnTime);

    END LOOP;

  END IF;

  SELECT CASE 
           WHEN (wo_cosmethod = 'D') THEN 
             wo_wipvalue
           ELSE 
             round((wo_wipvalue - (wo_postedvalue / wo_qtyord * (wo_qtyord - wo_qtyrcv - pQty))),2)
         END INTO _wipPost
  FROM wo 
  WHERE (wo_id=pWoid);         

  SELECT postInvTrans( itemsite_id, 'RM', _parentQty, 
                       'W/O', 'WO', _woNumber, '', ('Receive Inventory ' || item_number || ' from Manufacturing'),
                       costcat_asset_accnt_id, costcat_wip_accnt_id, _itemlocSeries, CURRENT_DATE,
                       -- the following is only actually used when the item is average costed
                       _wipPost ) INTO _invhistid
  FROM wo, itemsite, item, costcat
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (wo_id=pWoid) );

--  Increase this W/O's received qty decrease its WIP value
  UPDATE wo
  SET wo_qtyrcv = (wo_qtyrcv + _parentQty),
      wo_wipvalue = (wo_wipvalue - (CASE WHEN (itemsite_costmethod='A') THEN _wipPost ELSE (stdcost(itemsite_item_id) * _parentQty)  END))
  FROM itemsite, item
  WHERE ((wo_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (wo_id=pWoid));

--  Make sure the W/O is at issue status
  UPDATE wo
  SET wo_status='I'
  WHERE (wo_id=pWoid);

--  If the parent Item is a Breeder, create or increment brddist
--  records for the Co-Products/By-Products
  IF ( ( SELECT (item_type='B')
         FROM wo, itemsite, item
         WHERE ( (wo_itemsite_id=itemsite_id)
          AND (itemsite_item_id=item_id)
          AND (wo_id=pWoid) ) ) ) THEN
    FOR _r IN SELECT cs.itemsite_id AS c_itemsite_id,
                     bbomitem_qtyper, (bbomitem_qtyper * _parentQty) AS qty
              FROM bbomitem, itemsite AS cs, itemsite AS ps, wo
              WHERE ( (bbomitem_parent_item_id=ps.itemsite_item_id)
               AND (bbomitem_item_id=cs.itemsite_item_id)
               AND (wo_itemsite_id=ps.itemsite_id)
               AND (cs.itemsite_warehous_id=ps.itemsite_warehous_id)
               AND (wo_id=pWoid) ) LOOP

      SELECT brddist_id INTO _brddistid
      FROM brddist
      WHERE ( (NOT brddist_posted)
       AND (brddist_wo_id=pWoid)
       AND (brddist_itemsite_id=_r.c_itemsite_id) );
      IF (FOUND) THEN
        UPDATE brddist
        SET brddist_wo_qty=(brddist_wo_qty + _parentQty),
            brddist_qty = (brddist_qty + _r.qty)
        WHERE (brddist_id=_brddistid);
      ELSE
        INSERT INTO brddist
        ( brddist_wo_id, brddist_wo_qty, brddist_itemsite_id,
          brddist_stdqtyper, brddist_qty, brddist_posted )
        VALUES
        ( pWoid, _parentQty, _r.c_itemsite_id,
          _r.bbomitem_qtyper, _r.qty, FALSE );
      END IF;

    END LOOP;
  END IF;
        

  RETURN _itemlocSeries;

END;
$$ LANGUAGE 'plpgsql';
