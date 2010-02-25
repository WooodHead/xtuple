ALTER TABLE vendinfo ADD vend_ach_enabled       BOOL NOT NULL DEFAULT false;
ALTER TABLE vendinfo ADD vend_ach_routingnumber TEXT NOT NULL DEFAULT '';
ALTER TABLE vendinfo ADD vend_ach_accntnumber   TEXT NOT NULL DEFAULT '';
ALTER TABLE vendinfo ADD vend_ach_accnttype     TEXT CHECK (vend_ach_accnttype IN ('K', 'C'));
ALTER TABLE vendinfo ADD vend_ach_use_vendinfo  BOOL NOT NULL DEFAULT true;
ALTER TABLE vendinfo ADD vend_ach_indiv_number  TEXT NOT NULL DEFAULT '';
ALTER TABLE vendinfo ADD vend_ach_indiv_name    TEXT NOT NULL DEFAULT '';

COMMENT ON COLUMN vendinfo.vend_ach_accnttype IS 'Type of bank account: K = checKing, C = Cash = savings. These values were chosen to be consistent with bankaccnt_type.'
