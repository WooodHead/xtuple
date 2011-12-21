select dropIfExists('VIEW','docinfo');
select dropIfExists('VIEW','accountfile','api');
select dropIfExists('VIEW','incidentfile','api');
select dropIfExists('VIEW','itemfile','api');
select dropIfExists('VIEW','itemfile');
alter table docass disable trigger all;

create table urlinfo (
 url_id serial primary key,
 url_title text not null,
 url_url text not null );

grant all on urlinfo to xtrole;

create table file (
 file_id serial primary key,
 file_title text not null,
 file_stream bytea
);

grant all on file to xtrole;

create or replace function migrateUrl() returns boolean as $$
declare
_x record;
_id integer;
begin

  for _x in
    select * from url where url_stream is null
  loop
    _id := nextval('urlinfo_url_id_seq');
    insert into urlinfo (url_id, url_title, url_url) values (_id, _x.url_title, _x.url_url);
    insert into docass (docass_source_id, docass_source_type, docass_target_id, docass_target_type, docass_purpose)
    values (_x.url_source_id, _x.url_source, _id, 'URL', 'S');
  end loop;

  for _x in
    select * from url where url_stream is not null
  loop
    _id := nextval('file_file_id_seq');
    insert into file (file_id, file_title, file_stream) values (_id, _x.url_title, _x.url_stream);
    insert into docass (docass_source_id, docass_source_type, docass_target_id, docass_target_type, docass_purpose)
    values (_x.url_source_id, _x.url_source, _id, 'FILE', 'S');
  end loop;

  drop table url;
  perform dropIfexists('FUNCTION' ,'_urltrigger()');

  return true;
  
end;
$$ language 'plpgsql';

select migrateUrl();

drop function migrateUrl();
alter table docass enable trigger all;

