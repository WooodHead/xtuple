BEGIN;

--DROP TYPE indentedbom;

CREATE TYPE indentedbom AS
   (indentedbom_bomwork_id INTEGER,
    indentedbom_bomwork_parent_id INTEGER,
    indentedbom_bomwork_level INTEGER,
    indentedbom_bomwork_seqnumber INTEGER,
    indentedbom_item_number TEXT,
    indentedbom_uom_name TEXT,
    indentedbom_item_descrip1 TEXT,
    indentedbom_item_descrip2 TEXT,
    indentedbom_itemdescription TEXT,
    indentedbom_qtyper TEXT,
    indentedbom_scrap TEXT,
    indentedbom_createchild TEXT,
    indentedbom_issuemethod TEXT,
    indentedbom_effective TEXT,
    indentedbom_expires TEXT,
    indentedbom_expired BOOLEAN,
    indentedbom_future  BOOLEAN);

COMMIT;