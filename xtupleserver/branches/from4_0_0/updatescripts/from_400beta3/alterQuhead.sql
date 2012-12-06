UPDATE quhead SET quhead_saletype_id=
  (SELECT saletype_id FROM saletype WHERE saletype_code=CASE quhead_origin WHEN 'C' THEN 'CUST'
                                                                           WHEN 'I' THEN 'INT'
                                                                           WHEN 'S' THEN 'REP' END);

ALTER TABLE quhead DROP COLUMN quhead_origin CASCADE;
