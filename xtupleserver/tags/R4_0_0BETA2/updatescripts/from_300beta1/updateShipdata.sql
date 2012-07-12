
UPDATE shipdata SET shipdata_shiphead_number=shiphead_number
FROM shiphead JOIN cohead ON ((shiphead_order_id=cohead_id)
                          AND (shiphead_order_type='SO'))
WHERE (TRIM(cohead_number)=TRIM(shipdata_cohead_number));

