UPDATE apapply SET apapply_vend_id     = NULL WHERE apapply_vend_id < 0;
ALTER TABLE apapply ADD CONSTRAINT apapply_apapply_vend_id_fkey
                                            FOREIGN KEY (apapply_vend_id)
                                            REFERENCES vendinfo (vend_id);
