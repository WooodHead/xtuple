BEGIN;

--Script to identify and fix errors caused by freezing bug 6588

CREATE OR REPLACE FUNCTION correctFrozenTrans() RETURNS INTEGER AS '
DECLARE
  _i 			RECORD;
  _t 			RECORD;
  _c			RECORD;
  _invhist             	RECORD;
  _qoh			NUMERIC;
  _frozen		BOOLEAN;
  _cntAdj     		NUMERIC;
  _itemlocseries	INTEGER;
  _fixcount            	INTEGER;
  _invhistid		INTEGER;

BEGIN
  _fixcount := 0;

  --Make sure there are no frozen itemsites
  IF (SELECT COUNT(itemsite_id) FROM itemsite WHERE itemsite_freeze) > 0 THEN
    RAISE EXCEPTION ''All itemsites must be thawed before running thaw correction procedure.'';
  END IF;
  
  --Loop through each itemsite and check for problems
  FOR _i IN
    SELECT DISTINCT itemsite_id
    FROM itemsite, invhist
    WHERE ( (itemsite_id=invhist_itemsite_id)
    AND (invhist_transdate >= ''2/25/2008'') )
  LOOP
    _frozen := FALSE;

    -- Find the last transaction before 2.3.1 was released and cache qty on hand
    SELECT invhist_qoh_after INTO _qoh
    FROM invhist
    WHERE ( (invhist_itemsite_id=_i.itemsite_id)
    AND (invhist_transdate < ''2/25/2008'')
    AND ((NOT invhist_imported) OR (invhist_imported IS NULL)) )
    ORDER BY invhist_transdate DESC, invhist_id DESC
    LIMIT 1;
    IF (NOT FOUND) THEN
      _qoh	:= 0;
    ELSE
    END IF;
    
    -- Loop through transactions since 2.3.1 was released and look for problems
    FOR _t IN
      SELECT * FROM invhist
      WHERE ( (invhist_itemsite_id=_i.itemsite_id)
      AND (invhist_transdate >= ''2/25/2008'')
      AND ((NOT invhist_imported) OR (invhist_imported IS NULL)) )
      ORDER BY invhist_transdate,invhist_id
    LOOP
      IF ( (_qoh != _t.invhist_qoh_before) ) THEN -- Problem found
        
        --Stage all subseqent transactions to be rethawed
        UPDATE invhist SET
          invhist_posted=FALSE,
          invhist_comments=''Transaction Rethawed -
            Old before qty '' || CAST(invhist_qoh_before AS TEXT) || ''
            '' || invhist_comments
        WHERE ((invhist_transdate >= _t.invhist_transdate)
        AND (invhist_itemsite_id=_i.itemsite_id));

        _frozen	:= TRUE;
        _fixcount := _fixcount+1;
        EXIT;
      ELSE
        _qoh=_t.invhist_qoh_after;
      END IF;
    END LOOP;

    IF (_frozen) THEN
      FOR _invhist IN SELECT invhist_id, invhist_qoh_before, invhist_qoh_after
                    FROM invhist
                    WHERE ((invhist_itemsite_id=_i.itemsite_id)
                     AND (NOT invhist_posted))
                    ORDER BY invhist_transdate 
      LOOP

        UPDATE invhist
        SET invhist_qoh_before = _qoh,
          invhist_qoh_after = ( _qoh +
                                _invhist.invhist_qoh_after -
                                _invhist.invhist_qoh_before ),
          invhist_posted = TRUE
        WHERE (invhist_id=_invhist.invhist_id);

        _qoh := (_qoh + _invhist.invhist_qoh_after - _invhist.invhist_qoh_before);

      END LOOP;
      
      UPDATE itemsite SET
        itemsite_qtyonhand=_qoh
      WHERE (itemsite_id=_i.itemsite_id);

      --Check for and correct bad cycle count transactions created by this problem
      FOR _c IN
        SELECT invcnt_id,invcnt_tagnumber,invcnt_invhist_id,invcnt_postdate,invcnt_qoh_after
        FROM invcnt
        WHERE ( (invcnt_postdate > ''2/25/08'')
        AND (invcnt_itemsite_id=_i.itemsite_id)
        AND (invcnt_posted) )
        ORDER BY invcnt_postdate
      LOOP
        --Compare tag to trans result
        SELECT invhist_qoh_after-_c.invcnt_qoh_after,invhist_qoh_before INTO _cntAdj,_qoh
        FROM invhist
        WHERE (invhist_id=_c.invcnt_invhist_id);
        IF (FOUND) THEN
          IF (_cntAdj != 0) THEN
            --Refreeze
            UPDATE invhist SET
              invhist_posted=FALSE
            WHERE ((invhist_itemsite_id=_i.itemsite_id)
            AND (invhist_transdate >= _c.invcnt_postdate));
            
            --...enter an adjustment transaction for this tag...
            SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
            SELECT postInvTrans( itemsite_id, ''AD'', _cntAdj*-1,
                 ''I/M'', '''',_c.invcnt_tagnumber,'''',
                 (''Correction for Count tag freeze problem ''),
                  costcat_asset_accnt_id, costcat_adjustment_accnt_id, _itemlocSeries,_c.invcnt_postdate ) INTO _invhistid
	    FROM itemsite, costcat
	    WHERE ( (itemsite_costcat_id=costcat_id)
	    AND (itemsite_id=_i.itemsite_id) );

	    --Freeze hist
	    UPDATE invhist SET invhist_posted=FALSE WHERE (invhist_id=_invhistid);

            --...Rethaw...
            FOR _invhist IN SELECT invhist_id, invhist_qoh_before, invhist_qoh_after
                    FROM invhist
                    WHERE ((invhist_itemsite_id=_i.itemsite_id)
                     AND (NOT invhist_posted))
                    ORDER BY invhist_transdate LOOP

              UPDATE invhist
              SET invhist_qoh_before = _qoh,
               invhist_qoh_after = ( _qoh +
                                _invhist.invhist_qoh_after -
                                _invhist.invhist_qoh_before ),
               invhist_posted = TRUE
              WHERE (invhist_id=_invhist.invhist_id);

              _qoh := (_qoh + _invhist.invhist_qoh_after - _invhist.invhist_qoh_before);

            END LOOP;
      
	    UPDATE itemsite SET
              itemsite_qtyonhand=_qoh
            WHERE (itemsite_id=_i.itemsite_id);

            --...and fix count tag
            UPDATE invcnt SET
              invcnt_qoh_before=_qoh
            WHERE (invcnt_id=_c.invcnt_id);
          END IF;
        END IF;
      END LOOP;
    END IF;
    _frozen := false;
  END LOOP;

  RETURN _fixcount;
END;
' LANGUAGE 'plpgsql';     

SELECT correctFrozenTrans();
DROP FUNCTION correctFrozenTrans();

COMMIT;
        