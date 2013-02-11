ALTER TABLE womatl ADD COLUMN womatl_issuewo BOOLEAN;
UPDATE womatl SET womatl_issuewo=FALSE;
ALTER TABLE womatl ALTER COLUMN womatl_issuewo SET DEFAULT FALSE;
ALTER TABLE womatl ALTER COLUMN womatl_issuewo SET NOT NULL;
