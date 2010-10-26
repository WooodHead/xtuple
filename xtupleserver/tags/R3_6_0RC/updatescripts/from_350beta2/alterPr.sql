
ALTER TABLE pr ADD COLUMN pr_createdate timestamp without time zone;
ALTER TABLE pr ALTER COLUMN  pr_createdate set DEFAULT now();
