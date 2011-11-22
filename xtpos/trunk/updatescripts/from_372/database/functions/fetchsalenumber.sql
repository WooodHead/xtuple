CREATE OR REPLACE FUNCTION xtpos.fetchSaleNumber() RETURNS TEXT AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _saleNumber TEXT;
  _test INTEGER;

BEGIN

  LOOP

    _saleNumber := nextval('sale_number_seq');

    SELECT salehead_id INTO _test
    FROM xtpos.salehead
    WHERE (salehead_number=_saleNumber);

    IF (NOT FOUND) THEN
      EXIT;
    END IF;

  END LOOP;

  RETURN _saleNumber;

END;
$$ LANGUAGE 'plpgsql';
