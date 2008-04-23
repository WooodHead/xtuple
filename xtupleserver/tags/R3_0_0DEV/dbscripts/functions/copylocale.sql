
CREATE OR REPLACE FUNCTION copyLocale(INTEGER) RETURNS INTEGER AS '
DECLARE
  pLocaleid ALIAS FOR $1;
  _localeid INTEGER;

BEGIN

  SELECT NEXTVAL(''locale_locale_id_seq'') INTO _localeid;

  INSERT INTO locale
  ( locale_id, locale_code, locale_descrip, locale_lang,
    locale_qtyformat, locale_qtyperformat,
    locale_currformat, locale_salespriceformat, locale_purchpriceformat, locale_extpriceformat,
    locale_dateformat, locale_timeformat, locale_timestampformat,
    locale_uomratioformat, locale_intervalformat,
    locale_costformat, locale_comments )
  SELECT _localeid, '''', '''', locale_lang,
         locale_qtyformat, locale_qtyperformat,
         locale_currformat, locale_salespriceformat, locale_purchpriceformat, locale_extpriceformat,
         locale_dateformat, locale_timeformat, locale_timestampformat,
         locale_uomratioformat, locale_intervalformat,
         locale_costformat, locale_comments
  FROM locale
  WHERE (locale_id=pLocaleid);

  RETURN _localeid;

END;
' LANGUAGE 'plpgsql';

