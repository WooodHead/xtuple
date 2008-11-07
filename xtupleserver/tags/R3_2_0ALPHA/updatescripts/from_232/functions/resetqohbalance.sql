CREATE OR REPLACE FUNCTION resetQOHBalance(INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN resetQOHBalance($1, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION resetQOHBalance(INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pItemsiteid   ALIAS FOR $1;
  pGlDistTS     ALIAS FOR $2;
  _invhistid    INTEGER;

BEGIN

  IF ( ( SELECT ( (itemsite_controlmethod IN (''L'', ''S'')) OR
                  (item_type IN (''R'', ''J'')) OR
                  (itemsite_loccntrl) OR
                  (itemsite_qtyonhand > 0) )
         FROM itemsite, item
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid) ) ) ) THEN
    RETURN 0;
  END IF;

  SELECT postInvTrans( itemsite_id, ''AD'', (itemsite_qtyonhand * -1),
                       ''I/M'', '''', '''', ''RESET'',
                       ''Reset QOH Balance to 0'',
                       costcat_asset_accnt_id, costcat_adjustment_accnt_id,
                       0, pGlDistTS ) INTO _invhistid
  FROM itemsite, costcat
  WHERE ( (itemsite_costcat_id=costcat_id)
   AND (itemsite_id=pItemsiteid) );

  RETURN _invhistid;

END;
' LANGUAGE 'plpgsql';
