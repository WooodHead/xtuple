BEGIN;

-- Customer Comment

--DROP VIEW api.custcomment;
CREATE VIEW api.custcomment
AS 
   SELECT 
     cust_number::varchar(100) AS customer_number,
     cmnttype_name AS type,
     comment_date AS date,
     comment_user AS username,
     comment_text AS text
   FROM custinfo, cmnttype, comment
   WHERE ((comment_source='C')
   AND (comment_source_id=cust_id)
   AND (comment_cmnttype_id=cmnttype_id));

GRANT ALL ON TABLE api.custcomment TO openmfg;
COMMENT ON VIEW api.custcomment IS '
This view can be used as an interface to import Customer Comment data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.custcomment DO INSTEAD

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
    'C',
    getCustId(NEW.customer_number),
    COALESCE(NEW.username,current_user),
    getCmntTypeId(NEW.type),
    NEW.text);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.custcomment DO INSTEAD NOTHING;

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.custcomment DO INSTEAD NOTHING;

COMMIT;
