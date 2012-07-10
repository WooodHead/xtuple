BEGIN;

UPDATE flcol
   SET flcol_name = 'QTD, Prior Year Quarter'
 WHERE(flcol_name = 'QTD, Prior Year QTD');


COMMIT;
