DROP VIEW vend;
CREATE VIEW vend AS
  SELECT vend_id, vend_name,
        m.addr_line1    AS vend_address1,
        m.addr_line2    AS vend_address2,
        m.addr_line3    AS vend_address3,
        m.addr_city     AS vend_city,
        m.addr_state    AS vend_state,
        m.addr_postalcode AS vend_zip,
        trim(c1.cntct_first_name || ' ' || c1.cntct_last_name) AS vend_contact1,
        c1.cntct_phone  AS vend_phone1,
        trim(c2.cntct_first_name || ' ' || c2.cntct_last_name) AS vend_contact2,
        c2.cntct_phone  AS vend_phone2,
        vend_lastpurchdate,
        vend_active,
        vend_po,
        vend_comments,
        vend_pocomments,
        vend_number,
        c1.cntct_fax    AS vend_fax1,
        c2.cntct_fax    AS vend_fax2,
        c1.cntct_email  AS vend_email1,
        c2.cntct_email  AS vend_email2,
        vend_1099,
        vend_exported,
        vend_fobsource,
        vend_fob,
        vend_terms_id,
        vend_shipvia,
        vend_vendtype_id,
        vend_qualified,
        vend_ediemail,
        vend_ediemailbody,
        vend_edisubject,
        vend_edifilename,
        vend_accntnum,
        vend_emailpodelivery,
        vend_restrictpurch,
        vend_edicc,
        m.addr_country  AS vend_country,
        vend_curr_id
FROM vendinfo LEFT OUTER JOIN cntct c1  ON (vend_cntct1_id=c1.cntct_id)
          LEFT OUTER JOIN addr m    ON (vend_addr_id=m.addr_id)
          LEFT OUTER JOIN cntct c2  ON (vend_cntct2_id=c2.cntct_id);

REVOKE ALL ON TABLE vend FROM PUBLIC;
GRANT  ALL ON TABLE vend TO GROUP openmfg;

