CREATE OR REPLACE FUNCTION postInvTrans( INTEGER, TEXT, NUMERIC,
                                         TEXT, TEXT, TEXT, TEXT, TEXT,
                                         INTEGER, INTEGER, INTEGER) RETURNS INTEGER AS $$
BEGIN
  RETURN postInvTrans($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP, NULL);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION postInvTrans( INTEGER, TEXT, NUMERIC,
                                         TEXT, TEXT, TEXT, TEXT, TEXT,
                                         INTEGER, INTEGER, INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS $$
BEGIN
  RETURN postInvTrans($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NULL);
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION postInvTrans( INTEGER, TEXT, NUMERIC,
                                         TEXT, TEXT, TEXT, TEXT, TEXT,
                                         INTEGER, INTEGER, INTEGER, TIMESTAMP WITH TIME ZONE, NUMERIC) RETURNS INTEGER AS $$
DECLARE
  pItemsiteid	ALIAS FOR $1;
  pTransType	ALIAS FOR $2;
  pQty		ALIAS FOR $3;
  pModule	ALIAS FOR $4;
  pOrderType	ALIAS FOR $5;
  pOrderNumber	ALIAS FOR $6;
  pDocNumber	ALIAS FOR $7;
  pComments	ALIAS FOR $8;
  pDebitid	ALIAS FOR $9;
  pCreditid	ALIAS FOR $10;
  pItemlocSeries ALIAS FOR $11;
  _timestamp    TIMESTAMP WITH TIME ZONE := $12;
  pCostOvrld    ALIAS FOR $13;
  _creditid	 INTEGER;
  _debitid	 INTEGER;
  _glreturn	 INTEGER;
  _invhistid	 INTEGER;
  _r		 RECORD;
  _sense	 INTEGER;	-- direction in which to adjust inventory QOH
  _t		 RECORD;
  _xferwhsid	 INTEGER;

BEGIN

  SELECT CASE WHEN(itemsite_costmethod='A') THEN COALESCE(abs(pCostOvrld / pQty), avgcost(itemsite_id))
              ELSE stdCost(itemsite_item_id)
         END AS cost,
         itemsite_costmethod,
         itemsite_qtyonhand,
	 itemsite_warehous_id,
         ( (item_type IN ('R','J')) OR (itemsite_controlmethod = 'N') ) AS nocontrol,
         (itemsite_controlmethod IN ('L', 'S')) AS lotserial,
         (itemsite_loccntrl) AS loccntrl,
         (((NOT itemsite_controlmethod IN ('L', 'S')) AND (NOT itemsite_loccntrl)) OR (pItemlocseries = 0)) AS post,
         itemsite_freeze AS frozen INTO _r
  FROM itemsite, item
  WHERE ( (itemsite_item_id=item_id)
    AND  (itemsite_id=pItemsiteid) );

  --  Post the Inventory Transactions
  IF (NOT _r.nocontrol) THEN

    SELECT NEXTVAL('invhist_invhist_id_seq') INTO _invhistid;

    IF ((_timestamp IS NULL) OR (CAST(_timestamp AS date)=CURRENT_DATE)) THEN
      _timestamp := CURRENT_TIMESTAMP;
    END IF;

    IF (pTransType = 'TS' OR pTransType = 'TR') THEN
      SELECT * INTO _t FROM tohead WHERE (tohead_number=pOrderNumber);
      IF (pTransType = 'TS') THEN
	_xferwhsid := CASE
	    WHEN (_t.tohead_src_warehous_id=_r.itemsite_warehous_id) THEN _t.tohead_trns_warehous_id
	    WHEN (_t.tohead_trns_warehous_id=_r.itemsite_warehous_id AND pComments ~* 'recall') THEN _t.tohead_src_warehous_id
	    WHEN (_t.tohead_trns_warehous_id=_r.itemsite_warehous_id) THEN _t.tohead_dest_warehous_id
	    WHEN (_t.tohead_dest_warehous_id=_r.itemsite_warehous_id) THEN _t.tohead_trns_warehous_id
	    ELSE NULL
	    END;
      ELSIF (pTransType = 'TR') THEN
	_xferwhsid := CASE
	    WHEN (_t.tohead_src_warehous_id=_r.itemsite_warehous_id) THEN _t.tohead_trns_warehous_id
	    WHEN (_t.tohead_trns_warehous_id=_r.itemsite_warehous_id AND pComments ~* 'recall') THEN _t.tohead_dest_warehous_id
	    WHEN (_t.tohead_trns_warehous_id=_r.itemsite_warehous_id) THEN _t.tohead_src_warehous_id
	    WHEN (_t.tohead_dest_warehous_id=_r.itemsite_warehous_id) THEN _t.tohead_trns_warehous_id
	    ELSE NULL
	    END;
      END IF;
    END IF;


    -- increase inventory: AD RM RT RP RR RS RX RB TR
    -- decrease inventory: IM IB IT SH SI EX
    -- TS and TR are special: shipShipment and recallShipment should not change
    -- QOH at the Transfer Order src whs (as this was done by issueToShipping)
    -- but postReceipt should change QOH at the transit whs
    IF (pTransType='TS') THEN
      _sense := CASE WHEN (SELECT tohead_trns_warehous_id=_r.itemsite_warehous_id
			   FROM tohead
			   WHERE (tohead_number=pOrderNumber)) THEN -1
			   ELSE 0
			   END;
    ELSIF (pTransType='TR') THEN
      _sense := CASE WHEN (SELECT tohead_src_warehous_id=_r.itemsite_warehous_id
			   FROM tohead
			   WHERE (tohead_number=pOrderNumber)) THEN 0
			   ELSE 1
			   END;
    ELSIF (pTransType IN ('IM', 'IB', 'IT', 'SH', 'SI', 'EX')) THEN
      _sense := -1;

    ELSE
      _sense := 1;
    END IF;

    IF((_r.itemsite_costmethod='A') AND (_r.itemsite_qtyonhand + (_sense * pQty)) < 0) THEN
      -- Can not let average costed itemsites go negative
      RAISE EXCEPTION 'This transaction will cause an Average Costed item to go negative which is not allowed.';
      RETURN -2;
    END IF;

    INSERT INTO invhist
    ( invhist_id, invhist_itemsite_id, invhist_transtype, invhist_transdate,
      invhist_invqty, invhist_qoh_before,
      invhist_qoh_after,
      invhist_costmethod, invhist_value_before, invhist_value_after,
      invhist_ordtype, invhist_ordnumber, invhist_docnumber, invhist_comments,
      invhist_invuom, invhist_unitcost, invhist_xfer_warehous_id, invhist_posted )
    SELECT
      _invhistid, itemsite_id, pTransType, _timestamp,
      pQty, itemsite_qtyonhand,
      (itemsite_qtyonhand + (_sense * pQty)),
      itemsite_costmethod, itemsite_value, itemsite_value + (_r.cost * _sense * pQty),
      pOrderType, pOrderNumber, pDocNumber, pComments,
      uom_name, _r.cost, _xferwhsid, FALSE
    FROM itemsite, item, uom
    WHERE ( (itemsite_item_id=item_id)
     AND (item_inv_uom_id=uom_id)
     AND (itemsite_id=pItemsiteid) );

    --  If not lot/serial/location controlled or frozen Adjust QOH now, 
    --  otherwise it will happen later
    IF ((_r.post) AND (NOT _r.frozen)) THEN
      PERFORM postInvHist(_invhistid);
    END IF;

    IF (pCreditid IN (SELECT accnt_id FROM accnt)) THEN
      _creditid = pCreditid;
    ELSE
      SELECT warehous_default_accnt_id INTO _creditid
      FROM itemsite, warehous
      WHERE ( (itemsite_warehous_id=warehous_id)
        AND  (itemsite_id=pItemsiteid) );
    END IF;

    IF (pDebitid IN (SELECT accnt_id FROM accnt)) THEN
      _debitid = pDebitid;
    ELSE
      SELECT warehous_default_accnt_id INTO _debitid
      FROM itemsite, warehous
      WHERE ( (itemsite_warehous_id=warehous_id)
        AND  (itemsite_id=pItemsiteid) );
    END IF;

--  Post the G/L Transaction
    IF (_creditid <> _debitid) THEN
      SELECT insertGLTransaction(pModule, pOrderType, pOrderNumber, pComments,
				 _creditid, _debitid, _invhistid,
				 (_r.cost * pQty), _timestamp::DATE, _r.post) INTO _glreturn;
    END IF;

    --  Distribute this if this itemsite is controlled
    IF ( (_r.lotserial OR _r.loccntrl)
        AND (pItemlocSeries > 0) ) THEN

      INSERT INTO itemlocdist
      ( itemlocdist_itemsite_id, itemlocdist_source_type,
        itemlocdist_reqlotserial,
        itemlocdist_distlotserial,
        itemlocdist_expiration,
        itemlocdist_qty,
        itemlocdist_series, itemlocdist_invhist_id,
        itemlocdist_order_type, itemlocdist_order_id )
      SELECT pItemsiteid, 'O',
             (((pQty * _sense) > 0)  AND _r.lotserial),
	     ((pQty * _sense) < 0),
             endOfTime(),
             (_sense * pQty),
             pItemlocSeries, _invhistid,
             pOrderType, 
             CASE 
               WHEN pOrderType='SO' THEN
                 getSalesLineItemId(pOrderNumber)
               ELSE NULL
             END;

    -- These records will be used for posting G/L transactions to trial balance after records committed.
    -- If we try to do it now concurrency locking prevents any transacitons while
    -- user enters item distribution information.  Cant have that.
      INSERT INTO itemlocpost ( itemlocpost_glseq, itemlocpost_itemlocseries)
      VALUES ( _glreturn, pItemlocSeries );
    END IF;

    RETURN _invhistid;
  ELSE
    RETURN -1;
  END IF;

END;
$$ LANGUAGE 'plpgsql';
