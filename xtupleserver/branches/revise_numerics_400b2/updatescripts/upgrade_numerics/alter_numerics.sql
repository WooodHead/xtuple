ALTER TABLE te.teitem ALTER teitem_prjtask_id TYPE INTEGER;
ALTER TABLE te.teitem ADD FOREIGN KEY (teitem_prjtask_id) REFERENCES prjtask(prjtask_id);

/*
0  -- no references found
0  ALTER TABLE public.invcnt        ALTER invcnt_matcost               TYPE xcost;
0  ALTER TABLE xtpos.saleitem       ALTER saleitem_tax_pcta            TYPE 
0                                   ALTER saleitem_tax_pctb            TYPE 
0                                   ALTER saleitem_tax_pctc            TYPE 
0  ALTER TABLE xtmfg.wrkcnt         ALTER wrkcnt_usage_ptd             TYPE
0                                   ALTER wrkcnt_usage_ptd_next        TYPE
0                                   ALTER wrkcnt_usage_ytd             TYPE
0                                   ALTER wrkcnt_usage_ytd_last        TYPE

1  -- initialized but no references found to modification
1  ALTER TABLE public.womatl        ALTER womatl_cost                  TYPE xcost;

2  -- don't know what to do with these, if anything
2  ALTER TABLE xtmfg.bufrsts        ALTER bufrsts_size                 TYPE NUMERIC;
2  ALTER TABLE xtmfg.planoper       ALTER planoper_rntime              TYPE NUMERIC,
2                                   ALTER planoper_sutime              TYPE NUMERIC;
2  ALTER TABLE xtmfg.stdopn         ALTER stdopn_rntime                TYPE NUMERIC,
2                                   ALTER stdopn_sutime                TYPE NUMERIC;
2  ALTER TABLE xtmfg.wooper         ALTER wooper_rnconsumed            TYPE NUMERIC,
2                                   ALTER wooper_rntime                TYPE NUMERIC,
2                                   ALTER wooper_suconsumed            TYPE NUMERIC,
2                                   ALTER wooper_sutime                TYPE NUMERIC;
2  ALTER TABLE xtmfg.wooperpost     ALTER wooperpost_rntime            TYPE NUMERIC,
2                                   ALTER wooperpost_sutime            TYPE NUMERIC;
2  ALTER TABLE xtmfg.woopervar      ALTER woopervar_rntime             TYPE NUMERIC,
2                                   ALTER woopervar_stdrntime          TYPE NUMERIC,
2                                   ALTER woopervar_stdsutime          TYPE NUMERIC,
2                                   ALTER woopervar_sutime             TYPE NUMERIC;
2  ALTER TABLE xtmfg.wrkcnt         ALTER wrkcnt_avgsutime             TYPE NUMERIC,
2                                   ALTER wrkcnt_dailycap              TYPE NUMERIC;
*/

ALTER TABLE public.apapply        ALTER apapply_amount             TYPE xmoney,
                                  ALTER apapply_target_paid        TYPE xmoney;
ALTER TABLE public.apcreditapply  ALTER apcreditapply_amount       TYPE xmoney;
ALTER TABLE public.apopen ALTER apopen_discountable_amount DROP DEFAULT,
                          ALTER apopen_paid                DROP DEFAULT,
                          ALTER apopen_amount              TYPE xmoney,
                          ALTER apopen_curr_rate           TYPE NUMERIC,
                          ALTER apopen_discountable_amount TYPE xmoney,
                          ALTER apopen_discountable_amount SET DEFAULT xmoney(0),
                          ALTER apopen_paid                TYPE xmoney,
                          ALTER apopen_paid                SET DEFAULT xmoney(0);
ALTER TABLE public.apselect      ALTER apselect_amount       TYPE xmoney,
                                 ALTER apselect_discount     TYPE xmoney;
ALTER TABLE public.arapply       ALTER arapply_applied       TYPE xmoney,
                                 ALTER arapply_target_paid   TYPE xmoney;
ALTER TABLE public.arcreditapply ALTER arcreditapply_amount  TYPE xmoney;
ALTER TABLE public.aropen       ALTER aropen_paid           DROP DEFAULT,
                                ALTER aropen_amount         TYPE xmoney,
                                ALTER aropen_commission_due TYPE xmoney,
                                ALTER aropen_curr_rate      TYPE NUMERIC,
                                ALTER aropen_paid           TYPE xmoney,
                                ALTER aropen_paid           SET DEFAULT xmoney(0);
ALTER TABLE public.aropenalloc  ALTER aropenalloc_amount    DROP DEFAULT,
                                ALTER aropenalloc_amount    TYPE xmoney,
                                ALTER aropenalloc_amount    SET DEFAULT xmoney(0);
ALTER TABLE public.asohist      ALTER asohist_commission     TYPE xmoney,
                                ALTER asohist_qtyshipped     TYPE xqty,
                                ALTER asohist_unitcost       TYPE xpurchp,
                                ALTER asohist_unitprice      TYPE xpurchp;
ALTER TABLE public.bankadj      ALTER bankadj_amount         TYPE xmoney,
                                ALTER bankadj_curr_rate      TYPE NUMERIC;
ALTER TABLE public.bankrec      ALTER bankrec_endbal         TYPE xmoney,
                                ALTER bankrec_openbal        TYPE xmoney;
ALTER TABLE public.bankrecitem  ALTER bankrecitem_amount     TYPE xmoney,
                                ALTER bankrecitem_curr_rate  TYPE NUMERIC;
ALTER TABLE xtmfg.bbomitem      ALTER bbomitem_costabsorb    TYPE xpercent;
ALTER TABLE public.bomhead      ALTER bomhead_batchsize      TYPE xqty,
                                ALTER bomhead_requiredqtyper TYPE xqtyper;
ALTER TABLE public.bomhist      ALTER bomhist_actunitcost    TYPE xcost,
                                ALTER bomhist_qtyfxd         TYPE xqty,
                                ALTER bomhist_qtyper         TYPE xqtyper,
                                ALTER bomhist_qtyreq         TYPE xqty,
                                ALTER bomhist_scrap          TYPE xpercent,
                                ALTER bomhist_stdunitcost    TYPE xcost;
ALTER TABLE public.bomitem      ALTER bomitem_qtyfxd         TYPE xqty,
                                ALTER bomitem_qtyper         TYPE xqtyper,
                                ALTER bomitem_scrap          TYPE xpercent;
ALTER TABLE public.bomitemcost  ALTER bomitemcost_actcost DROP DEFAULT,
                                ALTER bomitemcost_stdcost DROP DEFAULT,
                                ALTER bomitemcost_actcost TYPE xcost,
                                ALTER bomitemcost_stdcost TYPE xcost,
                                ALTER bomitemcost_actcost SET DEFAULT xcost(0),
                                ALTER bomitemcost_stdcost SET DEFAULT xcost(0);
ALTER TABLE public.bomitemsub   ALTER bomitemsub_uomratio TYPE xuomratio;
ALTER TABLE public.bomwork      ALTER bomwork_actunitcost TYPE xcost,
                                ALTER bomwork_qtyfxd      TYPE xqty,
                                ALTER bomwork_qtyper      TYPE xqtyper,
                                ALTER bomwork_qtyreq      TYPE xqty,
                                ALTER bomwork_scrap       TYPE xpercent,
                                ALTER bomwork_stdunitcost TYPE xcost;
ALTER TABLE xtmfg.booitem       ALTER booitem_invproduomratio TYPE xuomratio,
                                ALTER booitem_rnqtyper        TYPE xqtyper,
                                ALTER booitem_rntime          TYPE xqty,
                                ALTER booitem_sutime          TYPE xqty;
ALTER TABLE xtmfg.brddist       ALTER brddist_qty             TYPE xqty,
                                ALTER brddist_stdqtyper       TYPE xqtyper,
                                ALTER brddist_wo_qty          TYPE xqty;
ALTER TABLE xtmfg.brdvar        ALTER brdvar_actqtyper        TYPE xqtyper,
                                ALTER brdvar_stdqtyper        TYPE xqtyper,
                                ALTER brdvar_wo_qty           TYPE xqty;
ALTER TABLE public.budgitem     ALTER budgitem_amount     TYPE xmoney;
ALTER TABLE public.cashrcpt     ALTER cashrcpt_discount   DROP DEFAULT,
                                ALTER cashrcpt_amount     TYPE xmoney,
                                ALTER cashrcpt_curr_rate  TYPE NUMERIC,
                                ALTER cashrcpt_discount   TYPE xmoney,
                                ALTER cashrcpt_discount   SET DEFAULT xmoney(0);
ALTER TABLE public.cashrcptitem ALTER cashrcptitem_discount DROP DEFAULT,
                                ALTER cashrcptitem_amount   TYPE xmoney,
                                ALTER cashrcptitem_discount TYPE xmoney,
                                ALTER cashrcptitem_discount SET DEFAULT xmoney(0);
ALTER TABLE public.cashrcptmisc ALTER cashrcptmisc_amount   TYPE xmoney;
ALTER TABLE public.ccpay        ALTER ccpay_amount        DROP DEFAULT,
                                ALTER ccpay_amount        TYPE xmoney,
                                ALTER ccpay_amount        SET DEFAULT xmoney(0);
ALTER TABLE public.charass      ALTER charass_price       DROP DEFAULT,
                                ALTER charass_price       TYPE xsalep,
                                ALTER charass_price       SET DEFAULT xsalep(0);

ALTER TABLE public.checkhead DROP CONSTRAINT checkhead_checkhead_amount_check;
ALTER TABLE public.checkhead ALTER checkhead_amount             TYPE xmoney,
                             ALTER checkhead_curr_rate          TYPE NUMERIC;
ALTER TABLE public.checkhead ADD CHECK(checkhead_amount > xmoney(0));

ALTER TABLE public.checkitem ALTER checkitem_amount    DROP DEFAULT,
                             ALTER checkitem_discount  DROP DEFAULT,
                             ALTER checkitem_amount    TYPE xmoney,
                             ALTER checkitem_curr_rate TYPE NUMERIC,
                             ALTER checkitem_discount  TYPE xmoney,
                             ALTER checkitem_amount    SET DEFAULT xmoney(0),
                             ALTER checkitem_discount  SET DEFAULT xmoney(0);
ALTER TABLE public.cmhead    ALTER cmhead_commission   TYPE xpercent,
                             ALTER cmhead_freight      TYPE xmoney,
                             ALTER cmhead_misc         TYPE xmoney;
ALTER TABLE public.cmitem    ALTER cmitem_price_invuomratio     TYPE xuomratio,
                             ALTER cmitem_qty_invuomratio       TYPE xuomratio,
                             ALTER cmitem_qtycredit             TYPE xqty,
                             ALTER cmitem_qtyreturned           TYPE xqty,
                             ALTER cmitem_unitprice             TYPE xsalep;
ALTER TABLE public.cntslip   ALTER cntslip_qty                  TYPE xqty;
ALTER TABLE public.cobill    ALTER cobill_qty                   TYPE xqty;
ALTER TABLE public.cobmisc   ALTER cobmisc_freight              TYPE xmoney,
                             ALTER cobmisc_misc                 TYPE xmoney,
                             ALTER cobmisc_payment              TYPE xmoney;

ALTER TABLE public.cohead DROP CONSTRAINT cohead_check;
ALTER TABLE public.cohead ALTER cohead_misc         DROP DEFAULT,
                          ALTER cohead_commission   TYPE xpercent,
                          ALTER cohead_freight      TYPE xmoney,
                          ALTER cohead_misc         TYPE xmoney,
                          ALTER cohead_misc         SET DEFAULT xmoney(0);
ALTER TABLE public.cohead ADD CHECK(cohead_misc = xmoney(0)
              OR (cohead_misc <> xmoney(0) AND cohead_misc_accnt_id IS NOT NULL));

ALTER TABLE public.cohist ALTER cohist_commission            TYPE xmoney,
                          ALTER cohist_qtyshipped            TYPE xqty,
                          ALTER cohist_unitcost              TYPE xsalep,
                          ALTER cohist_unitprice             TYPE xsalep;
ALTER TABLE public.coitem ALTER coitem_custprice             TYPE xsalep,
                          ALTER coitem_prcost                TYPE xcost,
                          ALTER coitem_price                 TYPE xsalep,
                          ALTER coitem_price_invuomratio     TYPE xuomratio,
                          ALTER coitem_qty_invuomratio       TYPE xuomratio,
                          ALTER coitem_qtyord                TYPE xqty,
                          ALTER coitem_qtyreserved           TYPE xqty,
                          ALTER coitem_qtyreturned           TYPE xqty,
                          ALTER coitem_qtyshipped            TYPE xqty,
                          ALTER coitem_unitcost              TYPE xcost;
ALTER TABLE public.costhist       ALTER costhist_newcost             TYPE xcost,
                                  ALTER costhist_oldcost             TYPE xcost;
ALTER TABLE public.curr_rate      ALTER curr_rate                    TYPE NUMERIC;
ALTER TABLE public.custinfo       ALTER cust_commprcnt               TYPE xpercent,
                                  ALTER cust_discntprcnt             TYPE xpercent;

ALTER TABLE public.emp DROP CONSTRAINT emp_check;
ALTER TABLE public.emp            ALTER emp_extrate                  TYPE xmoney,
                                  ALTER emp_wage                     TYPE xmoney;
ALTER TABLE public.emp ADD CHECK(emp_wage_type IN ('', 'H', 'S') AND
                                 (COALESCE(emp_wage, xmoney(0)) = xmoney(0) OR
                                  (emp_wage_type <> '' AND emp_wage IS NOT NULL)));

ALTER TABLE public.evntlog        ALTER evntlog_newvalue             TYPE NUMERIC,
                                  ALTER evntlog_oldvalue             TYPE NUMERIC;
ALTER TABLE public.flrpt          ALTER flrpt_beginning              TYPE xmoney,
                                  ALTER flrpt_beginningprcnt         TYPE xpercent,
                                  ALTER flrpt_budget                 TYPE xmoney,
                                  ALTER flrpt_budgetprcnt            TYPE xpercent,
                                  ALTER flrpt_credits                TYPE xmoney,
                                  ALTER flrpt_creditsprcnt           TYPE xpercent,
                                  ALTER flrpt_custom                 TYPE xmoney,
                                  ALTER flrpt_customprcnt            TYPE xpercent,
                                  ALTER flrpt_debits                 TYPE xmoney,
                                  ALTER flrpt_debitsprcnt            TYPE xpercent,
                                  ALTER flrpt_diff                   TYPE xmoney,
                                  ALTER flrpt_diffprcnt              TYPE xpercent,
                                  ALTER flrpt_ending                 TYPE xmoney,
                                  ALTER flrpt_endingprcnt            TYPE xpercent;
ALTER TABLE public.glseries       ALTER glseries_amount              TYPE xmoney;
ALTER TABLE public.gltrans        ALTER gltrans_amount               TYPE xmoney;
ALTER TABLE public.gltranssync    ALTER gltranssync_curr_amount      TYPE xmoney;
ALTER TABLE public.invbal         ALTER invbal_nn_beginning          TYPE xqty,
                                  ALTER invbal_nn_ending             TYPE xqty,
                                  ALTER invbal_nn_in                 TYPE xqty,
                                  ALTER invbal_nn_out                TYPE xqty,
                                  ALTER invbal_nnval_beginning       TYPE xcost,
                                  ALTER invbal_nnval_ending          TYPE xcost,
                                  ALTER invbal_nnval_in              TYPE xcost,
                                  ALTER invbal_nnval_out             TYPE xcost,
                                  ALTER invbal_qoh_beginning         TYPE xqty,
                                  ALTER invbal_qoh_ending            TYPE xqty,
                                  ALTER invbal_qty_in                TYPE xqty,
                                  ALTER invbal_qty_out               TYPE xqty,
                                  ALTER invbal_value_beginning       TYPE xcost,
                                  ALTER invbal_value_ending          TYPE xcost,
                                  ALTER invbal_value_in              TYPE xcost,
                                  ALTER invbal_value_out             TYPE xcost;
ALTER TABLE public.invchead       ALTER invchead_commission          TYPE xpercent,
                                  ALTER invchead_freight             TYPE xmoney,
                                  ALTER invchead_misc_amount         TYPE xmoney,
                                  ALTER invchead_payment             TYPE xmoney;
ALTER TABLE public.invcitem       ALTER invcitem_billed              TYPE xqty,
                                  ALTER invcitem_custprice           TYPE xsalep,
                                  ALTER invcitem_ordered             TYPE xqty,
                                  ALTER invcitem_price               TYPE xsalep,
                                  ALTER invcitem_price_invuomratio   TYPE xuomratio,
                                  ALTER invcitem_qty_invuomratio     TYPE xuomratio;
ALTER TABLE public.invcnt         ALTER invcnt_qoh_after             TYPE xqty,
                                  ALTER invcnt_qoh_before            TYPE xqty;
ALTER TABLE public.invdetail      ALTER invdetail_qty                TYPE xqty,
                                  ALTER invdetail_qty_after          TYPE xqty,
                                  ALTER invdetail_qty_before         TYPE xqty;
ALTER TABLE public.invhist        ALTER invhist_invqty               TYPE xqty,
                                  ALTER invhist_qoh_after            TYPE xqty,
                                  ALTER invhist_qoh_before           TYPE xqty,
                                  ALTER invhist_unitcost             TYPE xcost,
                                  ALTER invhist_value_after          TYPE xmoney,
                                  ALTER invhist_value_before         TYPE xmoney;
ALTER TABLE public.ipsfreight  ALTER ipsfreight_price    DROP DEFAULT,
                               ALTER ipsfreight_price    TYPE xcost,
                               ALTER ipsfreight_qtybreak TYPE xweight,
                               ALTER ipsfreight_price    SET DEFAULT xcost(0);
ALTER TABLE public.ipsitemchar ALTER ipsitemchar_price   TYPE xsalep;
ALTER TABLE public.ipsiteminfo ALTER ipsitem_fixedamtdiscount DROP DEFAULT,
                               ALTER ipsitem_discntprcnt      TYPE xpercent,
                               ALTER ipsitem_fixedamtdiscount TYPE xmoney,
                               ALTER ipsitem_price            TYPE xsalep,
                               ALTER ipsitem_qtybreak         TYPE xqty,
                               ALTER ipsitem_fixedamtdiscount SET DEFAULT xmoney(0);
ALTER TABLE public.ipsprodcat  ALTER ipsprodcat_fixedamtdiscount DROP DEFAULT,
                               ALTER ipsprodcat_discntprcnt      TYPE xpercent,
                               ALTER ipsprodcat_fixedamtdiscount TYPE xmoney,
                               ALTER ipsprodcat_qtybreak         TYPE xqty,
                               ALTER ipsprodcat_fixedamtdiscount SET DEFAULT xmoney(0);
ALTER TABLE public.item        ALTER item_maxcost     DROP DEFAULT,
                               ALTER item_listprice   TYPE xsalep,
                               ALTER item_maxcost     TYPE xcost,
                               ALTER item_packweight  TYPE xweight,
                               ALTER item_prodweight  TYPE xweight,
                               ALTER item_maxcost     SET DEFAULT xcost(0);
ALTER TABLE public.itemcost    ALTER itemcost_actcost DROP DEFAULT,
                               ALTER itemcost_stdcost DROP DEFAULT,
                               ALTER itemcost_actcost TYPE xcost,
                               ALTER itemcost_stdcost TYPE xcost,
                               ALTER itemcost_actcost SET DEFAULT xcost(0),
                               ALTER itemcost_stdcost SET DEFAULT xcost(0);
ALTER TABLE public.itemloc     ALTER itemloc_qty                  TYPE xqty;
ALTER TABLE public.itemlocdist ALTER itemlocdist_qty              TYPE xqty;
ALTER TABLE public.itemlocrsrv ALTER itemlocrsrv_qty              TYPE xqty;
ALTER TABLE public.itemsite    ALTER itemsite_maxordqty           TYPE xqty,
                               ALTER itemsite_minordqty           TYPE xqty,
                               ALTER itemsite_multordqty          TYPE xqty,
                               ALTER itemsite_nnqoh               TYPE xqty,
                               ALTER itemsite_ordertoqty          TYPE xqty,
                               ALTER itemsite_qtyonhand           TYPE xqty,
                               ALTER itemsite_reorderlevel        TYPE xqty,
                               ALTER itemsite_safetystock         TYPE xqty,
                               ALTER itemsite_value               TYPE xcost;
ALTER TABLE xtmfg.itemsitecap  ALTER itemsitecap_efficfactor      TYPE xpercent;
ALTER TABLE public.itemsrc     ALTER itemsrc_invvendoruomratio    TYPE xuomratio,
                               ALTER itemsrc_minordqty            TYPE xqty,
                               ALTER itemsrc_multordqty           TYPE xqty;
ALTER TABLE public.itemsrcp    ALTER itemsrcp_price               TYPE xpurchp,
                               ALTER itemsrcp_qtybreak            TYPE xqty;
ALTER TABLE public.itemsub     ALTER itemsub_uomratio             TYPE xuomratio;
ALTER TABLE public.itemuomconv ALTER itemuomconv_from_value       TYPE NUMERIC,
                               ALTER itemuomconv_to_value         TYPE NUMERIC;
ALTER TABLE xtmfg.lbrrate      ALTER lbrrate_rate                 TYPE xmoney;
ALTER TABLE public.lsdetail    ALTER lsdetail_qtytoassign         TYPE xqty;
ALTER TABLE public.lsreg       ALTER lsreg_qty                    TYPE xqty;
ALTER TABLE public.mpsmrpwork  ALTER mpsmrpwork_allocations          TYPE xqty,
                               ALTER mpsmrpwork_availability         TYPE xqty,
                               ALTER mpsmrpwork_available            TYPE xqty,
                               ALTER mpsmrpwork_firmed               TYPE xqty,
                               ALTER mpsmrpwork_firmedavailability   TYPE xqty,
                               ALTER mpsmrpwork_orders               TYPE xqty,
                               ALTER mpsmrpwork_planned              TYPE xqty,
                               ALTER mpsmrpwork_plannedavailability  TYPE xqty,
                               ALTER mpsmrpwork_qoh                  TYPE xqty;
ALTER TABLE xtmfg.mrpexcp      ALTER mrpexcp_demand_qty     TYPE xqty,
                               ALTER mrpexcp_supply_qty     TYPE xqty,
                               ALTER mrpexcp_supply_suggqty TYPE xqty;
ALTER TABLE public.ophead      ALTER ophead_amount        TYPE xmoney;
ALTER TABLE public.payaropen   ALTER payaropen_amount     DROP DEFAULT,
                               ALTER payaropen_amount     TYPE xmoney,
                               ALTER payaropen_amount     SET DEFAULT xmoney(0);
ALTER TABLE public.payco       ALTER payco_amount         DROP DEFAULT,
                               ALTER payco_amount         TYPE xmoney,
                               ALTER payco_amount         SET DEFAULT xmoney(0);
ALTER TABLE public.planord ALTER planord_qty              TYPE xqty;
ALTER TABLE public.planreq ALTER planreq_qty              TYPE xqty;
ALTER TABLE public.pohead  ALTER pohead_freight           DROP DEFAULT,
                           ALTER pohead_freight           TYPE xmoney,
                           ALTER pohead_freight           SET DEFAULT xmoney(0);
ALTER TABLE public.poitem  ALTER poitem_freight           DROP DEFAULT,
                           ALTER poitem_freight_received  DROP DEFAULT,
                           ALTER poitem_freight_vouchered DROP DEFAULT,
                           ALTER poitem_freight           TYPE xmoney,
                           ALTER poitem_freight_received  TYPE xmoney,
                           ALTER poitem_freight_vouchered TYPE xmoney,
                           ALTER poitem_invvenduomratio   TYPE xuomratio,
                           ALTER poitem_qty_ordered       TYPE xqty,
                           ALTER poitem_qty_received      TYPE xqty,
                           ALTER poitem_qty_returned      TYPE xqty,
                           ALTER poitem_qty_toreceive     TYPE xqty,
                           ALTER poitem_qty_vouchered     TYPE xqty,
                           ALTER poitem_stdcost           TYPE xcost,
                           ALTER poitem_unitprice         TYPE xpurchp,
                           ALTER poitem_freight           SET DEFAULT xmoney(0),
                           ALTER poitem_freight_received  SET DEFAULT xmoney(0),
                           ALTER poitem_freight_vouchered SET DEFAULT xmoney(0);
ALTER TABLE public.poreject    ALTER poreject_qty                 TYPE xqty,
                               ALTER poreject_value               TYPE xmoney;
ALTER TABLE public.pr          ALTER pr_qtyreq                    TYPE xqty;
ALTER TABLE public.prjtask     ALTER prjtask_exp_actual           TYPE xcost,
                               ALTER prjtask_exp_budget           TYPE xcost,
                               ALTER prjtask_hours_actual         TYPE xqty,
                               ALTER prjtask_hours_budget         TYPE xqty;
ALTER TABLE xtmfg.pschitem     ALTER pschitem_qty                 TYPE xqty;


ALTER TABLE public.quhead DROP CONSTRAINT quhead_check;
ALTER TABLE public.quhead ALTER quhead_misc       DROP DEFAULT,
                          ALTER quhead_commission TYPE xpercent,
                          ALTER quhead_freight    TYPE xmoney,
                          ALTER quhead_misc       TYPE xmoney,
                          ALTER quhead_misc       SET DEFAULT xmoney(0);
ALTER TABLE public.quhead ADD CHECK((quhead_misc = xmoney(0) AND quhead_misc_accnt_id IS NULL)
                           OR (quhead_misc <> xmoney(0) AND quhead_misc_accnt_id IS NOT NULL));

ALTER TABLE public.quitem   ALTER quitem_custprice         TYPE xsalep,
                            ALTER quitem_prcost            TYPE xcost,
                            ALTER quitem_price             TYPE xsalep,
                            ALTER quitem_price_invuomratio TYPE xuomratio,
                            ALTER quitem_qty_invuomratio   TYPE xuomratio,
                            ALTER quitem_qtyord            TYPE xqty,
                            ALTER quitem_unitcost          TYPE xcost;
ALTER TABLE public.rahead   ALTER rahead_commission        TYPE xpercent,
                            ALTER rahead_freight           TYPE xmoney,
                            ALTER rahead_misc              TYPE xmoney;
ALTER TABLE public.rahist   ALTER rahist_amount            TYPE xmoney,
                            ALTER rahist_qty               TYPE xqty;
ALTER TABLE public.raitem   ALTER raitem_amtcredited       DROP DEFAULT,
                            ALTER raitem_saleprice         DROP DEFAULT,
                            ALTER raitem_amtcredited       TYPE xmoney,
                            ALTER raitem_price_invuomratio TYPE xuomratio,
                            ALTER raitem_qty_invuomratio   TYPE xuomratio,
                            ALTER raitem_qtyauthorized     TYPE xqty,
                            ALTER raitem_qtycredited       TYPE xqty,
                            ALTER raitem_qtyreceived       TYPE xqty,
                            ALTER raitem_saleprice         TYPE xsalep,
                            ALTER raitem_unitcost          TYPE xcost,
                            ALTER raitem_unitprice         TYPE xsalep,
                            ALTER raitem_saleprice         SET DEFAULT xsalep(0),
                            ALTER raitem_amtcredited       SET DEFAULT xmoney(0);
ALTER TABLE public.raitemls ALTER raitemls_qtyauthorized   TYPE xqty,
                            ALTER raitemls_qtyreceived     TYPE xqty;
ALTER TABLE public.recv     ALTER recv_freight             TYPE xmoney,
                            ALTER recv_purchcost           TYPE xmoney,
                            ALTER recv_qty                 TYPE xqty,
                            ALTER recv_recvcost            TYPE xcost,
                            ALTER recv_value               TYPE xmoney;
ALTER TABLE xtpos.regdetail ALTER regdetail_adjustamt      DROP DEFAULT,
                            ALTER regdetail_cashslsamt     DROP DEFAULT,
                            ALTER regdetail_endbal         DROP DEFAULT,
                            ALTER regdetail_startbal       DROP DEFAULT,
                            ALTER regdetail_transferamt    DROP DEFAULT,
                            ALTER regdetail_adjustamt      TYPE xmoney,
                            ALTER regdetail_cashslsamt     TYPE xmoney,
                            ALTER regdetail_endbal         TYPE xmoney,
                            ALTER regdetail_startbal       TYPE xmoney,
                            ALTER regdetail_transferamt    TYPE xmoney,
                            ALTER regdetail_adjustamt      SET DEFAULT xmoney(0),
                            ALTER regdetail_cashslsamt     SET DEFAULT xmoney(0),
                            ALTER regdetail_endbal         SET DEFAULT xmoney(0),
                            ALTER regdetail_startbal       SET DEFAULT xmoney(0),
                            ALTER regdetail_transferamt    SET DEFAULT xmoney(0);
ALTER TABLE xtpos.salehead  ALTER salehead_cashamt         DROP DEFAULT,
                            ALTER salehead_checkamt        DROP DEFAULT,
                            ALTER salehead_cashamt         TYPE xmoney,
                            ALTER salehead_checkamt        TYPE xmoney,
                            ALTER salehead_cashamt         SET DEFAULT xmoney(0),
                            ALTER salehead_checkamt        SET DEFAULT xmoney(0);
ALTER TABLE xtpos.saleitem  ALTER saleitem_unitprice       DROP DEFAULT,
                            ALTER saleitem_qty             TYPE xqty,
                            ALTER saleitem_tax_pcta        TYPE xpercent,
                            ALTER saleitem_tax_pctb        TYPE xpercent,
                            ALTER saleitem_tax_pctc        TYPE xpercent,
                            ALTER saleitem_tax_ratea       TYPE NUMERIC,
                            ALTER saleitem_tax_rateb       TYPE NUMERIC,
                            ALTER saleitem_tax_ratec       TYPE NUMERIC,
                            ALTER saleitem_unitprice       TYPE xsalep,
                            ALTER saleitem_unitprice       SET DEFAULT xsalep(0);
ALTER TABLE public.salesrep ALTER salesrep_commission      TYPE xpercent;
ALTER TABLE public.shipdata ALTER shipdata_base_freight    TYPE xmoney,
                            ALTER shipdata_total_freight   TYPE xmoney,
                            ALTER shipdata_weight          TYPE xweight;
ALTER TABLE public.shipdatasum    ALTER shipdatasum_base_freight     TYPE xmoney,
                                  ALTER shipdatasum_total_freight    TYPE xmoney,
                                  ALTER shipdatasum_weight           TYPE xweight;
ALTER TABLE public.shiphead       ALTER shiphead_freight   DROP DEFAULT,
                                  ALTER shiphead_freight   TYPE xmoney,
                                  ALTER shiphead_freight   SET DEFAULT xmoney(0);
ALTER TABLE public.shipitem       ALTER shipitem_qty           TYPE xqty,
                                  ALTER shipitem_value         TYPE xmoney;
ALTER TABLE public.shipitemlocrsrv ALTER shipitemlocrsrv_qty   TYPE xqty;
ALTER TABLE public.shipitemrsrv   ALTER shipitemrsrv_qty       TYPE xqty;
ALTER TABLE public.shiptoinfo     ALTER shipto_commission      TYPE xpercent;
ALTER TABLE public.sltrans        ALTER sltrans_amount         TYPE xmoney;
ALTER TABLE public.stdjrnlitem    ALTER stdjrnlitem_amount     TYPE xmoney;
ALTER TABLE xtmfg.stdopn          ALTER stdopn_invproduomratio TYPE xuomratio,
                                  ALTER stdopn_rnqtyper        TYPE xqtyper;
ALTER TABLE public.taxhist        ALTER taxhist_amount         TYPE xmoney,
                                  ALTER taxhist_basis          TYPE xmoney,
                                  ALTER taxhist_curr_rate      TYPE NUMERIC,
                                  ALTER taxhist_percent        TYPE xpercent,
                                  ALTER taxhist_tax            TYPE xmoney;
ALTER TABLE public.taxrate        ALTER taxrate_amount         TYPE xmoney,
                                  ALTER taxrate_percent        TYPE xpercent;
ALTER TABLE te.tecustrate         ALTER tecustrate_rate        TYPE NUMERIC;
ALTER TABLE te.teitem             ALTER teitem_postedvalue DROP DEFAULT,
                                  ALTER teitem_postedvalue TYPE xmoney,
                                  ALTER teitem_qty         TYPE xqty,
                                  ALTER teitem_rate        TYPE xsalep,
                                  ALTER teitem_total       TYPE xmoney,
                                  ALTER teitem_postedvalue SET DEFAULT xmoney(0);
ALTER TABLE te.teprj              ALTER teprj_rate                   TYPE xmoney;
ALTER TABLE te.teprjtask          ALTER teprjtask_rate               TYPE xmoney;
ALTER TABLE public.terms          ALTER terms_discprcnt              TYPE xpercent;

ALTER TABLE public.tohead DROP CONSTRAINT tohead_check;
ALTER TABLE public.tohead ALTER tohead_freight DROP DEFAULT,
                          ALTER tohead_freight TYPE xmoney,
                          ALTER tohead_freight SET DEFAULT xmoney(0);
ALTER TABLE public.tohead ADD CHECK(tohead_freight = xmoney(0)
         OR (tohead_freight <> xmoney(0) AND tohead_freight_curr_id IS NOT NULL));

ALTER TABLE public.toitem DROP CONSTRAINT toitem_check;
ALTER TABLE public.toitem ALTER toitem_freight          DROP DEFAULT,
                          ALTER toitem_freight_received DROP DEFAULT,
                          ALTER toitem_freight          TYPE xpurchp,
                          ALTER toitem_freight_received TYPE xpurchp,
                          ALTER toitem_qty_ordered      TYPE xqty,
                          ALTER toitem_qty_received     TYPE xqty,
                          ALTER toitem_qty_shipped      TYPE xqty,
                          ALTER toitem_stdcost          TYPE xcost,
                          ALTER toitem_freight          SET DEFAULT xpurchp(0),
                          ALTER toitem_freight_received SET DEFAULT xpurchp(0);
ALTER TABLE public.toitem ADD CHECK(toitem_freight = xmoney(0)
                                    AND toitem_freight_received = xmoney(0)
                                    OR toitem_freight_curr_id IS NOT NULL);

ALTER TABLE public.trialbal ALTER trialbal_yearend   DROP DEFAULT,
                            ALTER trialbal_beginning TYPE xmoney,
                            ALTER trialbal_credits   TYPE xmoney,
                            ALTER trialbal_debits    TYPE xmoney,
                            ALTER trialbal_ending    TYPE xmoney,
                            ALTER trialbal_yearend   TYPE xmoney,
                            ALTER trialbal_yearend   SET DEFAULT xmoney(0);
ALTER TABLE public.trialbalsync ALTER trialbalsync_curr_beginning  DROP DEFAULT,
                                ALTER trialbalsync_curr_credits    DROP DEFAULT,
                                ALTER trialbalsync_curr_debits     DROP DEFAULT,
                                ALTER trialbalsync_curr_ending     DROP DEFAULT,
                                ALTER trialbalsync_curr_yearend    DROP DEFAULT,
                                ALTER trialbalsync_curr_beginning  TYPE xmoney,
                                ALTER trialbalsync_curr_credits    TYPE xmoney,
                                ALTER trialbalsync_curr_debits     TYPE xmoney,
                                ALTER trialbalsync_curr_ending     TYPE xmoney,
                                ALTER trialbalsync_curr_yearend    TYPE xmoney,
                                ALTER trialbalsync_curr_beginning  SET DEFAULT xmoney(0),
                                ALTER trialbalsync_curr_credits    SET DEFAULT xmoney(0),
                                ALTER trialbalsync_curr_debits     SET DEFAULT xmoney(0),
                                ALTER trialbalsync_curr_ending     SET DEFAULT xmoney(0),
                                ALTER trialbalsync_curr_yearend    SET DEFAULT xmoney(0);
ALTER TABLE public.uomconv ALTER uomconv_from_value TYPE NUMERIC,
                           ALTER uomconv_to_value   TYPE NUMERIC;
ALTER TABLE public.vodist  ALTER vodist_amount      TYPE xmoney,
                           ALTER vodist_qty         TYPE xqty;
ALTER TABLE public.vohead  ALTER vohead_amount      TYPE xmoney;
ALTER TABLE public.voitem  ALTER voitem_freight     DROP DEFAULT,
                           ALTER voitem_freight     TYPE xmoney,
                           ALTER voitem_qty         TYPE xqty,
                           ALTER voitem_freight     SET DEFAULT xmoney(0);
ALTER TABLE public.whsinfo ALTER warehous_shipping_commission TYPE xpercent;
ALTER TABLE public.wo        ALTER wo_brdvalue    DROP DEFAULT,
                             ALTER wo_postedvalue DROP DEFAULT,
                             ALTER wo_wipvalue    DROP DEFAULT,
                             ALTER wo_brdvalue    TYPE xcost,
                             ALTER wo_postedvalue TYPE xmoney,
                             ALTER wo_qtyord      TYPE xqty,
                             ALTER wo_qtyrcv      TYPE xqty,
                             ALTER wo_wipvalue    TYPE xcost,
                             ALTER wo_brdvalue    SET DEFAULT xcost(0),
                             ALTER wo_postedvalue SET DEFAULT xmoney(0),
                             ALTER wo_wipvalue    SET DEFAULT xcost(0);
ALTER TABLE public.womatl    ALTER womatl_scrapvalue  DROP DEFAULT,
                             ALTER womatl_cost        TYPE xcost,
                             ALTER womatl_qtyfxd      TYPE xqty,
                             ALTER womatl_qtyiss      TYPE xqty,
                             ALTER womatl_qtyper      TYPE xqtyper,
                             ALTER womatl_qtyreq      TYPE xqty,
                             ALTER womatl_qtywipscrap TYPE xqty,
                             ALTER womatl_scrap       TYPE xpercent,
                             ALTER womatl_scrapvalue  TYPE xcost,
                             ALTER womatl_scrapvalue  SET DEFAULT xcost(0);
ALTER TABLE public.womatlvar ALTER womatlvar_qtyfxd   TYPE xqty,
                             ALTER womatlvar_qtyiss   TYPE xqty,
                             ALTER womatlvar_qtyord   TYPE xqty,
                             ALTER womatlvar_qtyper   TYPE xqtyper,
                             ALTER womatlvar_qtyrcv   TYPE xqty,
                             ALTER womatlvar_scrap    TYPE xpercent,
                             ALTER womatlvar_wipscrap TYPE xqty;
ALTER TABLE xtmfg.wooper     ALTER wooper_invproduomratio       TYPE xuomratio,
                             ALTER wooper_qtyrcv                TYPE xqty,
                             ALTER wooper_rnqtyper              TYPE xqtyper;
ALTER TABLE xtmfg.wooperpost ALTER wooperpost_rncost DROP DEFAULT,
                             ALTER wooperpost_sucost DROP DEFAULT,
                             ALTER wooperpost_qty    TYPE xqty,
                             ALTER wooperpost_rncost TYPE xcost,
                             ALTER wooperpost_sucost TYPE xcost,
                             ALTER wooperpost_rncost SET DEFAULT xcost(0),
                             ALTER wooperpost_sucost SET DEFAULT xcost(0);
ALTER TABLE xtmfg.woopervar  ALTER woopervar_qtyord             TYPE xqty,
                             ALTER woopervar_qtyrcv             TYPE xqty;
ALTER TABLE xtmfg.wrkcnt     ALTER wrkcnt_brd_prcntlbr          TYPE xpercent,
                             ALTER wrkcnt_brd_rateperlbrhr      TYPE xmoney,
                             ALTER wrkcnt_brd_ratepermachhr     TYPE xmoney,
                             ALTER wrkcnt_brd_rateperunitprod   TYPE xmoney,
                             ALTER wrkcnt_efficfactor           TYPE xpercent,
                             ALTER wrkcnt_runrate               TYPE xmoney,
                             ALTER wrkcnt_setuprate             TYPE xmoney;
