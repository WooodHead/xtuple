CREATE OR REPLACE FUNCTION saveCntct(int,int,int,text,text,text,text,bool,text,text,text,text,text,text,text) RETURNS INTEGER AS '
DECLARE
  pCntctId ALIAS FOR $1;
  pCrmAcctId ALIAS FOR $2;
  pAddrId ALIAS FOR $3;
  pFirstName ALIAS FOR $4;
  pLastName ALIAS FOR $5;
  pHonorific ALIAS FOR $6;
  pInitials ALIAS FOR $7;
  pActive ALIAS FOR $8;
  pPhone ALIAS FOR $9;
  pPhone2 ALIAS FOR $10;
  pFax ALIAS FOR $11;
  pEmail ALIAS FOR $12;
  pWebAddr ALIAS FOR $13;
  pNotes ALIAS FOR $14;
  pTitle ALIAS FOR $15;
  _cntctId INTEGER;
  _firstName TEXT;
  _lastName TEXT;
  _isNew BOOLEAN;

BEGIN

  --If there is nothing here, get out
  IF ( (pCntctId IS NULL)
	AND (pCrmAcctId IS NULL)
	AND (pAddrId IS NULL)
	AND (pFirstName = '''' OR pFirstName IS NULL)
	AND (pLastName = '''' OR pLastName IS NULL)
	AND (pHonorific = '''' OR pHonorific IS NULL)
	AND (pInitials = '''' OR pInitials IS NULL)
	AND (pPhone = '''' OR pPhone IS NULL)
	AND (pPhone2 = '''' OR pPhone2 IS NULL)
	AND (pFax = '''' OR pFax IS NULL)
	AND (pEmail = '''' OR pEmail IS NULL)
	AND (pWebAddr = '''' OR pWebAddr IS NULL)
	AND (pNotes = '''' OR pNotes IS NULL)
	AND (pTitle = '''' OR pTitle IS NULL) ) THEN
	
	RETURN NULL;

  END IF;
  
  IF (pCntctId IS NULL) THEN 
    
    _isNew := true;

  ELSE

    SELECT cntct_first_name,cntct_last_name INTO _firstName,_lastName
    FROM cntct
    WHERE (cntct_id=pCntctId);

    IF (_firstName <> pFirstName) OR (_lastName <> pLastName) THEN
      _isNew := true;
    ELSE
      _isNew := false;
    END IF;

  END IF;

  IF (_isNew) THEN
    SELECT NEXTVAL(''cntct_cntct_id_seq'') INTO _cntctId;
 
    INSERT INTO cntct (
      cntct_id,
      cntct_crmacct_id,cntct_addr_id,cntct_first_name,
      cntct_last_name,cntct_honorific,cntct_initials,
      cntct_active,cntct_phone,cntct_phone2,
      cntct_fax,cntct_email,cntct_webaddr,
      cntct_notes,cntct_title ) VALUES (
      _cntctId, pCrmAcctId,pAddrId,
      pFirstName,pLastName,pHonorific,
      pInitials,COALESCE(pActive,true),pPhone,pPhone2,pFax,
      pEmail,pWebAddr,pNotes,pTitle );

    RETURN _cntctId;

  ELSE
    UPDATE cntct SET
      cntct_crmacct_id=COALESCE(pCrmAcctId,cntct_crmacct_id),cntct_addr_id=COALESCE(pAddrId,cntct_addr_id),
      cntct_first_name=pFirstName,cntct_last_name=pLastName,
      cntct_honorific=pHonorific,cntct_initials=COALESCE(pInitials,cntct_initials),
      cntct_active=COALESCE(pActive,cntct_active),cntct_phone=pPhone,cntct_phone2=COALESCE(pPhone2,cntct_phone2),
      cntct_fax=pFax,cntct_email=pEmail,cntct_webaddr=COALESCE(pWebAddr,cntct_webaddr),
      cntct_notes=COALESCE(pNotes,cntct_notes),cntct_title=pTitle
    WHERE (cntct_id=pCntctId);
    
    RETURN pCntctId;

  END IF;
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION saveCntct(int,int,text,text,text,text,text,text,text,text,text) RETURNS INTEGER AS '
DECLARE
  pCntctId ALIAS FOR $1;
  pAddrId ALIAS FOR $2;
  pFirstName ALIAS FOR $3;
  pLastName ALIAS FOR $4;
  pHonorific ALIAS FOR $5;
  pPhone ALIAS FOR $6;
  pPhone2 ALIAS FOR $7;
  pFax ALIAS FOR $8;
  pEmail ALIAS FOR $9;
  pWebAddr ALIAS FOR $10;
  pTitle ALIAS FOR $11;
  _returnVal INTEGER;

BEGIN
  
  SELECT saveCntct(pCntctId,NULL,pAddrId,pFirstName,pLastName,pHonorific,NULL,NULL,pPhone,pPhone2,pFax,pEmail,pWebAddr,NULL,pTitle) INTO _returnVal;
  
  RETURN _returnVal;

END;
' LANGUAGE 'plpgsql';
