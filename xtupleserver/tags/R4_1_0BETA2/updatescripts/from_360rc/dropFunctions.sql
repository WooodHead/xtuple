select dropifexists('FUNCTION', 'postSubledger(INTEGER)');
select dropifexists('FUNCTION', 'postSubledger(TEXT[], DATE, DATE, DATE)');
select dropifexists('FUNCTION', 'postSubledger(TEXT, DATE, DATE, DATE)');