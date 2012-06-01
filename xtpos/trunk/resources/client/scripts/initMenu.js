/*
 * This file is part of the xtpos package for xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
*/

var saleMenu    = mainwindow.findChild("menu.sales");
var lookupMenu  = mainwindow.findChild("menu.sales.lookup");

var retailMenu  = new QMenu(qsTr("Retail"), mainwindow);
retailMenu.objectName = "menu.sales.retail";
saleMenu.insertMenu(lookupMenu.menuAction(), retailMenu);

saleMenu.insertSeparator(lookupMenu.menuAction());

var cshRegAction = retailMenu.addAction(qsTr("Cash Registers..."));
cshRegAction.enabled = (privileges.value("MaintainCashRegisters") ||
                         privileges.value("MaintainRetailSales") ||
                         privileges.value("ViewRetailSales"));

retailMenu.addSeparator();

var rtlSaleSearchAction = retailMenu.addAction(qsTr("Retail Sale Search..."));
rtlSaleSearchAction.enabled = (privileges.value("MaintainRetailSales") ||
                               privileges.value("ViewRetailSales"));

var reportMenu       = mainwindow.findChild("menu.sales.reports");
var earnedCommAction = mainwindow.findChild("so.dspEarnedCommissions");

var regHistAction = new QAction(qsTr("Register History"), reportMenu);
regHistAction.enabled = privileges.value("MaintainCashRegisters");
reportMenu.insertAction(earnedCommAction, regHistAction);

detailedRegHistAction = new QAction(qsTr("Detailed Register History"), reportMenu);
detailedRegHistAction.enabled = privileges.value("ViewRetailSales");
reportMenu.insertAction(earnedCommAction, detailedRegHistAction);

// Connect new menus to existing custom command actions
var cshRegTrig  = mainwindow.findChild("custom.cashRegisters");
cshRegAction.triggered.connect(cshRegTrig, "trigger");

var rtlSaleSearchTrig   = mainwindow.findChild("custom.retailSaleSearch");
rtlSaleSearchAction.triggered.connect(rtlSaleSearchTrig, "trigger");

var regHistTrig = mainwindow.findChild("custom.dspRegisterHistory");
regHistAction.triggered.connect(regHistTrig, "trigger");

var detailedRegHistTrig = mainwindow.findChild("custom.dspDetailedRegisterHistory");
detailedRegHistAction.triggered.connect(detailedRegHistTrig, "trigger");

// Remove custom command actions
var customSalesMenu     = mainwindow.findChild("menu.sales.custom");
customSalesMenu.removeAction(cshRegTrig);
customSalesMenu.removeAction(rtlSaleSearchTrig);
customSalesMenu.removeAction(regHistTrig);
customSalesMenu.removeAction(detailedRegHistTrig);

// Remove custom menu if no custom commands left
if (!toolbox.menuActionCount(customSalesMenu))
  saleMenu.removeAction(customSalesMenu);
