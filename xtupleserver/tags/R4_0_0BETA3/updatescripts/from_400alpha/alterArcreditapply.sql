-- make sure there is nothing in this table, it's just a temp table for wip anyway
delete from arcreditapply;
-- set the cashrcptitem sequence on this so we have a guaranteed unique id between them. we need this for "pending" a/r applications
alter table arcreditapply alter column arcreditapply_id set default nextval('cashrcptitem_cashrcptitem_id_seq'::regclass);