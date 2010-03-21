CREATE OR REPLACE FUNCTION baseCurrID ()
    RETURNS INTEGER AS '
    DECLARE
	returnVal INTEGER;
    BEGIN
	SELECT curr_id INTO returnVal
	    FROM curr_symbol
	    WHERE curr_base = TRUE;
    	IF NOT FOUND THEN
	    RAISE EXCEPTION ''No base currency found'';
	END IF;
	RETURN returnVal;
    END;
' LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION currConcat(VARCHAR(3), VARCHAR(9))
	RETURNS VARCHAR(15) AS '
    DECLARE
	curr_abbr   ALIAS FOR $1;
	curr_symbol ALIAS FOR $2;
	returnVal   VARCHAR(15) := '''';
    BEGIN
	IF length(trim(curr_abbr)) > 0 AND length(trim(curr_symbol)) > 0 THEN
	    returnVal := trim(curr_abbr) || '' - '' || trim(curr_symbol);

	ELSIF length(trim(curr_abbr)) > 0 THEN
	    returnVal := curr_abbr;

	ELSIF length(trim(curr_symbol)) > 0 THEN
	    returnVal := curr_symbol;
	END IF;

	RETURN returnVal;
    END;
' LANGUAGE plpgsql;
