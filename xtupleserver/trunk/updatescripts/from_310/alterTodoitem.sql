BEGIN;

ALTER TABLE todoitem ADD COLUMN todoitem_priority_id INTEGER;
UPDATE todoitem SET todoitem_priority_id=(SELECT incdt_incdtpriority_id FROM incdt WHERE (incdt_id=todoitem_incdt_id)) WHERE todoitem_incdt_id IS NOT NULL;

COMMIT;