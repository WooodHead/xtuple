SELECT dropIfExists('FUNCTION', 'formatachcheck(integer, integer, text)',
                    'public');
SELECT dropIfExists('FUNCTION', 'formatabachecks(integer, integer, text)',
                    'public');

CREATE TYPE achline AS (achline_checkhead_id  INTEGER,
                        achline_batch         TEXT,
                        achline_type          TEXT,
                        achline_value         TEXT
                       );
