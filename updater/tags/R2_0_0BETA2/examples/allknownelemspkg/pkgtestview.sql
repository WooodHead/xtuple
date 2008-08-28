SELECT dropIfExists('VIEW', 'pkgtestview', 'package');
CREATE VIEW pkgtestview AS SELECT a FROM pkgtest;
