
CREATE OR REPLACE FUNCTION formatDateTime(TIMESTAMP WITHOUT TIME ZONE) RETURNS TEXT IMMUTABLE AS '
SELECT TO_CHAR($1, ( SELECT locale_timestampformat
                     FROM locale, usr
                     WHERE ((usr_locale_id=locale_id)
                      AND (usr_username=CURRENT_USER)) ) ) AS result
' LANGUAGE 'sql';

CREATE OR REPLACE FUNCTION formatDateTime(TIMESTAMP WITH TIME ZONE) RETURNS TEXT IMMUTABLE AS '
SELECT TO_CHAR($1, ( SELECT locale_timestampformat
                     FROM locale, usr
                     WHERE ((usr_locale_id=locale_id)
                      AND (usr_username=CURRENT_USER)) ) ) AS result
' LANGUAGE 'sql';

