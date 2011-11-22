INSERT INTO recurtype (recurtype_type, recurtype_table, recurtype_donecheck,
                       recurtype_schedcol,
                       recurtype_limit,
                       recurtype_copyfunc, recurtype_copyargs, recurtype_delfunc
 ) VALUES 
          ('V', 'vohead', 'vohead_posted',
           'vohead_docdate',
           NULL,
           'copyvoucher', '{integer,date}', 'deletevoucher')

          ;
