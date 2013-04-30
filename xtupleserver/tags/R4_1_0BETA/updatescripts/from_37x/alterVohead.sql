UPDATE vohead SET vohead_vend_id     = NULL WHERE vohead_vend_id < 0;
ALTER TABLE vohead ADD CONSTRAINT vohead_vohead_vend_id_fkey
                                            FOREIGN KEY (vohead_vend_id)
                                            REFERENCES vendinfo (vend_id);
