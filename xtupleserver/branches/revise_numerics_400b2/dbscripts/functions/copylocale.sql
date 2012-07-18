CREATE OR REPLACE FUNCTION copyLocale(pLocaleid INTEGER) RETURNS INTEGER AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  INSERT INTO locale
        (locale_lang_file,
         locale_dateformat,
         locale_currformat,
         locale_qtyformat,
         locale_comments,
         locale_qtyperformat,
         locale_salespriceformat,
         locale_extpriceformat,
         locale_timeformat,
         locale_timestampformat,
         local_costformat,
         locale_costformat,
         locale_purchpriceformat,
         locale_uomratioformat,
         locale_intervalformat,
         locale_lang_id,
         locale_country_id,
         locale_error_color,
         locale_warning_color,
         locale_emphasis_color,
         locale_altemphasis_color,
         locale_expired_color,
         locale_future_color)
  SELECT locale_lang_file,
         locale_dateformat,
         locale_currformat,
         locale_qtyformat,
         locale_comments,
         locale_qtyperformat,
         locale_salespriceformat,
         locale_extpriceformat,
         locale_timeformat,
         locale_timestampformat,
         local_costformat,
         locale_costformat,
         locale_purchpriceformat,
         locale_uomratioformat,
         locale_intervalformat,
         locale_lang_id,
         locale_country_id,
         locale_error_color,
         locale_warning_color,
         locale_emphasis_color,
         locale_altemphasis_color,
         locale_expired_color,
         locale_future_color
    FROM locale
   WHERE(locale_id=$1)
  RETURNING locale_id;
$$ LANGUAGE SQL;

