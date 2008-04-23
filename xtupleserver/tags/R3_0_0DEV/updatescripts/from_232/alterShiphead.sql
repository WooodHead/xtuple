BEGIN;

--Changes to make upgrade to 8.3 easier
SELECT dropifexists('view','cosmisc');
SELECT dropifexists('trigger', 'shipheadbeforetrigger');
ALTER TABLE shiphead DROP CONSTRAINT shiphead_shiphead_number_check;
ALTER TABLE shiphead ALTER COLUMN shiphead_number TYPE integer;

COMMIT;