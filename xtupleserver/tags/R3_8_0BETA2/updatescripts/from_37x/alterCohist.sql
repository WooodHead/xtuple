UPDATE cohist SET cohist_salesrep_id = NULL WHERE cohist_salesrep_id < 0;
UPDATE cohist SET cohist_cust_id     = NULL WHERE cohist_cust_id < 0;
ALTER TABLE cohist ADD CONSTRAINT cohist_cohist_salesrep_id_fkey
                                            FOREIGN KEY (cohist_salesrep_id)
                                            REFERENCES salesrep (salesrep_id);
ALTER TABLE cohist ADD CONSTRAINT cohist_cohist_cust_id_fkey
                                            FOREIGN KEY (cohist_cust_id)
                                            REFERENCES custinfo (cust_id);
