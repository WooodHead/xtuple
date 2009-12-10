BEGIN;

UPDATE usrpref SET usrpref_value = 'so.customerWorkbench' WHERE usrpref_value = 'so.dspCustomerInformation';
UPDATE usrpref SET usrpref_value = 'so.customerWorkbench' WHERE usrpref_value = 'so.CustomerWorkBench';

COMMIT;