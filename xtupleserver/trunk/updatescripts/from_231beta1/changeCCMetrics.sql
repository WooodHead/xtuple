BEGIN;
SELECT * FROM metricenc WHERE metricenc_name IN ('CCPassword', 'CCANTransactionKey');

CREATE OR REPLACE FUNCTION updateMetricEncPasswordFor231Upgrade() RETURNS INTEGER AS '
DECLARE
  _keyenc        TEXT;
  _keyfound      BOOLEAN;
  _passwordenc   TEXT;
  _passwordfound BOOLEAN;

BEGIN
  -- Between 2.3.1Beta1 and 2.3.1Beta2/RC1/final (whichever it is),
  -- the CCANTransactionKey encrypted metric was combined with CCPassword.
  -- Now we have to fix the data if we can:

  SELECT metricenc_value INTO _passwordenc
  FROM metricenc
  WHERE metricenc_name=''CCPassword'';
  _passwordfound := FOUND;

  SELECT metricenc_value INTO _keyenc
  FROM metricenc
  WHERE metricenc_name=''CCANTransactionKey'';
  _keyfound := FOUND;

  IF (_passwordfound AND _keyfound) THEN
    IF (_passwordenc = _keyenc) THEN
      DELETE FROM metricenc
      WHERE (metricenc.metricenc_name=''CCANTransactionKey'');
      RETURN 1;
    ELSE
      RAISE NOTICE ''Make sure the password on the Credit Card Configuration window is your Authorize.Net Transaction Key.'';
      RETURN -1;
    END IF;

  ELSIF (_passwordfound AND NOT _keyfound) THEN
    RAISE NOTICE ''Make sure the password on the Credit Card Configuration window is your Authorize.Net Transaction Key.'';
    RETURN -1;

  ELSIF (_keyfound AND NOT _passwordfound) THEN
    UPDATE metricenc
    SET metricenc_name=''CCPassword''
    WHERE (metricenc.metricenc_name=''CCANTransactionKey'');
    RETURN 1;
  END IF;

  RETURN 0;

END;
' LANGUAGE 'plpgsql';

SELECT updateMetricEncPasswordFor231Upgrade();

DROP FUNCTION updateMetricEncPasswordFor231Upgrade();

SELECT * FROM metricenc WHERE metricenc_name IN ('CCPassword', 'CCANTransactionKey');
DELETE FROM metricenc WHERE metricenc_name IN ('CCVSUser', 'CCVSVendor',
                                               'CCVSPartner', 'CCVSPassword',
                                               'CCVSProxyPassword');
DELETE FROM metric WHERE metric_name = 'CCANMD5Hash';
COMMIT;
