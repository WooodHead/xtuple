UPDATE cohead SET cohead_saletype_id=
  (SELECT saletype_id FROM saletype WHERE saletype_code=CASE cohead_origin WHEN 'C' THEN 'CUST'
                                                                           WHEN 'I' THEN 'INT'
                                                                           WHEN 'S' THEN 'REP' END);

ALTER TABLE cohead DROP COLUMN cohead_origin CASCADE;
