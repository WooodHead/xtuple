BEGIN;

ALTER TABLE itemsite ADD COLUMN itemsite_warrpurc BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE itemsite ADD COLUMN itemsite_warrsell BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE itemsite ADD COLUMN itemsite_warrperiod INTEGER NOT NULL DEFAULT 0;
ALTER TABLE itemsite ADD COLUMN itemsite_warrstart CHAR(1);
ALTER TABLE itemsite ADD CONSTRAINT itemsite_warrstart_check CHECK (((itemsite_warrsell) AND (itemsite_warrstart IS NOT NULL) AND (itemsite_warrstart IN ('S','R')))
						             OR ((NOT itemsite_warrsell) AND (itemsite_warrstart IS NULL)));
ALTER TABLE itemsite ADD CONSTRAINT itemsite_warrperiod_check CHECK ((itemsite_warrperiod >= 0));

COMMIT;
