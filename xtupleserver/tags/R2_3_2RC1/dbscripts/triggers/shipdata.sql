CREATE OR REPLACE FUNCTION _shipdatatrigger() RETURNS TRIGGER AS '
DECLARE
  _oldShipdata_cohead_number TEXT;
  _newShipdata_cohead_number INTEGER;
  _shipdatasum_shipper TEXT;

BEGIN

  _oldShipdata_cohead_number := trim(both '' '' from NEW.shipdata_cohead_number);
  _newShipdata_cohead_number := cast(_oldShipdata_cohead_number AS INTEGER);

--  This is where the shipper is identified and may need to be changed

  IF (substring(NEW.shipdata_cosmisc_tracknum from 1 for 2) = ''1Z'') THEN
    _shipdatasum_shipper := ''UPS'';
  ELSE
    _shipdatasum_shipper := ''UNKNOWN'';
  END IF;

  IF (NEW.shipdata_cosmisc_tracknum = NEW.shipdata_cosmisc_packnum_tracknum) THEN
     IF (NEW.shipdata_void_ind = ''Y'') THEN
--  Delete the current shipdatasum
       DELETE FROM shipdatasum
        WHERE ((shipdatasum_cohead_number = _newShipdata_cohead_number)
          AND  (shipdatasum_cosmisc_tracknum = NEW.shipdata_cosmisc_tracknum));
     ELSE
--  Insert the current shipdatasum
       INSERT INTO shipdatasum
              (shipdatasum_cohead_number, shipdatasum_cosmisc_tracknum,
               shipdatasum_cosmisc_packnum_tracknum, shipdatasum_weight,
               shipdatasum_base_freight, shipdatasum_total_freight,
               shipdatasum_shipper, shipdatasum_billing_option,
               shipdatasum_package_type)
       VALUES (_newShipdata_cohead_number, NEW.shipdata_cosmisc_tracknum,
               NEW.shipdata_cosmisc_packnum_tracknum, NEW.shipdata_weight,
               NEW.shipdata_base_freight, NEW.shipdata_total_freight,
               _shipdatasum_shipper, NEW.shipdata_billing_option,
               NEW.shipdata_package_type);
     END IF;
  END IF;

  RETURN NEW;

END;
'
  LANGUAGE 'plpgsql';

DROP TRIGGER shipdatatrigger ON shipdata;
CREATE TRIGGER shipdatatrigger BEFORE INSERT OR UPDATE ON shipdata FOR EACH ROW EXECUTE PROCEDURE _shipdatatrigger();
