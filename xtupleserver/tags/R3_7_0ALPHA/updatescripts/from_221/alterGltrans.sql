BEGIN;

CREATE INDEX gltrans_gltrans_journalnumber_idx
  ON gltrans
  USING btree
  (gltrans_journalnumber);

COMMIT;