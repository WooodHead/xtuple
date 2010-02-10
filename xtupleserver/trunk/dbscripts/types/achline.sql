SELECT dropIfExists('FUNCTION', 'formatachcheck(integer,text,text,boolean)',
                    'public');

CREATE TYPE achline AS (achline_checkhead_id  INTEGER,
                        achline_batch         TEXT,
                        achline_type          TEXT,
                        achline_value         TEXT
                       );
