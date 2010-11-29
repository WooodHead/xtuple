BEGIN;

SELECT dropIfExists('CONSTRAINT', 'usrsite_usrsite_username_fkey');

COMMIT;

