UPDATE item SET item_type = 'M' WHERE (item_type = 'J');
ALTER TABLE item DROP CONSTRAINT item_item_type_check;
ALTER TABLE item ADD CONSTRAINT item_item_type_check CHECK (
  item_type = 'P'::bpchar OR 
  item_type = 'M'::bpchar OR 
  item_type = 'F'::bpchar OR 
  item_type = 'O'::bpchar OR 
  item_type = 'R'::bpchar OR 
  item_type = 'S'::bpchar OR 
  item_type = 'T'::bpchar OR 
  item_type = 'B'::bpchar OR 
  item_type = 'L'::bpchar OR 
  item_type = 'Y'::bpchar OR 
  item_type = 'C'::bpchar OR 
  item_type = 'K'::bpchar);