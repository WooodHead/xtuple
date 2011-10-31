ALTER TABLE ccard ALTER ccard_cust_id SET NOT NULL,
                  ADD FOREIGN KEY (ccard_cust_id) REFERENCES custinfo(cust_id);
