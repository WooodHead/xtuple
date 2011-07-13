create index pohead_pohead_status_idx ON pohead (pohead_status);
create index cohead_cohead_status_idx ON cohead (cohead_status);
create index todoitem_todoitem_username_idx ON todoitem (todoitem_username);
create unique index accnt_unique_idx ON accnt (accnt_number, accnt_profit, accnt_sub, accnt_company);
