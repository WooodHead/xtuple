CREATE OR REPLACE FUNCTION saveCntct(int,int,int,text,text,text,text,bool,text,text,text,text,text,text,text) RETURNS INTEGER AS '
BEGIN
  RAISE EXCEPTION ''This function is deprecated.  Contact now requires a contact number. Use saveCntct(int,text,int,int,text,text,text,text,bool,text,text,text,text,text,text,text)'';
END;
' LANGUAGE 'plpgsql';

COMMENT ON FUNCTION saveCntct(int,int,int,text,text,text,text,bool,text,text,text,text,text,text,text) IS 'Deprecated';

CREATE OR REPLACE FUNCTION saveCntct(int,int,text,text,text,text,text,text,text,text,text) RETURNS INTEGER AS '
BEGIN
  
  RAISE EXCEPTION ''This function is deprecated. Contact now requires a contact number. Use saveCntct(int,text,int,text,text,text,text,text,text,text,text,text)'';
  
  RETURN _returnVal;

END;
' LANGUAGE 'plpgsql';

COMMENT ON FUNCTION saveCntct(int,int,text,text,text,text,text,text,text,text,text) IS 'Deprecated';

CREATE OR REPLACE FUNCTION saveCntct(int,text,int,int,text,text,text,text,bool,text,text,text,text,text,text,text) RETURNS INTEGER AS '
DECLARE
  pCntctId ALIAS FOR $1;
  pContactNumber ALIAS FOR $2;
  pCrmAcctId ALIAS FOR $3;
  pAddrId ALIAS FOR $4;
  pFirstName ALIAS FOR $5;
  pLastName ALIAS FOR $6;
  pHonorific ALIAS FOR $7;
  pInitials ALIAS FOR $8;
  pActive ALIAS FOR $9;
  pPhone ALIAS FOR $10;
  pPhone2 ALIAS FOR $11;
  pFax ALIAS FOR $12;
  pEmail ALIAS FOR $13;
  pWebAddr ALIAS FOR $14;
  pNotes ALIAS FOR $15;
  pTitle ALIAS FOR $16;
  _cntctId INTEGER;
  _cntctNumber TEXT;
  _isNew BOOLEAN;

BEGIN

  --If there is nothing here get out
  IF ( (pCntctId IS NULL)
	AND (pCrmAcctId IS NULL)
	AND (pAddrId IS NULL)
	AND (pContactNumber = '''' OR pContactNumber IS NULL)
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
    
    IF (pContactNumber IS NULL) THEN
      _cntctNumber := fetchNextNumber(''ContactNumber'');
    ELSE
      _cntctNumber := pContactNumber;
    END IF;
  ELSE
    _cntctNumber := pContactNumber;
  END IF;

  IF (_isNew) THEN
    IF (pCntctId IS NULL) THEN
      SELECT NEXTVAL(''cntct_cntct_id_seq'') INTO _cntctId;
    ELSE
      _cntctId := pCntctId;
    END IF;
 
    INSERT INTO cntct (
      cntct_id,cntct_number,
      cntct_crmacct_id,cntct_addr_id,cntct_first_name,
      cntct_last_name,cntct_honorific,cntct_initials,
      cntct_active,cntct_phone,cntct_phone2,
      cntct_fax,cntct_email,cntct_webaddr,
      cntct_notes,cntct_title ) VALUES (
      _cntctId,_cntctNumber,pCrmAcctId,pAddrId,
      pFirstName,pLastName,pHonorific,
      pInitials,COALESCE(pActive,true),pPhone,pPhone2,pFax,
      pEmail,pWebAddr,pNotes,pTitle );

    RETURN _cntctId;

  ELSE
    UPDATE cntct SET
      cntct_number=_cntctNumber,
      cntct_crmacct_id=COALESCE(pCrmAcctId,cntct_crmacct_id),
      cntct_addr_id=COALESCE(pAddrId,cntct_addr_id),
      cntct_first_name=COALESCE(pFirstName,cntct_first_name),
      cntct_last_name=COALESCE(pLastName,cntct_last_name),
      cntct_honorific=COALESCE(pHonorific,cntct_honorific),
      cntct_initials=COALESCE(pInitials,cntct_initials),
      cntct_active=COALESCE(pActive,cntct_active),
      cntct_phone=COALESCE(pPhone,cntct_phone),
      cntct_phone2=COALESCE(pPhone2,cntct_phone2),
      cntct_fax=COALESCE(pFax,cntct_fax),
      cntct_email=COALESCE(pEmail,cntct_email),
      cntct_webaddr=COALESCE(pWebAddr,cntct_webaddr),
      cntct_notes=COALESCE(pNotes,cntct_notes),
      cntct_title=COALESCE(pTitle,cntct_title)
    WHERE (cntct_id=pCntctId);
    
    RETURN pCntctId;

  END IF;
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION saveCntct(int,text,int,text,text,text,text,text,text,text,text,text) RETURNS INTEGER AS '
DECLARE
  pCntctId ALIAS FOR $1;
  pContactNumber ALIAS FOR $2;
  pAddrId ALIAS FOR $3;
  pFirstName ALIAS FOR $4;
  pLastName ALIAS FOR $5;
  pHonorific ALIAS FOR $6;
  pPhone ALIAS FOR $7;
  pPhone2 ALIAS FOR $8;
  pFax ALIAS FOR $9;
  pEmail ALIAS FOR $10;
  pWebAddr ALIAS FOR $11;
  pTitle ALIAS FOR $12;
  _returnVal INTEGER;

BEGIN
  
  SELECT saveCntct(pCntctId,pContactNumber,NULL,pAddrId,pFirstName,pLastName,pHonorific,NULL,NULL,pPhone,pPhone2,pFax,pEmail,pWebAddr,NULL,pTitle) INTO _returnVal;
  
  RETURN _returnVal;

END;
' LANGUAGE 'plpgsql';
