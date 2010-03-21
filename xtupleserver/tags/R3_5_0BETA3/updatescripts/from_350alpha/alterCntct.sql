ALTER TABLE cntct ADD COLUMN cntct_name text;
UPDATE cntct SET cntct_name = formatCntctName(cntct_id);
CREATE INDEX cntct_name_idx ON cntct (cntct_name);