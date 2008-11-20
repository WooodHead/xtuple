BEGIN;

CREATE OR REPLACE VIEW api.creditmemoline AS
  SELECT cmhead_number AS memo_number,
         cmitem_linenumber AS line_number,
         item_number AS item_number,
         warehous_code AS recv_site,
         rsncode_code AS reason_code,
         cmitem_qtyreturned AS qty_returned,
         cmitem_qtycredit AS qty_to_credit,
         COALESCE(qty_uom.uom_name, 'None') AS qty_uom,
         cmitem_unitprice AS net_unit_price,
         COALESCE(price_uom.uom_name, 'None') AS price_uom,
         COALESCE(taxtype_name, 'None') AS tax_type,
         COALESCE(tax_code, 'None') AS tax_code,
         cmitem_tax_ratea AS tax_amount_a,
         cmitem_tax_rateb AS tax_amount_b,
         cmitem_tax_ratec AS tax_amount_c,
         cmitem_comments AS notes
  FROM cmitem LEFT OUTER JOIN cmhead ON (cmitem_cmhead_id=cmhead_id)
              LEFT OUTER JOIN itemsite ON (itemsite_id=cmitem_itemsite_id)
              LEFT OUTER JOIN item ON (item_id=itemsite_item_id)
              LEFT OUTER JOIN whsinfo ON (warehous_id=itemsite_warehous_id)
              LEFT OUTER JOIN rsncode ON (rsncode_id=cmitem_rsncode_id)
              LEFT OUTER JOIN taxtype ON (taxtype_id=cmitem_taxtype_id)
              LEFT OUTER JOIN tax ON (tax_id=cmitem_tax_id)
              LEFT OUTER JOIN uom AS qty_uom ON (qty_uom.uom_id=cmitem_qty_uom_id)
              LEFT OUTER JOIN uom AS price_uom ON (price_uom.uom_id=cmitem_price_uom_id);
	
GRANT ALL ON TABLE api.creditmemoline TO openmfg;
COMMENT ON VIEW api.creditmemoline IS 'Credit Memo Line';


CREATE OR REPLACE FUNCTION insertcreditmemoline(api.creditmemoline) RETURNS boolean AS
$insertcreditmemoline$
DECLARE
  pNew ALIAS FOR $1;
  _check INTEGER;
  _r RECORD;

BEGIN
  SELECT cmhead_id INTO _check
  FROM cmhead
  WHERE (cmhead_id=getCmheadId(pNew.memo_number, FALSE));
  IF (NOT FOUND) THEN
    RAISE EXCEPTION 'Credit Memo # % not found', pNew.memo_number;
  END IF;

  INSERT INTO cmitem ( cmitem_cmhead_id,
                       cmitem_linenumber,
                       cmitem_itemsite_id,
                       cmitem_qtycredit,
                       cmitem_qtyreturned,
                       cmitem_unitprice,
                       cmitem_comments,
                       cmitem_rsncode_id,
                       cmitem_tax_id,
                       cmitem_taxtype_id,
                       cmitem_tax_pcta,
                       cmitem_tax_pctb,
                       cmitem_tax_pctc,
                       cmitem_tax_ratea,
                       cmitem_tax_rateb,
                       cmitem_tax_ratec,
                       cmitem_qty_uom_id,
                       cmitem_qty_invuomratio,
                       cmitem_price_uom_id,
                       cmitem_price_invuomratio	)
  SELECT cmhead_id,
         COALESCE(pNew.line_number,
                  (SELECT (COALESCE(MAX(cmitem_linenumber), 0) + 1)
                   FROM cmitem WHERE (cmitem_cmhead_id=cmhead_id))),
         COALESCE(itemsite_id, -1),
         COALESCE(pNew.qty_to_credit, 0),
         COALESCE(pNew.qty_returned, 0),
         COALESCE(pNew.net_unit_price, 0),
         pNew.notes,
         getRsnId(pNew.reason_code),
         tax_id,
         taxtype_id,
         COALESCE(tax_ratea, 0),
         COALESCE(tax_rateb, 0),
         COALESCE(tax_ratec, 0),
         COALESCE(pNew.tax_amount_a,
                  (tax_ratea * COALESCE(pNew.net_unit_price,
                                        itemPrice(item_id,cmhead_cust_id,cmhead_shipto_id,pNew.qty_to_credit,cmhead_curr_id,cmhead_docdate))), 0),
         COALESCE(pNew.tax_amount_b,
                  (tax_rateb * COALESCE(pNew.net_unit_price,
                                        itemPrice(item_id,cmhead_cust_id,cmhead_shipto_id,pNew.qty_to_credit,cmhead_curr_id,cmhead_docdate))), 0),
         COALESCE(pNew.tax_amount_c,
                  (tax_ratec * COALESCE(pNew.net_unit_price,
                                        itemPrice(item_id,cmhead_cust_id,cmhead_shipto_id,pNew.qty_to_credit,cmhead_curr_id,cmhead_docdate))), 0),
         COALESCE(getUomId(pNew.qty_uom), item_inv_uom_id),
         CASE
           WHEN item_id IS NOT NULL THEN itemuomtouomratio(item_id, COALESCE(getUomId(pNew.qty_uom),item_inv_uom_id),item_inv_uom_id)
           ELSE 1
         END,
         COALESCE(getUomId(pNew.price_uom),item_price_uom_id),
         CASE
           WHEN item_id IS NOT NULL THEN itemuomtouomratio(item_id, COALESCE(getUomId(pNew.price_uom),item_price_uom_id),item_price_uom_id)
           ELSE 1
        END
  FROM cmhead LEFT OUTER JOIN item ON (item_id=getItemId(pNew.item_number))
              LEFT OUTER JOIN itemsite ON (itemsite_item_id=item_id AND itemsite_warehous_id=getWarehousId(pNew.recv_site, 'ALL'))
              LEFT OUTER JOIN taxtype ON (taxtype_id=CASE WHEN pNew.tax_type IS NULL THEN getItemTaxType(item_id,cmhead_taxauth_id)
                                                          WHEN pNew.tax_type = 'None' THEN NULL
                                                          ELSE getTaxTypeId(pNew.tax_type)
                                                     END)
              LEFT OUTER JOIN tax ON (tax_id=CASE WHEN pNew.tax_code IS NULL THEN getTaxSelection(cmhead_taxauth_id,getItemTaxType(item_id,cmhead_taxauth_id))
                                                  WHEN pNew.tax_code = 'None' THEN NULL
                                                  ELSE getTaxId(pNew.tax_code)
                                             END)
  WHERE (cmhead_id=getCmheadId(pNew.memo_number, FALSE));

  RETURN TRUE;
END;
$insertcreditmemoline$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION updatecreditmemoline(api.creditmemoline, api.creditmemoline) RETURNS boolean AS
$updatecreditmemoline$
DECLARE
  pNew ALIAS FOR $1;
  pOld ALIAS FOR $2;
  _check INTEGER;
  _r RECORD;

BEGIN
  SELECT cmitem_id INTO _check
  FROM cmitem
  WHERE ( (cmitem_cmhead_id=getCmheadId(pOld.memo_number, FALSE)) AND (cmitem_linenumber=pOld.line_number) );
  IF (NOT FOUND) THEN
    RAISE EXCEPTION 'Credit Memo # % Line Number # not found', pOld.memo_number, pOld.line_number;
  END IF;

  UPDATE cmitem
    SET cmitem_itemsite_id=COALESCE(itemsite_id, -1),
        cmitem_qtycredit=pNew.qty_to_credit,
        cmitem_qtyreturned=pNew.qty_returned,
        cmitem_unitprice=pNew.net_unit_price,
        cmitem_comments=pNew.notes,
        cmitem_rsncode_id=getRsnId(pNew.reason_code),
        cmitem_tax_id=tax_id,
        cmitem_taxtype_id=taxtype_id,
        cmitem_tax_pcta=tax_ratea,
        cmitem_tax_pctb=tax_rateb,
        cmitem_tax_pctc=tax_ratec,
        cmitem_tax_ratea=COALESCE(pNew.tax_amount_a,
                                  (tax_ratea * COALESCE(pNew.net_unit_price,
                                                        itemPrice(item_id,cmhead_cust_id,cmhead_shipto_id,pNew.qty_to_credit,cmhead_curr_id,cmhead_docdate))), 0),
        cmitem_tax_rateb=COALESCE(pNew.tax_amount_b, 
                                  (tax_rateb * COALESCE(pNew.net_unit_price,
                                                        itemPrice(item_id,cmhead_cust_id,cmhead_shipto_id,pNew.qty_to_credit,cmhead_curr_id,cmhead_docdate))), 0),
        cmitem_tax_ratec=COALESCE(pNew.tax_amount_c,
                                  (tax_ratec * COALESCE(pNew.net_unit_price,
                                                        itemPrice(item_id,cmhead_cust_id,cmhead_shipto_id,pNew.qty_to_credit,cmhead_curr_id,cmhead_docdate))), 0),
        cmitem_qty_uom_id=COALESCE(getUomId(pNew.qty_uom), item_inv_uom_id),
        cmitem_qty_invuomratio=CASE WHEN item_id IS NOT NULL THEN itemuomtouomratio(item_id, COALESCE(getUomId(pNew.qty_uom),item_inv_uom_id),item_inv_uom_id)
                                    ELSE 1
                               END,
        cmitem_price_uom_id=COALESCE(getUomId(pNew.price_uom),item_price_uom_id),
        cmitem_price_invuomratio=CASE WHEN item_id IS NOT NULL THEN itemuomtouomratio(item_id, COALESCE(getUomId(pNew.price_uom),item_price_uom_id),item_price_uom_id)
                                      ELSE 1
                                 END
  FROM cmhead LEFT OUTER JOIN item ON (item_id=getItemId(pNew.item_number))
              LEFT OUTER JOIN itemsite ON (itemsite_item_id=item_id AND
                                           itemsite_warehous_id=getWarehousId(pNew.recv_site, 'ALL'))
              LEFT OUTER JOIN taxtype ON (taxtype_id=CASE WHEN pNew.tax_type IS NULL THEN getItemTaxType(item_id,cmhead_taxauth_id)
                                                          WHEN pNew.tax_type = 'None' THEN NULL
                                                          ELSE getTaxTypeId(pNew.tax_type)
                                                     END)
              LEFT OUTER JOIN tax ON (tax_id=CASE WHEN pNew.tax_code IS NULL THEN getTaxSelection(cmhead_taxauth_id,getItemTaxType(item_id,cmhead_taxauth_id))
                                                  WHEN pNew.tax_code = 'None' THEN NULL
                                                  ELSE getTaxId(pNew.tax_code)
                                             END)
  WHERE cmitem_cmhead_id=cmhead_id
    AND cmhead_number=pOld.memo_number
    AND cmitem_linenumber=pOld.line_number
    AND cmhead_posted=FALSE;

  RETURN TRUE;
END;
$updatecreditmemoline$ LANGUAGE 'plpgsql';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
  ON INSERT TO api.creditmemoline DO INSTEAD
    SELECT insertcreditmemoline(NEW);


CREATE OR REPLACE RULE "_UPDATE" AS 
  ON UPDATE TO api.creditmemoline DO INSTEAD
    SELECT updatecreditmemoline(NEW, OLD);


CREATE OR REPLACE RULE "_DELETE" AS 
  ON DELETE TO api.creditmemoline DO INSTEAD
    DELETE FROM cmitem
    WHERE ( (cmitem_cmhead_id=getCmheadId(OLD.memo_number, FALSE))
      AND   (cmitem_linenumber = OLD.line_number) );

COMMIT;

