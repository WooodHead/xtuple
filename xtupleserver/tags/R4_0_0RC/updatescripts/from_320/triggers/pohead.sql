CREATE OR REPLACE FUNCTION _poheadTrigger() RETURNS TRIGGER AS $$
DECLARE
  _cmnttypeid 	INTEGER;
  _check	BOOLEAN;

BEGIN

  -- Check
  IF ( (TG_OP = 'UPDATE') AND (NOT checkPrivilege('MaintainPurchaseOrders')) AND (NOT checkPrivilege('PostVouchers')) ) THEN
    RAISE EXCEPTION 'You do not have privileges to alter a Purchase Order.';
  END IF;
  IF ( ( (TG_OP = 'INSERT') OR (TG_OP = 'DELETE') ) AND (NOT checkPrivilege('MaintainPurchaseOrders')) ) THEN
    RAISE EXCEPTION 'You do not have privileges to alter a Purchase Order.';
  END IF;

  IF ( (TG_OP = 'INSERT') OR (TG_op = 'UPDATE') ) THEN
    IF (NOT ISNUMERIC(NEW.pohead_number)) THEN
      RAISE EXCEPTION 'Purchase Order Number must be numeric.';
    END IF;
  END IF;

  IF ( SELECT (metric_value='t')
       FROM metric
       WHERE (metric_name='POChangeLog') ) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name='ChangeLog');
    IF (FOUND) THEN
      IF (TG_OP = 'INSERT') THEN
        PERFORM postComment(_cmnttypeid, 'P', NEW.pohead_id, 'Created');

      ELSIF (TG_OP = 'UPDATE') THEN
        IF (OLD.pohead_terms_id <> NEW.pohead_terms_id) THEN
          PERFORM postComment( _cmnttypeid, 'P', NEW.pohead_id,
                               ('Terms Changed from "' || oldterms.terms_code || '" to "' || newterms.terms_code || '"') )
          FROM terms AS oldterms, terms AS newterms
          WHERE ( (oldterms.terms_id=OLD.pohead_terms_id)
           AND (newterms.terms_id=NEW.pohead_terms_id) );
        END IF;

      ELSIF (TG_OP = 'DELETE') THEN
        DELETE FROM comment
        WHERE ( (comment_source='P')
         AND (comment_source_id=OLD.pohead_id) );
      END IF;
    END IF;
  END IF;

  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;

END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER poheadTrigger ON pohead;
CREATE TRIGGER poheadTrigger BEFORE INSERT OR UPDATE OR DELETE ON pohead FOR EACH ROW EXECUTE PROCEDURE _poheadTrigger();
