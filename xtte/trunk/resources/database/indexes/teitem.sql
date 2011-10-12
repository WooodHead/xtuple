SELECT dropIfExists('index', 'teitem_teitem_tehead_id_idx', 'te');
CREATE INDEX teitem_teitem_tehead_id_idx ON te.teitem(teitem_tehead_id);
