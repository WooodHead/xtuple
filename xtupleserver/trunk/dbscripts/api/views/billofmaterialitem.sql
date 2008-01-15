BEGIN;

  --Bill of Material Item View

  DROP VIEW api.billofmaterialitem;
  CREATE OR REPLACE VIEW api.billofmaterialitem AS

  SELECT
    p.item_number AS bom_item_number,
    bomhead_revision AS revision,
    bomitem_seqnumber AS sequence_number,
    i.item_number AS item_number,
    CASE WHEN
      bomitem_effective = startoftime() THEN
        'Always'
      ELSE
        formatdate(bomitem_effective)
    END AS effective,
    CASE WHEN
      bomitem_expires = endoftime() THEN
        'Never'
      ELSE
        formatdate(bomitem_expires)
    END AS expires,
    bomitem_qtyper AS qty_per,
    uom_name AS issue_uom,
    bomitem_scrap AS scrap,
    bomitem_createwo AS create_child_wo,
    CASE
      WHEN bomitem_issuemethod = 'M' THEN
        'Mixed'
      WHEN bomitem_issuemethod = 'L' THEN
        'Pull'
      WHEN bomitem_issuemethod = 'S' THEN
        'Push'
    END AS issue_method,
    formatBooSeq(p.item_id,bomitem_booitem_seq_id) AS used_at,
    bomitem_schedatwooper AS schedule_at_wo_operation,
    bomitem_ecn AS ecn_number,
    CASE
      WHEN bomitem_subtype = 'N' THEN
        'No'
      WHEN bomitem_subtype = 'I' THEN
        'Item-Defined'
      WHEN bomitem_subtype = 'B' THEN
        'BOM-Defined'
    END AS substitutions
  FROM
    bomitem
      LEFT OUTER JOIN bomhead ON ((bomitem_parent_item_id=bomhead_item_id)
                              AND (bomitem_rev_id=bomhead_rev_id)), 
    item p, item i, uom
  WHERE ((bomitem_parent_item_id=p.item_id)
  AND (bomitem_item_id=i.item_id)
  AND (bomitem_uom_id=uom_id));

GRANT ALL ON TABLE api.billofmaterialitem TO openmfg;
COMMENT ON VIEW api.billofmaterialitem IS 'Bill of Material Item';

  --Rules

  CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.billofmaterialitem DO INSTEAD

    SELECT createBOMItem( NEXTVAL('bomitem_bomitem_id_seq')::integer, 
                          getItemId(NEW.bom_item_number), 
                          getItemId(NEW.item_number),
                          COALESCE(NEW.sequence_number,(
                            SELECT MAX(bomitem_seqnumber) + 10
                            FROM bomitem(getItemId(NEW.bom_item_number),
                                         getRevId(NEW.bom_item_number,NEW.revision,'BOM')))),
                          CASE
                            WHEN NEW.issue_method = 'Mixed' THEN
                              'M'
                            WHEN NEW.issue_method = 'Push' THEN
                              'S'
                            WHEN NEW.issue_method = 'Pull' THEN
                              'L'
                          END,
                          getUomId(NEW.issue_uom), 
                          NEW.qty_per, 
                          NEW.scrap,
                          NULL, 
                          NULL, 
                          NULL,
                          NEW.effective::date, 
                          NEW.expires::date,
                          COALESCE(NEW.create_child_wo,FALSE),
                          getBooitemSeqId(NEW.bom_item_number,NEW.revision,NEW.used_at)::integer,
                          COALESCE(NEW.schedule_at_wo_operation,FALSE),
                          NEW.ecn_number,
                          CASE
                            WHEN NEW.substitutions = 'No' THEN
                              'N'
                            WHEN NEW.substitutions = 'Item-Defined' THEN
                              'I'
                            WHEN NEW.substitutions = 'BOM-Defined' THEN
                              'B'
                          END,
                          getRevId(NEW.bom_item_number,NEW.revision,'BOM'));
 
    CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.billofmaterialitem DO INSTEAD

    UPDATE bomitem SET
      bomitem_issuemethod=
      CASE
        WHEN NEW.issue_method = 'Mixed' THEN
                              'M'
        WHEN NEW.issue_method = 'Push' THEN
                              'S'
        WHEN NEW.issue_method = 'Pull' THEN
                              'L'
      END,
      bomitem_uom_id=getUomId(NEW.issue_uom), 
      bomitem_qtyper=NEW.qty_per, 
      bomitem_scrap=NEW.scrap,
      bomitem_effective=NEW.effective::date, 
      bomitem_expires=NEW.expires::date,
      bomitem_createwo=NEW.create_child_wo,
      bomitem_booitem_seq_id=getBooitemSeqId(NEW.bom_item_number,NEW.revision,NEW.used_at),
      bomitem_schedatwooper=NEW.schedule_at_wo_operation,
      bomitem_ecn=NEW.ecn_number,
      bomitem_subtype=
      CASE
        WHEN NEW.substitutions = 'No' THEN
          'N'
        WHEN NEW.substitutions = 'Item-Defined' THEN
          'I'
        WHEN NEW.substitutions = 'BOM-Defined' THEN
          'B'
      END,
      bomitem_rev_id=getRevId(NEW.bom_item_number,NEW.revision,'BOM')
      WHERE ((bomitem_parent_item_id=getItemId(OLD.bom_item_number))
      AND (bomitem_rev_id=getRevId(OLD.bom_item_number,OLD.revision,'BOM'))
      AND (bomitem_seqnumber=OLD.sequence_number));

    CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.billofmaterialitem DO INSTEAD

    DELETE FROM bomitem
    WHERE ((bomitem_parent_item_id=getItemId(OLD.bom_item_number))
    AND (bomitem_rev_id=getRevId(OLD.bom_item_number,OLD.revision,'BOM'))
    AND (bomitem_seqnumber=OLD.sequence_number));

END;