CREATE TABLE invbal (
  invbal_id serial primary key,
  invbal_period_id integer references period (period_id) on delete cascade,
  invbal_itemsite_id integer references itemsite ( itemsite_id) on delete cascade,
  invbal_qoh_beginning numeric(18, 6) not null,
  invbal_qoh_ending numeric(18, 6) not null,
  invbal_qty_in numeric(18,6) not null,
  invbal_qty_out numeric(18,6) not null,
  invbal_value_beginning numeric(12, 2) not null,
  invbal_value_ending numeric(12, 2) not null,
  invbal_value_in numeric(12,2) not null,
  invbal_value_out numeric(12,2) not null,
  invbal_nn_beginning numeric(18, 6) not null,
  invbal_nn_ending numeric(18, 6) not null,
  invbal_nn_in numeric(18,6) not null,
  invbal_nn_out numeric(18,6) not null,
  invbal_nnval_beginning numeric(12, 2) not null,
  invbal_nnval_ending numeric(12, 2) not null,
  invbal_nnval_in numeric(12,2) not null,
  invbal_nnval_out numeric(12,2) not null,
  invbal_dirty boolean not null default true );

GRANT ALL ON TABLE invbal TO xtrole;
GRANT ALL ON SEQUENCE invbal_invbal_id_seq TO xtrole;
