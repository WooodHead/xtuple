SELECT createColumn('public', 'orderseq', 'orderseq_seqiss', 'seqiss[]');

update orderseq set orderseq_table = 'apmemo' where orderseq_name = 'APMemoNumber';
update orderseq set orderseq_table = 'armemo' where orderseq_name = 'ARMemoNumber';
update orderseq set orderseq_table = 'armemo', orderseq_numcol = 'aropen_docnumber' where orderseq_name = 'CmNumber';
insert into orderseq (orderseq_name, orderseq_number, orderseq_table, orderseq_numcol)
values ('OpportunityNumber', nextval('ophead_ophead_id_seq'), 'ophead', 'ophead_number');
