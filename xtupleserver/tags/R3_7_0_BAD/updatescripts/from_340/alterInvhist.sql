ALTER TABLE invhist ADD COLUMN invhist_series integer;
CREATE INDEX invhist_series ON invhist (invhist_series);