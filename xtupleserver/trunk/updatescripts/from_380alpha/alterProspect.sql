ALTER TABLE prospect ADD COLUMN prospect_owner_username TEXT;

UPDATE prospect SET prospect_owner_username = (SELECT crmacct_owner_username
                                               FROM crmacct
                                               WHERE crmacct_prospect_id=prospect_id);
