CREATE OR REPLACE FUNCTION invExpense(INTEGER, NUMERIC, INTEGER, TEXT, TEXT) RETURNS INTEGER AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pExpcatid ALIAS FOR $3;
  pDocumentNumber ALIAS FOR $4;
  pComments ALIAS FOR $5;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;

BEGIN

--  Make sure the passed itemsite points to a real item
  IF ( ( SELECT (item_type IN (''R'', ''F'', ''J''))
         FROM itemsite, item
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid) ) ) ) THEN
    RETURN 0;
  END IF;

  SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
  SELECT postInvTrans( itemsite_id, ''EX'', pQty,
                       ''I/M'', '''', pDocumentNumber, '''',
                       (''Material Expense\n'' ||  pComments),
                       expcat_exp_accnt_id, costcat_asset_accnt_id, _itemlocSeries ) INTO _invhistid
  FROM itemsite, costcat, expcat
  WHERE ( (itemsite_costcat_id=costcat_id)
   AND (itemsite_id=pItemsiteid)
   AND (expcat_id=pExpcatid) );

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
