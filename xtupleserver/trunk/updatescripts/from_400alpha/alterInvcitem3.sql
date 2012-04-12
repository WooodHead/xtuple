ALTER TABLE invcitem ADD COLUMN invcitem_rev_accnt_id INTEGER;

ALTER TABLE invcitem
  ADD CONSTRAINT invcitem_invcitem_rev_accnt_id_fkey FOREIGN KEY (invcitem_rev_accnt_id)
      REFERENCES accnt (accnt_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;
