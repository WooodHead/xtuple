BEGIN;

CREATE TABLE ipsfreight (
  ipsfreight_id SERIAL PRIMARY KEY NOT NULL,
  ipsfreight_ipshead_id INTEGER NOT NULL,
  ipsfreight_qtybreak NUMERIC NOT NULL DEFAULT 0,
  ipsfreight_price NUMERIC NOT NULL DEFAULT 0,
  ipsfreight_type CHAR(1) NOT NULL,
  ipsfreight_warehous_id INTEGER,
  ipsfreight_shipzone_id INTEGER,
  ipsfreight_freightclass_id INTEGER,
  ipsfreight_shipvia TEXT
);

REVOKE ALL ON ipsfreight FROM PUBLIC;
GRANT ALL ON ipsfreight TO GROUP openmfg;

REVOKE ALL ON ipsfreight_ipsfreight_id_seq FROM PUBLIC;
GRANT ALL ON ipsfreight_ipsfreight_id_seq TO GROUP openmfg;

COMMENT ON TABLE freightclass IS 'This table is the freight price schedules.';

ALTER TABLE ipsfreight ADD CONSTRAINT ipsfreight_ipsfreight_ipshead_id_fkey foreign key (ipsfreight_ipshead_id) references ipshead (ipshead_id); 

ALTER TABLE ipsfreight ADD CONSTRAINT ipsfreight_ipsfreight_warehous_id_fkey foreign key (ipsfreight_warehous_id) references whsinfo (warehous_id); 

ALTER TABLE ipsfreight ADD CONSTRAINT ipsfreight_ipsfreight_shipzone_id_fkey foreign key (ipsfreight_shipzone_id) references shipzone (shipzone_id); 

ALTER TABLE ipsfreight ADD CONSTRAINT ipsfreight_ipsfreight_freightclass_id_fkey foreign key (ipsfreight_freightclass_id) references freightclass (freightclass_id); 

COMMIT;

