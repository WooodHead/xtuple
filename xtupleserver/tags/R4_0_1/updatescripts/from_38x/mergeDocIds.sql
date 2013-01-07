alter table sltrans disable trigger all;

create or replace function mergdocids() returns boolean as $$
declare
_nextval integer;
_x record;

begin

  IF (SELECT column_default ~ 'gltrans_gltrans_id_seq'
        FROM information_schema.columns
       WHERE table_schema = 'public'
         AND table_name   = 'sltrans'
         AND column_name  = 'sltrans_id') THEN
    RETURN FALSE;
  END IF;

  _nextval := greatest(nextval('sltrans_sltrans_id_seq'), nextval('gltrans_gltrans_id_seq'));

  perform setval('gltrans_gltrans_id_seq', _nextval);

  alter table sltrans alter column sltrans_id set default nextval('gltrans_gltrans_id_seq'::regclass);
  drop sequence sltrans_sltrans_id_seq;

  create table sltrans_backup (
    sltrans_old_id integer,
    sltrans_new_id integer
  );
  comment on table sltrans_backup is 'backup cross references of old and new ids for sltrans 4.0 upgrade.';

  for _x in
    select sltrans_id from sltrans
  loop
    insert into sltrans_backup values (_x.sltrans_id, _nextval);
    update sltrans set sltrans_id = _nextval where sltrans_id=_x.sltrans_id;
    update bankrecitem set bankrecitem_source_id=_nextval where bankrecitem_source='SL' and bankrecitem_source_id=_x.sltrans_id;
    _nextval := nextval('gltrans_gltrans_id_seq');
  end loop;

  return true;
  
end;
$$ language 'plpgsql';

select mergdocids();

drop function mergdocids();

alter table sltrans enable trigger all;
