BEGIN;

CREATE SEQUENCE shipment_number_seq;
SELECT setval('shipment_number_seq', orderseq_number)
   FROM orderseq
   WHERE (orderseq_name='ShipmentNumber');
GRANT ALL ON TABLE shipment_number_seq TO GROUP openmfg;

DELETE FROM orderseq WHERE (orderseq_name='ShipmentNumber');

COMMIT;