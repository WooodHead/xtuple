CREATE TABLE recur (recur_id          SERIAL PRIMARY KEY,
                    recur_parent_id   INTEGER NOT NULL,
                    recur_parent_type TEXT NOT NULL,
                    recur_period      TEXT NOT NULL
                                      CHECK(recur_period IN ('m', 'H', 'D', 'W',
                                                             'M', 'Y', 'C')),
                    recur_freq        INTEGER DEFAULT 1 NOT NULL,
                    recur_start       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    recur_end         TIMESTAMP WITH TIME ZONE,
                    recur_max         INTEGER,
                    recur_data        TEXT,

                    UNIQUE (recur_parent_id, recur_parent_type)
                   );

REVOKE ALL ON recur FROM public;
GRANT  ALL ON recur TO   xtrole;

REVOKE ALL ON recur_recur_id_seq FROM public;
GRANT  ALL ON recur_recur_id_seq TO   xtrole;

COMMENT ON TABLE recur IS 'Track recurring events and objects.';
COMMENT ON COLUMN recur.recur_id IS 'Internal ID of this recurrence record.';
COMMENT ON COLUMN recur.recur_parent_id IS 'The internal ID of the event/object that recurs.';
COMMENT ON COLUMN recur.recur_parent_type IS 'The table in which the parent event or object is stored.';
COMMENT ON COLUMN recur.recur_period IS 'With recur_freq, how often this event recurs. Values are "m" for every minute, "H" for every hour, "D" for daily, "W" for weekly, "M" for monthly, "Y" for yearly, and "C" for customized or complex.';
COMMENT ON COLUMN recur.recur_freq IS 'With recur_period, how often this event recurs. Values are integers counts of recur_periods. For example, if recur_freq = 2 and recur_period = w then the event recurs every 2 weeks.';
COMMENT ON COLUMN recur.recur_start IS 'The first date/time when the event should occur.';
COMMENT ON COLUMN recur.recur_end IS 'The last date/time when the event should occur. NULL means there is no end date/time and the event should recur forever.';
COMMENT ON COLUMN recur.recur_max IS 'The maximum number of recurrence events to create at one time. If this is NULL then when new events are created, a system-wide default will limit the number.';
COMMENT ON COLUMN recur.recur_data IS 'Not yet used and format still undetermined. Additional data to describe how to apply the period and frequency, particularly when period = "C".';
