ALTER TABLE bankaccnt ADD bankaccnt_ach_origintype TEXT;
UPDATE bankaccnt
   SET bankaccnt_ach_origintype = CASE WHEN bankaccnt_ach_defaultorigin THEN 'I'
                                       WHEN bankaccnt_ach_origin IS NOT NULL THEN 'O'
                                  END;
ALTER TABLE bankaccnt DROP bankaccnt_ach_defaultorigin;
ALTER TABLE bankaccnt ADD bankaccnt_ach_originname TEXT;
ALTER TABLE bankaccnt ADD bankaccnt_ach_desttype   TEXT;
ALTER TABLE bankaccnt ADD bankaccnt_ach_fed_dest   TEXT;
ALTER TABLE bankaccnt ADD bankaccnt_ach_destname   TEXT;
ALTER TABLE bankaccnt ADD bankaccnt_ach_dest       TEXT;
