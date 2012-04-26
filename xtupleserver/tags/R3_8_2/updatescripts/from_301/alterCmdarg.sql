DELETE FROM cmdarg WHERE cmdarg_cmd_id NOT IN (SELECT cmd_id FROM cmd);
ALTER TABLE cmdarg ADD FOREIGN KEY (cmdarg_cmd_id) REFERENCES cmd(cmd_id) ON DELETE CASCADE;
