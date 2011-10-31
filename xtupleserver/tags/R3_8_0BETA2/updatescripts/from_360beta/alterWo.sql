ALTER TABLE wo ADD COLUMN wo_username text;
ALTER TABLE wo ALTER COLUMN wo_username SET DEFAULT "current_user"();
