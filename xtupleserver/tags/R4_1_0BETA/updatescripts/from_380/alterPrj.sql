ALTER TABLE prj ADD COLUMN prj_crmacct_id INTEGER;
ALTER TABLE prj ADD FOREIGN KEY (prj_crmacct_id) REFERENCES crmacct (crmacct_id);

ALTER TABLE prj ADD COLUMN prj_cntct_id INTEGER;
ALTER TABLE prj ADD FOREIGN KEY (prj_cntct_id) REFERENCES cntct (cntct_id);
