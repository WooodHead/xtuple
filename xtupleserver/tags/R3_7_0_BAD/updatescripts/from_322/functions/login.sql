
CREATE OR REPLACE FUNCTION login() RETURNS integer AS $$
DECLARE 
  _p RECORD;

BEGIN

  SELECT usr_id, userCanLogin(usr_username) AS usr_active INTO _p
  FROM usr
  WHERE (usr_username=CURRENT_USER);

  IF (NOT FOUND) THEN
    RETURN -1;

  ELSIF (NOT _p.usr_active) THEN
    IF(SELECT metric_value='AdminOnly'
         FROM metric
        WHERE metric_name='AllowedUserLogins') THEN
      RETURN -3;
    END IF;
    RETURN -2;
  ELSE
    RETURN _p.usr_id;
  END IF;

END;
$$ LANGUAGE 'plpgsql';


