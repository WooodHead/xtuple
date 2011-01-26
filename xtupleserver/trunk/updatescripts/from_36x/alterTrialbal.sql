alter table trialbal add column trialbal_adj_ending numeric(20,02) not null default 0;
COMMENT ON COLUMN trialbal.trialbal_adj_ending IS 'Contains the adjusted value of an imported trial balance based on end of period exchange rate.';
