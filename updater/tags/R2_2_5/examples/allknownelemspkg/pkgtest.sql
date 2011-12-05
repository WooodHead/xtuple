SELECT dropIfExists('VIEW', 'pkgtestview',  'telephonelookup');
SELECT dropIfExists('TABLE', 'pkgtestitem', 'telephonelookup');
SELECT dropIfExists('TABLE', 'pkgtest',     'telephonelookup');
CREATE TABLE pkgtest (a INTEGER PRIMARY KEY, b INTEGER);

REVOKE ALL ON TABLE pkgtest FROM PUBLIC;
GRANT  ALL ON TABLE pkgtest TO   admin;
GRANT  ALL ON TABLE pkgtest TO   xtrole;
