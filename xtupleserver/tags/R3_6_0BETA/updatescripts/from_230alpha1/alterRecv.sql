ALTER TABLE recv DROP CONSTRAINT recv_recv_order_type_check;
ALTER TABLE recv
  ADD CONSTRAINT recv_recv_order_type_check CHECK (recv_order_type IN ('PO', 'RA', 'TO'));
