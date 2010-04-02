ALTER TABLE salesaccnt ADD salesaccnt_returns_accnt_id INTEGER REFERENCES accnt(accnt_id);
ALTER TABLE salesaccnt ADD salesaccnt_cor_accnt_id INTEGER REFERENCES accnt(accnt_id);
ALTER TABLE salesaccnt ADD salesaccnt_cow_accnt_id INTEGER REFERENCES accnt(accnt_id);
