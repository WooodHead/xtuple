ALTER TABLE invhist DROP CONSTRAINT invhist_invhist_costmethod_check;
ALTER TABLE invhist ADD CONSTRAINT invhist_invhist_costmethod_check CHECK (
  invhist_costmethod = 'S'::bpchar OR 
  invhist_costmethod = 'A'::bpchar OR
  invhist_costmethod = 'J'::bpchar);
