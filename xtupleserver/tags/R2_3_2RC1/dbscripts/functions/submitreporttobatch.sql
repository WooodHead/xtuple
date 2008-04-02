
CREATE OR REPLACE FUNCTION submitReportToBatch(TEXT, TEXT, TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pReportName ALIAS FOR $1;
  pEmail ALIAS FOR $2;
  pSubject ALIAS FOR $3;
  pResponseBody ALIAS FOR $4;
  pFilename ALIAS FOR $5;
  pScheduled ALIAS FOR $6;
  _batchid INTEGER;

BEGIN

  SELECT NEXTVAL(''batch_batch_id_seq'') INTO _batchid;
  INSERT INTO batch
  ( batch_id, batch_action, batch_parameter,
    batch_user, batch_email, batch_responsebody,
    batch_subject, batch_filename,
    batch_submitted, batch_scheduled,
    batch_started, batch_completed )
  VALUES
  ( _batchid, ''RunReport'', pReportName,
    CURRENT_USER, pEmail, pResponseBody,
    pSubject, pFilename,
    CURRENT_TIMESTAMP, pScheduled,
    NULL, NULL );

  RETURN _batchid;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION submitReportToBatch(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pReportName ALIAS FOR $1;
  pFromEmail ALIAS FOR $2;
  pToEmail ALIAS FOR $3;
  pSubject ALIAS FOR $4;
  pResponseBody ALIAS FOR $5;
  pFilename ALIAS FOR $6;
  pScheduled ALIAS FOR $7;
  _batchid INTEGER;

BEGIN

  RETURN submitReportToBatch(pReportName, pFromEmail, pToEmail, '''', pSubject, pResponseBody, pFilename, pScheduled);

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION submitReportToBatch(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pReportName ALIAS FOR $1;
  pFromEmail ALIAS FOR $2;
  pToEmail ALIAS FOR $3;
  pCCEmail ALIAS FOR $4;
  pSubject ALIAS FOR $5;
  pResponseBody ALIAS FOR $6;
  pFilename ALIAS FOR $7;
  pScheduled ALIAS FOR $8;
  _batchid INTEGER;

BEGIN

  SELECT NEXTVAL(''batch_batch_id_seq'') INTO _batchid;
  INSERT INTO batch
  ( batch_id, batch_action, batch_parameter,
    batch_user, batch_fromemail,
    batch_email, batch_responsebody,
    batch_subject, batch_filename,
    batch_submitted, batch_scheduled,
    batch_started, batch_completed, batch_cc )
  VALUES
  ( _batchid, ''RunReport'', pReportName,
    CURRENT_USER, pFromEmail,
    pToEmail, pResponseBody,
    pSubject, pFilename,
    CURRENT_TIMESTAMP, pScheduled,
    NULL, NULL, pCCEmail );

  RETURN _batchid;

END;
' LANGUAGE 'plpgsql';

