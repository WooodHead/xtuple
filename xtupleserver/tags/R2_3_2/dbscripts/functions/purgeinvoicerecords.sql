CREATE OR REPLACE FUNCTION purgeInvoiceRecords(DATE) RETURNS INTEGER AS '
DECLARE
  pCutoffDate ALIAS FOR $1;

BEGIN

-- Remove the cobill and cobmisc records
  DELETE FROM cobill
  WHERE (cobill_cobmisc_id IN ( SELECT cobmisc_id
                                FROM cobmisc
                                WHERE ((cobmisc_invcdate <= pCutoffDate)
                                 AND (cobmisc_posted)) ) );

  DELETE FROM cobmisc
  WHERE ((cobmisc_invcdate <= pCutoffDate)
  AND (cobmisc_posted));

-- Remove the invchead and invcitem records
  DELETE FROM invcitem
  WHERE (invcitem_invchead_id IN ( SELECT invchead_id
                                   FROM invchead
                                   WHERE ( (invchead_invcdate <= pCutoffDate)
                                    AND (invchead_posted) ) ) );

  DELETE FROM invchead
  WHERE ( (invchead_invcdate <= pCutoffDate)
  AND (invchead_posted) );

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
