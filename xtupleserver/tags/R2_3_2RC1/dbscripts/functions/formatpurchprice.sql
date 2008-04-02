
CREATE OR REPLACE FUNCTION formatPurchPrice(NUMERIC) RETURNS TEXT IMMUTABLE AS '
  SELECT LTRIM(TO_CHAR($1, ( SELECT locale_purchpriceformat
                             FROM locale, usr
                             WHERE ( (usr_locale_id=locale_id)
                              AND (usr_username=CURRENT_USER) ) ) ), '' '') AS result;
' LANGUAGE 'sql';

