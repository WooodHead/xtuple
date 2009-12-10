BEGIN;

ALTER TABLE womatlpost DROP CONSTRAINT womatlpost_womatlpost_womatl_id_fkey;
ALTER TABLE womatlpost ADD CONSTRAINT womatlpost_womatlpost_womatl_id_fkey 
      FOREIGN KEY (womatlpost_womatl_id)
      REFERENCES womatl (womatl_id) ON DELETE CASCADE;

COMMIT;