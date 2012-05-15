-- this can only be run on updates from 380rc2 to 380!
ALTER TABLE file ADD COLUMN file_descrip TEXT NOT NULL DEFAULT '';
UPDATE file SET file_descrip = file_title;
ALTER TABLE file ALTER COLUMN file_descrip DROP DEFAULT;
