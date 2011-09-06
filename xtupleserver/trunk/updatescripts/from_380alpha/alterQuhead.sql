ALTER TABLE quhead ADD COLUMN quhead_owner_username TEXT;

UPDATE quhead SET quhead_owner_username = COALESCE( (SELECT crmacct_owner_username
                                                     FROM crmacct
                                                     WHERE crmacct_prospect_id=quhead_cust_id),
                                                    (SELECT crmacct_owner_username
                                                     FROM crmacct
                                                     WHERE crmacct_cust_id=quhead_cust_id) );
