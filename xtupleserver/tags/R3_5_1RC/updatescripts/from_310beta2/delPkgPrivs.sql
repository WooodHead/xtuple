DELETE FROM usrpriv WHERE usrpriv_priv_id IN (
                                      SELECT priv_id
                                      FROM priv
                                      WHERE ((priv_module='System')
                                        AND (priv_name='MaintainPackages')));
DELETE FROM priv WHERE priv_module='System' AND priv_name='MaintainPackages';
