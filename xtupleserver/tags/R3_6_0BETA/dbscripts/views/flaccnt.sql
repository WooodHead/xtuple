SELECT dropifexists('VIEW', 'flaccnt');
CREATE OR REPLACE VIEW flaccnt AS 
(
  SELECT flhead_type, flitem.*, 
    accnt_id, accnt_type, accnt_company,accnt_profit, accnt_number, accnt_sub,
    -1 AS prj_id
  FROM  flhead
    JOIN flitem ON (flhead_id=flitem_flhead_id)
    JOIN accnt ON (flitem_accnt_id=accnt_id)
  UNION ALL
  SELECT flhead_type, flitem.*, 
    accnt_id, accnt_type, accnt_company, accnt_profit, accnt_number,accnt_sub,
    -1 AS prj_id
  FROM  flhead
    JOIN flitem ON (flhead_id=flitem_flhead_id),
    accnt	
  WHERE ((flitem_accnt_id=-1)
   AND ((accnt_type=flitem_type)
   OR (accnt_company=flitem_company)
   OR (accnt_profit=flitem_profit)
   OR (accnt_number=flitem_number)
   OR (accnt_sub=flitem_sub)
   OR (accnt_subaccnttype_code=flitem_subaccnttype_code)))
  ORDER BY accnt_company, accnt_profit,accnt_number,accnt_sub
);

GRANT ALL ON flaccnt TO xtrole;