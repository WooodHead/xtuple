CREATE OR REPLACE FUNCTION postBillingSelections() RETURNS INTEGER AS '
DECLARE
  _counter INTEGER;
  _cobmisc RECORD;

BEGIN

  _counter := 0;

  FOR _cobmisc IN SELECT cobmisc_id
                  FROM cobmisc
                  WHERE (NOT cobmisc_posted) LOOP

    PERFORM postBillingSelection(_cobmisc.cobmisc_id);
    _counter := (_counter + 1);

  END LOOP;

  RETURN _counter;
END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION postBillingSelections(INTEGER) RETURNS INTEGER AS '
DECLARE
  pCustTypeId ALIAS FOR $1;
  _counter INTEGER;
  _cobmisc RECORD;

BEGIN

  _counter := 0;

  FOR _cobmisc IN SELECT cobmisc_id
                  FROM cobmisc, cohead, custinfo
                  WHERE ((NOT cobmisc_posted)
                   AND (cohead_id=cobmisc_cohead_id)
                   AND (cust_id=cohead_cust_id)
                   AND (cust_custtype_id=pCustTypeId)) LOOP

    PERFORM postBillingSelection(_cobmisc.cobmisc_id);
    _counter := (_counter + 1);

  END LOOP;

  RETURN _counter;
END;
' LANGUAGE 'plpgsql';
