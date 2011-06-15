SELECT dropIfExists('VIEW','prjtask','te');

CREATE OR REPLACE VIEW te.prjtask AS 
SELECT
  prjtask_id,
  prjtask_number,
  prjtask_name,
  prjtask_descrip,
  prjtask_prj_id,
  prjtask_anyuser,
  prjtask_status,
  prjtask_hours_budget,
  COALESCE((SELECT SUM(hrs.teitem_qty)
   FROM te.teitem hrs
   WHERE ((teitem_prjtask_id=prjtask_id)
     AND (hrs.teitem_type='T'))),0)
  AS prjtask_hours_actual,
  prjtask_exp_budget,
  COALESCE((SELECT SUM(exp.teitem_qty)
   FROM te.teitem exp
   WHERE ((teitem_prjtask_id=prjtask_id)
     AND (exp.teitem_type='E'))),0)
  AS prjtask_exp_actual,
  prjtask_owner_username,
  prjtask_start_date,
  prjtask_due_date,
  prjtask_assigned_date,
  prjtask_completed_date,
  prjtask_username
FROM public.prjtask;

GRANT ALL ON TABLE te.prjtask TO xtrole;
COMMENT ON VIEW te.prjtask IS 'Overload view on prjtask table to show caclulated values for actuals.';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO te.prjtask DO INSTEAD

INSERT INTO public.prjtask (
  prjtask_id,
  prjtask_number,
  prjtask_name,
  prjtask_descrip,
  prjtask_prj_id,
  prjtask_anyuser,
  prjtask_status,
  prjtask_hours_budget,
  prjtask_hours_actual,
  prjtask_exp_budget,
  prjtask_exp_actual,
  prjtask_owner_username,
  prjtask_start_date,
  prjtask_due_date,
  prjtask_assigned_date,
  prjtask_completed_date,
  prjtask_username )
VALUES (
  NEW.prjtask_id,
  NEW.prjtask_number,
  NEW.prjtask_name,
  NEW.prjtask_descrip,
  NEW.prjtask_prj_id,
  NEW.prjtask_anyuser,
  NEW.prjtask_status,
  NEW.prjtask_hours_budget,
  0,
  NEW.prjtask_exp_budget,
  0,
  NEW.prjtask_owner_username,
  NEW.prjtask_start_date,
  NEW.prjtask_due_date,
  NEW.prjtask_assigned_date,
  NEW.prjtask_completed_date,
  NEW.prjtask_username
);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO te.prjtask DO INSTEAD

UPDATE public.prjtask SET
  prjtask_number=NEW.prjtask_number,
  prjtask_name=NEW.prjtask_name,
  prjtask_descrip=NEW.prjtask_descrip,
  prjtask_prj_id=NEW.prjtask_prj_id,
  prjtask_anyuser=NEW.prjtask_anyuser,
  prjtask_status=NEW.prjtask_status,
  prjtask_hours_budget=NEW.prjtask_hours_budget,
  prjtask_exp_budget=NEW.prjtask_exp_budget,
  prjtask_owner_username=NEW.prjtask_owner_username,
  prjtask_start_date=NEW.prjtask_start_date,
  prjtask_due_date=NEW.prjtask_due_date,
  prjtask_assigned_date=NEW.prjtask_assigned_date,
  prjtask_completed_date=NEW.prjtask_completed_date,
  prjtask_username=NEW.prjtask_username
WHERE (prjtask_id=NEW.prjtask_id);

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO te.prjtask DO INSTEAD

DELETE FROM public.prjtask WHERE prjtask_id=OLD.prjtask_id;