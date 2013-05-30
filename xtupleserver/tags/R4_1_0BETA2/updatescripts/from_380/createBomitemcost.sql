CREATE TABLE bomitemcost
(
  bomitemcost_id serial primary key,
  bomitemcost_bomitem_id integer NOT NULL references bomitem (bomitem_id),
  bomitemcost_costelem_id integer NOT NULL references costelem (costelem_id),
  bomitemcost_lowlevel boolean NOT NULL DEFAULT false,
  bomitemcost_stdcost numeric(16,6) NOT NULL DEFAULT 0,
  bomitemcost_posted date,
  bomitemcost_actcost numeric(16,6) NOT NULL DEFAULT 0,
  bomitemcost_updated date,
  bomitemcost_curr_id integer NOT NULL DEFAULT basecurrid() references curr_symbol (curr_id)
);

GRANT ALL ON TABLE bomitemcost TO xtrole;
GRANT ALL ON SEQUENCE bomitemcost_bomitemcost_id_seq TO xtrole;
COMMENT ON TABLE bomitemcost IS 'Bomitem Cost information';

CREATE INDEX bomitemcost_bomitem_id_key
  ON bomitemcost
  USING btree
  (bomitemcost_bomitem_id);

CREATE UNIQUE INDEX bomitemcost_master_idx
  ON bomitemcost
  USING btree
  (bomitemcost_bomitem_id, bomitemcost_costelem_id, bomitemcost_lowlevel);


