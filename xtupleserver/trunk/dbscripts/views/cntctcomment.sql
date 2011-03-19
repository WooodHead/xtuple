-- Contact Comment
SELECT dropIfExists('VIEW', 'cntctcomment');
CREATE VIEW cntctcomment
AS 
   SELECT 
    comment_id,
    comment_date,
    comment_source_id,
    comment_user,
    comment_cmnttype_id,
    comment_text
   FROM comment
   WHERE comment_source='T';

GRANT ALL ON TABLE cntctcomment TO xtrole;
COMMENT ON VIEW cntctcomment IS 'Contact Comment';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO cntctcomment DO INSTEAD

  INSERT INTO comment (
    comment_date,
    comment_source,
    comment_source_id,
    comment_user,
    comment_cmnttype_id,
    comment_text
    )
  VALUES (
    new.comment_date,
    'T',
    new.comment_source_id,
    new.comment_user,
    new.comment_cmnttype_id,
    new.comment_text);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO cntctcomment DO INSTEAD 

    UPDATE comment SET
      comment_user=new.comment_user,
      comment_text=new.comment_text
    WHERE comment_id=old.comment_id;

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO cntctcomment DO INSTEAD

    DELETE FROM comment WHERE comment_id=old.comment_id;

