BEGIN;

INSERT INTO priv (priv_module, priv_name, priv_descrip) 
VALUES ('CRM', 'EditOwner', 'Can Edit Owner in CRM documents');

COMMIT;