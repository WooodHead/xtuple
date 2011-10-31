create table charopt	 (
  charopt_id serial,
  charopt_char_id integer references char (char_id) on delete cascade,
  charopt_value text not null,
  charopt_order integer not null default (0)
);

grant all on charopt to xtrole;
grant all on charopt_charopt_id_seq to xtrole;

COMMENT ON TABLE charopt IS 'Stores list options for characteristics';
COMMENT ON COLUMN charopt.charopt_id IS 'Primary key';
COMMENT ON COLUMN charopt.charopt_char_id IS 'Reference to char table';
COMMENT ON COLUMN charopt.charopt_value IS 'Option value';
COMMENT ON COLUMN charopt.charopt_order IS 'Option sort order';


