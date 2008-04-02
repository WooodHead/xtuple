BEGIN;

-- Sales Order Line Item Comment

--DROP VIEW api.saleslinecomment;
CREATE VIEW api.saleslinecomment
AS 
   SELECT 
     cohead_number AS order_number,
     coitem_linenumber AS line_number,
     cmnttype_name AS type,
     comment_date AS date,
     comment_user AS username,
     comment_text AS text
   FROM cohead, coitem, cmnttype, comment
   WHERE ((cohead_id=coitem_cohead_id)
   AND (comment_source='SI')
   AND (comment_source_id=coitem_id)
   AND (comment_cmnttype_id=cmnttype_id))
   ORDER BY cohead_number ASC, coitem_linenumber ASC, comment_date DESC;

GRANT ALL ON TABLE api.saleslinecomment TO openmfg;
COMMENT ON VIEW api.saleslinecomment IS '
This view can be used as an interface to import Sales Order Line Item Comment data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.saleslinecomment DO INSTEAD

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
    'SI',
    getSalesLineItemId(NEW.order_number,NEW.line_number),
    COALESCE(NEW.username,current_user),
    getCmntTypeId(NEW.type),
    NEW.text);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.saleslinecomment DO INSTEAD NOTHING;

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.saleslinecomment DO INSTEAD NOTHING;

COMMIT;
