BEGIN;

CREATE TYPE bomdata AS
   (bomdata_bomwork_id INTEGER,
    bomdata_bomwork_parent_id INTEGER,
    bomdata_bomwork_level INTEGER,
    bomdata_bomwork_seqnumber INTEGER,
    bomdata_item_number TEXT,
    bomdata_uom_name TEXT,
    bomdata_item_descrip1 TEXT,
    bomdata_item_descrip2 TEXT,
    bomdata_itemdescription TEXT,
    bomdata_qtyper TEXT,
    bomdata_scrap TEXT,
    bomdata_createchild TEXT,
    bomdata_issuemethod TEXT,
    bomdata_effective TEXT,
    bomdata_expires TEXT,
    bomdata_expired BOOLEAN,
    bomdata_future  BOOLEAN,
    bomdata_actunitcost NUMERIC,
    bomdata_stdunitcost NUMERIC,
    bomdata_actextendedcost NUMERIC,
    bomdata_stdextendedcost NUMERIC);

COMMIT;