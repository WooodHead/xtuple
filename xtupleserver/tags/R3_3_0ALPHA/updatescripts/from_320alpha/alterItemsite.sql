CREATE FUNCTION PBalterItemSite() RETURNS BOOLEAN AS $$
DECLARE
  _exists       BOOLEAN := false;
BEGIN
  SELECT COUNT(*) = 1 INTO _exists
  FROM pg_attribute JOIN pg_class ON (attrelid=pg_class.oid)
  WHERE ((relname='itemsite')
     AND (attname='itemsite_ordergroup_first'));
  IF (NOT _exists) THEN
    ALTER TABLE itemsite ADD COLUMN itemsite_ordergroup_first BOOLEAN NOT NULL DEFAULT false;
    RETURN true;
  END IF;

  RETURN false;
END;
$$ LANGUAGE 'plpgsql';
SELECT PBalterItemSite();
DROP FUNCTION PBalterItemSite();
