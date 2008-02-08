BEGIN;

INSERT INTO 
     evnttype	
          (evnttype_name,
           evnttype_descrip,
           evnttype_module)
VALUES 	
          ('POitemCreate',
           'Purchase Order Purchased Item Line Added',
            'P/O');
COMMIT;