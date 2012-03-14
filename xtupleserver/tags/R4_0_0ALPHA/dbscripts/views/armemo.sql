CREATE OR REPLACE VIEW armemo AS 
SELECT aropen_id, aropen_docnumber
FROM aropen
WHERE aropen_doctype IN ('D', 'C', 'R')
UNION  
SELECT cmhead_id, cmhead_number
FROM cmhead;

REVOKE ALL ON TABLE apmemo FROM PUBLIC;
GRANT  ALL ON TABLE apmemo TO xtrole;
