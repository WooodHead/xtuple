CREATE OR REPLACE FUNCTION rollUpActualCost(INTEGER) RETURNS INTEGER AS '
DECLARE
    pItemid ALIAS FOR $1;

BEGIN
    RETURN rollUpSorACost(pitemid, TRUE);
END;
' LANGUAGE 'plpgsql';