BEGIN;

CREATE TABLE alarm (
  alarm_id SERIAL PRIMARY KEY NOT NULL,
  alarm_type TEXT,
  alarm_time TIMESTAMP WITH TIME ZONE,
  alarm_time_offset INTEGER,
  alarm_time_qualifier TEXT,
  alarm_creator TEXT,
  alarm_recipient TEXT,
  alarm_source TEXT,
  alarm_source_id INTEGER
);

REVOKE ALL ON alarm FROM PUBLIC;
GRANT ALL ON alarm TO GROUP openmfg;

REVOKE ALL ON alarm_alarm_id_seq FROM PUBLIC;
GRANT ALL ON alarm_alarm_id_seq TO GROUP openmfg;

COMMENT ON TABLE alarm IS 'This table is the open alarms.';

COMMIT;

