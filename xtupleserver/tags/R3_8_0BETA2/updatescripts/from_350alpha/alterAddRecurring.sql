ALTER TABLE todoitem ADD COLUMN todoitem_recurring_todoitem_id INTEGER REFERENCES todoitem(todoitem_id);
COMMENT ON COLUMN todoitem.todoitem_recurring_todoitem_id IS 'The first todoitem record in the series if this is a recurring To-Do item. If the todoitem_recurring_todoitem_id is the same as the todoitem_id, this record is the first in the series.';

ALTER TABLE incdt ADD COLUMN incdt_recurring_incdt_id INTEGER REFERENCES incdt(incdt_id);
COMMENT ON COLUMN incdt.incdt_recurring_incdt_id IS 'The first incdt record in the series if this is a recurring Incident. If the incdt_recurring_incdt_id is the same as the incdt_id, this record is the first in the series.';

ALTER TABLE prj ADD COLUMN prj_recurring_prj_id INTEGER REFERENCES prj(prj_id);
COMMENT ON COLUMN prj.prj_recurring_prj_id IS 'The first prj record in the series if this is a recurring Project. If the prj_recurring_prj_id is the same as the prj_id, this record is the first in the series.';
