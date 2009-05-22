CREATE OR REPLACE FUNCTION calcCmitemAmt(INTEGER) RETURNS NUMERIC AS $$
DECLARE
  pCmitemid ALIAS FOR $1;
  _amount NUMERIC := 0;

BEGIN

  SELECT COALESCE(round((cmitem_qtycredit * cmitem_qty_invuomratio) *
                        (cmitem_unitprice / cmitem_price_invuomratio), 2), 0) INTO _amount
  FROM cmitem
  WHERE (cmitem_id=pCmitemid);

  RETURN _amount;

END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION calcCmitemTax(INTEGER) RETURNS NUMERIC AS $$
DECLARE
  pCmitemid ALIAS FOR $1;
  _amount NUMERIC := 0;

BEGIN

  SELECT COALESCE(SUM(taxhist_tax), 0) INTO _amount
  FROM cmitem JOIN cmitemtax ON (taxhist_parent_id=cmitem_id)
  WHERE (cmitem_id=pCmitemid);

  RETURN _amount;

END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION calcCmheadAmt(INTEGER) RETURNS NUMERIC AS $$
DECLARE
  pCmheadid ALIAS FOR $1;
  _amount NUMERIC := 0;

BEGIN

  SELECT SUM(COALESCE(calcCmitemAmt(cmitem_id), 0)) INTO _amount
  FROM cmhead JOIN cmitem ON (cmhead_id=cmitem_cmhead_id)
  WHERE (cmhead_id=pCmheadid);

  RETURN _amount;

END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION calcCmheadTax(INTEGER) RETURNS NUMERIC AS $$
DECLARE
  pCmheadid ALIAS FOR $1;
  _headamount NUMERIC := 0;
  _itemamount NUMERIC := 0;
  _amount NUMERIC := 0;

BEGIN

  SELECT COALESCE(SUM(taxhist_tax), 0) INTO _headamount
  FROM cmhead JOIN cmheadtax ON (taxhist_parent_id=cmhead_id)
  WHERE (cmhead_id=pCmheadid);

  SELECT SUM(COALESCE(calcCmitemTax(cmitem_id), 0)) INTO _itemamount
  FROM cmhead JOIN cmitem ON (cmhead_id=cmitem_cmhead_id)
  WHERE (cmhead_id=pCmheadid);

  _amount := _headamount + _itemamount;
  RETURN _amount;

END;
$$ LANGUAGE 'plpgsql';
