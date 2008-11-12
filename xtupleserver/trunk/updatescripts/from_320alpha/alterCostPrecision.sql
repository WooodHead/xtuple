BEGIN;

ALTER TABLE asohist ALTER COLUMN asohist_unitcost TYPE NUMERIC(16,6);
ALTER TABLE bbomitem ALTER COLUMN bbomitem_costabsorb TYPE NUMERIC(16,6);
ALTER TABLE bomhist ALTER COLUMN bomhist_stdunitcost TYPE NUMERIC(16,6);
ALTER TABLE bomhist ALTER COLUMN bomhist_actunitcost TYPE NUMERIC(16,6);
ALTER TABLE bomwork ALTER COLUMN bomwork_stdunitcost TYPE NUMERIC(16,6);
ALTER TABLE bomwork ALTER COLUMN bomwork_actunitcost TYPE NUMERIC(16,6);

SELECT dropIfExists('VIEW', 'saleshistory');
SELECT dropIfExists('VIEW', 'saleshistory', 'api');
ALTER TABLE cohist ALTER COLUMN cohist_unitcost TYPE NUMERIC(18,6);

SELECT dropIfExists('VIEW', 'salesquoteitem');
SELECT dropIfExists('VIEW', 'orderitem');
SELECT dropIfExists('VIEW', 'salesline', 'api');
ALTER TABLE coitem ALTER COLUMN coitem_unitcost TYPE NUMERIC(16,6);
ALTER TABLE coitem ALTER COLUMN coitem_prcost TYPE NUMERIC(16,6);

ALTER TABLE costhist ALTER COLUMN costhist_oldcost TYPE NUMERIC(16,6);
ALTER TABLE costhist ALTER COLUMN costhist_newcost TYPE NUMERIC(16,6);
ALTER TABLE invcnt ALTER COLUMN invcnt_matcost TYPE NUMERIC(16,6);
ALTER TABLE invhist ALTER COLUMN invhist_unitcost TYPE NUMERIC(16,6);

SELECT dropIfExists('VIEW', 'item', 'api');
ALTER TABLE item ALTER COLUMN item_maxcost TYPE NUMERIC(16,6);

SELECT dropIfExists('VIEW', 'itemcost', 'api');
ALTER TABLE itemcost ALTER COLUMN itemcost_stdcost TYPE NUMERIC(16,6);
ALTER TABLE itemcost ALTER COLUMN itemcost_actcost TYPE NUMERIC(16,6);

ALTER TABLE poitem ALTER COLUMN poitem_stdcost TYPE NUMERIC(16,6);

SELECT dropIfExists('VIEW', 'quoteline', 'api');
ALTER TABLE quitem ALTER COLUMN quitem_unitcost TYPE NUMERIC(16,6);
ALTER TABLE quitem ALTER COLUMN quitem_prcost TYPE NUMERIC(16,6);

SELECT dropIfExists('VIEW', 'porecv');
ALTER TABLE recv ALTER COLUMN recv_purchcost TYPE NUMERIC(16,6);
ALTER TABLE recv ALTER COLUMN recv_recvcost TYPE NUMERIC(16,6);
ALTER TABLE toitem ALTER COLUMN toitem_stdcost TYPE NUMERIC(16,6);
ALTER TABLE wo ALTER COLUMN wo_wipvalue TYPE NUMERIC(16,6);
ALTER TABLE wo ALTER COLUMN wo_postedvalue TYPE NUMERIC(16,6);
ALTER TABLE wo ALTER COLUMN wo_brdvalue TYPE NUMERIC(16,6);
ALTER TABLE womatl ALTER COLUMN womatl_cost TYPE NUMERIC(16,6);

COMMIT;
