UPDATE priv SET priv_name = 'ViewJournals', priv_descrip = 'Can view Journals' WHERE priv_name = 'ViewSubLedger';
UPDATE priv SET priv_name = 'PostJournals', priv_descrip = 'Can post Journals' WHERE priv_name = 'PostSubLedger';
