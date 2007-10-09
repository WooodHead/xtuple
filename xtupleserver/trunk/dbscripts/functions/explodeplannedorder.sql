
CREATE OR REPLACE FUNCTION explodePlannedOrder(INTEGER, BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pPlanordid ALIAS FOR $1;
  pExplodeChildren ALIAS FOR $2;
  _b RECORD;

BEGIN

--  Create Planned Requirements and Orders for manufactured or purchased component items
--  of this Planned Order
  FOR _b IN SELECT planord_number, c.itemsite_id AS componentsiteid,
                   (planord_startdate - c.itemsite_leadtime) AS startdate,
                   planord_startdate AS duedate,
                   bomitem_createwo, item_planning_type,
                   (itemuomtouom(bomitem_item_id, bomitem_uom_id, NULL, bomitem_qtyper * (1 + bomitem_scrap)) * planord_qty) AS qtyreq,
                   item_type
            FROM bomitem, planord, itemsite AS p, itemsite AS c, item
            WHERE ( (planord_itemsite_id=p.itemsite_id)
             AND (bomitem_parent_item_id=p.itemsite_item_id)
             AND (bomitem_item_id=c.itemsite_item_id)
             AND (p.itemsite_warehous_id=c.itemsite_warehous_id)
             AND (c.itemsite_item_id=item_id)
             AND (woEffectiveDate(planord_startdate) BETWEEN bomitem_effective AND (bomitem_expires - 1))
             AND (planord_id=pPlanordid) ) LOOP

    IF (_b.item_type = ''F'') THEN
      PERFORM explodePhantomOrder(pPlanordid, _b.componentsiteid, _b.qtyreq);
    ELSE
--  Create the Planned Requirement
      INSERT INTO planreq
      ( planreq_source, planreq_source_id,
        planreq_itemsite_id, planreq_qty )
      VALUES
      ( ''P'', pPlanordid,
        _b.componentsiteid, _b.qtyreq );

      IF (_b.bomitem_createwo AND _b.item_planning_type != ''N'') THEN
        PERFORM createPlannedOrder( pPlanordid, _b.planord_number, _b.componentsiteid,
                                    _b.qtyreq, _b.startdate, _b.duedate, FALSE, FALSE, NULL );
      END IF;
    END IF;

  END LOOP;

--  Insert the W/O Operations
  INSERT INTO planoper
  (planoper_planord_id, planoper_wrkcnt_id, planoper_sutime, planoper_rntime)
  SELECT planord_id, booitem_wrkcnt_id, booitem_sutime,
         CASE WHEN ((booitem_rnqtyper = 0) OR (booitem_invproduomratio = 0)) THEN 0
              ELSE ((booitem_rntime / booitem_rnqtyper / booitem_invproduomratio) * planord_qty)
         END
  FROM booitem, planord, itemsite
  WHERE ( (planord_itemsite_id=itemsite_id)
   AND (itemsite_item_id=booitem_item_id)
   AND (woEffectiveDate(planord_startdate) >= booitem_effective)
   AND (woEffectiveDate(planord_startdate) < booitem_expires)
   AND (planord_id=pPlanordid) );

  IF (pExplodeChildren) THEN
    PERFORM explodePlannedOrder(planord_id, TRUE)
    FROM planord, itemsite, item
    WHERE ( (planord_itemsite_id=itemsite_id)
     AND (itemsite_item_id=item_id)
     AND (item_type = ''M'')
     AND (planord_planord_id=pPlanordid) );
  END IF;

  RETURN pPlanordid;
END;
' LANGUAGE 'plpgsql';

