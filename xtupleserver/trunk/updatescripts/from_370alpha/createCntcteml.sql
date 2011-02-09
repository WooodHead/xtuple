create table cntcteml	 (
  cntcteml_id serial,
  cntcteml_cntct_id integer references cntct (cntct_id) on delete cascade,
  cntcteml_primary boolean not null default false,
  cntcteml_email text not null,
  unique (cntcteml_cntct_id, cntcteml_email)
);

grant all on cntcteml to xtrole;
grant all on cntcteml_cntcteml_id_seq to xtrole;

COMMENT ON TABLE cntcteml IS 'Stores email addresses for contacts';
COMMENT ON COLUMN cntcteml.cntcteml_id IS 'Primary key';
COMMENT ON COLUMN cntcteml.cntcteml_cntct_id IS 'Reference to contact table';
COMMENT ON COLUMN cntcteml.cntcteml_primary IS 'Flags whether this is the primary email address';
COMMENT ON COLUMN cntcteml.cntcteml_email IS 'Alternate information';

insert into cntcteml (
  cntcteml_cntct_id, cntcteml_primary, cntcteml_email )
select cntct_id, true, cntct_email
from cntct
where (length(coalesce(cntct_email,'')) > 0);

