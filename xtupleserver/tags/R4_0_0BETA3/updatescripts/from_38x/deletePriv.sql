DELETE FROM usrpriv WHERE usrpriv_priv_id = (SELECT priv_id FROM priv WHERE priv_name='MaintainItemAliases');
DELETE FROM usrpriv WHERE usrpriv_priv_id = (SELECT priv_id FROM priv WHERE priv_name='MaintainItemSubstitutes');
DELETE FROM usrpriv WHERE usrpriv_priv_id = (SELECT priv_id FROM priv WHERE priv_name='MaintainItemOptions');
DELETE FROM priv WHERE priv_name='MaintainItemAliases';
DELETE FROM priv WHERE priv_name='MaintainItemSubstitutes';
DELETE FROM priv WHERE priv_name='MaintainItemOptions';
