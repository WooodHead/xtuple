CREATE OR REPLACE FUNCTION addAchBatchSequenceIfRequired() RETURNS INTEGER AS $$
BEGIN
  IF (NOT EXISTS(SELECT orderseq_name
                   FROM orderseq
                  WHERE (orderseq_name='ACHBatch'))) THEN
    INSERT INTO orderseq (orderseq_name, orderseq_number, orderseq_table,
                          orderseq_numcol
                ) VALUES ('ACHBatch', 1, 'checkhead', 'checkhead_ach_batch');
    RETURN 1;
  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT addAchBatchSequenceIfRequired();

SELECT dropIfExists('FUNCTION', 'addAchBatchSequenceIfRequired()', 'public');
