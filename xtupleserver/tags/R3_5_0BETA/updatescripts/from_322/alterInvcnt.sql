BEGIN;

ALTER TABLE invcnt ADD COLUMN invcnt_cnt_username TEXT;
UPDATE invcnt SET invcnt_cnt_username = (SELECT usr_username FROM usr WHERE usr_id=invcnt_cnt_usr_id);
ALTER TABLE invcnt DROP COLUMN invcnt_cnt_usr_id;

ALTER TABLE invcnt ADD COLUMN invcnt_post_username TEXT;
UPDATE invcnt SET invcnt_post_username = (SELECT usr_username FROM usr WHERE usr_id=invcnt_post_usr_id);
ALTER TABLE invcnt DROP COLUMN invcnt_post_usr_id;

ALTER TABLE invcnt ADD COLUMN invcnt_tag_username TEXT;
UPDATE invcnt SET invcnt_tag_username = (SELECT usr_username FROM usr WHERE usr_id=invcnt_tag_usr_id);
ALTER TABLE invcnt DROP COLUMN invcnt_tag_usr_id;

COMMIT;

