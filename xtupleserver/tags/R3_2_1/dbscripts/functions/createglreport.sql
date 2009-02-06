
CREATE OR REPLACE FUNCTION createGLReport (integer) RETURNS integer
    AS '
DECLARE
  pPeriodId ALIAS FOR $1;
  _p RECORD;
  _rPeriod RECORD;
  _rPriorPeriod RECORD;
  _rAccount RECORD;
  _rworkGLhead RECORD;
  _workglhead_id INTEGER;
  _currYear INTEGER;
  _currMonth INTEGER;
  _currDay INTEGER;
  _priorYear INTEGER;
  _workglhead_cy_startdate DATE;
  _workglhead_pyp_startdate DATE;
  _workglhead_pyp_enddate DATE;
  _workglhead_py_startdate DATE;
  _workglitem_cyp_balance numeric;
  _workglitem_cy_balance numeric;
  _workglitem_pyp_balance numeric;
  _workglitem_py_balance numeric;
  _workglitem_cp_ending_trialbal numeric;
  _workglitem_pp_ending_trialbal numeric;
  _workgltotal_cp_ending_total numeric;
  _workgltotal_pp_ending_total numeric;
  _workgltotal_cp_pl_ending_total numeric;
  _workgltotal_pp_pl_ending_total numeric;
  _workgltotaleq_cp_ending_total_work numeric;
  _workgltotaleq_pp_ending_total_work numeric;
  _workgltotaleq_cp_ending_total numeric;
  _workgltotaleq_pp_ending_total numeric;
  bFoundPriorPeriod BOOLEAN;
  _current_full_year DATE;

BEGIN

--  First thing we need to do is get the period
    SELECT * INTO _rPeriod FROM period where period_id = pPeriodId;
--  Error out if we do not find it
    IF (NOT FOUND) THEN
      RETURN -1;
    END IF;

--  Get the current information
    SELECT EXTRACT(YEAR FROM _rPeriod.period_start) INTO _currYear;
    SELECT EXTRACT(MONTH FROM _rPeriod.period_start) INTO _currMonth;
    SELECT EXTRACT(DAY FROM _rPeriod.period_start) INTO _currDay;
--  Build the prior year
    _priorYear  := _currYear - 1;

--  We need to get the beginning of the current year from the year table
    SELECT yearperiod_start INTO _current_full_year
      FROM yearperiod
     WHERE yearperiod_start >= _rPeriod.period_start
       AND yearperiod_start <= _rPeriod.period_end;

    IF (FOUND) THEN
      _workglhead_cy_startdate := _current_full_year;
    ELSE
--  Build the beginning of the year
      _workglhead_cy_startdate := ''1/1/'' || _currYear::TEXT;
    END IF;

--  We need to get the beginning of the year from the year table

--  Build the prior period starting date
    _workglhead_pyp_startdate = _currMonth::TEXT || ''/'' || _currDay::TEXT || ''/'' || _priorYear::TEXT;
--  Find the Prior Period
    bFoundPriorPeriod := TRUE;
    SELECT * INTO _rPriorPeriod FROM period where period_start = _workglhead_pyp_startdate;
    IF (NOT FOUND) THEN
      bFoundPriorPeriod := FALSE;
      _rPriorPeriod.period_id = -1;
--  Build the prior year start date
      _workglhead_py_startdate = ''1/1/'' || _priorYear::TEXT;
    ELSE
--  We need to get the beginning of the prior year from the year table
      SELECT yearperiod_start INTO _current_full_year
        FROM yearperiod
       WHERE yearperiod_start >= _rPriorPeriod.period_start
         AND yearperiod_start <= _rPriorPeriod.period_end;

      IF (FOUND) THEN
        _workglhead_py_startdate := _current_full_year;
      ELSE
--  Build the prior year start date
        _workglhead_py_startdate = ''1/1/'' || _priorYear::TEXT;
      END IF;
    END IF;

-- Get the user info
    SELECT usr_id, usr_active INTO _p
    FROM usr
    WHERE (usr_username=CURRENT_USER);
    IF (NOT FOUND) THEN
      RETURN -2;
    END IF;

-- See if there is a mess to clean up

    SELECT * INTO _rworkGLhead FROM workglhead WHERE workglhead_usr_id = _p.usr_id;
    IF (FOUND) THEN
      DELETE FROM workglitem WHERE workglitem_workglhead_id IN (SELECT workglhead_id FROM workglhead WHERE workglhead_usr_id=_p.usr_id);
      DELETE FROM workglhead WHERE workglhead_id IN (SELECT workglhead_id FROM workglhead WHERE workglhead_usr_id=_p.usr_id);
      DELETE FROM workgltotal WHERE workgltotal_workglhead_id IN (SELECT workglhead_id FROM workglhead WHERE workglhead_usr_id=_p.usr_id);
      DELETE FROM workgltotaleq WHERE workgltotaleq_workglhead_id IN (SELECT workglhead_id FROM workglhead WHERE workglhead_usr_id=_p.usr_id);
    END IF;

-- Insert the header

    SELECT NEXTVAL(''workglhead_workglhead_id_seq'') INTO _workglhead_id;

    IF (bFoundPriorPeriod) THEN
      INSERT INTO workglhead VALUES (_workglhead_id, _p.usr_id, _rPeriod.period_start, _rPeriod.period_end, _workglhead_cy_startdate, _rPriorPeriod.period_start, _rPriorPeriod.period_end, _workglhead_py_startdate);
    ELSE
      INSERT INTO workglhead VALUES (_workglhead_id, _p.usr_id, _rPeriod.period_start, _rPeriod.period_end, _workglhead_cy_startdate, NULL, NULL, NULL);
    END IF;

-- Now we need to process the accounts
    FOR _rAccount IN SELECT *
            FROM accnt LOOP

-- Get the current year period balance
      select sum(gltrans_amount) into _workglitem_cyp_balance from gltrans where gltrans_accnt_id =  _rAccount.accnt_id AND gltrans_date between _rPeriod.period_start AND _rPeriod.period_end;
      IF (_workglitem_cyp_balance IS NULL) THEN
        _workglitem_cyp_balance = 0;
      END IF;

-- Get the current year to date balance
      select sum(gltrans_amount) into _workglitem_cy_balance from gltrans where gltrans_accnt_id =  _rAccount.accnt_id AND gltrans_date between _workglhead_cy_startdate AND _rPeriod.period_end;
      IF (_workglitem_cy_balance IS NULL) THEN
        _workglitem_cy_balance = 0;
      END IF;

-- Get the current year trialbal ending balance
      select trialbal_ending into _workglitem_cp_ending_trialbal from trialbal where trialbal_accnt_id =  _rAccount.accnt_id AND trialbal_period_id = pPeriodId;
      IF (_workglitem_cp_ending_trialbal IS NULL) THEN
        _workglitem_cp_ending_trialbal = 0;
      END IF;

      IF (NOT bFoundPriorPeriod) THEN
        _workglitem_pyp_balance = 0;
        _workglitem_py_balance = 0;
        _workglitem_pp_ending_trialbal = 0;
      ELSE
-- Get the prior year period balance
        select sum(gltrans_amount) into _workglitem_pyp_balance from gltrans where gltrans_accnt_id =  _rAccount.accnt_id AND gltrans_date between _rPriorPeriod.period_start AND _rPriorPeriod.period_end;
-- Get the prior year to date balance
        select sum(gltrans_amount) into _workglitem_py_balance from gltrans where gltrans_accnt_id =  _rAccount.accnt_id AND gltrans_date between _workglhead_py_startdate AND _rPriorPeriod.period_end;
      END IF;

-- Get the prior year trialbal ending balance
      select trialbal_ending into _workglitem_pp_ending_trialbal from trialbal where trialbal_accnt_id =  _rAccount.accnt_id AND trialbal_period_id = _rPriorPeriod.period_id;
      IF (_workglitem_pp_ending_trialbal IS NULL) THEN
        _workglitem_pp_ending_trialbal = 0;
      END IF;

    INSERT INTO workglitem VALUES (NEXTVAL(''workglitem_workglitem_id_seq''), _workglhead_id, formatglaccount(_rAccount.accnt_id), _rAccount.accnt_descrip, _rAccount.accnt_type, _workglitem_cyp_balance, _workglitem_cy_balance, _workglitem_pyp_balance, _workglitem_py_balance, _workglitem_cp_ending_trialbal, _workglitem_pp_ending_trialbal, _rAccount.accnt_subaccnttype_code);

    END LOOP;


-- New Code for equity totals

    _workgltotaleq_cp_ending_total_work = 0.00;
    _workgltotaleq_pp_ending_total_work = 0.00;
    _workgltotaleq_cp_ending_total = 0.00;
    _workgltotaleq_pp_ending_total = 0.00;
    select sum(workglitem_cp_ending_trialbal) into _workgltotaleq_cp_ending_total_work from workglitem, workglhead where workglitem_workglhead_id = _workglhead_id and workglitem_accnt_type = ''Q'';

    select sum(workglitem_pp_ending_trialbal) into _workgltotaleq_pp_ending_total_work from workglitem, workglhead where workglitem_workglhead_id = _workglhead_id and workglitem_accnt_type = ''Q'';

    select sum(workglitem_cy_balance) into _workgltotaleq_cp_ending_total from workglitem, workglhead where  workglitem_workglhead_id = _workglhead_id and workglitem_accnt_type in (''R'', ''E'');

    select sum(workglitem_py_balance) into _workgltotaleq_pp_ending_total from workglitem, workglhead where workglitem_workglhead_id = _workglhead_id and workglitem_accnt_type in (''R'', ''E'');

    INSERT INTO workgltotaleq VALUES (NEXTVAL(''workgltotaleq_workgltotaleq_id_seq''), _workglhead_id, _workgltotaleq_cp_ending_total + _workgltotaleq_cp_ending_total_work, _workgltotaleq_pp_ending_total + _workgltotaleq_pp_ending_total_work);

-- New Code for liabilty and equity totals

    select sum(workglitem_cp_ending_trialbal) into _workgltotal_cp_ending_total from workglitem where workglitem_workglhead_id = _workglhead_id AND workglitem_accnt_type = ''L'';

    select sum(workglitem_pp_ending_trialbal) into _workgltotal_pp_ending_total from workglitem where workglitem_workglhead_id = _workglhead_id AND workglitem_accnt_type = ''L'';

-- Add in the P/L

    INSERT INTO workgltotal VALUES (NEXTVAL(''workgltotal_workgltotal_id_seq''), _workglhead_id, _workgltotal_cp_ending_total + _workgltotaleq_cp_ending_total_work + _workgltotaleq_cp_ending_total, _workgltotal_pp_ending_total + _workgltotaleq_pp_ending_total_work + _workgltotaleq_pp_ending_total);

    RETURN _workglhead_id;

END;
'
  LANGUAGE 'plpgsql';

