BEGIN;

--  Update historic PO values
UPDATE pohead
SET pohead_vendaddress1 = A.addr_line1,
pohead_vendaddress2 = A.addr_line2,
pohead_vendaddress3 = A.addr_line3,
pohead_vendcity = A.addr_city,
pohead_vendstate = A.addr_state,
pohead_vendzipcode = A.addr_postalcode,
pohead_vendcountry = A.addr_country
FROM addr A JOIN vendaddrinfo V ON (A.addr_id = V.vendaddr_addr_id)
WHERE (V.vendaddr_id=pohead_vendaddr_id);

COMMIT;