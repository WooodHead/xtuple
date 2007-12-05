BEGIN;

CREATE TABLE womatlpost (
  womatlpost_id SERIAL PRIMARY KEY,
  womatlpost_wo_id INTEGER REFERENCES wo (wo_id),
  womatlpost_invhist_id INTEGER REFERENCES invhist (invhist_id)
);

REVOKE ALL ON TABLE womatlpost FROM PUBLIC;
GRANT  ALL ON TABLE womatlpost TO   mfgadmin;
GRANT  ALL ON TABLE womatlpost TO   GROUP openmfg;

REVOKE ALL ON TABLE womatlpost_womatlpost_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE womatlpost_womatlpost_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE womatlpost_womatlpost_id_seq TO   GROUP openmfg;

COMMENT ON TABLE womatlpost IS 'Table to tie work order to work order material transactions for efficient queries';

COMMIT;