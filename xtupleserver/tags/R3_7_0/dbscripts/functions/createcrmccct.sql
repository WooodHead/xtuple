
CREATE OR REPLACE FUNCTION createCrmAcct(TEXT, TEXT, BOOLEAN, TEXT, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER) RETURNS INTEGER AS '
BEGIN
  return createCrmAcct($1, $2, $3, $4, $5, $6, $7, $8, $9, NULL, $10, $11);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createCrmAcct(TEXT, TEXT, BOOLEAN, TEXT, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER, INTEGER) RETURNS INTEGER AS '
  DECLARE
    pnumber     ALIAS FOR  $1;
    pname       ALIAS FOR  $2;
    pactive     ALIAS FOR  $3;
    ptype       ALIAS FOR  $4;
    pcustid     ALIAS FOR  $5;
    pcompetitorid       ALIAS FOR $6;
    ppartnerid  ALIAS FOR  $7;
    pprospectid ALIAS FOR  $8;
    pvendid     ALIAS FOR  $9;
    ptaxauthid  ALIAS FOR $10;
    pcntct1     ALIAS FOR $11;
    pcntct2     ALIAS FOR $12;
    _custid     INTEGER := pcustid;
    _competitorid INTEGER:=pcompetitorid;
    _prospectid INTEGER := pprospectid;
    _partnerid  INTEGER := ppartnerid;
    _vendid     INTEGER := pvendid;
    _cntct1     INTEGER := pcntct1;
    _cntct2     INTEGER := pcntct2;
    _taxauthid  INTEGER := ptaxauthid;
    _crmacctid INTEGER := NEXTVAL(''crmacct_crmacct_id_seq'');
  BEGIN
    IF (_custid < 0)       THEN _custid := NULL;        END IF;
    IF (_competitorid < 0) THEN _competitorid := NULL;  END IF;
    IF (_partnerid < 0)    THEN _partnerid := NULL;     END IF;
    IF (_prospectid < 0)   THEN _prospectid := NULL;    END IF;
    IF (_vendid < 0)       THEN _vendid := NULL;        END IF;
    IF (_cntct1 < 0)       THEN _cntct1 := NULL;        END IF;
    IF (_cntct2 < 0)       THEN _cntct2 := NULL;        END IF;
    IF (_taxauthid < 0)    THEN _taxauthid := NULL;     END IF;

    IF (EXISTS(SELECT crmacct_id
               FROM crmacct
               WHERE (crmacct_number=pnumber))) THEN
      RETURN -1;
    END IF;

    IF (_custid IS NOT NULL AND
        EXISTS(SELECT cust_id
               FROM custinfo
               WHERE ((cust_number=pnumber)
                 AND  (cust_id!=_custid)))) THEN
      RETURN -2;
    END IF;

    -- -3 for competitor when there is a distinct table
    -- -4 for partner when there is a distinct table

    IF (_prospectid IS NOT NULL AND
        EXISTS(SELECT prospect_id
               FROM prospect
               WHERE ((prospect_number=pnumber)
                 AND  (prospect_id!=_prospectid)))) THEN
      RETURN -5;
    END IF;

    IF (_vendid IS NOT NULL AND
        EXISTS(SELECT vend_id
               FROM vendinfo
               WHERE ((vend_number=pnumber)
                 AND  (vend_id!=_vendid)))) THEN
      RETURN -6;
    END IF;

    IF (_taxauthid IS NOT NULL AND
        EXISTS(SELECT taxauth_id
               FROM taxauth
               WHERE ((taxauth_code=pnumber)
                 AND  (taxauth_id!=_taxauthid)))) THEN
      RETURN -7;
    END IF;

    INSERT INTO crmacct (crmacct_id,crmacct_number, crmacct_name, crmacct_active,
                         crmacct_type, crmacct_cust_id, crmacct_competitor_id,
                         crmacct_partner_id, crmacct_prospect_id,
                         crmacct_vend_id, crmacct_taxauth_id,
                         crmacct_cntct_id_1, crmacct_cntct_id_2
                ) VALUES (_crmacctid,pnumber, pname, pactive,
                         ptype, _custid, _competitorid,
                         _partnerid, _prospectid,
                         _vendid, _taxauthid,
                         _cntct1, _cntct2);
    UPDATE cntct SET cntct_crmacct_id=_crmacctid WHERE cntct_id IN (_cntct1,_cntct2);
    RETURN _crmacctid;
  END;
' LANGUAGE 'plpgsql';

