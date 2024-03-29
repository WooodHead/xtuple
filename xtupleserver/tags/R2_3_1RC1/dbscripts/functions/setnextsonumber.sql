CREATE OR REPLACE FUNCTION setNextSoNumber(INTEGER) RETURNS INTEGER  AS '
DECLARE
  pSoNumber ALIAS FOR $1;
  _orderseqid INTEGER;

BEGIN

  SELECT orderseq_id INTO _orderseqid
  FROM orderseq
  WHERE (orderseq_name=''SoNumber'');

  IF (NOT FOUND) THEN
    SELECT NEXTVAL(''orderseq_orderseq_id_seq'') INTO _orderseqid;

    INSERT INTO orderseq (orderseq_id, orderseq_name, orderseq_number)
    VALUES (_orderseqid, ''SoNumber'', pSoNumber);

  ELSE
    UPDATE orderseq
    SET orderseq_number=pSoNumber
    WHERE (orderseq_name=''SoNumber'');
  END IF;

  RETURN _orderseqid;

END;
' LANGUAGE 'plpgsql';
