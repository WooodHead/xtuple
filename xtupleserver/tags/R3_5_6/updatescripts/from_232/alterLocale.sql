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
ALTER TABLE locale ADD locale_curr_scale        INTEGER;
ALTER TABLE locale ADD locale_salesprice_scale  INTEGER;
ALTER TABLE locale ADD locale_purchprice_scale  INTEGER;
ALTER TABLE locale ADD locale_extprice_scale    INTEGER;
ALTER TABLE locale ADD locale_cost_scale        INTEGER;
ALTER TABLE locale ADD locale_qty_scale         INTEGER;
ALTER TABLE locale ADD locale_qtyper_scale      INTEGER;
ALTER TABLE locale ADD locale_uomratio_scale    INTEGER;

COMMENT ON COLUMN locale.locale_lang_file       IS 'Deprecated';
COMMENT ON COLUMN locale.locale_dateformat      IS 'Deprecated';
COMMENT ON COLUMN locale.locale_timeformat      IS 'Deprecated';
COMMENT ON COLUMN locale.locale_timestampformat IS 'Deprecated';
COMMENT ON COLUMN locale.locale_intervalformat  IS 'Deprecated';

COMMENT ON COLUMN locale.locale_currformat        IS 'Deprecated';
COMMENT ON COLUMN locale.locale_qtyformat         IS 'Deprecated';
COMMENT ON COLUMN locale.locale_qtyperformat      IS 'Deprecated';
COMMENT ON COLUMN locale.locale_salespriceformat  IS 'Deprecated';
COMMENT ON COLUMN locale.locale_extpriceformat    IS 'Deprecated';
COMMENT ON COLUMN locale.local_costformat         IS 'Deprecated';
COMMENT ON COLUMN locale.locale_costformat        IS 'Deprecated';
COMMENT ON COLUMN locale.locale_purchpriceformat  IS 'Deprecated';
COMMENT ON COLUMN locale.locale_uomratioformat    IS 'Deprecated';

COMMENT ON COLUMN locale.locale_error_color       IS 'Color to use to mark data that require immediate attention.';
COMMENT ON COLUMN locale.locale_warning_color     IS 'Color to use to mark data that require attention soon.';
COMMENT ON COLUMN locale.locale_emphasis_color    IS 'Color to use to mark data that need to stand out but are not in error.';
COMMENT ON COLUMN locale.locale_altemphasis_color IS 'Color to use to mark data that need to stand out and be differentiated from other emphasized data.';
COMMENT ON COLUMN locale.locale_expired_color     IS 'Color to use to mark data that are no longer current.';
COMMENT ON COLUMN locale.locale_future_color      IS 'Color to use to mark data that will not be effective until some point in the future.';
COMMENT ON COLUMN locale.locale_curr_scale        IS 'Number of decimal places to show when displaying Currency values.';
COMMENT ON COLUMN locale.locale_salesprice_scale  IS 'Number of decimal places to show when displaying Sales Prices.';
COMMENT ON COLUMN locale.locale_purchprice_scale  IS 'Number of decimal places to show when displaying Purchase Prices.';
COMMENT ON COLUMN locale.locale_extprice_scale    IS 'Number of decimal places to show when displaying Extended Prices.';
COMMENT ON COLUMN locale.locale_cost_scale        IS 'Number of decimal places to show when displaying Costs.';
COMMENT ON COLUMN locale.locale_qty_scale         IS 'Number of decimal places to show when displaying Quantities.';
COMMENT ON COLUMN locale.locale_qtyper_scale      IS 'Number of decimal places to show when displaying Quantities Per.';
COMMENT ON COLUMN locale.locale_uomratio_scale    IS 'Number of decimal places to show when displaying UOM Ratios.';

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
DROP FUNCTION updateLocaleDeprecateLocaleLangFile();

UPDATE locale SET
       locale_curr_scale =      CASE WHEN POSITION('.' IN locale_currformat) > 0 THEN length(substring(locale_currformat from '%.#"%#"' for '#'))
                                     WHEN LENGTH(locale_currformat) > 0 THEN 0
                                END,
       locale_qty_scale =       CASE WHEN POSITION('.' IN locale_qtyformat) > 0 THEN length(substring(locale_qtyformat from '%.#"%#"' for '#'))
                                     WHEN LENGTH(locale_qtyformat) > 0 THEN 0
                                END,
       locale_qtyper_scale =    CASE WHEN POSITION('.' IN locale_qtyperformat) > 0 THEN length(substring(locale_qtyperformat from '%.#"%#"' for '#'))
                                     WHEN LENGTH(locale_qtyperformat) > 0 THEN 0
                                END,
       locale_salesprice_scale =CASE WHEN POSITION('.' IN locale_salespriceformat) > 0 THEN length(substring(locale_salespriceformat from '%.#"%#"' for '#'))
                                     WHEN LENGTH(locale_salespriceformat) > 0 THEN 0
                                END,
       locale_extprice_scale =  CASE WHEN POSITION('.' IN locale_extpriceformat) > 0 THEN length(substring(locale_extpriceformat from '%.#"%#"' for '#'))
                                     WHEN LENGTH(locale_extpriceformat) > 0 THEN 0
                                END,
       locale_cost_scale =      CASE WHEN POSITION('.' IN locale_costformat) > 0 THEN length(substring(locale_costformat from '%.#"%#"' for '#'))
                                     WHEN LENGTH(locale_costformat) > 0 THEN 0
                                END,
       locale_purchprice_scale =CASE WHEN POSITION('.' IN locale_purchpriceformat) > 0 THEN length(substring(locale_purchpriceformat from '%.#"%#"' for '#'))
                                     WHEN LENGTH(locale_purchpriceformat) > 0 THEN 0
                                END,
       locale_uomratio_scale =  CASE WHEN POSITION('.' IN locale_uomratioformat) > 0 THEN length(substring(locale_uomratioformat from '%.#"%#"' for '#'))
                                     WHEN LENGTH(locale_uomratioformat) > 0 THEN 0
                                END;
COMMIT;
