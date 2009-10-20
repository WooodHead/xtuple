BEGIN;

-- Address Comment

DROP VIEW api.addresscomment;
CREATE VIEW api.addresscomment
AS 
   SELECT 
     addr_id AS Address_number,
     cmnttype_name AS type,
     comment_date AS date,
     comment_user AS username,
     comment_text AS text
   FROM addr, cmnttype, comment
   WHERE ((comment_source='ADDR')
   AND (comment_source_id=addr_id)
   AND (comment_cmnttype_id=cmnttype_id));

GRANT ALL ON TABLE api.addresscomment TO openmfg;
COMMENT ON VIEW api.addresscomment IS '
This view can be used as an interface to import Address Comment data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.addresscomment DO INSTEAD

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
    'ADDR',
    NEW.Address_number,
    COALESCE(NEW.username,current_user),
    getCmntTypeId(NEW.type),
    NEW.text);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.addresscomment DO INSTEAD NOTHING;

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.addresscomment DO INSTEAD NOTHING;

COMMIT;