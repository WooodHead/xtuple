CREATE OR REPLACE FUNCTION moveccardup(int4)
  RETURNS int4 AS
'
DECLARE
  pCcardid ALIAS FOR $1;
  _nextCcard RECORD;

BEGIN

  SELECT nextCcard.ccard_id AS ccard_id, nextCcard.ccard_seq AS next_seqnumber,
         thisCcard.ccard_seq AS this_seqnumber INTO _nextCcard
  FROM ccard AS nextCcard, ccard AS thisCcard
  WHERE ((nextCcard.ccard_seq < thisCcard.ccard_seq)
   AND (nextCcard.ccard_cust_id=thisCcard.ccard_cust_id)
   AND (thisCcard.ccard_id=pCcardid))
  ORDER BY next_seqnumber DESC
  LIMIT 1;

  IF (FOUND) THEN
--  Swap the seqnumber of the current Ccard and the next Ccard

    UPDATE Ccard 
    SET ccard_seq=_nextCcard.next_seqnumber
    WHERE (ccard_id=pCcardid);

    UPDATE Ccard
    SET ccard_seq=_nextCcard.this_seqnumber
    WHERE (ccard_id=_nextCcard.ccard_id);
  END IF;

  RETURN 1;

END;
'
  LANGUAGE 'plpgsql';
