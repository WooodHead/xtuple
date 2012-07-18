ALTER TABLE curr_symbol ADD curr_number CHAR(3) CHECK(curr_number ~ E'^\\d\\d\\d$'),
                        ADD curr_scale  INTEGER DEFAULT 2,
                        ALTER curr_name   TYPE TEXT,
                        ALTER curr_symbol TYPE TEXT
                        ;
-- make sure to set curr_number to NOT NULL UNIQUE after populating the table

COMMENT ON TABLE curr_symbol IS 'This table is designed to hold data for the ISO standard 4217 currency definitions.';
COMMENT ON COLUMN curr_symbol.curr_id IS 'This is the internal id for currency definitions.';
COMMENT ON COLUMN curr_symbol.curr_base IS 'This flag indicates whether this is the base currency of the application or not. There must be only one base currency. Once it is chosen, it may not be changed.';
COMMENT ON COLUMN curr_symbol.curr_name IS 'The standard English name for the currency.';
COMMENT ON COLUMN curr_symbol.curr_symbol IS 'The UNICODE value for the currency symbol.';
COMMENT ON COLUMN curr_symbol.curr_abbr IS 'The ISO 3 character alphabetic code for the currency.';
COMMENT ON COLUMN curr_symbol.curr_number IS 'The ISO 3 digit numeric code for the currency.';
COMMENT ON COLUMN curr_symbol.curr_scale IS 'The number of digits after the decimal place in standard currency units. This value comes from the "minor unit" defined by ISO.';
