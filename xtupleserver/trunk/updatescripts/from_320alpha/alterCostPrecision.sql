BEGIN;

SELECT dropIfExists('VIEW', 'itemcost', 'api');

ALTER TABLE itemcost ALTER COLUMN itemcost_stdcost TYPE NUMERIC(16,6);
ALTER TABLE itemcost ALTER COLUMN itemcost_actcost TYPE NUMERIC(16,6);

SELECT dropIfExists('VIEW', 'item', 'api');

ALTER TABLE item ALTER COLUMN item_maxcost TYPE NUMERIC(16,6);

COMMIT;
