ALTER TABLE pkghead ADD pkghead_indev BOOLEAN NOT NULL DEFAULT false;
COMMENT ON COLUMN pkghead.pkghead_indev IS 'Flag indicating whether the contents of this package may be modified in-place - this package is /in dev/elopment.';
