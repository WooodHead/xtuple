ALTER TABLE locale ADD column locale_weight_scale INTEGER;
UPDATE locale SET locale_weight_scale=2;