BEGIN;

-- Item Site

DROP VIEW api.itemsite;
CREATE VIEW api.itemsite
AS 
   SELECT
     item_number,
     warehous_code AS warehouse,
     itemsite_active AS active,
     itemsite_supply AS supplied_at_warehouse,
     itemsite_createpr AS create_prs,
     itemsite_createwo AS create_wos,
     itemsite_sold AS sold_from_warehouse,
     itemsite_soldranking AS ranking,
     CASE
       WHEN itemsite_controlmethod = 'N' THEN
         'None'
       WHEN itemsite_controlmethod = 'R' THEN
         'Regular'
       WHEN itemsite_controlmethod = 'S' THEN
         'Serial #'
       WHEN itemsite_controlmethod = 'L' THEN
         'Lot #'
     END AS control_method,
     itemsite_perishable AS perishable,
     plancode_code AS planner_code,
     costcat_code AS cost_category,
     itemsite_loccntrl AS multiple_location_control,
     formatlocationname(itemsite_location_id) AS location,
     itemsite_location AS user_defined_location,
     itemsite_location_comments AS location_comment,
     itemsite_disallowblankwip AS disallow_blank_wip_locations,
     itemsite_stocked AS stocked,
     itemsite_abcclass AS abc_class,
     itemsite_autoabcclass AS allow_automatic_updates,
     itemsite_cyclecountfreq AS cycl_cnt_freq,
     itemsite_eventfence AS event_fence,
     itemsite_useparams AS enforce_order_parameters,
     itemsite_reorderlevel AS reorder_level,
     itemsite_ordertoqty AS order_up_to,
     itemsite_minordqty AS minimum_order,
     itemsite_maxordqty AS maximum_order,
     itemsite_multordqty AS order_multiple,
     itemsite_useparamsmanual AS enforce_on_manual_orders,
     itemsite_ordergroup AS group_mps_mrp_orders,
     itemsite_mps_timefence AS mps_time_fence,
     itemsite_leadtime AS lead_time,
     itemsite_safetystock AS safety_stock,
     itemsite_notes AS notes
   FROM item, itemsite
     LEFT OUTER JOIN location ON (itemsite_location_id=location_id),
     plancode,costcat,whsinfo
   WHERE ((item_id=itemsite_item_id)
   AND (itemsite_plancode_id=plancode_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (itemsite_warehous_id=warehous_id));     

GRANT ALL ON TABLE api.itemsite TO openmfg;
COMMENT ON VIEW api.itemsite IS 'Item Site';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.itemsite DO INSTEAD

INSERT INTO itemsite (
     itemsite_item_id,
     itemsite_warehous_id,
     itemsite_active,
     itemsite_supply,
     itemsite_createpr,
     itemsite_createwo,
     itemsite_sold,
     itemsite_soldranking,
     itemsite_controlmethod,
     itemsite_perishable,
     itemsite_plancode_id,
     itemsite_costcat_id,
     itemsite_loccntrl,
     itemsite_location_id,
     itemsite_location,
     itemsite_location_comments,
     itemsite_disallowblankwip,
     itemsite_stocked,
     itemsite_abcclass,
     itemsite_autoabcclass,
     itemsite_cyclecountfreq,
     itemsite_eventfence,
     itemsite_useparams,
     itemsite_reorderlevel,
     itemsite_ordertoqty,
     itemsite_minordqty,
     itemsite_maxordqty,
     itemsite_multordqty,
     itemsite_useparamsmanual,
     itemsite_ordergroup,
     itemsite_mps_timefence,
     itemsite_leadtime,
     itemsite_safetystock,
     itemsite_notes)
     VALUES (
       getItemId(NEW.item_number),
       getWarehousId(NEW.warehouse,'ACTIVE'),
       COALESCE(NEW.active,TRUE),
       COALESCE(NEW.supplied_at_warehouse,TRUE),
       COALESCE(NEW.create_prs,FALSE),
       COALESCE(NEW.create_wos,FALSE),
       COALESCE(NEW.sold_from_warehouse,TRUE),
       COALESCE(NEW.ranking,1),
       CASE
         WHEN NEW.control_method = 'None' THEN
           'N'
         WHEN NEW.control_method = 'Regular' THEN
           'R'
         WHEN NEW.control_method = 'Serial #' THEN
           'S'
         WHEN NEW.control_method = 'Lot #' THEN
           'Lot #'
       END,
       COALESCE(NEW.perishable,FALSE),
       getPlanCodeId(NEW.planner_code),
       getCostCatId(NEW.cost_category),
       COALESCE(NEW.multiple_location_control,FALSE),
       COALESCE(getLocationId(NEW.warehouse,NEW.location),-1),
       COALESCE(NEW.user_defined_location,''),
       COALESCE(NEW.location_comment,''),
       COALESCE(NEW.disallow_blank_wip_locations,FALSE),
       COALESCE(NEW.stocked,FALSE),
       COALESCE(NEW.abc_class,'A'),
       COALESCE(NEW.allow_automatic_updates,FALSE),
       COALESCE(NEW.cycl_cnt_freq,0),
       COALESCE(NEW.event_fence,fetchMetricValue('DefaultEventFence')),
       COALESCE(NEW.enforce_order_parameters,FALSE),
       COALESCE(NEW.reorder_level,0),
       COALESCE(NEW.order_up_to,0),
       COALESCE(NEW.minimum_order,0),
       COALESCE(NEW.maximum_order,0),
       COALESCE(NEW.order_multiple,0),
       COALESCE(NEW.enforce_on_manual_orders,FALSE),
       COALESCE(NEW.group_mps_mrp_orders,0),
       COALESCE(NEW.mps_time_fence,0),
       COALESCE(NEW.lead_time,0),
       COALESCE(NEW.safety_stock,0),
       COALESCE(NEW.notes,''));
  

--CREATE OR REPLACE RULE "_UPDATE" AS 
 --   ON UPDATE TO api.itemsite DO INSTEAD

           
--CREATE OR REPLACE RULE "_DELETE" AS 
--    ON DELETE TO api.itemsite DO INSTEAD



COMMIT;
