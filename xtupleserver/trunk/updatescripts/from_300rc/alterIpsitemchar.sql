BEGIN;

ALTER TABLE ipsitemchar DROP CONSTRAINT ipsitemchar_ipsitemchar_ipsitem_id_fkey;
ALTER TABLE ipsitemchar ADD CONSTRAINT ipsitemchar_ipsitemchar_ipsitem_id_fkey 
      FOREIGN KEY (ipsitemchar_ipsitem_id)
      REFERENCES ipsitem (ipsitem_id) ON DELETE CASCADE;

COMMIT;