alter table accnt add column accnt_name text;
update only accnt set accnt_name = formatglaccount(accnt_id);