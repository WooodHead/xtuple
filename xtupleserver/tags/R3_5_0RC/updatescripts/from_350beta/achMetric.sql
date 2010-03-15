SELECT setMetric('ACHSupported',     't');
SELECT setMetric('EFTRoutingRegex', E'^\\d{9}$');
SELECT setMetric('EFTAccountRegex', E'^\\d{4,17}$');
SELECT setMetric('EFTFunction',      'formatAchChecks');
