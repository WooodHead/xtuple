/*
Need to drop all these views to remove the old function:
select dropIfExists('VIEW','accountfile','api');
select dropIfExists('VIEW','incidentfile','api');
select dropIfExists('VIEW','itemfile','api');
select dropIfExists('VIEW', 'docinfo');
select dropIfExists('VIEW', 'url');
select dropIfExists('FUNCTION', 'createfile(text, bytea)');
*/
select dropIfExists('FUNCTION', 'createfile(text, bytea)');