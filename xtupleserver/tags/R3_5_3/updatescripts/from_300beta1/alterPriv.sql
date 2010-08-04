BEGIN;

UPDATE priv SET priv_name='MaintainScreens' WHERE priv_name='MaintainUIForms';

COMMIT;