ALTER TABLE cashrcptitem ADD COLUMN cashrcptitem_applied BOOLEAN DEFAULT true;
ALTER TABLE cashrcptitem DISABLE TRIGGER cashrcptitemaftertrigger;
ALTER TABLE cashrcptitem DISABLE TRIGGER cashrcptitemtrigger;
UPDATE cashrcptitem SET
  cashrcptitem_applied=false
FROM aropen
WHERE ((aropen_id=cashrcptitem_aropen_id)
AND (aropen_doctype IN ('C','R')));
ALTER TABLE cashrcptitem ENABLE TRIGGER cashrcptitemaftertrigger;
ALTER TABLE cashrcptitem ENABLE TRIGGER cashrcptitemtrigger;