create index itemloc_location_idx on itemloc using btree (itemloc_location_id);
create index itemloc_itemsite_idx on itemloc using btree (itemloc_itemsite_id);
create index location_warehous_idx on location using btree (location_warehous_id);