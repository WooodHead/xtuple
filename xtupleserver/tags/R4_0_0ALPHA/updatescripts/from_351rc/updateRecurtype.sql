UPDATE recurtype
   SET recurtype_donecheck = '(' || recurtype_donecheck || ' OR prj_status = ''C'')'
 WHERE recurtype_type = 'J';
