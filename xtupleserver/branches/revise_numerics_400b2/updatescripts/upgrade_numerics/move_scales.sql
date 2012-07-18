SELECT setMetric('SCALE_SALEP',    TEXT(MAX(locale_salesprice_scale - 2))),
       setMetric('SCALE_PURCHP',   TEXT(MAX(locale_purchprice_scale - 2))),
       setMetric('SCALE_COST',     TEXT(MAX(locale_cost_scale - 2))),
       setMetric('SCALE_QTY',      TEXT(MAX(locale_qty_scale))),
       setMetric('SCALE_QTYPR',    TEXT(MAX(locale_qtyper_scale))),
       setMetric('SCALE_UOMRATIO', TEXT(MAX(locale_uomratio_scale))),
       setMetric('SCALE_PERCENT',  TEXT(MAX(locale_percent_scale))),
       setMetric('SCALE_WEIGHT',   TEXT(MAX(locale_weight_scale)))
  FROM locale;

ALTER TABLE locale DROP COLUMN locale_curr_scale,
                   DROP COLUMN locale_salesprice_scale,
                   DROP COLUMN locale_purchprice_scale,
                   DROP COLUMN locale_extprice_scale,
                   DROP COLUMN locale_cost_scale,
                   DROP COLUMN locale_qty_scale,
                   DROP COLUMN locale_qtyper_scale,
                   DROP COLUMN locale_uomratio_scale,
                   DROP COLUMN locale_percent_scale,
                   DROP COLUMN locale_weight_scale
                   ;
