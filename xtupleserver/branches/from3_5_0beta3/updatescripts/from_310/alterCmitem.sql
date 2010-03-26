ALTER TABLE cmitem ALTER COLUMN cmitem_cmhead_id SET NOT NULL;
ALTER TABLE cmitem ALTER COLUMN cmitem_linenumber SET NOT NULL;
ALTER TABLE cmitem ALTER COLUMN cmitem_itemsite_id SET NOT NULL;
ALTER TABLE cmitem ADD CONSTRAINT cmitem_cmhead_id_fkey FOREIGN KEY (cmitem_cmhead_id) REFERENCES cmhead (cmhead_id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE cmitem ADD CONSTRAINT cmitem_cmhead_id_linenumber_unique UNIQUE (cmitem_cmhead_id, cmitem_linenumber);
