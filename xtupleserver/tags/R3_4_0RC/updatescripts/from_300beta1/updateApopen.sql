BEGIN;

UPDATE apopen SET apopen_docdate=vohead_docdate
  FROM vohead
 WHERE((apopen_doctype='V')
   AND (apopen_docnumber=vohead_number)
   AND (apopen_docdate != vohead_docdate));

COMMIT;
