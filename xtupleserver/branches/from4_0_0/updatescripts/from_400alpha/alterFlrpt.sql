ALTER TABLE flrpt ADD COLUMN flrpt_id serial;
ALTER TABLE flrpt ADD PRIMARY KEY (flrpt_id);
GRANT ALL ON SEQUENCE flrpt_flrpt_id_seq TO xtrole;