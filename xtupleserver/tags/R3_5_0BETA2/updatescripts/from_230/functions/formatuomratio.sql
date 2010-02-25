
CREATE OR REPLACE FUNCTION formatUOMRatio(NUMERIC) RETURNS TEXT IMMUTABLE AS '
SELECT LTRIM(TO_CHAR(COALESCE($1, 0), ( SELECT locale_uomratioformat
                                        FROM locale, usr
                                        WHERE ( (usr_locale_id=locale_id)
                                         AND (usr_username=CURRENT_USER) ) ) ), '' '') AS result
' LANGUAGE 'sql';


