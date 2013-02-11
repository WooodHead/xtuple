ALTER TABLE bomitem ADD COLUMN bomitem_issuewo BOOLEAN;
DROP TRIGGER bomitemTrigger on bomitem;
UPDATE bomitem SET bomitem_issuewo=FALSE;
ALTER TABLE bomitem ALTER COLUMN bomitem_issuewo SET DEFAULT FALSE;
ALTER TABLE bomitem ALTER COLUMN bomitem_issuewo SET NOT NULL;
