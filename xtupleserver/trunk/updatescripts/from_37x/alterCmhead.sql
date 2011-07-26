alter table cmhead add column cmhead_void boolean default false;
UPDATE cmhead SET cmhead_salesrep_id = NULL WHERE cmhead_salesrep_id < 0;
UPDATE cmhead SET cmhead_cust_id     = NULL WHERE cmhead_cust_id < 0;
ALTER TABLE cmhead ADD CONSTRAINT cmhead_cmhead_salesrep_id_fkey
                                            FOREIGN KEY (cmhead_salesrep_id)
                                            REFERENCES salesrep (salesrep_id);
ALTER TABLE cmhead ADD CONSTRAINT cmhead_cmhead_cust_id_fkey
                                            FOREIGN KEY (cmhead_cust_id)
                                            REFERENCES custinfo (cust_id);
