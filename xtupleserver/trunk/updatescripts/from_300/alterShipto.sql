BEGIN;

ALTER TABLE shiptoinfo ALTER COLUMN shipto_shipzone_id DROP NOT NULL;
ALTER TABLE shiptoinfo ALTER COLUMN shipto_shipchrg_id DROP NOT NULL;

--Remove/repair invalid records
DELETE FROM shipto WHERE shipto_cust_id NOT IN
(SELECT cust_id FROM custinfo WHERE (cust_id=shipto_cust_id);

UPDATE shiptoinfo SET shipto_shipzone_id=NULL 
WHERE ((shipto_shipzone_id=-1)
OR (shipto_shipzone_id NOT IN (SELECT shipzone_id FROM shipzone WHERE (shipzone_id=shipto_shipzone_id)));

UPDATE shiptoinfo SET shipto_salesrep_id=NULL 
WHERE ((shipto_salesrep_id=-1)
OR (shipto_salesrep_id NOT IN (SELECT salesrep_id FROM salesrep WHERE (salesrep_id=shipto_salesrep_id)));

UPDATE shiptoinfo SET shipto_shipform_id=NULL 
WHERE ((shipto_shipform_id=-1)
OR (shipto_shipform_id NOT IN (SELECT shipform_id FROM shipform WHERE (shipform_id=shipto_shipform_id)));

UPDATE shiptoinfo SET shipto_shipchrg_id=NULL 
WHERE ((shipto_shipchr_id=-1)
OR (shipto_shipchrg_id NOT IN (SELECT shipchrg_id FROM shipchrg WHERE (shipchrg_id=shipto_shipchrg_id)));

-- Add Constraints
ALTER TABLE shiptoinfo ADD FOREIGN KEY (shipto_cust_id) REFERENCES custinfo (cust_id);
ALTER TABLE shiptoinfo ADD FOREIGN KEY (shipto_salesrep_id) REFERENCES salesrep (salesrep_id);
ALTER TABLE shiptoinfo ADD FOREIGN KEY (shipto_shipform_id) REFERENCES shipform (shipform_id);
ALTER TABLE shiptoinfo ADD FOREIGN KEY (shipto_shipzone_id) REFERENCES shipzone (shipzone_id);
ALTER TABLE shiptoinfo ALTER COLUMN shipto_cust_id SET NOT NULL;


COMMIT;

