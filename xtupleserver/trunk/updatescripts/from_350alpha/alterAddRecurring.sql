ALTER TABLE todoitem ADD COLUMN todoitem_recurring_todoitem_id INTEGER REFERENCES todoitem(todoitem_id);
COMMENT ON todoitem.todoitem_recurring_todoitem_id IS 'The first todoitem record in the series if this is a recurring To-Do item. If the todoitem_recurring_todoitem_id is the same as the todoitem_id, this record is the first in the series.";
