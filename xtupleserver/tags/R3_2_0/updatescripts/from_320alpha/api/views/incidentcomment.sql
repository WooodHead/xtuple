BEGIN;

-- Incident Comment

SELECT dropIfExists('VIEW', 'incidentcomment', 'api');
CREATE VIEW api.incidentcomment
AS 
   SELECT 
     incdt_number AS incident_number,
     cmnttype_name AS type,
     comment_date AS date,
     comment_user AS username,
     comment_text AS text
   FROM incdt, cmnttype, comment
   WHERE ((comment_source='INCDT')
   AND (comment_source_id=incdt_id)
   AND (comment_cmnttype_id=cmnttype_id));

GRANT ALL ON TABLE api.incidentcomment TO openmfg;
COMMENT ON VIEW api.incidentcomment IS 'Incident Comment';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.incidentcomment DO INSTEAD

  INSERT INTO comment (
    comment_date,
    comment_source,
    comment_source_id,
    comment_user,
    comment_cmnttype_id,
    comment_text
    )
  VALUES (
    COALESCE(NEW.date,now()),
    'INCDT',
    getincidentid(NEW.incident_number),
    COALESCE(NEW.username,current_user),
    getCmntTypeId(NEW.type),
    NEW.text);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.incidentcomment DO INSTEAD NOTHING;

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.incidentcomment DO INSTEAD NOTHING;

COMMIT;
