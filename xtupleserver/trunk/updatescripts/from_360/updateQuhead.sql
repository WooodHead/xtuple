UPDATE quhead
SET quhead_status = 'O'
WHERE (COALESCE(quhead_status, ' ') =' ');
