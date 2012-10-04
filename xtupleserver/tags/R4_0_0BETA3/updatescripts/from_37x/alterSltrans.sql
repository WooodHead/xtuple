alter table sltrans add column sltrans_rec boolean;

update sltrans set sltrans_rec=false;

alter table sltrans alter column sltrans_rec set not null;
alter table sltrans alter column sltrans_rec set default false;