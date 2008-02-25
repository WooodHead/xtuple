
CREATE OR REPLACE FUNCTION formatExtPrice(NUMERIC) RETURNS TEXT IMMUTABLE AS '
SELECT LTRIM(TO_CHAR($1, ( SELECT locale_extpriceformat
                           FROM locale, usr
                           WHERE ((usr_locale_id=locale_id)
                            AND (usr_username=CURRENT_USER)) ) ), '' '') AS result
' LANGUAGE 'sql';

