CREATE OR REPLACE FUNCTION te.addteprj(integer, integer, numeric) RETURNS integer AS $$
DECLARE
pPrjID ALIAS FOR $1;
pCustID ALIAS FOR $2;
pRate ALIAS FOR $3;

BEGIN
--raise notice 'pPrjID=%,pCustID=%,pRate=%', pPrjID, pCustID, pRate;
--if new, do an insert to teprj, else, update
  IF (EXISTS(select teprj_id from te.teprj where teprj_prj_id = pPrjID)) THEN
    update te.teprj set teprj_rate = pRate, teprj_cust_id = pCustID where teprj_prj_id = pPrjID;
  ELSE
    insert into te.teprj(teprj_prj_id,teprj_cust_id,teprj_rate) VALUES (pPrjID,pCustID,pRate);
  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';
