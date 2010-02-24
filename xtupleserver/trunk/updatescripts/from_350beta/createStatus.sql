create table status (
status_id serial,
status_type text NOT NULL,
status_code char(1) NOT NULL,
status_name text,
status_seq integer
);
grant all on table status to xtrole;
grant all on sequence status_status_id_seq to xtrole;

insert into status (status_type, status_code, status_name, status_seq) values ('INCDT', 'N', 'New', 0);
insert into status (status_type, status_code, status_name, status_seq) values ('INCDT', 'F', 'Feedback', 1);
insert into status (status_type, status_code, status_name, status_seq) values ('INCDT', 'C', 'Confirmed', 2);
insert into status (status_type, status_code, status_name, status_seq) values ('INCDT', 'A', 'Assigned', 3);
insert into status (status_type, status_code, status_name, status_seq) values ('INCDT', 'R', 'Resolved', 4);
insert into status (status_type, status_code, status_name, status_seq) values ('INCDT', 'L', 'Closed', 5);

