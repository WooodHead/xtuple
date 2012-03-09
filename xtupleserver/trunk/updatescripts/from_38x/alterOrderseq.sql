alter table orderseq add column orderseq_seqiss seqiss[];
update orderseq set orderseq_table = 'apmemo' where orderseq_name = 'APMemoNumber';
update orderseq set orderseq_table = 'armemo' where orderseq_name = 'ARMemoNumber';
update orderseq set orderseq_table = 'armemo', orderseq_numcol = 'aropen_docnumber' where orderseq_name = 'CmNumber';