-- Clean up potentially bad data
DELETE FROM docass
WHERE docass_source_type = 'T' 
  AND docass_source_id NOT IN (SELECT cntct_id FROM cntct);
DELETE FROM docass
WHERE docass_target_type = 'T' 
  AND docass_target_id NOT IN (SELECT cntct_id FROM cntct);
DELETE FROM docass
WHERE docass_source_type = 'TODO' 
  AND docass_source_id NOT IN (SELECT todoitem_id FROM todoitem);
DELETE FROM docass
WHERE docass_target_type = 'TODO' 
  AND docass_target_id NOT IN (SELECT todoitem_id FROM todoitem);
DELETE FROM docass
WHERE docass_source_type = 'OPP' 
  AND docass_source_id NOT IN (SELECT ophead_id FROM ophead);
DELETE FROM docass
WHERE docass_target_type = 'OPP' 
  AND docass_target_id NOT IN (SELECT ophead_id FROM ophead);
DELETE FROM docass
WHERE docass_source_type = 'I' 
  AND docass_source_id NOT IN (SELECT item_id FROM item);
DELETE FROM docass
WHERE docass_target_type = 'I' 
  AND docass_target_id NOT IN (SELECT item_id FROM item);
DELETE FROM docass
WHERE docass_source_type = 'C' 
  AND docass_source_id NOT IN (SELECT cust_id FROM custinfo);
DELETE FROM docass
WHERE docass_target_type = 'C' 
  AND docass_target_id NOT IN (SELECT cust_id FROM custinfo);
DELETE FROM docass
WHERE docass_source_type = 'CRMA' 
  AND docass_source_id NOT IN (SELECT crmacct_id FROM crmacct);
DELETE FROM docass
WHERE docass_target_type = 'CRMA' 
  AND docass_target_id NOT IN (SELECT crmacct_id FROM crmacct);
DELETE FROM docass
WHERE docass_source_type = 'V' 
  AND docass_source_id NOT IN (SELECT vend_id FROM vendinfo);
DELETE FROM docass
WHERE docass_target_type = 'V' 
  AND docass_target_id NOT IN (SELECT vend_id FROM vendinfo);
DELETE FROM docass
WHERE docass_source_type = 'W' 
  AND docass_source_id NOT IN (SELECT wo_id FROM wo);
DELETE FROM docass
WHERE docass_target_type = 'W' 
  AND docass_target_id NOT IN (SELECT wo_id FROM wo);
DELETE FROM docass
WHERE docass_source_type = 'J' 
  AND docass_source_id NOT IN (SELECT prj_id FROM prj);
DELETE FROM docass
WHERE docass_target_type = 'J' 
  AND docass_target_id NOT IN (SELECT prj_id FROM prj);
DELETE FROM docass
WHERE docass_source_type = 'EMP' 
  AND docass_source_id NOT IN (SELECT emp_id FROM emp);
DELETE FROM docass
WHERE docass_target_type = 'EMP' 
  AND docass_target_id NOT IN (SELECT emp_id FROM emp);
DELETE FROM docass
WHERE docass_source_type = 'S' 
  AND docass_source_id NOT IN (SELECT cohead_id FROM cohead);
DELETE FROM docass
WHERE docass_target_type = 'S' 
  AND docass_target_id NOT IN (SELECT cohead_id FROM cohead);
DELETE FROM docass
WHERE docass_source_type = 'P' 
  AND docass_source_id NOT IN (SELECT pohead_id FROM pohead);
DELETE FROM docass
WHERE docass_target_type = 'P' 
  AND docass_target_id NOT IN (SELECT pohead_id FROM pohead);