BEGIN;

  SELECT dropIfExists('VIEW', 'employee', 'api');
  CREATE OR REPLACE VIEW api.employee AS
 
  SELECT 
    e.emp_code          AS code,
    e.emp_number        AS number,
    e.emp_active        AS active,

    cntct_number        AS contact_number,
    cntct_honorific     AS honorific,
    cntct_first_name    AS first,
    cntct_middle	 AS middle,
    cntct_last_name     AS last,
    cntct_suffix		 AS suffix,
    cntct_title         AS job_title,
    cntct_phone         AS voice,
    cntct_phone2        AS alternate,
    cntct_fax           AS fax,
    cntct_email         AS email,
    cntct_webaddr       AS web,
    (''::TEXT)          AS contact_change,

    addr_number         AS address_number,
    addr_line1          AS address1,
    addr_line2          AS address2,
    addr_line3          AS address3,
    addr_city           AS city,
    addr_state          AS state,
    addr_postalcode     AS postalcode,
    addr_country        AS country,
    (''::TEXT)          AS address_change,

    warehous_code       AS site,

    m.emp_code          AS manager_code,

    CASE WHEN (e.emp_wage_type='H')     THEN 'Hourly'
         WHEN (e.emp_wage_type='S')     THEN 'Salaried'
         WHEN (e.emp_wage_type IS NULL) THEN NULL
         ELSE 'Error'
    END AS wage_type,
    e.emp_wage          AS wage,
    curr_abbr           AS wage_currency,
    CASE WHEN (e.emp_wage_period='H')     THEN 'Hour'
         WHEN (e.emp_wage_period='D')     THEN 'Day'
         WHEN (e.emp_wage_period='W')     THEN 'Week'
         WHEN (e.emp_wage_period='BW')    THEN 'Biweek'
         WHEN (e.emp_wage_period='M')     THEN 'Month'
         WHEN (e.emp_wage_period='Y')     THEN 'Year'
         WHEN (e.emp_wage_period IS NULL) THEN NULL
         ELSE 'Error'
    END AS wage_period,

    dept_number         AS department,
    shift_number        AS shift,

    (e.emp_usr_id IS NOT NULL)  AS is_user,
    (salesrep_id IS NOT NULL)   AS is_salesrep,
    e.emp_notes                 AS notes,
    image_name                  AS image

  FROM emp e
      LEFT OUTER JOIN cntct   ON (e.emp_cntct_id=cntct_id)
      LEFT OUTER JOIN addr    ON (cntct_addr_id=addr_id)
      LEFT OUTER JOIN whsinfo ON (e.emp_warehous_id=warehous_id)
      LEFT OUTER JOIN emp m   ON (e.emp_mgr_emp_id=m.emp_id)

      LEFT OUTER JOIN dept    ON (e.emp_dept_id=dept_id)
      LEFT OUTER JOIN shift   ON (e.emp_shift_id=shift_id)
      LEFT OUTER JOIN salesrep ON (e.emp_code=salesrep_number)
      LEFT OUTER JOIN image    ON (e.emp_image_id=image_id)
      JOIN curr_symbol        ON (e.emp_wage_curr_id=curr_id);

GRANT ALL ON TABLE api.employee TO openmfg;
COMMENT ON VIEW api.employee IS 'Employee';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS ON INSERT TO api.employee DO INSTEAD
  INSERT INTO emp (
      emp_code,
      emp_number,
      emp_active,
      emp_cntct_id,
      emp_warehous_id,
      emp_mgr_emp_id,
      emp_wage_type,
      emp_wage,
      emp_wage_curr_id,
      emp_wage_period,
      emp_dept_id,
      emp_shift_id,
      emp_usr_id,
      emp_image_id,
      emp_notes
    ) VALUES (
      NEW.code,
      NEW.number,
      COALESCE(NEW.active,true),
      saveCntct(getCntctId(NEW.contact_number),
                NEW.contact_number,
                saveAddr(getAddrId(NEW.address_number),
                         NEW.address_number,
                         NEW.address1,
                         NEW.address2,
                         NEW.address3,
                         NEW.city,
                         NEW.state,
                         NEW.postalcode,
                         NEW.country,
                         NEW.address_change),
                NEW.honorific,
                NEW.first,
                NEW.middle,
                NEW.last,
                NEW.suffix,
                NEW.voice,
                NEW.alternate,
                NEW.fax,
                NEW.email,
                NEW.web,
                NEW.job_title,
                NEW.contact_change
      ),
      getWarehousId(NEW.site, 'ALL'),
      (SELECT emp_id FROM emp WHERE (emp_code=NEW.manager_code)),

      CASE WHEN NEW.wage_type='Hourly'   THEN 'H'
           WHEN NEW.wage_type='Salaried' THEN 'S'
      END,
      NEW.wage,
      COALESCE(getCurrId(NEW.wage_currency),basecurrid()),
      CASE WHEN NEW.wage_period='Hour'   THEN 'H'
           WHEN NEW.wage_period='Day'    THEN 'D'
           WHEN NEW.wage_period='Week'   THEN 'W'
           WHEN NEW.wage_period='Biweek' THEN 'BW'
           WHEN NEW.wage_period='Month'  THEN 'M'
           WHEN NEW.wage_period='Year'   THEN 'Y'
      END,

      getDeptId(NEW.department),
      getShiftId(NEW.shift),
      (SELECT usr_id FROM usr WHERE (usr_username=NEW.code)),
      getImageId(NEW.image),
      COALESCE(NEW.notes,'')
    );

CREATE OR REPLACE RULE "_UPDATE" AS ON UPDATE TO api.employee DO INSTEAD

  UPDATE emp SET
    emp_code=NEW.code,
    emp_number=NEW.number,
    emp_active=NEW.active,
    emp_cntct_id=saveCntct(getCntctId(NEW.contact_number),
                            NEW.contact_number,
                            saveAddr(getAddrId(NEW.address_number),
                                     NEW.address_number,
                                     NEW.address1,
                                     NEW.address2,
                                     NEW.address3,
                                     NEW.city,
                                     NEW.state,
                                     NEW.postalcode,
                                     NEW.country,
                                     NEW.address_change),
                            NEW.honorific,
                            NEW.first,
                            NEW.middle,
                            NEW.last,
                            NEW.suffix,
                            NEW.voice,
                            NEW.alternate,
                            NEW.fax,
                            NEW.email,
                            NEW.web,
                            NEW.job_title,
                            NEW.contact_change
                  ),

    emp_warehous_id=getWarehousId(NEW.site, 'ALL'),
    emp_mgr_emp_id=(SELECT emp_id FROM emp WHERE (emp_code=NEW.manager_code)),

    emp_wage_type=CASE WHEN NEW.wage_type='Hourly'   THEN 'H'
                       WHEN NEW.wage_type='Salaried' THEN 'S'
                  END,
    emp_wage=NEW.wage,
    emp_wage_curr_id=COALESCE(getCurrId(NEW.wage_currency),basecurrid()),
    emp_wage_period=CASE WHEN NEW.wage_period='Hour'   THEN 'H'
                         WHEN NEW.wage_period='Day'    THEN 'D'
                         WHEN NEW.wage_period='Week'   THEN 'W'
                         WHEN NEW.wage_period='Biweek' THEN 'BW'
                         WHEN NEW.wage_period='Month'  THEN 'M'
                         WHEN NEW.wage_period='Year'   THEN 'Y'
                    END,
    emp_dept_id=getDeptId(NEW.department),
    emp_shift_id=getShiftId(NEW.shift),
    emp_usr_id=(SELECT usr_id FROM usr WHERE (usr_username=NEW.code)),
    emp_image_id=getImageId(NEW.image),
    emp_notes=COALESCE(NEW.notes,'')
  WHERE emp_code=OLD.code;

CREATE OR REPLACE RULE "_DELETE" AS ON DELETE TO api.employee DO INSTEAD
  SELECT deleteEmp(getEmpId(OLD.code));

COMMIT;
