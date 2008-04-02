BEGIN;

UPDATE shipitem SET shipitem_value = 0 WHERE shipitem_value IS NULL;

COMMIT;

