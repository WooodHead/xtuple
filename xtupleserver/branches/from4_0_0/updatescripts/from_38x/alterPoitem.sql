CREATE FUNCTION alterPoItemForUpgrade() RETURNS INTEGER AS $$
BEGIN
  IF NOT EXISTS(SELECT 1
                  FROM information_schema.columns
                 WHERE table_schema = 'public'
                   AND table_name   = 'poitem'
                   AND column_name  = 'poitem_order_id') THEN
    ALTER TABLE poitem ADD COLUMN poitem_order_id INTEGER;
    ALTER TABLE poitem ADD COLUMN poitem_order_type CHAR(1);

    UPDATE poitem SET poitem_order_type='S', poitem_order_id=poitem_soitem_id
    WHERE poitem_soitem_id IS NOT NULL;

    UPDATE poitem SET poitem_order_type='W', poitem_order_id=(SELECT womatl_id FROM womatl
                                                              WHERE (womatl_wo_id=poitem_wohead_id AND womatl_itemsite_id=poitem_itemsite_id)
                                                              LIMIT 1)
    WHERE poitem_wohead_id IS NOT NULL;

    ALTER TABLE poitem DROP COLUMN poitem_soitem_id CASCADE;
    ALTER TABLE poitem DROP COLUMN poitem_wohead_id CASCADE;

    RETURN 1;
  END IF;

  RETURN 0;
END;
$$
LANGUAGE 'plpgsql';

SELECT alterPoItemForUpgrade();
DROP FUNCTION alterPoItemForUpgrade();
