DELETE FROM report 
WHERE report_name IN (
'BookingsByCustomer',
'BookingsByCustomerGroup',
'BookingsByItem',
'BookingsByProductCategory',
'BookingsBySalesRep',
'BookingsByShipTo',
'TimePhasedBookingsByCustomer',
'TimePhasedBookingsByProductCategory',
'TimePhasedBookingsByItem')
AND report_grade=0;