alter table ophead add column ophead_username text;
alter table ophead add column ophead_start_date date;
alter table ophead add column ophead_assigned_date date;
alter table ophead add column ophead_priority_id integer references incdtpriority (incdtpriority_id);
alter table ophead add column ophead_number text;
update ophead set ophead_number=ophead_id::text;
alter table ophead alter column ophead_number set not null;
alter table ophead add unique (ophead_number);
