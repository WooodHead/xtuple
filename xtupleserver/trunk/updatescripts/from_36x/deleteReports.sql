DELETE FROM report 
WHERE report_name IN ('BookingsByCustomer','BookingsByCustomerGroup','BookingsByItem','BookingsByProductCategory','BookingsBySalesRep','BookingsByShipTo')
AND report_grade=0;