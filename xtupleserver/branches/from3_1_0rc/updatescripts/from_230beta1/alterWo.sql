BEGIN;

ALTER TABLE wo ADD COLUMN wo_cosmethod CHAR(1);
ALTER TABLE wo ADD CONSTRAINT chk_wo_cosmethod CHECK (wo_cosmethod IN (NULL,'D','P'));

END;