select dropifexists('FUNCTION', 'postProduction(INTEGER, NUMERIC, BOOLEAN, INTEGER)');
select dropifexists('FUNCTION', 'correctProduction(INTEGER, NUMERIC, BOOLEAN, INTEGER)');
select dropifexists('FUNCTION', 'returnWoMaterial(INTEGER, NUMERIC, INTEGER)');
select dropifexists('FUNCTION', 'returnWoMaterial(INTEGER, NUMERIC)');
select dropifexists('FUNCTION', 'scrapTopLevel(INTEGER, NUMERIC)');
select dropifexists('FUNCTION', 'scrapTopLevel(INTEGER, NUMERIC, BOOLEAN)');