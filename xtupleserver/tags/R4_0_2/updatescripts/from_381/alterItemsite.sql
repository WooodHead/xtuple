alter table itemsite add column itemsite_recvlocation_id integer;
alter table itemsite add column itemsite_issuelocation_id integer;
update itemsite set itemsite_recvlocation_id=-1, itemsite_issuelocation_id=-1;
alter table itemsite alter column itemsite_recvlocation_id set not null;
alter table itemsite alter column itemsite_issuelocation_id set not null;
alter table itemsite alter column itemsite_recvlocation_id set default -1;
alter table itemsite alter column itemsite_issuelocation_id set default -1;

alter table itemsite add column itemsite_location_dist boolean;
alter table itemsite add column itemsite_recvlocation_dist boolean;
alter table itemsite add column itemsite_issuelocation_dist boolean;
update itemsite set itemsite_location_dist=false, itemsite_recvlocation_dist=false, itemsite_issuelocation_dist=false;
alter table itemsite alter column itemsite_location_dist set not null;
alter table itemsite alter column itemsite_recvlocation_dist set not null;
alter table itemsite alter column itemsite_issuelocation_dist set not null;
alter table itemsite alter column itemsite_location_dist set default false;
alter table itemsite alter column itemsite_recvlocation_dist set default false;
alter table itemsite alter column itemsite_issuelocation_dist set default false;
