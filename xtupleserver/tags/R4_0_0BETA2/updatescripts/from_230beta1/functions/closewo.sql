CREATE OR REPLACE FUNCTION closeWo(INTEGER, BOOLEAN, BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pWoid ALIAS FOR $1;
  pPostMaterialVariances ALIAS FOR $2;
  pPostLaborVariances ALIAS FOR $3;
  _woNumber TEXT;
  _check CHAR;

BEGIN

  --If this is item type Job then we cannot close here
  SELECT item_type INTO _check
  FROM wo,itemsite,item
  WHERE ((wo_id=pWoid)
  AND (wo_itemsite_id=itemsite_id)
  AND (itemsite_item_id=item_id)
  AND (item_type = ''J''));
  IF (FOUND) THEN
    RAISE EXCEPTION ''Work orders for Job items are closed when all quantities are shipped'';
  END IF;

  SELECT formatWoNumber(pWoid) INTO _woNumber;

--  Distribute any remaining wo_wipvalue to G/L - debit Inventory Cost, credit WIP
  PERFORM insertGLTransaction( ''W/O'', ''WO'', _woNumber, ''Manufacturing Inventory Cost Variance'',
                               costcat_wip_accnt_id, costcat_invcost_accnt_id, -1,
                               wo_wipvalue, CURRENT_DATE )
  FROM wo, itemsite, costcat
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (wo_id=pWoid) );

--  Distribute any remaining wo_brdvalue to G/L - debit Inventory Cost, credit WIP
  PERFORM insertGLTransaction( ''W/O'', ''WO'', _woNumber, ''Breeder Inventory Cost Variance'',
                               costcat_wip_accnt_id, costcat_invcost_accnt_id, -1,
                               wo_brdvalue, CURRENT_DATE )
  FROM wo, itemsite, costcat
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (wo_id=pWoid) );

--  Don''t bother with posting variances if the qtyrcv is 0 as
--  they are meaningless.
  IF ( ( SELECT wo_qtyrcv
         FROM wo
         WHERE (wo_id=pWoid) ) > 0 ) THEN

    IF (pPostMaterialVariances) THEN
--  Post womatl variances
      INSERT INTO womatlvar
      ( womatlvar_number, womatlvar_subnumber, womatlvar_posted,
        womatlvar_parent_itemsite_id, womatlvar_component_itemsite_id,
        womatlvar_qtyord, womatlvar_qtyrcv,
        womatlvar_qtyiss, womatlvar_qtyper,
        womatlvar_scrap, womatlvar_wipscrap, womatlvar_bomitem_id )
      SELECT wo_number, wo_subnumber, CURRENT_DATE,
             wo_itemsite_id, womatl_itemsite_id,
             wo_qtyord, wo_qtyrcv,
             itemuomtouom(itemsite_item_id, womatl_uom_id, NULL, womatl_qtyiss),
             itemuomtouom(itemsite_item_id, womatl_uom_id, NULL, womatl_qtyper),
             womatl_scrap,
             itemuomtouom(itemsite_item_id, womatl_uom_id, NULL, womatl_qtywipscrap),
             womatl_bomitem_id
      FROM wo, womatl, itemsite
      WHERE ((womatl_wo_id=wo_id)
       AND (womatl_itemsite_id=itemsite_id)
       AND (wo_id=pWoid));
    END IF;

    IF (pPostLaborVariances) THEN
--  Post wooper variances
      INSERT INTO woopervar
      ( woopervar_number, woopervar_subnumber, woopervar_seqnumber, woopervar_posted,
        woopervar_parent_itemsite_id, woopervar_booitem_id, woopervar_wrkcnt_id,
        woopervar_qtyord, woopervar_qtyrcv,
        woopervar_stdsutime, woopervar_sutime,
        woopervar_stdrntime, woopervar_rntime )
      SELECT wo_number, wo_subnumber, wooper_seqnumber, CURRENT_DATE,
             wo_itemsite_id, wooper_booitem_id, wooper_wrkcnt_id,
             wo_qtyord, wo_qtyrcv,
             wooper_sutime, wooper_suconsumed,
             wooper_rntime, wooper_rnconsumed
      FROM wo, wooper
      WHERE ((wooper_wo_id=wo_id)
       AND (wo_id=pWoid));
    END IF;

  END IF;

--  Post Breeder distribution variances for Breeder parent item if we received on the WO
  IF ( ( SELECT (item_type=''B'')
         FROM wo, itemsite, item
         WHERE ( (wo_itemsite_id=itemsite_id)
          AND (itemsite_item_id=item_id)
	  AND (wo_qtyrcv > 0)
          AND (wo_id=pWoid) ) ) ) THEN
    INSERT INTO brdvar
    ( brdvar_postdate, brdvar_wonumber, brdvar_parent_itemsite_id, brdvar_itemsite_id,
      brdvar_wo_qty, brdvar_stdqtyper, brdvar_actqtyper )
    SELECT CURRENT_DATE, _woNumber, wo_itemsite_id, brddist_itemsite_id,
           SUM(brddist_wo_qty), brddist_stdqtyper,
	   CASE WHEN (SUM(brddist_wo_qty)=0) THEN ''NaN'' -- any qty is unexpected
	        ELSE (SUM(brddist_qty) / SUM(brddist_wo_qty))
	   END
    FROM brddist, wo
    WHERE ( (brddist_wo_id=wo_id)
     AND (brddist_wo_id=pWoid) )
    GROUP BY wo_itemsite_id, brddist_itemsite_id, brddist_stdqtyper;

    DELETE FROM brddist
    WHERE (brddist_wo_id=pWoid);
  END IF;

--  Delete any P/R''s created for this W/O
  PERFORM deletePr(''W'', womatl_id)
  FROM womatl
  WHERE (womatl_wo_id=pWoid);

-- The following lines commented out for version 2.1 
-- and moved to purgeClosedWorkOrders.cpp where
-- wo rows are removed

--  DELETE FROM womatl
--  WHERE (womatl_wo_id=pWoid);

--  DELETE FROM wooper
--  WHERE (wooper_wo_id=pWoid);

  UPDATE wo
  SET wo_wipvalue = 0, wo_brdvalue=0,
      wo_status=''C''
  WHERE (wo_id=pWoid);

  RETURN 1;
END;
' LANGUAGE 'plpgsql';
