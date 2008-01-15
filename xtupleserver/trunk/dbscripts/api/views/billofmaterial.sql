BEGIN;

  --Bill of Material View

  DROP VIEW api.billofmaterial;
  CREATE OR REPLACE VIEW api.billofmaterial AS

  SELECT
    item_number,
    bomhead_revision AS revision,
    bomhead_docnum AS document_number,
    bomhead_revisiondate AS revision_date,
    bomhead_batchsize AS batch_size,
    bomhead_requiredqtyper AS total_qty_per
  FROM
    bomhead, item
  WHERE
    (bomhead_item_id=item_id);


GRANT ALL ON TABLE api.billofmaterial TO openmfg;
COMMENT ON VIEW api.billofmaterial IS 'Bill of Material Header';

  --Rules

  CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.billofmaterial DO INSTEAD

  INSERT INTO bomhead
    (bomhead_item_id,
     bomhead_docnum,
     bomhead_revision,
     bomhead_revisiondate,
     bomhead_batchsize,
     bomhead_requiredqtyper)
     VALUES
    (getItemId(NEW.item_number),
     NEW.document_number,
     NEW.revision,
     NEW.revision_date,
     COALESCE(NEW.batch_size,0),
     NEW.total_qty_per);
 
    CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.billofmaterial DO INSTEAD

    UPDATE bomhead SET
      bomhead_revision=NEW.revision,
      bomhead_revisiondate=NEW.revision_date,
      bomhead_docnum=NEW.document_number,
      bomhead_batchsize=NEW.batch_size,
      bomhead_requiredqtyper=NEW.total_qty_per
    WHERE ((bomhead_item_id=getItemId(NEW.item_number))
    AND (bomhead_rev_id=getRevId(NEW.item_number,NEW.revision,'BOM')));

    CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.billofmaterial DO INSTEAD

    SELECT deletebom(getItemId(OLD.item_number));

END;