alter table company add column company_curr_id integer references curr_symbol (curr_id);
alter table company add column company_yearend_accnt_id integer references accnt (accnt_id);
alter table company add column company_gainloss_accnt_id integer references accnt (accnt_id);
alter table company add column company_dscrp_accnt_id integer references accnt (accnt_id);
alter table company drop column company_currency_id;

update company set company_curr_id = baseCurrId() where company_external;
update company set company_yearend_accnt_id = fetchMetricValue('YearEndEquityAccount');
alter table company alter column company_yearend_accnt_id set not null;