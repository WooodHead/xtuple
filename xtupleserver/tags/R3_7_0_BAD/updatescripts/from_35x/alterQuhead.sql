ALTER TABLE quhead
ADD COLUMN quhead_status text
CONSTRAINT quhead_quhead_status_check CHECK (quhead_status = 'O'::text OR quhead_status = 'C'::text OR quhead_status = 'X'::text);