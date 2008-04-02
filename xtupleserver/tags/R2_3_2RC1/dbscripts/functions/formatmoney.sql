
CREATE OR REPLACE FUNCTION formatMoney(NUMERIC) RETURNS TEXT IMMUTABLE AS '
SELECT LTRIM(TO_CHAR($1, ( SELECT locale_currformat
                           FROM locale, usr
                           WHERE ((usr_locale_id=locale_id)
                            AND (usr_username=CURRENT_USER)) ) ), '' '') AS result
' LANGUAGE 'sql';

