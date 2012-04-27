UPDATE recurtype
   SET recurtype_limit = 'checkprivilege(''MaintainAllToDoItems'') OR '
            || '(checkprivilege(''MaintainPersonalToDoItems'') AND '
            || 'CURRENT_USER IN (todoitem_owner_username, todoitem_username))'
 WHERE recurtype_type = 'TODO';
