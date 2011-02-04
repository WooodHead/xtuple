DELETE FROM report 
WHERE report_name IN (
'BacklogByCustomerType',
'BacklogByProductCategory',
'BacklogByWarehouse',
'BacklogByParameterList',
'BacklogByCustomer',
'BacklogByItemNumber',
'BacklogBySalesOrder') 
AND report_grade=0;