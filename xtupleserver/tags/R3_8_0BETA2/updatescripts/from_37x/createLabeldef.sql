CREATE TABLE labeldef ( 
  labeldef_id serial PRIMARY KEY, 
  labeldef_name text NOT NULL, 
  labeldef_papersize text NOT NULL, 
  labeldef_columns integer NOT NULL, 
  labeldef_rows integer NOT NULL, 
  labeldef_width integer NOT NULL, 
  labeldef_height integer NOT NULL, 
  labeldef_start_offset_x integer NOT NULL, 
  labeldef_start_offset_y integer NOT NULL, 
  labeldef_horizontal_gap integer NOT NULL, 
  labeldef_vertical_gap integer NOT NULL
);

REVOKE ALL ON TABLE labeldef FROM public;
GRANT ALL ON TABLE labeldef TO xtrole;

INSERT INTO labeldef (labeldef_name, labeldef_papersize, labeldef_columns, labeldef_rows, labeldef_width, labeldef_height, labeldef_start_offset_x, labeldef_start_offset_y, labeldef_horizontal_gap, labeldef_vertical_gap) 
       VALUES ( 'Avery 5263', 'Letter', 2, 5, 400, 200, 25, 50, 0, 0 ); 
INSERT INTO labeldef (labeldef_name, labeldef_papersize, labeldef_columns, labeldef_rows, labeldef_width, labeldef_height, labeldef_start_offset_x, labeldef_start_offset_y, labeldef_horizontal_gap, labeldef_vertical_gap) 
       VALUES ( 'Avery 5264', 'Letter', 2, 3, 400, 333, 25, 75, 0, 0 );
INSERT INTO labeldef (labeldef_name, labeldef_papersize, labeldef_columns, labeldef_rows, labeldef_width, labeldef_height, labeldef_start_offset_x, labeldef_start_offset_y, labeldef_horizontal_gap, labeldef_vertical_gap) 
       VALUES ( 'Avery 8460', 'Letter', 3, 10, 262, 100, 32, 50, 0, 0 );
INSERT INTO labeldef (labeldef_name, labeldef_papersize, labeldef_columns, labeldef_rows, labeldef_width, labeldef_height, labeldef_start_offset_x, labeldef_start_offset_y, labeldef_horizontal_gap, labeldef_vertical_gap) 
       VALUES ( 'CILS ALP1-9200-1', 'Letter', 3, 7, 200, 100, 62, 62, 81, 50 );
