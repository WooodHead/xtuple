BEGIN;

ALTER TABLE checkhead ADD column checkhead_cmhead_id INTEGER REFERENCES cmhead (cmhead_id);

COMMIT;