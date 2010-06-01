
DELETE FROM grppriv WHERE grppriv_priv_id IN (SELECT priv_id from priv where priv_name = 'DeleteContacts');
DELETE FROM usrpriv WHERE usrpriv_priv_id IN (SELECT priv_id from priv where priv_name = 'DeleteContacts');
DELETE FROM priv WHERE priv_name = 'DeleteContacts';
UPDATE priv SET priv_descrip = 'Can Add/Edit/Delete Contacts' WHERE priv_name = 'MaintainContacts';

