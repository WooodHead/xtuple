alter table company add column company_unrlzgainloss_accnt_id integer references accnt (accnt_id);
alter table company alter column company_yearend_accnt_id DROP NOT NULL;

update company set company_yearend_accnt_id=null;
update company set company_yearend_accnt_id = fetchMetricValue('YearEndEquityAccount')
from accnt
where accnt_id=fetchMetricValue('YearEndEquityAccount')
and company_number=accnt_company;
update company set company_gainloss_accnt_id = fetchMetricValue('CurrencyGainLossAccount')
from accnt
where accnt_id=fetchMetricValue('CurrencyGainLossAccount')
and company_number=accnt_company;
update company set company_dscrp_accnt_id = fetchMetricValue('GLSeriesDiscrepancyAccount')
from accnt
where accnt_id=fetchMetricValue('GLSeriesDiscrepancyAccount')
and company_number=accnt_company;