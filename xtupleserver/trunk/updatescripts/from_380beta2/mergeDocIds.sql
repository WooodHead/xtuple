create or replace function mergdocids() returns boolean as $$
declare
_nextval integer;
_x record;

begin

  _nextval := greatest(nextval('docass_docass_id_seq'), nextval('url_url_id_seq'), nextval('imageass_imageass_id_seq'));

  alter table url alter column url_id set default nextval('docass_docass_id_seq'::regclass);
  drop sequence url_url_id_seq;

  for _x in
    select url_id from url
  loop
    update url set url_id = _nextval where url_id = _x.url_id;
    _nextval := nextval('docass_docass_id_seq');
  end loop;

  alter table imageass alter column imageass_id set default nextval('docass_docass_id_seq'::regclass);
  drop sequence imageass_imageass_id_seq;

  for _x in
    select imageass_id from imageass
  loop
    update imageass set imageass_id = _nextval where imageass_id = _x.imageass_id;
    _nextval := nextval('docass_docass_id_seq');
  end loop;

  return true;
  
end;
$$ language 'plpgsql';

select mergdocids();

drop function mergdocids();