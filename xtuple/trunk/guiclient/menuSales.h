/*
 * Common Public Attribution License Version 1.0. 
 * 
 * The contents of this file are subject to the Common Public Attribution 
 * License Version 1.0 (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License 
 * at http://www.xTuple.com/CPAL.  The License is based on the Mozilla 
 * Public License Version 1.1 but Sections 14 and 15 have been added to 
 * cover use of software over a computer network and provide for limited 
 * attribution for the Original Developer. In addition, Exhibit A has 
 * been modified to be consistent with Exhibit B.
 * 
 * Software distributed under the License is distributed on an "AS IS" 
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See 
 * the License for the specific language governing rights and limitations 
 * under the License. 
 * 
 * The Original Code is PostBooks Accounting, ERP, and CRM Suite. 
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2007 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
 * 
 * Contributor(s): ______________________.
 * 
 * Alternatively, the contents of this file may be used under the terms 
 * of the xTuple End-User License Agreeement (the xTuple License), in which 
 * case the provisions of the xTuple License are applicable instead of 
 * those above.  If you wish to allow use of your version of this file only 
 * under the terms of the xTuple License and not to allow others to use 
 * your version of this file under the CPAL, indicate your decision by 
 * deleting the provisions above and replace them with the notice and other 
 * provisions required by the xTuple License. If you do not delete the 
 * provisions above, a recipient may use your version of this file under 
 * either the CPAL or the xTuple License.
 * 
 * EXHIBIT B.  Attribution Information
 * 
 * Attribution Copyright Notice: 
 * Copyright (c) 1999-2007 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by PostBooks, an open source solution from xTuple
 * 
 * Attribution URL: www.xtuple.org 
 * (to be included in the "Community" menu of the application if possible)
 * 
 * Graphic Image as provided in the Covered Code, if any. 
 * (online at www.xtuple.com/poweredby)
 * 
 * Display of Attribution Information is required in Larger Works which 
 * are defined in the CPAL as a work which combines Covered Code or 
 * portions thereof with code not governed by the terms of the CPAL.
 */

//  menuSales.h
//  Created 01/01/2001 JSL
//  Copyright (c) 2001-2007, OpenMFG, LLC

#ifndef menuSales_h
#define menuSales_h

#include <QObject>
#include <QPixmap>

class QToolBar;
class QMenu;
class OpenMFGGUIClient;

class menuSales : public QObject
{
  Q_OBJECT
  
  struct actionProperties {
    const char*		actionName;
    const QString	actionTitle;
    const char*		slot;
    QMenu*		menu;
    bool		priv;
    QPixmap*		pixmap;
    QToolBar*		toolBar;
    bool		visible;
    const QString   toolTip;
  };

  public:
    menuSales(OpenMFGGUIClient *);

  public slots:
    void sNewSalesOrder();
    void sOpenSalesOrders();
    void sRescheduleSoLineItems();
    void sNewQuote();
    void sQuotes();

    void sPackingListBatch();
    void sPrintPackingList();
    
    void sUninvoicedShipments();
    void sSelectShippedOrdersForBilling();
    void sSelectOrderForBilling();
    void sBillingEditList();
    void sDspBillingSelections();
    void sPostBillingSelections();
    void sUnpostedInvoices();
    void sPrintInvoices();
    void sPrintInvoicesByShipvia();
    void sReprintInvoices();
    void sDeliverInvoice();
    void sDeliverSalesOrder();
    void sPostInvoices();
    void sPurgeInvoices();

    void sNewReturn();
    void sOpenReturns();
    void sReturnsWorkbench();

    void sNewCreditMemo();
    void sUnpostedCreditMemos();
    void sCreditMemoEditList();
    void sPrintCreditMemos();
    void sReprintCreditMemos();
    void sPostCreditMemos();
    void sPurgeCreditMemos();

    void sItemListPrice();
    void sUpdateListPricesByProductCategory();
    void sPricingSchedules();
    void sPricingScheduleAssignments();
    void sSales();
    void sUpdatePricesByProductCategory();
    void sUpdatePricesByPricingSchedule();
    void sDspPricesByItem();
    void sDspPricesByCustomer();
    void sDspPricesByCustomerType();

    void sDspOrderLookupByCustomer();
    void sDspOrderLookupByCustomerType();
    void sDspOrderLookupByItem();
    void sDspOrderLookupByCustomerPO();
    void sDspQuoteLookupByCustomer();
    void sDspQuoteLookupByItem();
    void sDspInventoryAvailabilityByItem();
    void sDspInventoryAvailabilityBySalesOrder();
    void sDspInventoryAvailabilityByCustomerType();
    void sDspCustomersByCusttype();
    void sDspCustomersByCharacteristic();
    void sDspCustomerInformation();
    void sDspSalesOrderStatus();
    void sDspBacklogByItem();
    void sDspBacklogBySalesOrder();
    void sDspBacklogByCustomer();
    void sDspBacklogByCustomerType();
    void sDspBacklogByCustomerGroup();
    void sDspBacklogByProductCategory();
    void sDspSummarizedBacklogByWarehouse();
    void sDspPartiallyShippedOrders();
    void sDspEarnedCommissions();
    void sDspBriefEarnedCommissions();
    void sDspSummarizedTaxableSales();
    
    void sDspSalesHistoryByCustomer();
    void sDspSalesHistoryByBilltoName();
    void sDspSalesHistoryByShipTo();
    void sDspSalesHistoryByItem();
    void sDspSalesHistoryBySalesRep();
    void sDspSalesHistoryByProductCategory();
    void sDspSalesHistoryByCustomerType();
    void sDspSalesHistoryByCustomerGroup();
    void sDspBriefSalesHistoryByCustomer();
    void sDspBriefSalesHistoryByCustomerType();
    void sDspBriefSalesHistoryBySalesRep();
    void sDspBookingsByCustomer();
    void sDspBookingsByCustomerGroup();
    void sDspBookingsByShipTo();
    void sDspBookingsByItem();
    void sDspBookingsByProductCategory();
    void sDspBookingsBySalesRep();
    void sDspSummarizedSalesByCustomer();
    void sDspSummarizedSalesByCustomerType();
    void sDspSummarizedSalesByCustomerByItem();
    void sDspSummarizedSalesByCustomerTypeByItem();
    void sDspSummarizedSalesByItem();
    void sDspSummarizedSalesBySalesRep();
    void sDspSummarizedSalesHistoryByShippingZone();
    void sDspTimePhasedBookingsByItem();
    void sDspTimePhasedBookingsByProductCategory();
    void sDspTimePhasedBookingsByCustomer();
    void sDspTimePhasedSalesByItem();
    void sDspTimePhasedSalesByProductCategory();
    void sDspTimePhasedSalesByCustomer();
    void sDspTimePhasedSalesByCustomerGroup();
    void sDspTimePhasedSalesByCustomerByItem();

    void sPrintSalesOrderForm();
    void sPrintSASpecialCalendarForm();

    void sNewCustomer();
    void sSearchForCustomer();
    void sCustomers();
    void sUpdateCreditStatusByCustomer();
    void sCustomerGroups();
    void sCustomerTypes();
    void sNewProspect();
    void sSearchForProspect();
    void sProspects();
    void sSalesReps();
    void sShippingZones();
    void sShipVias();
    void sShippingChargeTypes();
    void sTaxCodes();
    void sTerms();
    void sShippingForms();
    void sSalesAccountAssignments();
    void sARAccountAssignments();
    void sCustomerFormAssignments();
    void sSalesCategories();

    void sDspCustomerInformationExport();
    void sReassignCustomerTypeByCustomerType();
    void sCharacteristics();
    
    void sArchiveSalesHistory();
    void sRestoreSalesHistory();

    void sAllocateReservations();

// START_RW
    void sPostAROpenAndDist();
    void sExportCustomers();
// END_RW

  private:
    OpenMFGGUIClient *parent;
		
    QToolBar   *toolBar;
    QMenu *mainMenu;
    QMenu *quotesMenu;
    QMenu *ordersMenu;
    QMenu *packingListsMenu;
    QMenu *billingMenu;
    QMenu *billingInvoicesMenu;
    QMenu *billingCreditMemosMenu;
    QMenu *billingFormsMenu;
	QMenu *returnsMenu;
    QMenu *pricingMenu;
    QMenu *pricingReportsMenu;
    QMenu *pricingUpdateMenu;
    QMenu *prospectMenu;
    QMenu *customerMenu;
    QMenu *lookupMenu;
    QMenu *lookupQuoteMenu;
    QMenu *lookupSoMenu;
    QMenu *formsMenu;
    QMenu *analysisMenu;
    QMenu *analysisBookMenu;
    QMenu *analysisSumHistMenu;
    QMenu *analysisHistMenu;
    QMenu *analysisBrfHistMenu;
    QMenu *analysisTpBookMenu;
    QMenu *analysisTpHistMenu;
    QMenu *reportsMenu;
    QMenu *reportsCustomersMenu;
    QMenu *reportsInvAvailMenu;
    QMenu *reportsBacklogMenu;
    QMenu *masterInfoMenu;
    QMenu *utilitiesMenu;
    
    void	addActionsToMenu(actionProperties [], unsigned int);
};

#endif

