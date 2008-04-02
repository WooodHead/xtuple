BEGIN;

CREATE INDEX recv_ordertypeid_idx ON recv (recv_order_type, recv_orderitem_id);

COMMIT;

