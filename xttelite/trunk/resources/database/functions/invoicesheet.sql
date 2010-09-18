CREATE OR REPLACE FUNCTION te.invoicesheet(integer) RETURNS integer AS $$
DECLARE
pHeadID ALIAS FOR $1;

_invcnum text;
_invcheadid integer;
_s record;
_t record;
_linenum text;
_item text;

BEGIN

        -- note that we are putting a very basic workflow in place here
        --  A is approved...if further approval is needed (mgr, etc) then the status should goto P
       FOR _s in SELECT * FROM (
       SELECT DISTINCT tehead_id, tehead_number, tehead_weekending,
                       cust_id, teitem_po, prj_id
       FROM te.tehead JOIN te.teitem ON (teitem_tehead_id=tehead_id AND teitem_billable)
                      JOIN custinfo ON (cust_id=teitem_cust_id)
                      JOIN prj ON (prj_id=teitem_prj_id)
       WHERE tehead_id = pHeadID
       ) foo

       -- loop thru records and create invoices by customer, by PO for the provided headid
       LOOP
         --select nextval('invchead_invchead_id_seq') into _invcid;
         _invcnum := CAST(fetchInvcNumber() AS TEXT);
         _invcheadid := nextval('invchead_invchead_id_seq');

         INSERT INTO invchead
         SELECT _invcheadid, cust_id, -1, '', current_date, false, false, _invcnum,
           current_date, current_date, _s.teitem_po, '', '', cust_name, COALESCE(addr_line1,''),
           COALESCE(addr_line2,''), COALESCE(addr_line3,''), COALESCE(addr_city,''),
           COALESCE(addr_state,''), COALESCE(addr_postalcode,''), cntct_phone, 
           '', '', '', '', '', '', '', '', cust_salesrep_id, salesrep_commission, cust_terms_id,
           0, 0, '', -1, 0, '', '', addr_country, '', _s.teitem_prj_id, cust_
           
         FROM custinfo
           JOIN salesrep ON (cust_salesrep_id=salesrep_id)
           LEFT OUTER JOIN cntct ON (cust_cntct_id=cntct_id)
           LEFT OUTER JOIN addr ON (cntct_addr_id=addr_id)
         WHERE (cust_id=_s.cust_id);
         
         INSERT INTO api.invoice(invoice_number,invoice_date, ship_date, order_date, 
         customer_number, po_number, project_number)
         values (_invcnum,CURRENT_DATE,CURRENT_DATE,CURRENT_DATE,_s.cust_number,_s.teitem_po,_s.prj_number );

          -- loop thru all lines of the sheet
          for _t in select * from (
             select teitem_id,teitem_linenumber, tehead_site as site,teitem_type,teitem_emp_id,uom_name as uom,item_number,teitem_cust_id,teitem_po,teitem_item_id,teitem_qty as qty,teitem_rate as rate,teitem_prj_id, teitem_notes as notes
             from te.teitem, item, te.tehead, uom
             where item_id = teitem_item_id
             and teitem_uom_id = uom_id
             and teitem_tehead_id = tehead_id 
             and teitem_tehead_id = pHeadID 
             and teitem_billable = true 
             and teitem_type = 'E'
             and teitem_cust_id = _s.cust_id
             and teitem_po = _s.teitem_po
             and teitem_prj_id = _s.prj_id
             or teitem_tehead_id = pHeadID 
             and teitem_tehead_id = tehead_id
             and item_id = teitem_item_id
             and teitem_uom_id = uom_id
	     and teitem_billable = true 
             and teitem_type = 'T' 
             and item_id = teitem_item_id
             and teitem_cust_id = _s.cust_id
             and teitem_po = _s.teitem_po
             and teitem_prj_id = _s.prj_id
             order by teitem_linenumber
          ) foo

          LOOP
            --raise notice 'line %',_t.teitem_linenumber;

            insert into api.invoiceline(invoice_number, line_number, item_number, site, 
            qty_ordered, qty_billed, net_unit_price, qty_uom, price_uom, 
            notes)
            values(_invcnum,_t.teitem_linenumber,_t.item_number,_t.site,_t.qty,_t.qty,_t.rate,_t.uom,_t.uom,_t.notes);       

            -- update the te.teitem record with the invoice id AND C status
            update te.teitem set teitem_invchead_id = getinvcheadid(_invcnum), teitem_billable_status = 'C' where teitem_id = _t.teitem_id;
            
          END LOOP;
       END LOOP;

RETURN 1;
END;
$$ LANGUAGE 'plpgsql';
