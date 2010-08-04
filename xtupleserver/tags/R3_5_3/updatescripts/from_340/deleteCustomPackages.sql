SELECT deletePackage(pkghead_id)
FROM pkghead
WHERE pkghead_name = 'shipfreight';

SELECT deletePackage(pkghead_id)
FROM pkghead
WHERE pkghead_name = 'rtrnfreight';

SELECT deletePackage(pkghead_id)
FROM pkghead
WHERE pkghead_name = 'updpricing';
