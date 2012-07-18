ALTER TABLE country DROP COLUMN country_curr_name,
                    DROP COLUMN country_curr_abbr,
                    DROP COLUMN country_curr_symbol;

UPDATE country SET country_curr_number = '978'
 WHERE country_abbr IN ('CY', 'EE', 'MT', 'SI', 'SK') ;

UPDATE country SET country_curr_number = '936' WHERE country_abbr = 'GH';
UPDATE country SET country_curr_number = '938' WHERE country_abbr = 'SD';
UPDATE country SET country_curr_number = '934' WHERE country_abbr = 'TM';
UPDATE country SET country_curr_number = '937' WHERE country_abbr = 'VE';
UPDATE country SET country_curr_number = '932' WHERE country_abbr = 'ZW';

INSERT INTO country (country_abbr, country_name,  country_curr_number)
             VALUES ('SS',         'South Sudan', '728');

UPDATE country
   SET country_curr_number = TO_CHAR(CAST(country_curr_number AS INTEGER),
                                     'FM000');

ALTER TABLE country
      ADD FOREIGN KEY (country_curr_number) REFERENCES curr_symbol(curr_number);
