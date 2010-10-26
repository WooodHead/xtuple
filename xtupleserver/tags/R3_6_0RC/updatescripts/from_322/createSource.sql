BEGIN;

CREATE TABLE source
(
  source_id serial PRIMARY KEY,
  source_module text,
  source_name text,
  source_descrip text
);

ALTER TABLE source ADD UNIQUE(source_name);

GRANT ALL ON TABLE source TO xtrole;
COMMENT ON TABLE source IS 'Tax class information';
COMMENT ON COLUMN source.source_id IS 'Primary key';
COMMENT ON COLUMN source.source_module IS 'Application module';
COMMENT ON COLUMN source.source_name IS 'Name';
COMMENT ON COLUMN source.source_descrip IS 'Description';

INSERT INTO source
  ( source_module, source_name, source_descrip )
VALUES
  ( 'CRM', 'ADDR',  'Address' ),
  ( 'Products',    'BBH',   'Breeder Bill of Materials' ),
  ( 'Products',    'BBI',   'Breeder Bill of Materials Item' ),
  ( 'Products',    'BMH',   'Bill of Materials' ),
  ( 'Products',    'BMI',   'Bill of Materials Item' ),
  ( 'Products',    'BOH',   'Bill of Operations' ),
  ( 'Products',    'BOI',   'Bill of Operations Item' ),
  ( 'CRM',         'CRMA',  'CRM Account' ),
  ( 'CRM',         'T',     'Contact' ),
  ( 'Sales',       'C',     'Customer' ),
  ( 'System',      'EMP',   'Employee' ),
  ( 'CRM',         'INCDT', 'Incident' ),
  ( 'Products',    'I',     'Item' ),
  ( 'Inventory',   'IS',    'Item Site' ),
  ( 'Purchase',    'IR',    'Item Source' ),
  ( 'Inventory',   'L',     'Location' ),
  ( 'Inventory',   'LS',    'Lot Serial' ),
  ( 'CRM',         'OPP',   'Opportunity' ),
  ( 'CRM',         'J',     'Project' ),
  ( 'Purchase',    'P',     'Purchase Order' ),
  ( 'Purchase',    'PI',    'Purchase Order Item' ),
  ( 'Sales',       'RA',    'Return Authorization' ),
  ( 'Sales',       'RI',    'Return Authorization Item' ),
  ( 'Sales',       'Q',     'Quote' ),
  ( 'Sales',       'QI',    'Quote Item' ),
  ( 'Sales',       'S',     'Sales Order' ),
  ( 'Sales',       'SI',    'Sales Order Item' ),
  ( 'Inventory',   'TO',    'Transfer Order' ),
  ( 'Inventory',   'TI',    'Transfer Order Item' ),
  ( 'Purchase',    'V',     'Vendor' ),
  ( 'Inventory',   'WH',    'Site' ),
  ( 'Manufacture', 'W',     'Work Order' );

COMMIT;