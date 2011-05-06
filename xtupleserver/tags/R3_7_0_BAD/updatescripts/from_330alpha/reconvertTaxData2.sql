CREATE OR REPLACE FUNCTION fixTax() RETURNS INTEGER AS $$
DECLARE
  _r RECORD;
  _taxid INTEGER;
  _result INTEGER;
  _edition      INTEGER;

BEGIN
  SELECT CASE WHEN fetchMetricText('Application') = 'Manufacturing' THEN 3
              WHEN fetchMetricText('Application') = 'Standard'      THEN 2
              ELSE 1
          END INTO _edition;

-- Populate taxhist_curr_id and taxhist_curr_rate

  RAISE NOTICE 'adding currency info to asohisttax';
  FOR _r IN
  SELECT taxhist_id, asohist_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM asohisttax JOIN asohist ON (asohist_id=taxhist_parent_id)
                  JOIN curr_rate ON ( (curr_id=asohist_curr_id) AND
                                      (asohist_invcdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE asohisttax SET taxhist_curr_id=_r.currid,
                          taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  RAISE NOTICE 'adding currency info to cmheadtax';
  FOR _r IN
  SELECT taxhist_id, cmhead_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM cmheadtax JOIN cmhead ON (cmhead_id=taxhist_parent_id)
                 JOIN curr_rate ON ( (curr_id=cmhead_curr_id) AND
                                     (cmhead_docdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE cmheadtax SET taxhist_curr_id=_r.currid,
                          taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  RAISE NOTICE 'adding currency info to cmitemtax';
  FOR _r IN
  SELECT taxhist_id, cmhead_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM cmitemtax JOIN cmitem ON (cmitem_id=taxhist_parent_id)
                 JOIN cmhead ON (cmhead_id=cmitem_cmhead_id)
                 JOIN curr_rate ON ( (curr_id=cmhead_curr_id) AND
                                     (cmhead_docdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE cmitemtax SET taxhist_curr_id=_r.currid,
                         taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  RAISE NOTICE 'adding currency info to cobilltax';
  FOR _r IN
  SELECT taxhist_id, cobmisc_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM cobilltax JOIN cobill ON (cobill_id=taxhist_parent_id)
                 JOIN cobmisc ON (cobmisc_id=cobill_cobmisc_id)
                 JOIN curr_rate ON ( (curr_id=cobmisc_curr_id) AND
                                     (cobmisc_invcdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE cobilltax SET taxhist_curr_id=_r.currid,
                         taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  RAISE NOTICE 'adding currency info to cobmisctax';
  FOR _r IN
  SELECT taxhist_id, cobmisc_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM cobmisctax JOIN cobmisc ON (cobmisc_id=taxhist_parent_id)
                  JOIN curr_rate ON ( (curr_id=cobmisc_curr_id) AND
                                      (cobmisc_invcdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE cobmisctax SET taxhist_curr_id=_r.currid,
                          taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  RAISE NOTICE 'adding currency info to cohisttax';
  FOR _r IN
  SELECT taxhist_id, cohist_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM cohisttax JOIN cohist ON (cohist_id=taxhist_parent_id)
                 JOIN curr_rate ON ( (curr_id=cohist_curr_id) AND
                                     (cohist_invcdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE cohisttax SET taxhist_curr_id=_r.currid,
                          taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  RAISE NOTICE 'adding currency info to invcheadtax';
  FOR _r IN
  SELECT taxhist_id, invchead_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM invcheadtax JOIN invchead ON (invchead_id=taxhist_parent_id)
                   JOIN curr_rate ON ( (curr_id=invchead_curr_id) AND
                                       (invchead_invcdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE invcheadtax SET taxhist_curr_id=_r.currid,
                           taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  RAISE NOTICE 'adding currency info to invcitemtax';
  FOR _r IN
  SELECT taxhist_id, invchead_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM invcitemtax JOIN invcitem ON (invcitem_id=taxhist_parent_id)
                   JOIN invchead ON (invchead_id=invcitem_invchead_id)
                   JOIN curr_rate ON ( (curr_id=invchead_curr_id) AND
                                       (invchead_invcdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE invcitemtax SET taxhist_curr_id=_r.currid,
                           taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  IF (_edition > 1) THEN

  RAISE NOTICE 'adding currency info to toheadtax';
  FOR _r IN
  SELECT taxhist_id, tohead_freight_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM toheadtax JOIN tohead ON (tohead_id=taxhist_parent_id)
                 JOIN curr_rate ON ( (curr_id=tohead_freight_curr_id) AND
                                     (tohead_orderdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE toheadtax SET taxhist_curr_id=_r.currid,
                         taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  RAISE NOTICE 'adding currency info to toitemtax';
  FOR _r IN
  SELECT taxhist_id, tohead_freight_curr_id AS currid, round(curr_rate, 5) AS currrate
  FROM toitemtax JOIN toitem ON (toitem_id=taxhist_parent_id)
                 JOIN tohead ON (tohead_id=toitem_tohead_id)
                 JOIN curr_rate ON ( (curr_id=tohead_freight_curr_id) AND
                                     (tohead_orderdate BETWEEN curr_effective AND curr_expires) )
  LOOP
    UPDATE toitemtax SET taxhist_curr_id=_r.currid,
                         taxhist_curr_rate=_r.currrate
    WHERE taxhist_id=_r.taxhist_id;
  END LOOP;

  END IF;

  RETURN 0;

END;
$$ LANGUAGE 'plpgsql';

SELECT fixTax();
DROP FUNCTION fixTax();

