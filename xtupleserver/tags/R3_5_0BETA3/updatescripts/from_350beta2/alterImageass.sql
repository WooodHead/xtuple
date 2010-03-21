ALTER TABLE imageass DROP CONSTRAINT imageass_imageass_purpose_check;
ALTER TABLE imageass ADD CONSTRAINT imageass_imageass_purpose_check CHECK (
   imageass_purpose = 'I' 
OR imageass_purpose = 'E' 
OR imageass_purpose = 'M' 
OR imageass_purpose = 'P'
OR imageass_purpose = 'A' 
OR imageass_purpose = 'C' 
OR imageass_purpose = 'D'
OR imageass_purpose = 'S');