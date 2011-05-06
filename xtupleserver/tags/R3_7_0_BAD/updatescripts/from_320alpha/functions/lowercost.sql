CREATE OR REPLACE FUNCTION lowerCost(INTEGER, TEXT) RETURNS NUMERIC AS '
DECLARE
  pItemid	ALIAS FOR $1;
  pCosttype	ALIAS FOR $2;

BEGIN
    RETURN lowerCost(pItemid, pCosttype, TRUE);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION lowerCost(INTEGER, TEXT, BOOLEAN) RETURNS NUMERIC AS '
DECLARE
  pItemid ALIAS FOR $1;
  pCosttype ALIAS FOR $2;
  pActual	ALIAS FOR $3;
  _type CHAR(1);
  _actCost	NUMERIC;
  _actCost1	NUMERIC;
  _actCost2	NUMERIC;
  _stdCost	NUMERIC;
  _stdCost1	NUMERIC;
  _stdCost2	NUMERIC;
  _cost		NUMERIC;
  _cost1	NUMERIC;
  _cost2	NUMERIC;

BEGIN

  SELECT item_type INTO _type
  FROM item
  WHERE (item_id=pItemid);

  -- find the lowercost in the base currency at the current conversion rate
  IF (_type IN (''M'', ''F'', ''B'', ''T'')) THEN
    SELECT SUM( round(currToBase(itemcost_curr_id, itemcost_actcost, CURRENT_DATE),6) * itemuomtouom(bomitem_item_id, bomitem_uom_id, NULL, bomitem_qtyper * (1 + bomitem_scrap)) ),
           SUM( itemcost_stdcost * itemuomtouom(bomitem_item_id, bomitem_uom_id, NULL, bomitem_qtyper * (1 + bomitem_scrap)) )
	INTO _actCost, _stdCost
    FROM itemcost, costelem, bomitem(pItemid)
    WHERE ( (bomitem_parent_item_id=pItemid)
     AND (CURRENT_DATE BETWEEN bomitem_effective AND (bomitem_expires - 1))
     AND (bomitem_item_id=itemcost_item_id)
     AND (itemcost_costelem_id=costelem_id)
     AND (costelem_type=pCosttype) );

    IF (NOT FOUND) THEN
      _actCost := NULL;
      _stdCost := NULL;
    END IF;

    IF (pActual) THEN
	_cost  = _actCost;
    ELSE
	_cost  = _stdCost;
    END IF;

  ELSIF (_type IN (''C'')) THEN
    SELECT ( SUM(currToBase(itemcost_curr_id, itemcost_actcost, CURRENT_DATE) / bbomitem_qtyper) * bbomitem_costabsorb ),
	   ( SUM(itemcost_stdcost / bbomitem_qtyper) * bbomitem_costabsorb )
	INTO _actCost1, _stdCost1
    FROM itemcost, costelem, bbomitem
    WHERE ( (bbomitem_item_id=pItemid)
     AND (CURRENT_DATE BETWEEN bbomitem_effective AND (bbomitem_expires - 1))
     AND (bbomitem_parent_item_id=itemcost_item_id)
     AND (itemcost_costelem_id=costelem_id)
     AND (costelem_type=pCosttype) )
    GROUP BY bbomitem_costabsorb;

    SELECT ( SUM(currToBase(itemcost_curr_id, itemcost_actcost, CURRENT_DATE) * s.bbomitem_qtyper) / t.bbomitem_qtyper *
             t.bbomitem_costabsorb ),
	   ( SUM(itemcost_stdcost * s.bbomitem_qtyper) / t.bbomitem_qtyper *
             t.bbomitem_costabsorb )
	INTO _actCost2, _stdCost2
    FROM itemcost, costelem, bbomitem AS t, bbomitem AS s, item
    WHERE ( (t.bbomitem_item_id=pItemid)
     AND ( CURRENT_DATE BETWEEN s.bbomitem_effective
                        AND (s.bbomitem_expires - 1) )
     AND ( CURRENT_DATE BETWEEN t.bbomitem_effective
                        AND (t.bbomitem_expires - 1) )
     AND (s.bbomitem_parent_item_id=t.bbomitem_parent_item_id)
     AND (s.bbomitem_item_id=itemcost_item_id)
     AND (s.bbomitem_item_id=item_id)
     AND (item_type=''Y'')
     AND (itemcost_costelem_id=costelem_id)
     AND (costelem_type=pCosttype) )
    GROUP BY t.bbomitem_qtyper, t.bbomitem_costabsorb;

    IF (pActual) THEN
	_cost  = _actCost;
	_cost1 = _actCost1;
	_cost2 = _actCost2;
    ELSE
	_cost  = _stdCost;
	_cost1 = _stdCost1;
	_cost2 = _stdCost2;	-- should this be std or act?
    END IF;

    IF (_cost1 IS NULL AND _cost2 IS NULL) THEN
	_cost = NULL;
    ELSE
        _cost = COALESCE(_cost1, 0) + COALESCE(_cost2, 0);
    END IF;

  ELSE
    RETURN NULL;
  END IF;

  RETURN round(_cost,6);

END;
' LANGUAGE 'plpgsql';
