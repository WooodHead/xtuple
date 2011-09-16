UPDATE apopen SET apopen_vend_id     = NULL WHERE apopen_vend_id < 0;
ALTER TABLE apopen ADD CONSTRAINT apopen_apopen_vend_id_fkey
                                            FOREIGN KEY (apopen_vend_id)
                                            REFERENCES vendinfo (vend_id);
