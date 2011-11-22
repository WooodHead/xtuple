select dropIfExists('INDEX', 'checkitem_apopenitem_id_idx');
CREATE INDEX checkitem_apopenitem_id_idx
   ON checkitem (checkitem_apopen_id);