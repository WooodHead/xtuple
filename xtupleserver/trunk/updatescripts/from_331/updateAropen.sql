BEGIN;

UPDATE aropen SET aropen_open=true, aropen_closedate = NULL WHERE (NOT aropen_open) AND (aropen_paid < aropen_amount);

COMMIT;