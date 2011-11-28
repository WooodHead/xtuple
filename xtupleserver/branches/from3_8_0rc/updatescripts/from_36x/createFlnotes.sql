create table flnotes (
  flnotes_id serial,
  flnotes_flhead_id integer references flhead (flhead_id) on delete cascade,
  flnotes_period_id integer references period (period_id) on delete cascade,
  flnotes_notes text default '');

alter table flnotes add unique (flnotes_flhead_id, flnotes_period_id);

grant all on flnotes to xtrole;
grant all on flnotes_flnotes_id_seq to xtrole;