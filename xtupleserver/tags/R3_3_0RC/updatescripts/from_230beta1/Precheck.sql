--  All outstanding issues to shipping must be shipped for this upgrade to proceed.
SELECT COUNT(*)=0 FROM shiphead,shipitem WHERE ((shiphead_id=shipitem_shiphead_id) AND (NOT shiphead_shipped));
