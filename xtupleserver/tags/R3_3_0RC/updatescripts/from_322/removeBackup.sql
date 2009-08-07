BEGIN;

DELETE FROM metric WHERE metric_name = 'BackupAccountName';

DELETE FROM usrpriv WHERE usrpriv_priv_id IN
  (SELECT priv_id FROM priv WHERE priv_name IN ('ConfigureBackupServer','BackupServer'));

DELETE FROM priv WHERE priv_name IN ('ConfigureBackupServer','BackupServer');

COMMIT;

