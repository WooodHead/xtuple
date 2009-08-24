UPDATE cmnttype SET cmnttype_sys = false WHERE cmnttype_sys IS NULL;
ALTER TABLE cmnttype ALTER cmnttype_sys SET NOT NULL;
ALTER TABLE cmnttype ALTER cmnttype_sys SET DEFAULT false;
