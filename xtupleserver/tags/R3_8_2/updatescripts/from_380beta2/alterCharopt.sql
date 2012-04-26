SELECT dropIfExists('CONSTRAINT', 'charopt_pkey', 'public'); 
ALTER TABLE charopt ADD PRIMARY KEY (charopt_id);
