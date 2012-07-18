-- make sure existing metric is set to true
update metric set metric_value='t' where metric_name='InterfaceToGL';

-- drop foreign key constraints to accnt
alter table costcat drop constraint costcat_costcat_exp_accnt_id_fkey;
alter table costcat drop constraint costcat_costcat_toliability_accnt_id_fkey;
alter table salesaccnt drop constraint salesaccnt_salesaccnt_cor_accnt_id_fkey;
alter table salesaccnt drop constraint salesaccnt_salesaccnt_cow_accnt_id_fkey;
alter table salesaccnt drop constraint salesaccnt_salesaccnt_returns_accnt_id_fkey;
