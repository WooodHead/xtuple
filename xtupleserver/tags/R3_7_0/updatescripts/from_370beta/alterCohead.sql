alter table cohead disable trigger all;
alter table cohead add column cohead_status char(1) default 'O';
update cohead set cohead_status = getSoStatus(cohead_id);
alter table cohead alter cohead_status set not null;
alter table cohead enable trigger all;