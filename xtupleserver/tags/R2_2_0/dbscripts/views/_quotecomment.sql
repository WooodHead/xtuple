BEGIN;

-- Quote Comment

DROP VIEW _quotecomment;
CREATE VIEW _quotecomment
AS 
   SELECT 
     quhead_number AS quote_number,
     cmnttype_name AS type,
     comment_date AS date,
     comment_user AS username,
     comment_text AS text
   FROM quhead, cmnttype, comment
   WHERE ((comment_source='Q')
   AND (comment_source_id=quhead_id)
   AND (comment_cmnttype_id=cmnttype_id));

GRANT ALL ON TABLE _quotecomment TO openmfg;
COMMENT ON VIEW _quotecomment IS '
This view can be used as an interface to import Quote Comment data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO _quotecomment DO INSTEAD

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
    'Q',
    getQuoteId(NEW.quote_number),
    COALESCE(NEW.username,current_user),
    getCmntTypeId(NEW.type),
    NEW.text);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO _quotecomment DO INSTEAD NOTHING;

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO _quotecomment DO INSTEAD NOTHING;

COMMIT;
