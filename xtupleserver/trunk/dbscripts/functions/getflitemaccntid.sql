CREATE OR REPLACE FUNCTION getflitemaccntid(int4)
  RETURNS SETOF int4 STABLE AS $$
DECLARE
  pFlitemId ALIAS FOR $1;
  _x RECORD;
  _p RECORD;
  
BEGIN

  SELECT flitem_accnt_id,
        flitem_type,
        flitem_company,
        flitem_profit,
        flitem_number,
        flitem_sub,
        flitem_subaccnttype_code
  FROM flitem
  WHERE (flitem_id=pFlitemId )
  INTO _p;

  IF _p.flitem_accnt_id > -1 THEN
    RETURN NEXT _p.flitem_accnt_id;
  ELSE
    FOR _x  IN SELECT accnt_id FROM accnt
        WHERE   (
            ((_p.flitem_type='') OR (accnt_type=_p.flitem_type))
        AND ((_p.flitem_company='All') OR (accnt_company=_p.flitem_company))
        AND ((_p.flitem_profit='All') OR (accnt_profit=_p.flitem_profit))
        AND ((_p.flitem_number='All') OR (accnt_number=_p.flitem_number))
        AND ((_p.flitem_sub='All') OR (accnt_sub=_p.flitem_sub))
        AND ((_p.flitem_subaccnttype_code='All') OR (accnt_subaccnttype_code=_p.flitem_subaccnttype_code))
                )
    ORDER BY accnt_company, accnt_profit,accnt_number,accnt_sub
    LOOP
      RETURN NEXT _x.accnt_id;
    END LOOP;
  END IF;
  RETURN;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getflitemaccntid(int4, INTEGER)
  RETURNS SETOF int4 STABLE AS $$
DECLARE
  pFlitemId ALIAS FOR $1;
  pPrjid ALIAS FOR $2;
  _x RECORD;
BEGIN
  -- Project Accounting required to make use of Project Id
  FOR _x IN 
    SELECT * FROM getflitemaccntid(pFlitemId)
  LOOP
    RETURN NEXT _x.getflitemaccntid;
  END LOOP;
  
  RETURN;
  
END;
$$ LANGUAGE 'plpgsql';