CREATE OR REPLACE FUNCTION updatePricesByPricingSchedule(pIpsHeadId INTEGER, pUpdateType CHAR, pUpdateBy NUMERIC, pUpdateCharPrices BOOLEAN) 
RETURNS NUMERIC AS
$BODY$
DECLARE
  _percentMultiplier NUMERIC;
  _currencyDecimals INTEGER;
  _itemRows INTEGER :=0;
  _charRows INTEGER :=0;

BEGIN

	IF NOT (checkPrivilege('MaintainPricingSchedules')) THEN
		RAISE EXCEPTION 'You do not have privileges to maintain Price Schedules.';
	ELSE
		-- Disable the triggers
-- this can only be done by an admin
--		ALTER TABLE ipsitem DISABLE TRIGGER ipsitembeforetrigger;
--		ALTER TABLE ipsitemchar DISABLE TRIGGER ipsitemcharbeforetrigger;
	END IF;

	-- Get the current user's currency precision
	SELECT COALESCE(locale_curr_scale, 2) INTO _currencyDecimals
	FROM locale, usr
	WHERE usr_locale_id = locale_id AND usr_username = CURRENT_USER;

	IF (pUpdateType = 'V') THEN
		UPDATE ipsitem
		SET ipsitem_price = ROUND( (ipsitem_price + pUpdateBy), _currencyDecimals)
		WHERE (ipsitem_ipshead_id = pIpsHeadId);	

		GET DIAGNOSTICS _itemRows = ROW_COUNT;
		
	ELSE
		_percentMultiplier := (1.0 + (pUpdateBy / 100.0));

		UPDATE ipsitem
		SET ipsitem_price = ROUND( (ipsitem_price * _percentMultiplier), _currencyDecimals)
		WHERE (ipsitem_ipshead_id = pIpsHeadId);
		
		GET DIAGNOSTICS _itemRows = ROW_COUNT;
		
		RAISE NOTICE 'Affected ipsitem rows = %', _itemRows;

		IF (pUpdateCharPrices) THEN
			UPDATE ipsitemchar 
			SET ipsitemchar_price = ROUND( (ipsitemchar_price * _percentMultiplier), _currencyDecimals)
			FROM ipsitem
			WHERE ipsitemchar_ipsitem_id = ipsitem_id AND ipsitem_ipshead_id = pIpsHeadId;
			
			GET DIAGNOSTICS _charRows = ROW_COUNT;
		END IF;

	END IF;
	
	-- Enable the triggers
	--ALTER TABLE ipsitem ENABLE TRIGGER ipsitembeforetrigger;
	--ALTER TABLE ipsitemchar ENABLE TRIGGER ipsitemcharbeforetrigger;
	
	RETURN _itemRows + _charRows;

END;
$BODY$
LANGUAGE 'plpgsql' VOLATILE;
