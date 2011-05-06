ALTER TABLE itemcost ALTER COLUMN itemcost_item_id SET NOT NULL;
ALTER TABLE itemcost ALTER COLUMN itemcost_costelem_id SET NOT NULL;
ALTER TABLE itemcost ALTER COLUMN itemcost_lowlevel SET NOT NULL;
ALTER TABLE itemcost ALTER COLUMN itemcost_stdcost SET NOT NULL;
ALTER TABLE itemcost ALTER COLUMN itemcost_actcost SET NOT NULL;
ALTER TABLE itemcost ALTER COLUMN itemcost_curr_id SET NOT NULL;

ALTER TABLE itemcost ALTER COLUMN itemcost_lowlevel SET DEFAULT FALSE;
ALTER TABLE itemcost ALTER COLUMN itemcost_stdcost SET DEFAULT 0;
ALTER TABLE itemcost ALTER COLUMN itemcost_actcost SET DEFAULT 0;

ALTER TABLE itemcost ADD FOREIGN KEY (itemcost_item_id) REFERENCES item(item_id);
ALTER TABLE itemcost ADD FOREIGN KEY (itemcost_costelem_id) REFERENCES costelem(costelem_id);
ALTER TABLE itemcost ADD FOREIGN KEY (itemcost_curr_id) REFERENCES curr_symbol(curr_id);
