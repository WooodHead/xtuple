UPDATE vendinfo SET vend_cntct1_id=NULL
 WHERE (vend_cntct1_id IS NOT NULL)
   AND NOT EXISTS(SELECT cntct_id FROM cntct WHERE cntct_id=vend_cntct1_id);

UPDATE vendinfo SET vend_cntct2_id=NULL
 WHERE (vend_cntct2_id IS NOT NULL)
   AND NOT EXISTS(SELECT cntct_id FROM cntct WHERE cntct_id=vend_cntct1_id);

ALTER TABLE vendinfo ADD CONSTRAINT vend_vend_cntct1_id_fkey
                                    FOREIGN KEY (vend_cntct1_id)
                                    REFERENCES cntct(cntct_id);

ALTER TABLE vendinfo ADD CONSTRAINT vend_vend_cntct2_id_fkey
                                    FOREIGN KEY (vend_cntct2_id)
                                    REFERENCES cntct(cntct_id);
