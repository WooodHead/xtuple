BEGIN;

ALTER TABLE incdt ADD COLUMN incdt_ls_id INTEGER REFERENCES ls (ls_id);
COMMENT ON COLUMN incdt.incdt_lotserial IS 'incdt_lotserial is deprecated';

UPDATE incdt SET
  incdt_ls_id=ls_id
FROM ls,itemsite
WHERE ((ls_number=incdt_lotserial)
AND (ls_item_id=incdt_item_id));

INSERT INTO ls (ls_item_id,ls_number)
SELECT incdt_item_id,incdt_lotserial
FROM incdt
WHERE ((incdt_ls_id IS NULL)
AND (LENGTH(incdt_lotserial) > 0));

UPDATE incdt SET
  incdt_ls_id=ls_id
FROM ls,itemsite
WHERE ((ls_number=incdt_lotserial)
AND (ls_item_id=incdt_item_id)
AND (incdt_ls_id IS NULL)
AND (LENGTH(incdt_lotserial) > 0));

COMMIT;

COMMIT