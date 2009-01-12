BEGIN;

ALTER TABLE accnt DROP CONSTRAINT accnt_accnt_profit_fkey;
ALTER TABLE accnt DROP CONSTRAINT accnt_accnt_sub_fkey;

COMMIT;

