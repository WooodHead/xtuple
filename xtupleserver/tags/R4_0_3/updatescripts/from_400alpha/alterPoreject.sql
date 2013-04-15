ALTER TABLE poreject ADD COLUMN poreject_recv_id INTEGER;

ALTER TABLE poreject
  ADD CONSTRAINT poreject_poreject_recv_id_fkey FOREIGN KEY (poreject_recv_id)
      REFERENCES recv (recv_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;
