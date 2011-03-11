BEGIN;

ALTER TABLE checkitem ADD COLUMN checkitem_cmnumber INTEGER;
ALTER TABLE checkitem ADD COLUMN checkitem_ranumber INTEGER;

END;