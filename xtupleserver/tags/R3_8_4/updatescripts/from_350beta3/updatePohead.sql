UPDATE pohead SET
  pohead_vendaddress1=addr_line1,
  pohead_vendaddress2=addr_line2,
  pohead_vendaddress3=addr_line3,
  pohead_vendcity=addr_city,
  pohead_vendstate=addr_state,
  pohead_vendzipcode=addr_postalcode,
  pohead_vendcountry=addr_country
FROM vendinfo
  JOIN addr ON (addr_id=vend_addr_id)
WHERE ((vend_id=pohead_vend_id)
 AND (pohead_vendaddr_id IS NULL));