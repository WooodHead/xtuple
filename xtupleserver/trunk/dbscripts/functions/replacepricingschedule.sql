CREATE OR REPLACE FUNCTION replacepricingschedule(INTEGER, DATE) RETURNS INTEGER AS $$
DECLARE
  pIpsheadId ALIAS FOR $1;
  pEffective ALIAS FOR $2;
  _ipsheadid INTEGER;
  _r RECORD;

BEGIN

  SELECT ipshead_name, COALESCE(ipshead_descrip,'') AS ipshead_descrip INTO _r
  FROM ipshead 
  WHERE (ipshead_id=pIpsheadId);
  IF (FOUND) THEN
    IF (LENGTH(_r.ipshead_descrip) = 0) THEN
      RAISE EXCEPTION 'You can not replace a scedule unless it has a valid description';
    END IF;
    IF (SELECT (COUNT(*) > 0) FROM ipshead WHERE ipshead_name = _r.ipshead_descrip || ' - ' || pEffective) THEN
      RAISE EXCEPTION 'You can not replace the schedule % as it has already been replaced', _r.ipshead_name;
    END IF;
  END IF;
  
  -- Copy the original schedule
  SELECT copypricingschedule(pIpsheadId) INTO _ipsheadid;

  -- Copy the assignments
  INSERT INTO ipsass
  (ipsass_ipshead_id, ipsass_cust_id, ipsass_custtype_id, ipsass_custtype_pattern,
   ipsass_shipto_id, ipsass_shipto_pattern)
  SELECT _ipsheadid, ipsass_cust_id, ipsass_custtype_id, ipsass_custtype_pattern,
   ipsass_shipto_id, ipsass_shipto_pattern
  FROM ipsass
  WHERE (ipsass_ipshead_id=pIpsheadId);

  -- Expire the old one
  UPDATE ipshead SET ipshead_expires = pEffective
  WHERE ipshead_id = pIpsheadId;

  -- Update the name of the new one
  UPDATE ipshead SET 
    ipshead_name = _r.ipshead_descrip || ' - ' || pEffective::text,
    ipshead_effective = pEffective
  WHERE (ipshead_id=_ipsheadid);

  RETURN _ipsheadid;

END;
$$ LANGUAGE 'plpgsql';