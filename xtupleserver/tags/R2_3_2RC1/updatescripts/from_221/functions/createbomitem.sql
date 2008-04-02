CREATE OR REPLACE FUNCTION createBOMItem( INTEGER, INTEGER, INTEGER, INTEGER, CHAR,
                                          INTEGER, NUMERIC, NUMERIC,
                                          CHAR(1), INTEGER, BOOLEAN,
                                          DATE, DATE,
                                          BOOL, INTEGER, BOOL, TEXT, CHAR, INTEGER )
                           RETURNS INTEGER AS '
DECLARE
  pBomitemid ALIAS FOR $1;
  pParentItemid ALIAS FOR $2;
  pComponentItemid ALIAS FOR $3;
  pSeqNumber ALIAS FOR $4;
  pIssueMethod ALIAS FOR $5;
  pUomId ALIAS FOR $6;
  pQtyPer ALIAS FOR $7;
  pScrap ALIAS FOR $8;
  pConfigType ALIAS FOR $9;
  pConfigId ALIAS FOR $10;
  pConfigFlag ALIAS FOR $11;
  pEffective ALIAS FOR $12;
  pExpires ALIAS FOR $13;
  pCreateWo ALIAS FOR $14;
  pBOOItemseqid ALIAS FOR $15;
  pSchedAtWooper ALIAS FOR $16;
  pECN ALIAS FOR $17;
  pSubType ALIAS FOR $18;
  pRevisionid ALIAS FOR $19;
  _bomworksetid INTEGER;
  _temp INTEGER;

BEGIN

--  Make sure that the parent and component are not the same
  IF (pParentItemid = pComponentItemid) THEN
    RETURN -1;
  END IF;

--  Make sure that the parent is not used in the component at some level
  IF ( SELECT (item_type IN (''M'', ''F''))
       FROM item
       WHERE (item_id=pComponentItemid) ) THEN
    SELECT indentedWhereUsed(pParentItemid) INTO _bomworksetid;
    SELECT bomwork_id INTO _temp
    FROM bomwork
    WHERE ( (bomwork_set_id=_bomworksetid)
     AND (bomwork_item_id=pComponentItemid) )
    LIMIT 1;
    IF (FOUND) THEN
      PERFORM deleteBOMWorkset(_bomworksetid);
      RETURN -2;
    END IF;
  END IF;

  PERFORM deleteBOMWorkset(_bomworksetid);

--  Create the BOM Item
  INSERT INTO bomitem
  ( bomitem_id, bomitem_parent_item_id, bomitem_item_id,
    bomitem_seqnumber, bomitem_issuemethod,
    bomitem_uom_id, bomitem_qtyper, bomitem_scrap,
    bomitem_configtype, bomitem_configid, bomitem_configflag,
    bomitem_effective, bomitem_expires,
    bomitem_createwo,
    bomitem_booitem_seq_id, bomitem_schedatwooper,
    bomitem_ecn, bomitem_subtype, bomitem_moddate, bomitem_rev_id )
  VALUES
  ( pBomitemid, pParentItemid, pComponentItemid,
    pSeqNumber, pIssueMethod,
    pUomId, pQtyPer, pScrap,
    pConfigType, pConfigId, pConfigFlag,
    pEffective, pExpires,
    pCreateWo,
    pBOOItemseqid, pSchedAtWooper,
    pECN, pSubType, CURRENT_DATE, pRevisionid );

  RETURN pBomitemid;

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION createBOMItem( INTEGER, INTEGER, INTEGER, CHAR,
                                          INTEGER, NUMERIC, NUMERIC,
                                          CHAR(1), INTEGER, BOOLEAN,
                                          DATE, DATE,
                                          BOOL, INTEGER, BOOL, TEXT, CHAR(1), INTEGER )
                           RETURNS INTEGER AS '
DECLARE
  pBomitemid ALIAS FOR $1;
  pParentItemid ALIAS FOR $2;
  pComponentItemid ALIAS FOR $3;
  pIssueMethod ALIAS FOR $4;
  pUomId ALIAS FOR $5;
  pQtyPer ALIAS FOR $6;
  pScrap ALIAS FOR $7;
  pConfigType ALIAS FOR $8;
  pConfigId ALIAS FOR $9;
  pConfigFlag ALIAS FOR $10;
  pEffective ALIAS FOR $11;
  pExpires ALIAS FOR $12;
  pCreateWo ALIAS FOR $13;
  pBOOItemseqid ALIAS FOR $14;
  pSchedAtWooper ALIAS FOR $15;
  pECN ALIAS FOR $16;
  pSubType ALIAS FOR $17;
  pRevisionid ALIAS FOR $18;
  _seqNumber INTEGER;
  _bomitemid INTEGER;

BEGIN

--  Grab the next Sequence Number, if any
  SELECT MAX(bomitem_seqnumber) INTO _seqNumber
  FROM bomitem
  WHERE (bomitem_parent_item_id=pParentItemid);

  IF (_seqNumber IS NOT NULL) THEN
   _seqNumber := (_seqNumber + 10);
  ELSE
   _seqNumber := 10;
  END IF;

  SELECT createBOMItem( pBomitemid, pParentItemid, pComponentItemid,
                        _seqNumber, pIssueMethod,
                        pUomId, pQtyPer, pScrap,
                        pConfigType, pConfigId, pConfigFlag,
                        pEffective, pExpires,
                        pCreateWo, pBOOItemseqid, pSchedAtWooper, pECN, pSubType, pRevisionid ) INTO _bomitemid;

  RETURN _bomitemid;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createBOMItem( INTEGER, INTEGER, INTEGER, INTEGER, CHAR,
                                          NUMERIC, NUMERIC,
                                          CHAR(1), INTEGER, BOOLEAN,
                                          DATE, DATE,
                                          BOOL, INTEGER, BOOL, TEXT, CHAR, INTEGER )
                           RETURNS INTEGER AS '
DECLARE
  pBomitemid ALIAS FOR $1;
  pParentItemid ALIAS FOR $2;
  pComponentItemid ALIAS FOR $3;
  pSeqNumber ALIAS FOR $4;
  pIssueMethod ALIAS FOR $5;
  pQtyPer ALIAS FOR $6;
  pScrap ALIAS FOR $7;
  pConfigType ALIAS FOR $8;
  pConfigId ALIAS FOR $9;
  pConfigFlag ALIAS FOR $10;
  pEffective ALIAS FOR $11;
  pExpires ALIAS FOR $12;
  pCreateWo ALIAS FOR $13;
  pBOOItemseqid ALIAS FOR $14;
  pSchedAtWooper ALIAS FOR $15;
  pECN ALIAS FOR $16;
  pSubType ALIAS FOR $17;
  pRevisionid ALIAS FOR $18;
  _result INTEGER;
BEGIN
  SELECT createBOMItem(pBomitemid, pParentItemid, pComponentItemid,
            pSeqNumber, pIssueMethod, item_inv_uom_id, pQtyPer, pScrap,
            pConfigType, pConfigId, pConfigFlag, pEffective, pExpires,
            pCreateWo, pBOOItemseqid, pSchedAtWooper, pECN, pSubType, pRevisionid)
    INTO _result
    FROM item
   WHERE(item_id=pParentItemid);
  RETURN _result;
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createBOMItem( INTEGER, INTEGER, INTEGER, CHAR,
                                          NUMERIC, NUMERIC,
                                          CHAR(1), INTEGER, BOOLEAN,
                                          DATE, DATE,
                                          BOOL, INTEGER, BOOL, TEXT, CHAR(1), INTEGER )
                           RETURNS INTEGER AS '
DECLARE
  pBomitemid ALIAS FOR $1;
  pParentItemid ALIAS FOR $2;
  pComponentItemid ALIAS FOR $3;
  pIssueMethod ALIAS FOR $4;
  pQtyPer ALIAS FOR $5;
  pScrap ALIAS FOR $6;
  pConfigType ALIAS FOR $7;
  pConfigId ALIAS FOR $8;
  pConfigFlag ALIAS FOR $9;
  pEffective ALIAS FOR $10;
  pExpires ALIAS FOR $11;
  pCreateWo ALIAS FOR $12;
  pBOOItemseqid ALIAS FOR $13;
  pSchedAtWooper ALIAS FOR $14;
  pECN ALIAS FOR $15;
  pSubType ALIAS FOR $16;
  pRevisionid ALIAS FOR $17;
  _result INTEGER;

BEGIN
  SELECT createBOMItem(pBomitemid, pParentItemid, pComponentItemid,
            pIssueMethod, item_inv_uom_id, pQtyPer, pScrap,
            pConfigType, pConfigId, pConfigFlag, pEffective, pExpires,
            pCreateWo, pBOOItemseqid, pSchedAtWooper, pECN, pSubType, pRevisionid)
    INTO _result
    FROM item
   WHERE(item_id=pParentItemid);
  RETURN _result;
END;
' LANGUAGE 'plpgsql';
