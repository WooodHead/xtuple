BEGIN;

-- Drop columns in tax table

COMMENT ON COLUMN cmhead.cmhead_adjtaxtype_id IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN cmhead.cmhead_freighttaxtype_id IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN invchead.invchead_adjtaxtype_id IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN invchead.invchead_freighttaxtype_id IS 'Deprecated column - DO NOT USE';

COMMIT;