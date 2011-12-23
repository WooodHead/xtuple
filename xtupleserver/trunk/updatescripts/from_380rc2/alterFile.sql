-- this can only be run on updates from 380rc2 to 380!
alter table file add column file_descrip text not null;
update file set file_descrip = file_title;