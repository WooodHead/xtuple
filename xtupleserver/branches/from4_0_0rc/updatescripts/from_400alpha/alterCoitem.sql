ALTER TABLE coitem ADD COLUMN coitem_rev_accnt_id INTEGER;

ALTER TABLE coitem
  ADD CONSTRAINT coitem_coitem_rev_accnt_id_fkey FOREIGN KEY (coitem_rev_accnt_id)
      REFERENCES accnt (accnt_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;
