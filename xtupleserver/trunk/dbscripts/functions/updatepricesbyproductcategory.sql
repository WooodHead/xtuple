CREATE OR REPLACE FUNCTION updatePricesByProductCategory(pProdCatId INTEGER, pProdCatPattern TEXT, pUpdateType CHAR, pUpdateBy NUMERIC, pUpdateCharPrices BOOLEAN) 
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
-- this can't be done unless the user is an admin
--		ALTER TABLE ipsitem DISABLE TRIGGER ipsitembeforetrigger;
--		ALTER TABLE ipsitemchar DISABLE TRIGGER ipsitemcharbeforetrigger;
	END IF;

	-- Get the current user's currency precision
	SELECT COALESCE(locale_curr_scale, 2) INTO _currencyDecimals
	FROM locale, usr
	WHERE usr_locale_id = locale_id AND usr_username = CURRENT_USER;
	
	_percentMultiplier := (1.0 + (pUpdateBy / 100.0));
	
	IF (pUpdateType = 'V') THEN
	
		IF (pProdCatId IS NOT NULL) THEN
			-- Specified category id
			UPDATE ipsitem 
			SET ipsitem_price = ROUND( (ipsitem_price + pUpdateBy), _currencyDecimals )
			FROM item
			WHERE 
				ipsitem_item_id = item_id
				AND item_prodcat_id = pProdCatId;
			
		ELSIF (pProdCatPattern IS NOT NULL) THEN
			-- Pattern match category
			UPDATE ipsitem 
			SET ipsitem_price = ROUND( (ipsitem_price + pUpdateBy), _currencyDecimals )
			FROM item
			WHERE 
				ipsitem_item_id = item_id
				AND item_prodcat_id IN (
					SELECT prodcat_id FROM prodcat 
					WHERE (prodcat_code ~ pProdCatPattern) 
				);		
		ELSE
			-- All categories
			UPDATE ipsitem 
			SET ipsitem_price = ROUND( (ipsitem_price + pUpdateBy), _currencyDecimals );
		END IF;
		
		GET DIAGNOSTICS _itemRows = ROW_COUNT;
		
	ELSE
		
		IF (pProdCatId IS NOT NULL) THEN
			-- Specified category id
			UPDATE ipsitem 
			SET ipsitem_price = ROUND( (ipsitem_price * _percentMultiplier), _currencyDecimals )
			FROM item
			WHERE 
				ipsitem_item_id = item_id
				AND item_prodcat_id = pProdCatId;
				
			GET DIAGNOSTICS _itemRows = ROW_COUNT;

			IF(pUpdateCharPrices) THEN
				UPDATE ipsitemchar
				SET ipsitemchar_price = ROUND( (ipsitemchar_price * _percentMultiplier), _currencyDecimals )
				FROM ipsitem, item
				WHERE
					item_prodcat_id = pProdCatId
					AND ipsitem_item_id = item_id
					AND ipsitemchar_ipsitem_id = ipsitem_id;
				
				GET DIAGNOSTICS _charRows = ROW_COUNT;
			END IF;
			
		ELSIF (pProdCatPattern IS NOT NULL) THEN
			-- Pattern match category
			UPDATE ipsitem 
			SET ipsitem_price = ROUND( (ipsitem_price * _percentMultiplier), _currencyDecimals )
			FROM item
			WHERE 
				item_prodcat_id IN (
					SELECT prodcat_id FROM prodcat 
					WHERE (prodcat_code ~ pProdCatPattern ) 
				)
				AND ipsitem_item_id = item_id;
			
			GET DIAGNOSTICS _itemRows = ROW_COUNT;

			IF(pUpdateCharPrices) THEN
				UPDATE ipsitemchar
				SET ipsitemchar_price = ROUND( (ipsitemchar_price * _percentMultiplier), _currencyDecimals )
				FROM ipsitem, item
				WHERE
					item_prodcat_id IN (
						SELECT prodcat_id FROM prodcat 
						WHERE (prodcat_code ~ pProdCatPattern ) 
					)
					AND ipsitem_item_id = item_id
					AND ipsitemchar_ipsitem_id = ipsitem_id;
				
				GET DIAGNOSTICS _charRows = ROW_COUNT;
			END IF;
			
		ELSE
			-- All categories
			UPDATE ipsitem 
			SET ipsitem_price = ROUND( (ipsitem_price * _percentMultiplier), _currencyDecimals );
			
			GET DIAGNOSTICS _itemRows = ROW_COUNT;
			
			IF(pUpdateCharPrices) THEN
				UPDATE ipsitemchar
				SET ipsitemchar_price = ROUND( (ipsitemchar_price * _percentMultiplier), _currencyDecimals );
				
				GET DIAGNOSTICS _charRows = ROW_COUNT;
			END IF;
			
		END IF;

	END IF;

	-- Enable the triggers
	--ALTER TABLE ipsitem ENABLE TRIGGER ipsitembeforetrigger;
	--ALTER TABLE ipsitemchar ENABLE TRIGGER ipsitemcharbeforetrigger;
	
	RETURN _itemRows + _charRows;

END;
$BODY$
LANGUAGE 'plpgsql' VOLATILE;
