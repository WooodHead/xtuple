CREATE OR REPLACE FUNCTION fetchToNumber() RETURNS INTEGER AS '
BEGIN
  RETURN fetchNextNumber(''ToNumber'');
END;
' LANGUAGE 'plpgsql';
