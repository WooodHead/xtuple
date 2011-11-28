CREATE OR REPLACE FUNCTION upgradeAddMetasqlGrade() RETURNS INTEGER AS $$
DECLARE
  _alter TEXT;
  _x     RECORD;
  _count INTEGER := 1;
BEGIN
  ALTER TABLE metasql ADD COLUMN metasql_grade INTEGER DEFAULT 0 NOT NULL;

  FOR _x IN SELECT pkghead_name FROM pkghead LOOP
    _alter := 'ALTER TABLE ' || _x.pkghead_name ||
              '.pkgmetasql ADD COLUMN metasql_grade INTEGER ' ||
              'DEFAULT 0 NOT NULL;';
    _count := _count + 1;
  END LOOP;

  RETURN _count;
END;
$$ LANGUAGE 'plpgsql';

SELECT upgradeAddMetasqlGrade();

SELECT dropIfExists('FUNCTION', 'upgradeAddMetasqlGrade()', 'public');

ALTER TABLE metasql DROP CONSTRAINT metasql_metasql_group_key;
ALTER TABLE metasql ADD CONSTRAINT metasql_metasql_group_name_grade_key UNIQUE (metasql_group, metasql_name, metasql_grade);
