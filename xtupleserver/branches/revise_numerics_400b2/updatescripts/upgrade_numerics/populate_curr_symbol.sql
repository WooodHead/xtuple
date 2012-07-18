/* ncode, ccode, scale, name from http://www.currency-iso.org/dl_iso_table_a1.xml
   unicode symbols from http://unicode.org/chargs/PDF/U20A0.pdf with gaps
   filled from www.xe.com/symbols.php
*/

SET standard_conforming_strings TO on;

CREATE FUNCTION upgradePopulateCurrSymbol() RETURNS INTEGER AS $$
DECLARE
  _counter INTEGER := 0;
  _tmp     INTEGER;
  _r       RECORD;
  _oldstr  TEXT;
BEGIN
  CREATE TEMPORARY TABLE isocurrencydefs (ncode TEXT,
                                          ccode TEXT,
                                          scale INTEGER,
                                          symbol TEXT,
                                          name   TEXT)
    ON COMMIT DROP;

  INSERT INTO isocurrencydefs VALUES
   ( '784', 'AED', 2,     '',             'UAE Dirham'),
   ( '971', 'AFN', 2,     U&'\0608',      'Afghani'),
   ( '008', 'ALL', 2,     'Lek',          'Lek'),
   ( '051', 'AMD', 2,     '',             'Armenian Dram'),
   ( '532', 'ANG', 2,     U&'\0192',      'Netherlands Antillean Guilder'),
   ( '973', 'AOA', 2,     '',             'Kwanza'),
   ( '032', 'ARS', 2,     '$',            'Argentine Peso'),
   ( '036', 'AUD', 2,     '$',            'Australian Dollar'),
   ( '533', 'AWG', 2,     U&'\0192',      'Aruban Florin'),
   ( '944', 'AZN', 2,     U&'\043c\0430\043d', 'Azerbaijanian Manat'),
   ( '977', 'BAM', 2,     U&'\004b\004d', 'Convertible Mark'),
   ( '052', 'BBD', 2,     '$',            'Barbados Dollar'),
   ( '050', 'BDT', 2,     '',             'Taka'),
   ( '975', 'BGN', 2,     U&'\043B\0432', 'Bulgarian Lev'),
   ( '048', 'BHD', 3,     '',             'Bahraini Dinar'),
   ( '108', 'BIF', 0,     '',             'Burundi Franc'),
   ( '060', 'BMD', 2,     '$',            'Bermudian Dollar'),
   ( '096', 'BND', 2,     '$',            'Brunei Dollar'),
   ( '068', 'BOB', 2,     '$b',           'Boliviano'),
   ( '984', 'BOV', 2,     '',             'Mvdol'),
   ( '986', 'BRL', 2,     'R$',           'Brazilian Real'),
   ( '044', 'BSD', 2,     '$',            'Bahamian Dollar'),
   ( '064', 'BTN', 2,     '',             'Ngultrum'),
   ( '072', 'BWP', 2,     'P',            'Pula'),
   ( '974', 'BYR', 0,     'p.',           'Belarussian Ruble'),
   ( '084', 'BZD', 2,     'BZ$',          'Belize Dollar'),
   ( '124', 'CAD', 2,     '$',            'Canadian Dollar'),
   ( '976', 'CDF', 2,     '',             'Congolese Franc'),
   ( '947', 'CHE', 2,     '',             'WIR Euro'),
   ( '756', 'CHF', 2,     'CHF',          'Swiss Franc'),
   ( '948', 'CHW', 2,     '',             'WIR Franc'),
   ( '990', 'CLF', 0,     '',             'Unidades de fomento'),
   ( '152', 'CLP', 0,     '$',            'Chilean Peso'),
   ( '156', 'CNY', 2,     U&'\00a5',      'Yuan Renminbi'),
   ( '170', 'COP', 2,     '$',            'Colombian Peso'),
   ( '970', 'COU', 2,     '',             'Unidad de Valor Real'),
   ( '188', 'CRC', 2,     U&'\20A1',      'Costa Rican Colon'),
   ( '931', 'CUC', 2,     '',             'Peso Convertible'),
   ( '192', 'CUP', 2,     U&'\20B1',      'Cuban Peso'),
   ( '132', 'CVE', 2,     '',             'Cape Verde Escudo'),
   ( '203', 'CZK', 2,     U&'\004b\010d', 'Czech Koruna'),
   ( '262', 'DJF', 0,     '',             'Djibouti Franc'),
   ( '208', 'DKK', 2,     'kr',           'Danish Krone'),
   ( '214', 'DOP', 2,     'RD$',          'Dominican Peso'),
   ( '012', 'DZD', 2,     '',             'Algerian Dinar'),
   ( '818', 'EGP', 2,     U&'\00a3',      'Egyptian Pound'),
   ( '232', 'ERN', 2,     '',             'Nakfa'),
   ( '230', 'ETB', 2,     '',             'Ethiopian Birr'),
   ( '978', 'EUR', 2,     U&'\20AC',      'Euro'),
   ( '242', 'FJD', 2,     '$',            'Fiji Dollar'),
   ( '238', 'FKP', 2,     U&'\00a3',      'Falkland Islands Pound'),
   ( '826', 'GBP', 2,     U&'\00a3',      'Pound Sterling'),
   ( '981', 'GEL', 2,     '',             'Lari'),
   ( '936', 'GHS', 2,     U&'\20B5',      'Ghana Cedi'),
   ( '292', 'GIP', 2,     U&'\00a3',      'Gibraltar Pound'),
   ( '270', 'GMD', 2,     '',             'Dalasi'),
   ( '324', 'GNF', 0,     '',             'Guinea Franc'),
   ( '320', 'GTQ', 2,     'Q',            'Quetzal'),
   ( '328', 'GYD', 2,     '$',            'Guyana Dollar'),
   ( '344', 'HKD', 2,     '$',            'Hong Kong Dollar'),
   ( '340', 'HNL', 2,     'L',            'Lempira'),
   ( '191', 'HRK', 2,     'kn',           'Croatian Kuna'),
   ( '332', 'HTG', 2,     '',             'Gourde'),
   ( '348', 'HUF', 2,     'Ft',           'Forint'),
   ( '360', 'IDR', 2,     'Rp',           'Rupiah'),
   ( '376', 'ILS', 2,     U&'\20AA',      'New Israeli Sheqel'),
   ( '356', 'INR', 2,     U&'\20B9',      'Indian Rupee'),
   ( '368', 'IQD', 3,     '',             'Iraqi Dinar'),
   ( '364', 'IRR', 2,     U&'\fdfc',      'Iranian Rial'),
   ( '352', 'ISK', 0,     'kr',           'Iceland Krona'),
   ( '388', 'JMD', 2,     'J$',           'Jamaican Dollar'),
   ( '400', 'JOD', 3,     '',             'Jordanian Dinar'),
   ( '392', 'JPY', 0,     U&'\00A5',      'Yen'),
   ( '404', 'KES', 2,     '',             'Kenyan Shilling'),
   ( '417', 'KGS', 2,     U&'\043b\0432', 'Som'),
   ( '116', 'KHR', 2,     U&'\17DB',      'Riel'),
   ( '174', 'KMF', 0,     '',             'Comoro Franc'),
   ( '408', 'KPW', 2,     '',             'North Korean Won'),
   ( '410', 'KRW', 0,     U&'\20A9',      'Won'),
   ( '414', 'KWD', 3,     '',             'Kuwaiti Dinar'),
   ( '136', 'KYD', 2,     '$',            'Cayman Islands Dollar'),
   ( '398', 'KZT', 2,     U&'\20B8',      'Tenge'),
   ( '418', 'LAK', 2,     U&'\20AD',      'Kip'),
   ( '422', 'LBP', 2,     U&'\00a3',      'Lebanese Pound'),
   ( '144', 'LKR', 2,     '',             'Sri Lanka Rupee'),
   ( '430', 'LRD', 2,     '$',            'Liberian Dollar'),
   ( '426', 'LSL', 2,     '',             'Loti'),
   ( '440', 'LTL', 2,     'Lt',           'Lithuanian Litas'),
   ( '428', 'LVL', 2,     'Ls',           'Latvian Lats'),
   ( '434', 'LYD', 3,     '',             'Libyan Dinar'),
   ( '504', 'MAD', 2,     '',             'Moroccan Dirham'),
   ( '498', 'MDL', 2,     '',             'Moldovan Leu'),
   ( '969', 'MGA', 2,     '',             'Malagasy Ariary'),
   ( '807', 'MKD', 2,     U&'\0434\0435\043D', 'Denar'),
   ( '104', 'MMK', 2,     '',             'Kyat'),
   ( '496', 'MNT', 2,     U&'\20AE',      'Tugrik'),
   ( '446', 'MOP', 2,     '',             'Pataca'),
   ( '478', 'MRO', 2,     '',             'Ouguiya'),
   ( '480', 'MUR', 2,     '',             'Mauritius Rupee'),
   ( '462', 'MVR', 2,     '',             'Rufiyaa'),
   ( '454', 'MWK', 2,     '',             'Kwacha'),
   ( '484', 'MXN', 2,     '$',            'Mexican Peso'),
   ( '979', 'MXV', 2,     '',             'Mexican Unidad de Inversion (UDI)'),
   ( '458', 'MYR', 2,     'RM',           'Malaysian Ringgit'),
   ( '943', 'MZN', 2,     'MT',           'Mozambique Metical'),
   ( '516', 'NAD', 2,     '$',            'Namibia Dollar'),
   ( '566', 'NGN', 2,     U&'\20A6',      'Naira'),
   ( '558', 'NIO', 2,     'C$',           'Cordoba Oro'),
   ( '578', 'NOK', 2,     'kr',           'Norwegian Krone'),
   ( '524', 'NPR', 2,     '',             'Nepalese Rupee'),
   ( '554', 'NZD', 2,     '$',            'New Zealand Dollar'),
   ( '512', 'OMR', 3,     U&'\FDFC',      'Rial Omani'),
   ( '590', 'PAB', 2,     'B/.',          'Balboa'),
   ( '604', 'PEN', 2,     'S/.',          'Nuevo Sol'),
   ( '598', 'PGK', 2,     '',             'Kina'),
   ( '608', 'PHP', 2,     U&'\20B1',      'Philippine Peso'),
   ( '586', 'PKR', 2,     '',             'Pakistan Rupee'),
   ( '985', 'PLN', 2,     U&'z\0142',     'Zloty'),
   ( '600', 'PYG', 0,     U&'\20B2',      'Guarani'),
   ( '634', 'QAR', 2,     U&'\FDFC',      'Qatari Rial'),
   ( '946', 'RON', 2,     'lei',          'New Romanian Leu'),
   ( '941', 'RSD', 2,     U&'\0414\0438\043d.', 'Serbian Dinar'),
   ( '643', 'RUB', 2,     U&'\0440\0443\0431',  'Russian Ruble'),
   ( '646', 'RWF', 0,     '',             'Rwanda Franc'),
   ( '682', 'SAR', 2,     U&'\FDFC',      'Saudi Riyal'),
   ( '090', 'SBD', 2,     '$',            'Solomon Islands Dollar'),
   ( '690', 'SCR', 2,     '',             'Seychelles Rupee'),
   ( '938', 'SDG', 2,     '',             'Sudanese Pound'),
   ( '752', 'SEK', 2,     'kr',           'Swedish Krona'),
   ( '702', 'SGD', 2,     '$',            'Singapore Dollar'),
   ( '654', 'SHP', 2,     U&'\00a3',      'Saint Helena Pound'),
   ( '694', 'SLL', 2,     '',             'Leone'),
   ( '706', 'SOS', 2,     'S',            'Somali Shilling'),
   ( '968', 'SRD', 2,     '$',            'Surinam Dollar'),
   ( '728', 'SSP', 2,     '',             'South Sudanese Pound'),
   ( '678', 'STD', 2,     '',             'Dobra'),
   ( '222', 'SVC', 2,     U&'\20A1',      'El Salvador Colon'),
   ( '760', 'SYP', 2,     U&'\00a3',      'Syrian Pound'),
   ( '748', 'SZL', 2,     '',             'Lilangeni'),
   ( '764', 'THB', 2,     U&'\0E3F',      'Baht'),
   ( '972', 'TJS', 2,     '',             'Somoni'),
   ( '934', 'TMT', 2,     '',             'Turkmenistan New Manat'),
   ( '788', 'TND', 3,     '',             'Tunisian Dinar'),
   ( '776', 'TOP', 2,     '',             'Pa’anga'),
   ( '949', 'TRY', 2,     '',             'Turkish Lira'),
   ( '780', 'TTD', 2,     'TT$',          'Trinidad and Tobago Dollar'),
   ( '901', 'TWD', 2,     '',             'New Taiwan Dollar'),
   ( '834', 'TZS', 2,     '',             'Tanzanian Shilling'),
   ( '980', 'UAH', 2,     U&'\20B4',      'Hryvnia'),
   ( '800', 'UGX', 2,     '',             'Uganda Shilling'),
   ( '840', 'USD', 2,     '$',            'US Dollar'),
   ( '997', 'USN', 2,     '',             'US Dollar (Next day)'),
   ( '998', 'USS', 2,     '',             'US Dollar (Same day)'),
   ( '940', 'UYI', 0,     '',             'Uruguay Peso en Unidades Indexadas (URUIURUI)'),
   ( '858', 'UYU', 2,     '$U',           'Peso Uruguayo'),
   ( '860', 'UZS', 2,     U&'\043b\0432', 'Uzbekistan Sum'),
   ( '937', 'VEF', 2,     'Bs',           'Bolivar Fuerte'),
   ( '704', 'VND', 0,     U&'\20AB',      'Dong'),
   ( '548', 'VUV', 0,     '',             'Vatu'),
   ( '882', 'WST', 2,     '',             'Tala'),
   ( '950', 'XAF', 0,     '',             'CFA Franc BEAC'),
   ( '961', 'XAG', NULL,  '',             'Silver'),
   ( '959', 'XAU', NULL,  '',             'Gold'),
   ( '955', 'XBA', NULL,  '',             'Bond Markets Unit European Composite Unit (EURCO)'),
   ( '956', 'XBB', NULL,  '',             'Bond Markets Unit European Monetary Unit (E.M.U.-6)'),
   ( '957', 'XBC', NULL,  '',             'Bond Markets Unit European Unit of Account 9 (E.U.A.-9)'),
   ( '958', 'XBD', NULL,  '',             'Bond Markets Unit European Unit of Account 17 (E.U.A.-17)'),
   ( '951', 'XCD', 2,     '$',            'East Caribbean Dollar'),
   ( '960', 'XDR', NULL,  '',             'SDR (Special Drawing Right)'),
   ( '952', 'XOF', 0,     '',             'CFA Franc BCEAO'),
   ( '964', 'XPD', NULL,  '',             'Palladium'),
   ( '953', 'XPF', 0,     '',             'CFP Franc'),
   ( '962', 'XPT', NULL,  '',             'Platinum'),
   ( '994', 'XSU', NULL,  '',             'Sucre'),
   ( '963', 'XTS', NULL,  '',             'Codes specifically reserved for testing purposes'),
   ( '965', 'XUA', NULL,  '',             'ADB Unit of Account'),
   ( '999', 'XXX', NULL,  '',             'The codes assigned for transactions where no currency is involved'),
   ( '886', 'YER', 2,     U&'\FDFC',      'Yemeni Rial'),
   ( '710', 'ZAR', 2,     'R',            'Rand'),
   ( '894', 'ZMK', 2,     '',             'Zambian Kwacha'),
   ( '932', 'ZWL', 2,     '',             'Zimbabwe Dollar')
  ;

  FOR _r IN SELECT * FROM isocurrencydefs LOOP
    _tmp := NULL; -- verify update succeeded

    UPDATE curr_symbol
       SET curr_scale = _r.scale, curr_number = _r.ncode
     WHERE curr_abbr = _r.ccode
     RETURNING curr_id INTO _tmp;

    IF _tmp IS NULL THEN     -- no pre-existing row was updated
      INSERT INTO curr_symbol (curr_name,   curr_symbol, curr_abbr,
                               curr_number, curr_scale)
                       VALUES (_r.name,     _r.symbol,   _r.ccode,
                               _r.ncode,    _r.scale)
      RETURNING curr_id INTO _tmp;
    END IF;

    IF (_tmp IS NOT NULL) THEN
      _counter := _counter + 1;
    END IF;
  END LOOP;

  SELECT COUNT(*) INTO _tmp FROM isocurrencydefs;
  IF _tmp != _counter THEN
    RAISE EXCEPTION 'Inserted/updated % rows in curr_symbol but expected %',
                    _counter, _tmp;
  END IF;

  RETURN _counter;
END;
$$ LANGUAGE PLPGSQL;

SHOW standard_conforming_strings;

SELECT upgradePopulateCurrSymbol();

DROP FUNCTION IF EXISTS upgradePopulateCurrSymbol();

ALTER TABLE curr_symbol
            ALTER curr_number SET NOT NULL,
            ADD CONSTRAINT curr_symbol_curr_number_key UNIQUE (curr_number);
