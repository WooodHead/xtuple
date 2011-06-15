-- Rule: ""_INSERT" ON te.voucher"

-- DROP RULE "_INSERT" ON te.voucher;

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO te.voucher DO INSTEAD  SELECT te.insertmiscvoucher(new.*) AS insertmiscvoucher;
