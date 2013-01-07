create or replace function createFile(text, bytea) returns integer as $$
declare
  pTitle ALIAS FOR $1;
  pStream ALIAS FOR $2;
  _id integer;
begin
  _id := nextval('file_file_id_seq');
  insert into file (file_id, file_title, file_stream) values (_id, pTitle, pStream);
  return _id;
end;
$$ language 'plpgsql';