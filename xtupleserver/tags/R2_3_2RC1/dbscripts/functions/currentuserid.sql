CREATE OR REPLACE FUNCTION currentUserId() RETURNS INTEGER AS '
DECLARE
  _userId INTEGER;

BEGIN

  SELECT usesysid INTO _userId
  FROM pg_user
  WHERE (usename=CURRENT_USER);

  RETURN _userId;

END;
' LANGUAGE 'plpgsql';
