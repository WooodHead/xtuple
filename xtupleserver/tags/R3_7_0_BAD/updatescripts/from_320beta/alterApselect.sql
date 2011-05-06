BEGIN;

ALTER TABLE apselect ADD UNIQUE (apselect_apopen_id);

COMMIT;