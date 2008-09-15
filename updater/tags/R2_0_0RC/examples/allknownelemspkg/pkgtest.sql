SELECT dropIfExists('TABLE', 'pkgtest');
CREATE TABLE pkgtest (a INTEGER, b INTEGER);

REVOKE ALL ON TABLE pkgtest FROM PUBLIC;
GRANT  ALL ON TABLE pkgtest TO   admin;
GRANT  ALL ON TABLE pkgtest TO   GROUP openmfg;
