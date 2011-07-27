
INSERT INTO cmnttype (cmnttype_name, cmnttype_descrip, cmnttype_sys, cmnttype_editable)
              VALUES ('Notes to Comment', 'Used by certain triggers to automatically create/update comment with content of notes.', true, false);
INSERT INTO cmnttypesource (cmnttypesource_cmnttype_id, cmnttypesource_source_id)
  SELECT cmnttype_id, source_id FROM cmnttype, source WHERE cmnttype_name = 'Notes to Comment' AND source_name = 'INCDT';

