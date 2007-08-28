BEGIN;

-- Sales Order Comment

DROP VIEW _salesordercomment;
CREATE VIEW _salesordercomment
AS 
   SELECT 
     cohead_number AS order_number,
     cmnttype_name AS type,
     comment_date AS date,
     comment_user AS username,
     comment_text AS text
   FROM cohead, cmnttype, comment
   WHERE ((comment_source='S')
   AND (comment_source_id=cohead_id)
   AND (comment_cmnttype_id=cmnttype_id));

GRANT ALL ON TABLE _salesordercomment TO openmfg;
COMMENT ON VIEW _salesordercomment IS '
This view can be used as an interface to import Sales Order Comment data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO _salesordercomment DO INSTEAD

  INSERT INTO comment (
    comment_date,
    comment_source,
    comment_source_id,
    comment_user,
    comment_cmnttype_id,
    comment_text
    )
  VALUES (
    COALESCE(NEW.date,current_date),
    'S',
    getSalesOrderId(NEW.order_number),
    COALESCE(NEW.username,current_user),
    getCmntTypeId(NEW.type),
    NEW.text);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO _salesordercomment DO INSTEAD NOTHING;

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO _salesordercomment DO INSTEAD NOTHING;

COMMIT;
