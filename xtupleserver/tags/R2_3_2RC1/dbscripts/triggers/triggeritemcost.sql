CREATE OR REPLACE FUNCTION triggeritemcost() RETURNS TRIGGER AS '
BEGIN

  IF (TG_OP = ''UPDATE'') THEN
    IF (NEW.itemcost_actcost <> OLD.itemcost_actcost OR
        NEW.itemcost_curr_id <> OLD.itemcost_curr_id) THEN
      INSERT INTO costhist
      ( costhist_item_id, costhist_costelem_id, costhist_type,
        costhist_lowlevel, costhist_user_id, costhist_date,
        costhist_oldcost, costhist_newcost,
	costhist_oldcurr_id, costhist_newcurr_id )
      VALUES
      ( NEW.itemcost_item_id, NEW.itemcost_costelem_id, ''A'',
        NEW.itemcost_lowlevel, currentUserId(), CURRENT_TIMESTAMP,
        OLD.itemcost_actcost, NEW.itemcost_actcost,
	OLD.itemcost_curr_id, NEW.itemcost_curr_id );
    END IF;

    IF (NEW.itemcost_stdcost <> OLD.itemcost_stdcost) THEN
      INSERT INTO costhist
      ( costhist_item_id, costhist_costelem_id, costhist_type,
        costhist_lowlevel, costhist_user_id, costhist_date,
        costhist_oldcost, costhist_newcost ,
	costhist_oldcurr_id, costhist_newcurr_id )
      VALUES
      ( NEW.itemcost_item_id, NEW.itemcost_costelem_id, ''S'',
        NEW.itemcost_lowlevel, currentUserId(), CURRENT_TIMESTAMP,
        OLD.itemcost_stdcost, NEW.itemcost_stdcost,
	baseCurrId(), baseCurrId() );
    END IF;

    RETURN NEW;

  ELSIF (TG_OP = ''INSERT'') THEN
    INSERT INTO costhist
    ( costhist_item_id, costhist_costelem_id, costhist_type,
      costhist_lowlevel, costhist_user_id, costhist_date,
      costhist_oldcost, costhist_newcost ,
      costhist_oldcurr_id, costhist_newcurr_id )
    VALUES
    ( NEW.itemcost_item_id, NEW.itemcost_costelem_id, ''N'',
      NEW.itemcost_lowlevel, currentUserId(), CURRENT_TIMESTAMP,
      0::numeric, NEW.itemcost_actcost,
      0, NEW.itemcost_curr_id );

    RETURN NEW;

  ELSIF (TG_OP = ''DELETE'') THEN
    INSERT INTO costhist
    ( costhist_item_id, costhist_costelem_id, costhist_type,
      costhist_lowlevel, costhist_user_id, costhist_date,
      costhist_oldcost, costhist_newcost ,
      costhist_oldcurr_id, costhist_newcurr_id )
    VALUES
    ( OLD.itemcost_item_id, OLD.itemcost_costelem_id, ''D'',
      OLD.itemcost_lowlevel, currentUserId(), CURRENT_TIMESTAMP,
      OLD.itemcost_stdcost, 0::numeric,
      OLD.itemcost_curr_id, 0 );

    RETURN OLD;
  END IF;

END;
'
    LANGUAGE plpgsql;