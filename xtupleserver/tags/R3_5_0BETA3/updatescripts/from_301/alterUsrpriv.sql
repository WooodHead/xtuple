DELETE FROM usrpriv WHERE usrpriv_priv_id NOT IN (SELECT priv_id FROM priv);
ALTER TABLE usrpriv ADD FOREIGN KEY (usrpriv_priv_id) REFERENCES priv(priv_id) ON DELETE CASCADE;
