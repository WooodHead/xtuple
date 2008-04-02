
CREATE OR REPLACE FUNCTION formatQty(NUMERIC) RETURNS TEXT IMMUTABLE AS '
SELECT LTRIM(TO_CHAR(COALESCE($1, 0), ( SELECT locale_qtyformat
                                        FROM locale, usr
                                        WHERE ( (usr_locale_id=locale_id)
                                         AND (usr_username=CURRENT_USER) ) ) ), '' '') AS result
' LANGUAGE 'sql';

