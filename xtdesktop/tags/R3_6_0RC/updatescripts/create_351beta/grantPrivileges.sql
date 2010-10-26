-- Grant privileges to all desktop items to the admin user
INSERT INTO usrpriv (usrpriv_priv_id, usrpriv_username)
SELECT priv_id, current_user
FROM priv
WHERE (priv_module='Desktop')