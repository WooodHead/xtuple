CREATE TABLE ccbank (ccbank_id           SERIAL  PRIMARY KEY,
                     ccbank_ccard_type   TEXT    NOT NULL UNIQUE CHECK (ccbank_ccard_type IN ('A', 'D', 'M', 'P', 'V')),
                     ccbank_bankaccnt_id INTEGER REFERENCES bankaccnt(bankaccnt_id)
                    );

REVOKE ALL ON ccbank FROM PUBLIC;
GRANT  ALL ON ccbank TO   xtrole;

REVOKE ALL ON ccbank_ccbank_id_seq FROM PUBLIC;
GRANT  ALL ON ccbank_ccbank_id_seq TO   xtrole;

INSERT INTO ccbank (ccbank_ccard_type, ccbank_bankaccnt_id) VALUES
                   ('A', fetchMetricValue('CCDefaultBank'));
INSERT INTO ccbank (ccbank_ccard_type, ccbank_bankaccnt_id) VALUES
                   ('D', fetchMetricValue('CCDefaultBank'));
INSERT INTO ccbank (ccbank_ccard_type, ccbank_bankaccnt_id) VALUES
                   ('M', fetchMetricValue('CCDefaultBank'));
INSERT INTO ccbank (ccbank_ccard_type, ccbank_bankaccnt_id) VALUES
                   ('P', fetchMetricValue('CCDefaultBank'));
INSERT INTO ccbank (ccbank_ccard_type, ccbank_bankaccnt_id) VALUES
                   ('V', fetchMetricValue('CCDefaultBank'));
