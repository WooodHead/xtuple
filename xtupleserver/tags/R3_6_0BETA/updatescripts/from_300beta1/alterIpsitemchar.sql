BEGIN;

ALTER TABLE ipsitemchar ADD UNIQUE (ipsitemchar_ipsitem_id,ipsitemchar_char_id,ipsitemchar_value);

COMMIT;