CREATE OR REPLACE FUNCTION _incdttrigger() RETURNS "trigger" AS '
DECLARE
  _r		RECORD;
  _counter	INTEGER :=  0;
  _whsId	INTEGER := -1;
  _evntType	TEXT;
BEGIN

  IF (TG_OP = ''DELETE'') THEN
--  This should never happen
    RETURN OLD;
  ELSIF (TG_OP = ''INSERT'') THEN
    INSERT INTO incdthist
	  (incdthist_incdt_id,
	   incdthist_change, incdthist_target_id,
	   incdthist_descrip)
    VALUES(NEW.incdt_id,
	   ''N'', NULL,
	   ''Incident Added'');

    _evntType = ''NewIncident'';

  ELSIF (TG_OP = ''UPDATE'') THEN
    _evntType = ''UpdatedIncident'';

    IF (COALESCE(NEW.incdt_cntct_id,-1) <> COALESCE(OLD.incdt_cntct_id,-1)) THEN
      INSERT INTO incdthist
	    (incdthist_incdt_id,
	     incdthist_change, incdthist_target_id,
	     incdthist_descrip)
      VALUES(NEW.incdt_id,
	     ''C'', NEW.incdt_cntct_id,
	     (''Contact Changed: "'' ||
	       COALESCE((SELECT cntct_first_name || '' '' || cntct_last_name
			   FROM cntct
			  WHERE (cntct_id=OLD.incdt_cntct_id)), '''')
	      || ''" -> "'' ||
	       COALESCE((SELECT cntct_first_name || '' '' || cntct_last_name
			   FROM cntct
			  WHERE (cntct_id=NEW.incdt_cntct_id)), '''')
	      || ''"'') );
    END IF;

    IF (COALESCE(NEW.incdt_summary,'''') <> COALESCE(OLD.incdt_summary,'''')) THEN
      INSERT INTO incdthist
	    (incdthist_incdt_id,
	     incdthist_descrip)
      VALUES(NEW.incdt_id,
	     (''Summary Updated: "'' ||
	       COALESCE(OLD.incdt_summary, '''') ||
	      ''" -> "'' ||
	       COALESCE(NEW.incdt_summary, '''') ||
	      ''"'') );
    END IF;

    IF (COALESCE(NEW.incdt_descrip,'''') <> COALESCE(OLD.incdt_descrip,'''')) THEN
      INSERT INTO incdthist
	    (incdthist_incdt_id,
	     incdthist_descrip)
      VALUES(NEW.incdt_id,
	     (''Description Updated: "'' ||
	       substr(COALESCE(OLD.incdt_descrip, ''''), 1, 20) ||
	      ''..." -> "'' ||
	       substr(COALESCE(NEW.incdt_descrip, ''''), 1, 20) ||
	      ''..."'') );
    END IF;

    IF (NEW.incdt_status <> OLD.incdt_status) THEN
      INSERT INTO incdthist
	    (incdthist_incdt_id,
	     incdthist_change, incdthist_target_id,
	     incdthist_descrip)
      VALUES(NEW.incdt_id,
	     ''S'', NULL,
	     (''Status Changed: '' ||
	      CASE WHEN(OLD.incdt_status=''N'') THEN ''New''
		   WHEN(OLD.incdt_status=''F'') THEN ''Feedback''
		   WHEN(OLD.incdt_status=''C'') THEN ''Confirmed''
		   WHEN(OLD.incdt_status=''A'') THEN ''Assigned''
		   WHEN(OLD.incdt_status=''R'') THEN ''Resolved''
		   WHEN(OLD.incdt_status=''L'') THEN ''Closed''
		   ELSE OLD.incdt_status
	      END
	      || '' -> '' ||
	      CASE WHEN(NEW.incdt_status=''N'') THEN ''New''
		   WHEN(NEW.incdt_status=''F'') THEN ''Feedback''
		   WHEN(NEW.incdt_status=''C'') THEN ''Confirmed''
		   WHEN(NEW.incdt_status=''A'') THEN ''Assigned''
		   WHEN(NEW.incdt_status=''R'') THEN ''Resolved''
		   WHEN(NEW.incdt_status=''L'') THEN ''Closed''
		   ELSE NEW.incdt_status
	      END
	      ) );
      IF (NEW.incdt_status = ''L'') THEN
	_evntType = ''ClosedIncident'';
      ELSIF (OLD.incdt_status = ''L'') THEN
	_evntType = ''ReopenedIncident'';
      END IF;
    END IF;

    IF (COALESCE(NEW.incdt_assigned_username,'''') <> COALESCE(OLD.incdt_assigned_username,'''')) THEN
      INSERT INTO incdthist
	    (incdthist_incdt_id,
	     incdthist_change, incdthist_target_id,
	     incdthist_descrip)
      VALUES(NEW.incdt_id,
	     ''A'', NULL,
	     (''Assigned to: "'' ||
	       COALESCE(OLD.incdt_assigned_username, '''') ||
	      ''" -> "'' ||
	       COALESCE(NEW.incdt_assigned_username, '''') ||
	      ''"'') );
    END IF;

    IF (COALESCE(NEW.incdt_incdtcat_id,-1) <> COALESCE(OLD.incdt_incdtcat_id,-1)) THEN
      INSERT INTO incdthist
	    (incdthist_incdt_id,
	     incdthist_change, incdthist_target_id,
	     incdthist_descrip)
      VALUES(NEW.incdt_id,
	     ''T'', NEW.incdt_incdtcat_id,
	     (''Category Changed: '' ||
	       COALESCE((SELECT incdtcat_name
			   FROM incdtcat
			  WHERE (incdtcat_id=OLD.incdt_incdtcat_id)), '''')
	      || '' -> '' ||
	       COALESCE((SELECT incdtcat_name
			   FROM incdtcat
			  WHERE (incdtcat_id=NEW.incdt_incdtcat_id)), '''')
	      || '''') );
    END IF;

    IF (COALESCE(NEW.incdt_incdtseverity_id,-1) <> COALESCE(OLD.incdt_incdtseverity_id,-1)) THEN
      INSERT INTO incdthist
	    (incdthist_incdt_id,
	     incdthist_change, incdthist_target_id,
	     incdthist_descrip)
      VALUES(NEW.incdt_id,
	     ''V'', NEW.incdt_incdtseverity_id,
	     (''Severity Changed: '' ||
	       COALESCE((SELECT incdtseverity_name
			   FROM incdtseverity
			  WHERE (incdtseverity_id=OLD.incdt_incdtseverity_id)), '''')
	      || '' -> '' ||
	       COALESCE((SELECT incdtseverity_name
			   FROM incdtseverity
			  WHERE (incdtseverity_id=NEW.incdt_incdtseverity_id)), '''')
	      || '''') );
    END IF;

    IF (COALESCE(NEW.incdt_incdtpriority_id,-1) <> COALESCE(OLD.incdt_incdtpriority_id,-1)) THEN
      INSERT INTO incdthist
	    (incdthist_incdt_id,
	     incdthist_change, incdthist_target_id,
	     incdthist_descrip)
      VALUES(NEW.incdt_id,
	     ''P'', NEW.incdt_incdtpriority_id,
	     (''Priority Changed: '' ||
	       COALESCE((SELECT incdtpriority_name
			   FROM incdtpriority
			  WHERE (incdtpriority_id=OLD.incdt_incdtpriority_id)), '''')
	      || '' -> '' ||
	       COALESCE((SELECT incdtpriority_name
			   FROM incdtpriority
			  WHERE (incdtpriority_id=NEW.incdt_incdtpriority_id)), '''')
	      || '''') );
    END IF;

    IF (COALESCE(NEW.incdt_incdtresolution_id,-1) <> COALESCE(OLD.incdt_incdtresolution_id,-1)) THEN
      INSERT INTO incdthist
	    (incdthist_incdt_id,
	     incdthist_change, incdthist_target_id,
	     incdthist_descrip)
      VALUES(NEW.incdt_id,
	     ''E'', NEW.incdt_incdtresolution_id,
	     (''Resolution Changed: '' ||
	       COALESCE((SELECT incdtresolution_name
			   FROM incdtresolution
			  WHERE (incdtresolution_id=OLD.incdt_incdtresolution_id)), '''')
	      || '' -> '' ||
	       COALESCE((SELECT incdtresolution_name
			   FROM incdtresolution
			  WHERE (incdtresolution_id=NEW.incdt_incdtresolution_id)), '''')
	      || '''') );
    END IF;
  END IF;

  -- find the warehouse for which to create evntlog entries
    SELECT usrpref_value  INTO _whsId
    FROM usrpref
    WHERE usrpref_username = CURRENT_USER
      AND usrpref_name = ''PreferredWarehouse'';

  INSERT INTO evntlog (evntlog_evnttime, evntlog_username,
		       evntlog_evnttype_id, evntlog_ordtype,
		       evntlog_ord_id, evntlog_warehous_id, evntlog_number)
  SELECT DISTINCT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
		       ''IC'', NEW.incdt_id, _whsId, NEW.incdt_number
  FROM evntnot, evnttype
  WHERE ((evntnot_evnttype_id=evnttype_id)
    AND  (evnttype_name=_evntType));

  RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

DROP TRIGGER incdttrigger ON incdt;
CREATE TRIGGER incdttrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON incdt
  FOR EACH ROW
  EXECUTE PROCEDURE _incdttrigger();
