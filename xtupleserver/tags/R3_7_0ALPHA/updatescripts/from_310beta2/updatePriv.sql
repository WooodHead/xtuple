BEGIN;

DELETE FROM usrpriv WHERE usrpriv_priv_id IN (SELECT priv_id FROM priv WHERE priv_name IN ('CreateCRMA','MaintainCRMA','ViewCRMA'));
DELETE FROM priv WHERE priv_module='CRM' AND priv_name IN ('CreateCRMA','MaintainCRMA','ViewCRMA');

COMMIT;