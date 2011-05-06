BEGIN;

ALTER TABLE bankaccnt ADD UNIQUE (bankaccnt_name);

ALTER TABLE bankaccnt ADD bankaccnt_notes          TEXT;
ALTER TABLE bankaccnt ADD bankaccnt_routing        TEXT NOT NULL DEFAULT '';
ALTER TABLE bankaccnt ADD bankaccnt_ach_enabled BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE bankaccnt ADD bankaccnt_ach_defaultorigin BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE bankaccnt ADD bankaccnt_ach_origin     TEXT NOT NULL DEFAULT '';
ALTER TABLE bankaccnt ADD bankaccnt_ach_genchecknum BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE bankaccnt ADD bankaccnt_ach_leadtime   INTEGER;
ALTER TABLE bankaccnt ADD bankaccnt_ach_lastdate   DATE;
ALTER TABLE bankaccnt ADD bankaccnt_ach_lastfileid CHARACTER(1);
COMMIT;
