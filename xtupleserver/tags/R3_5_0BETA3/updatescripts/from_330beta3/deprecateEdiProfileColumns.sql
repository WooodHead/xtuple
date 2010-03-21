
-- mark columns as deprecated
COMMENT ON COLUMN shiptoinfo.shipto_ediprofile_id IS 'Deprecated column - DO NOT USE';

COMMENT ON COLUMN custinfo.cust_soediprofile_id   IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_soediemail        IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_soediemailbody    IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_soedisubject      IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_soedifilename     IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_soedicc IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_soediemailhtml    IS 'Deprecated column - DO NOT USE';

COMMENT ON COLUMN custinfo.cust_ediprofile_id     IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_ediemail          IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_ediemailbody      IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_edisubject        IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_edifilename       IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_edicc             IS 'Deprecated column - DO NOT USE';
COMMENT ON COLUMN custinfo.cust_ediemailhtml      IS 'Deprecated column - DO NOT USE';

-- remove interfering constraints on deprecated columns - bug 8904
ALTER TABLE custinfo ALTER COLUMN cust_emaildelivery   DROP NOT NULL;
ALTER TABLE custinfo ALTER COLUMN cust_soemaildelivery DROP NOT NULL;
