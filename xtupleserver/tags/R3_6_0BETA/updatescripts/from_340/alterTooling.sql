CREATE OR REPLACE FUNCTION alterTooling() RETURNS INTEGER AS $$
DECLARE
  _r RECORD;
  _result INTEGER;

BEGIN

-- Check for tooling package already installed
  SELECT pkghead_id INTO _result
  FROM pkghead
  WHERE (pkghead_name='tooling');

-- If tooling package not installed then alter tables
  IF (NOT FOUND) THEN

    UPDATE bomhead SET bomhead_batchsize = 1
    WHERE (bomhead_batchsize IS NULL OR bomhead_batchsize <= 0);
    ALTER TABLE bomhead
      ADD CHECK (bomhead_batchsize > 0);

    ALTER TABLE bomitem
      ADD COLUMN bomitem_qtyfxd NUMERIC(20,8) DEFAULT 0 NOT NULL;
    COMMENT ON COLUMN bomitem.bomitem_qtyfxd IS 'The fixed quantity required';

    ALTER TABLE bomwork
      ADD COLUMN bomwork_qtyfxd NUMERIC(20,8) DEFAULT 0 NOT NULL;
    COMMENT ON COLUMN bomwork.bomwork_qtyfxd IS 'The fixed quantity required';

    ALTER TABLE womatl
      ADD COLUMN womatl_qtyfxd NUMERIC(20,8) DEFAULT 0 NOT NULL;
    COMMENT ON COLUMN womatl.womatl_qtyfxd IS 'The fixed quantity required';

    ALTER TABLE womatlvar
      ADD COLUMN womatlvar_qtyfxd NUMERIC(20,8) DEFAULT 0 NOT NULL;
    COMMENT ON COLUMN womatlvar.womatlvar_qtyfxd IS 'The fixed quantity required';

  END IF;

-- Alter tables whether tooling package installed or not

  ALTER TABLE bomwork
    ADD COLUMN bomwork_qtyreq NUMERIC(20,8) DEFAULT 0 NOT NULL;
  COMMENT ON COLUMN bomwork.bomwork_qtyreq IS 'The total quantity required';

  RETURN 0;

END;
$$ LANGUAGE 'plpgsql';

SELECT alterTooling();
DROP FUNCTION alterTooling();

