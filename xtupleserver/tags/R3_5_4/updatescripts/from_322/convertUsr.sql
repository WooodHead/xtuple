BEGIN;

SELECT setUserPreference(usr_username, text('propername'), usr_propername),
       setUserPreference(usr_username, text('initials'), usr_initials),
       setUserPreference(usr_username, text('email'), usr_email),
       setUserPreference(usr_username, text('locale_id'), text(usr_locale_id)),
       setUserPreference(usr_username, text('agent'), CASE WHEN usr_agent THEN text('t') ELSE text('f') END),
       setUserPreference(usr_username, text('active'), CASE WHEN usr_active THEN text('t') ELSE text('f') END),
       setUserPreference(usr_username, text('window'), usr_window)
  FROM usr;

ALTER TABLE usr RENAME TO usr_bak;
SELECT dropIfExists('TRIGGER', 'usraftertrigger');
SELECT dropIfExists('FUNCTION', '_usraftertrigger()');

COMMIT;

