SELECT dropIfExists('TRIGGER', 'bomitemTrigger');
SELECT createColumn('public',  'bomitem', 'bomitem_issuewo',
                    'BOOLEAN', 'FALSE',   FALSE);
