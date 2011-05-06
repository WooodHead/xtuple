BEGIN;

--Take out some trash
ALTER TABLE bomitem DROP COLUMN bomitem_configtype;
ALTER TABLE bomitem DROP COLUMN bomitem_configid;
ALTER TABLE bomitem DROP COLUMN bomitem_configflag;

COMMIT;