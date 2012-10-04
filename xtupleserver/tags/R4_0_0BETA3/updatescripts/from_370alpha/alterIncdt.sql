
ALTER TABLE incdt ADD COLUMN incdt_prj_id INTEGER;
ALTER TABLE incdt ADD FOREIGN KEY (incdt_prj_id) REFERENCES prj (prj_id);
ALTER TABLE incdt ADD COLUMN incdt_public BOOLEAN;

