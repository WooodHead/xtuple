ALTER TABLE aropen DISABLE TRIGGER aropentrigger;
UPDATE aropen SET aropen_salesrep_id = NULL WHERE aropen_salesrep_id < 0;
UPDATE aropen SET aropen_cust_id     = NULL WHERE aropen_cust_id < 0;

ALTER TABLE aropen ADD CONSTRAINT aropen_aropen_salesrep_id_fkey
                                            FOREIGN KEY (aropen_salesrep_id)
                                            REFERENCES salesrep (salesrep_id);
ALTER TABLE aropen ADD CONSTRAINT aropen_aropen_cust_id_fkey
                                            FOREIGN KEY (aropen_cust_id)
                                            REFERENCES custinfo (cust_id);
ALTER TABLE aropen ENABLE TRIGGER aropentrigger;
