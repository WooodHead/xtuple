CREATE TABLE recurtype (recurtype_id        SERIAL PRIMARY KEY,
                        recurtype_type      TEXT NOT NULL UNIQUE,
                        recurtype_table     TEXT NOT NULL,
                        recurtype_donecheck TEXT NOT NULL,
                        recurtype_schedcol  TEXT NOT NULL,
                        recurtype_limit     TEXT,
                        recurtype_copyfunc  TEXT NOT NULL,
                        recurtype_copyargs  TEXT[] NOT NULL,
                        recurtype_delfunc   TEXT);

GRANT ALL ON TABLE recurtype                     TO xtrole;
GRANT ALL ON SEQUENCE recurtype_recurtype_id_seq TO xtrole;

COMMENT ON TABLE recurtype IS 'Describes the properties of recurring items/events in way that can be used by stored procedures to maintain the recurrence.';
COMMENT ON COLUMN recurtype.recurtype_id IS 'The internal id of this recurrence description.';
COMMENT ON COLUMN recurtype.recurtype_type IS 'A code value used by the RecurrenceWidget and the code that uses it to describe the item/event that will recur. Examples include "INCDT" for CRM Incidents and "J" for Projects.';
COMMENT ON COLUMN recurtype.recurtype_table IS 'The table that holds the item/event that will recur.';
COMMENT ON COLUMN recurtype.recurtype_donecheck IS 'A boolean expression that returns TRUE if an individual item/event record in the recurtype_table has already been completed.';
COMMENT ON COLUMN recurtype.recurtype_schedcol IS 'The name of the column in the recurtype_table holding the date or timestamp by which the item is scheduled to be completed or at which the event is supposed to occur.';
COMMENT ON COLUMN recurtype.recurtype_limit IS 'A boolean expression that returns TRUE if the current user should see the row in the recurtype_table. NULL indicates there is no specific limitation. For example, the maintainance of recurring TODO items should restricted to those items belonging to the user unless s/he has been granted the privilege to modify other people''s todo lists.';
COMMENT ON COLUMN recurtype.recurtype_copyfunc IS 'The name of the function to copy an existing item/event record. The copy function is expected to take at least 2 arguments: the id of the item to copy and the new date/timestamp. If the function accepts more than 2, it must be able to accept NULL values for the 3rd and following arguments.';
COMMENT ON COLUMN recurtype.recurtype_copyargs IS 'An abbreviated argument list for the copy function. This is used to determine whether the second argument must be cast to a date or a timestamp, and to figure out how many additional arguments to pass.';
COMMENT ON COLUMN recurtype.recurtype_delfunc IS 'The name of the function to delete an existing item/event record. The function is expected to take exactly one argument: the id of the item to delete. NULL indicates there is no delete function and that an SQL DELETE statement can be used. In this case, the id column name will be built as the recurtype_table concatenated with the "_id" suffix.';

INSERT INTO recurtype (recurtype_type, recurtype_table, recurtype_donecheck,
                       recurtype_schedcol,
                       recurtype_limit,
                       recurtype_copyfunc, recurtype_copyargs, recurtype_delfunc
 ) VALUES ('TODO', 'todoitem', 'todoitem_completed_date IS NOT NULL',
           'todoitem_due_date',
           'checkprivilege(''MaintainOtherTodoList'') OR '
            || '(checkprivilege(''MaintainPersonalTodoList'') AND '
            || 'CURRENT_USER IN (todoitem_owner_username, todoitem_username))',
           'copytodoitem', '{int,date,null}', NULL),

          ('INCDT', 'incdt', 'incdt_status<>''N''',
           'incdt_timestamp',
           NULL,
           'copyincdt', '{int,timestamp}', 'deleteincident'),

          ('J', 'prj', 'prj_completed_date IS NOT NULL',
           'prj_due_date',
           NULL,
           'copyprj', '{int,date}', NULL)

          ;
