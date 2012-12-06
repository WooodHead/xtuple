BEGIN;

CREATE SEQUENCE journal_number_seq;
SELECT setval('journal_number_seq', orderseq_number)
   FROM orderseq
   WHERE (orderseq_name='JournalNumber');
ALTER TABLE journal_number_seq OWNER TO mfgadmin;
GRANT ALL ON TABLE journal_number_seq TO GROUP openmfg;

DELETE FROM orderseq WHERE (orderseq_name='JournalNumber');

COMMIT;