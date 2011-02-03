alter table company add column company_unrlzgainloss_accnt_id integer references accnt (accnt_id);

update company set company_gainloss_accnt_id = fetchMetricValue('CurrencyGainLossAccount');
update company set company_dscrp_accnt_id = fetchMetricValue('GLSeriesDiscrepancyAccount');