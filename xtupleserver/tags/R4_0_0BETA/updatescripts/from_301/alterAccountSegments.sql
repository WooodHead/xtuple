BEGIN;

ALTER TABLE accnt ADD FOREIGN KEY (accnt_company) REFERENCES company(company_number) ON UPDATE CASCADE;
ALTER TABLE accnt ADD FOREIGN KEY (accnt_profit)  REFERENCES prftcntr(prftcntr_number) ON UPDATE CASCADE;
ALTER TABLE accnt ADD FOREIGN KEY (accnt_sub)     REFERENCES subaccnt(subaccnt_number) ON UPDATE CASCADE;

COMMIT;
