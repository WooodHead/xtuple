BEGIN;
ALTER TABLE locale RENAME locale_lang TO locale_lang_file;
ALTER TABLE locale ADD locale_lang_id           INTEGER;
ALTER TABLE locale ADD locale_country_id        INTEGER;
ALTER TABLE locale ADD locale_error_color       TEXT;
ALTER TABLE locale ADD locale_warning_color     TEXT;
ALTER TABLE locale ADD locale_emphasis_color    TEXT;
ALTER TABLE locale ADD locale_altemphasis_color TEXT;
ALTER TABLE locale ADD locale_expired_color     TEXT;
ALTER TABLE locale ADD locale_future_color      TEXT;

COMMENT ON COLUMN locale.locale_lang_file       IS 'Deprecated';
COMMENT ON COLUMN locale.locale_dateformat      IS 'Deprecated';
COMMENT ON COLUMN locale.locale_timeformat      IS 'Deprecated';
COMMENT ON COLUMN locale.locale_timestampformat IS 'Deprecated';
COMMENT ON COLUMN locale.locale_intervalformat  IS 'Deprecated';

COMMENT ON COLUMN locale.locale_error_color       IS 'Color to use to mark data that require immediate attention.';
COMMENT ON COLUMN locale.locale_warning_color     IS 'Color to use to mark data that require attention soon.';
COMMENT ON COLUMN locale.locale_emphasis_color    IS 'Color to use to mark data that need to stand out but are not in error.';
COMMENT ON COLUMN locale.locale_altemphasis_color IS 'Color to use to mark data that need to stand out and be differentiated from other emphasized data.';
COMMENT ON COLUMN locale.locale_expired_color     IS 'Color to use to mark data that are no longer current.';
COMMENT ON COLUMN locale.locale_future_color      IS 'Color to use to mark data that will not be effective until some point in the future.';

COMMENT ON TABLE locale IS 'The locale table holds information required to show data to the user in a localized format. Colors are either names documented by the WWW Consortium or RGB colors. Format for RGB colors is #RGB, #RRGGBB, or #RRRGGGBBB, where the letters R, G, and B stand for hexidecimal digits.';

CREATE OR REPLACE FUNCTION updateLocaleDeprecateLocaleLangFile() RETURNS INTEGER AS '
DECLARE
  _r            RECORD;
  _langid       INTEGER;
  _countryid    INTEGER;
BEGIN
  UPDATE locale SET locale_lang_id = lang_id
  FROM lang WHERE (UPPER(lang_abbr2) = UPPER(SUBSTRING(SUBSTRING(locale_lang_file FROM E''\...$'') FROM 2 FOR 2)));

  UPDATE locale SET locale_country_id = country_id
  FROM country WHERE (UPPER(country_abbr) = UPPER(SUBSTRING(SUBSTRING(locale_lang_file FROM E''\...\.'') FROM 2 FOR 2)));

  RETURN 0;
END;' LANGUAGE 'plpgsql';

SELECT updateLocaleDeprecateLocaleLangFile();
COMMIT;
