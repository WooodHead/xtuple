BEGIN;

DROP FUNCTION calculatesubtax(integer,date,integer,numeric,integer);
DROP FUNCTION calculatetaxdetailsummary(text,integer,text);
DROP FUNCTION calculatetaxdetail(integer,integer,date,integer,numeric);
DROP FUNCTION calculatetaxdetailline(text,integer);
DROP TYPE taxdetail;

COMMIT;