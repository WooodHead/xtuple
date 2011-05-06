ALTER TABLE grppriv DROP CONSTRAINT grppriv_grppriv_priv_id_fkey;
ALTER TABLE grppriv ADD FOREIGN KEY (grppriv_priv_id) REFERENCES priv(priv_id) ON DELETE CASCADE;
