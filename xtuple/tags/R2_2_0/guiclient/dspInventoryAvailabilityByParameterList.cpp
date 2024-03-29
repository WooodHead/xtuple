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

#include "dspInventoryAvailabilityByParameterList.h"

#include <QMenu>
#include <QVariant>
#include <QMessageBox>
#include <QStringList>
#include "dspInventoryHistoryByItem.h"
#include "dspAllocations.h"
#include "dspOrders.h"
#include "dspRunningAvailability.h"
#include "workOrder.h"
#include "postMiscProduction.h"
#include "purchaseRequest.h"
#include "purchaseOrder.h"
#include "dspSubstituteAvailabilityByItem.h"
#include "createCountTagsByItem.h"
#include "enterMiscCount.h"
#include "rptInventoryAvailabilityByParameterList.h"

/*
 *  Constructs a dspInventoryAvailabilityByParameterList as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
dspInventoryAvailabilityByParameterList::dspInventoryAvailabilityByParameterList(QWidget* parent, const char* name, Qt::WFlags fl)
    : QMainWindow(parent, name, fl)
{
  setupUi(this);

  (void)statusBar();

  _showByGroupInt = new QButtonGroup(this);
  _showByGroupInt->addButton(_byLeadTime);
  _showByGroupInt->addButton(_byDays);
  _showByGroupInt->addButton(_byDate);
  _showByGroupInt->addButton(_byDates);

  // signals and slots connections
  connect(_byDate, SIGNAL(toggled(bool)), _date, SLOT(setEnabled(bool)));
  connect(_close, SIGNAL(clicked()), this, SLOT(close()));
  connect(_byDays, SIGNAL(toggled(bool)), _days, SLOT(setEnabled(bool)));
  connect(_showReorder, SIGNAL(toggled(bool)), _ignoreReorderAtZero, SLOT(setEnabled(bool)));
  connect(_query, SIGNAL(clicked()), this, SLOT(sFillList()));
  connect(_availability, SIGNAL(populateMenu(QMenu*,QTreeWidgetItem*,int)), this, SLOT(sPopulateMenu(QMenu*,QTreeWidgetItem*)));
  connect(_print, SIGNAL(clicked()), this, SLOT(sPrint()));
  connect(_query, SIGNAL(clicked()), this, SLOT(sFillList()));
  connect(_byDates, SIGNAL(toggled(bool)), _startDate, SLOT(setEnabled(bool)));
  connect(_byDates, SIGNAL(toggled(bool)), _endDate, SLOT(setEnabled(bool)));
  connect(omfgThis, SIGNAL(workOrdersUpdated(int, bool)), this, SLOT(sFillList()));

  _availability->addColumn(tr("Item Number"),  _itemColumn, Qt::AlignLeft   );
  _availability->addColumn(tr("Description"),  -1,          Qt::AlignLeft   );
  _availability->addColumn(tr("Whs."),         _whsColumn,  Qt::AlignCenter );
  _availability->addColumn(tr("LT"),           _whsColumn,  Qt::AlignCenter );
  _availability->addColumn(tr("QOH"),          _qtyColumn,  Qt::AlignRight  );
  _availability->addColumn(tr("Allocated"),    _qtyColumn,  Qt::AlignRight  );
  _availability->addColumn(tr("Unallocated"),  _qtyColumn,  Qt::AlignRight  );
  _availability->addColumn(tr("On Order"),     _qtyColumn,  Qt::AlignRight  );
  _availability->addColumn(tr("Reorder Lvl."), _qtyColumn,  Qt::AlignRight  );
  _availability->addColumn(tr("OUT Level."),   _qtyColumn,  Qt::AlignRight  );
  _availability->addColumn(tr("Available"),    _qtyColumn,  Qt::AlignRight  );
}

/*
 *  Destroys the object and frees any allocated resources
 */
dspInventoryAvailabilityByParameterList::~dspInventoryAvailabilityByParameterList()
{
  // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void dspInventoryAvailabilityByParameterList::languageChange()
{
  retranslateUi(this);
}

enum SetResponse dspInventoryAvailabilityByParameterList::set(const ParameterList &pParams)
{
  QVariant param;
  bool     valid;

  param = pParams.value("classcode_id", &valid);
  if (valid)
  {
    _parameter->setType(ClassCode);
    _parameter->setId(param.toInt());
  }

  param = pParams.value("classcode_pattern", &valid);
  if (valid)
  {
    _parameter->setType(ClassCode);
    _parameter->setPattern(param.toString());
  }

  param = pParams.value("classcode", &valid);
  if (valid)
    _parameter->setType(ClassCode);

  param = pParams.value("plancode_id", &valid);
  if (valid)
  {
    _parameter->setType(PlannerCode);
    _parameter->setId(param.toInt());
  }

  param = pParams.value("plancode_pattern", &valid);
  if (valid)
  {
    _parameter->setType(PlannerCode);
    _parameter->setPattern(param.toString());
  }

  param = pParams.value("plancode", &valid);
  if (valid)
    _parameter->setType(PlannerCode);

  param = pParams.value("itemgrp_id", &valid);
  if (valid)
  {
    _parameter->setType(ItemGroup);
    _parameter->setId(param.toInt());
  }

  param = pParams.value("itemgrp_pattern", &valid);
  if (valid)
  {
    _parameter->setType(ItemGroup);
    _parameter->setPattern(param.toString());
  }

  param = pParams.value("itemgrp", &valid);
  if (valid)
    _parameter->setType(ItemGroup);

  switch (_parameter->type())
  {
    case ClassCode:
      setCaption(tr("Inventory Availability by Class Code"));
      break;

    case PlannerCode:
      setCaption(tr("Inventory Availability by Planner Code"));
      break;

    case ItemGroup:
      setCaption(tr("Inventory Availability by Item Group"));
      break;

    default:
      break;
  }

  if (pParams.inList("run"))
  {
    sFillList();
    return NoError_Run;
  }

  return NoError;
}

void dspInventoryAvailabilityByParameterList::sPrint()
{
  ParameterList params;
  _warehouse->appendValue(params);
  _parameter->appendValue(params);
  params.append("print");

  if (_showReorder->isChecked())
    params.append("showReorder");

  if (_ignoreReorderAtZero->isChecked())
    params.append("ignoreReorderAtZero");

  if (_showShortages->isChecked())
    params.append("showShortages");
  
  if (_parameter->isAll())
  {
    if (_parameter->type() == ItemGroup)
      params.append("itemgrp");
    else if(_parameter->type() == PlannerCode)
      params.append("plancode");
    else if (_parameter->type() == ClassCode)
      params.append("classcode");
  }

  if (_byLeadTime->isChecked())
    params.append("byLeadTime");
  else if (_byDays->isChecked())
    params.append("byDays", _days->value());
  else if (_byDate->isChecked())
    params.append("byDate", _date->date());
  else if (_byDates->isChecked())
  {
    params.append("byRange");
    params.append("startDate", _startDate->date());
    params.append("endDate", _endDate->date());
  }

  rptInventoryAvailabilityByParameterList newdlg(this, "", TRUE);
  newdlg.set(params);
}

void dspInventoryAvailabilityByParameterList::sPopulateMenu(QMenu *menu, QTreeWidgetItem *selected)
{
  int menuItem;

  menuItem = menu->insertItem(tr("View Inventory History..."), this, SLOT(sViewHistory()), 0);
  if (!_privleges->check("ViewInventoryHistory"))
    menu->setItemEnabled(menuItem, FALSE);

  menu->insertSeparator();

  menuItem = menu->insertItem(tr("View Allocations..."), this, SLOT(sViewAllocations()), 0);
  if (selected->text(5).remove(',').toDouble() == 0.0)
    menu->setItemEnabled(menuItem, FALSE);

  menuItem = menu->insertItem(tr("View Orders..."), this, SLOT(sViewOrders()), 0);
  if (selected->text(7).remove(',').toDouble() == 0.0)
    menu->setItemEnabled(menuItem, FALSE);

  menuItem = menu->insertItem(tr("Running Availability..."), this, SLOT(sRunningAvailability()), 0);

  menu->insertSeparator();

  if (((XTreeWidgetItem *)selected)->altId() == 1)
  {
    menuItem = menu->insertItem(tr("Create P/R..."), this, SLOT(sCreatePR()), 0);
    if (!_privleges->check("MaintainPurchaseRequests"))
      menu->setItemEnabled(menuItem, FALSE);

    menuItem = menu->insertItem(tr("Create P/O..."), this, SLOT(sCreatePO()), 0);
    if (!_privleges->check("MaintainPurchaseOrders"))
      menu->setItemEnabled(menuItem, FALSE);

    menu->insertSeparator();
  }
  else if (((XTreeWidgetItem *)selected)->altId() == 2)
  {
    menuItem = menu->insertItem(tr("Create W/O..."), this, SLOT(sCreateWO()), 0);
    if (!_privleges->check("MaintainWorkOrders"))
      menu->setItemEnabled(menuItem, FALSE);

    menuItem = menu->insertItem(tr("Post Misc. Production..."), this, SLOT(sPostMiscProduction()), 0);
    if (!_privleges->check("PostMiscProduction"))
      menu->setItemEnabled(menuItem, FALSE);

    menu->insertSeparator();
  }
    
  menu->insertItem(tr("View Substitute Availability..."), this, SLOT(sViewSubstituteAvailability()), 0);

  menu->insertSeparator();

  menuItem = menu->insertItem(tr("Issue Count Tag..."), this, SLOT(sIssueCountTag()), 0);
  if (!_privleges->check("IssueCountTags"))
    menu->setItemEnabled(menuItem, FALSE);

  menuItem = menu->insertItem(tr("Enter Misc. Inventory Count..."), this, SLOT(sEnterMiscCount()), 0);
  if (!_privleges->check("EnterMiscCounts"))
    menu->setItemEnabled(menuItem, FALSE);
}

void dspInventoryAvailabilityByParameterList::sViewHistory()
{
  ParameterList params;
  params.append("itemsite_id", _availability->id());

  dspInventoryHistoryByItem *newdlg = new dspInventoryHistoryByItem();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void dspInventoryAvailabilityByParameterList::sViewAllocations()
{
  ParameterList params;
  params.append("itemsite_id", _availability->id());
  params.append("run");

  if (_byLeadTime->isChecked())
    params.append("byLeadTime", TRUE);
  else if (_byDays->isChecked())
    params.append("byDays", _days->value());
  else if (_byDate->isChecked())
    params.append("byDate", _date->date());
  else if (_byDates->isChecked())
  {
    params.append("byRange");
    params.append("startDate", _startDate->date());
    params.append("endDate", _endDate->date());
  }

  dspAllocations *newdlg = new dspAllocations();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void dspInventoryAvailabilityByParameterList::sViewOrders()
{
  ParameterList params;
  params.append("itemsite_id", _availability->id());
  params.append("run");

  if (_byLeadTime->isChecked())
    params.append("byLeadTime", TRUE);
  else if (_byDays->isChecked())
    params.append("byDays", _days->value());
  else if (_byDate->isChecked())
    params.append("byDate", _date->date());
  else if (_byDates->isChecked())
  {
    params.append("byRange");
    params.append("startDate", _startDate->date());
    params.append("endDate", _endDate->date());
  }

  dspOrders *newdlg = new dspOrders();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void dspInventoryAvailabilityByParameterList::sRunningAvailability()
{
  ParameterList params;
  params.append("itemsite_id", _availability->id());
  params.append("run");

  dspRunningAvailability *newdlg = new dspRunningAvailability();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void dspInventoryAvailabilityByParameterList::sCreateWO()
{
  ParameterList params;
  params.append("mode", "new");
  params.append("itemsite_id", _availability->id());

  workOrder *newdlg = new workOrder();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void dspInventoryAvailabilityByParameterList::sPostMiscProduction()
{
  ParameterList params;
  params.append("itemsite_id", _availability->id());

  postMiscProduction newdlg(this, "", TRUE);
  newdlg.set(params);
  newdlg.exec();
}

void dspInventoryAvailabilityByParameterList::sCreatePR()
{
  ParameterList params;
  params.append("mode", "new");
  params.append("itemsite_id", _availability->id());

  purchaseRequest newdlg(this, "", TRUE);
  newdlg.set(params);
  newdlg.exec();
}

void dspInventoryAvailabilityByParameterList::sCreatePO()
{
  ParameterList params;
  params.append("mode", "new");
  params.append("itemsite_id", _availability->id());

  purchaseOrder *newdlg = new purchaseOrder();
  if(newdlg->set(params) == NoError)
    omfgThis->handleNewWindow(newdlg);
}

void dspInventoryAvailabilityByParameterList::sViewSubstituteAvailability()
{
  ParameterList params;
  params.append("itemsite_id", _availability->id());
  params.append("run");

  if (_byLeadTime->isChecked())
    params.append("byLeadTime", TRUE);
  else if (_byDays->isChecked())
    params.append("byDays", _days->value());
  else if (_byDate->isChecked())
    params.append("byDate", _date->date());

  dspSubstituteAvailabilityByItem *newdlg = new dspSubstituteAvailabilityByItem();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void dspInventoryAvailabilityByParameterList::sIssueCountTag()
{
  ParameterList params;
  params.append("itemsite_id", _availability->id());
  
  createCountTagsByItem newdlg(this, "", TRUE);
  newdlg.set(params);
  newdlg.exec();
}

void dspInventoryAvailabilityByParameterList::sEnterMiscCount()
{
  ParameterList params;
  params.append("itemsite_id", _availability->id());
  
  enterMiscCount newdlg(this, "", TRUE);
  newdlg.set(params);
  newdlg.exec();
}

void dspInventoryAvailabilityByParameterList::sHandleShowReorder(bool pValue)
{
  if (pValue)
    _showShortages->setChecked(TRUE);
}

void dspInventoryAvailabilityByParameterList::sFillList()
{
  _availability->clear();

  if ((_byDate->isChecked()) && (!_date->isValid()))
  {
    QMessageBox::critical( this, tr("Enter Valid Date"),
                           tr( "You have choosen to view Inventory Availabilty as of a given date but have not.\n"
                               "indicated the date.  Please enter a valid date." ) );
    _date->setFocus();
    return;
  }

  QString sql( "SELECT itemsite_id, itemtype,"
               "       item_number, (item_descrip1 || ' ' || item_descrip2) AS itemdescrip,"
               "       warehous_id, warehous_code, itemsite_leadtime,"
               "       formatQty(qoh) AS f_qoh,"
               "       formatQty(allocated) AS f_allocated,"
               "       formatQty(noNeg(qoh - allocated)) AS f_unallocated,"
               "       formatQty(ordered) AS f_ordered,"
               "       formatQty(reorderlevel) AS f_reorderlevel,"
               "       formatQty(outlevel) AS f_outlevel,"
               "       formatQty(qoh - allocated + ordered) AS f_available,"
               "       ((qoh - allocated + ordered) < 0) AS stockout,"
               "       ((qoh - allocated + ordered) <= reorderlevel) AS reorder "
               "FROM ( SELECT itemsite_id,"
               "              CASE WHEN (item_type IN ('P', 'O')) THEN 1"
               "                   WHEN (item_type IN ('M')) THEN 2"
               "                   ELSE 0"
               "              END AS itemtype,"
               "              item_number, item_descrip1, item_descrip2,"
               "              warehous_id, warehous_code, itemsite_leadtime,"
               "              itemsite_qtyonhand AS qoh,"
               "              CASE WHEN(itemsite_useparams) THEN itemsite_reorderlevel ELSE 0.0 END AS reorderlevel,"
               "              CASE WHEN(itemsite_useparams) THEN itemsite_ordertoqty ELSE 0.0 END AS outlevel," );

  if (_byLeadTime->isChecked())
    sql += " qtyAllocated(itemsite_id, itemsite_leadtime) AS allocated,"
           " qtyOrdered(itemsite_id, itemsite_leadtime) AS ordered ";

  else if (_byDays->isChecked())
    sql += " qtyAllocated(itemsite_id, :days) AS allocated,"
           " qtyOrdered(itemsite_id, :days) AS ordered ";

  else if (_byDate->isChecked())
    sql += " qtyAllocated(itemsite_id, (:date - CURRENT_DATE)) AS allocated,"
           " qtyOrdered(itemsite_id, (:date - CURRENT_DATE)) AS ordered ";

  else if (_byDates->isChecked())
    sql += " qtyAllocated(itemsite_id, :startDate, :endDate) AS allocated,"
           " qtyOrdered(itemsite_id, :startDate, :endDate) AS ordered ";

  sql += "FROM item, itemsite, warehous "
         "WHERE ( (itemsite_active)"
         " AND (itemsite_item_id=item_id)"
         " AND (itemsite_warehous_id=warehous_id)";

  if (_warehouse->isSelected())
    sql += " AND (warehous_id=:warehous_id)";

  if (_parameter->isSelected())
  {
    if (_parameter->type() == ClassCode)
      sql += " AND (item_classcode_id=:classcode_id)";
    else if (_parameter->type() == ItemGroup)
      sql += " AND (item_id IN (SELECT itemgrpitem_item_id FROM itemgrpitem WHERE (itemgrpitem_itemgrp_id=:itemgrp_id)))";
    else if (_parameter->type() == PlannerCode)
      sql += " AND (itemsite_plancode_id=:plancode_id)";
  }
  else if (_parameter->isPattern())
  {
    if (_parameter->type() == ClassCode)
      sql += " AND (item_classcode_id IN (SELECT classcode_id FROM classcode WHERE (classcode_code ~ :classcode_pattern)))";
    else if (_parameter->type() == ItemGroup)
      sql += " AND (item_id IN (SELECT itemgrpitem_item_id FROM itemgrpitem, itemgrp WHERE ( (itemgrpitem_itemgrp_id=itemgrp_id) AND (itemgrp_name ~ :itemgrp_pattern) ) ))";
    else if (_parameter->type() == PlannerCode)
      sql += " AND (itemsite_plancode_id IN (SELECT plancode_id FROM plancode WHERE (plancode_code ~ :plancode_pattern)))";
  }
  else
  {
    if(_parameter->type() == ItemGroup)
      sql += " AND (item_id IN (SELECT DISTINCT itemgrpitem_item_id FROM itemgrpitem))";
  }

  sql += ") ) as data ";

  if (_showReorder->isChecked())
  {
    sql += "WHERE ( ((qoh - allocated + ordered) <= reorderlevel) ";

    if (_ignoreReorderAtZero->isChecked())
      sql += " AND (NOT ( ((qoh - allocated + ordered) = 0) AND (reorderlevel = 0)) ) ) ";
    else
      sql += ") ";
  }
  else if (_showShortages->isChecked())
    sql += "WHERE ((qoh - allocated + ordered) < 0) ";

  sql += "ORDER BY item_number, warehous_code DESC;";

  q.prepare(sql);
  _warehouse->bindValue(q);
  _parameter->bindValue(q);
  q.bindValue(":days", _days->value());
  q.bindValue(":date", _date->date());
  q.bindValue(":startDate", _startDate->date());
  q.bindValue(":endDate", _endDate->date());
  q.exec();
  XTreeWidgetItem * last = 0;
  while (q.next())
  {
    last = new XTreeWidgetItem( _availability, last,
                                q.value("itemsite_id").toInt(), q.value("itemtype").toInt(),
                                q.value("item_number"), q.value("itemdescrip"),
                                q.value("warehous_code"), q.value("itemsite_leadtime"),
                                q.value("f_qoh"), q.value("f_allocated"),
                                q.value("f_unallocated"), q.value("f_ordered"),
                                q.value("f_reorderlevel"), q.value("f_outlevel"),
                                q.value("f_available") );

    if (_byDates->isChecked())
      last->setTextColor(4, "grey");

    if (q.value("stockout").toBool())
      last->setTextColor(10, "red");
    else if (q.value("reorder").toBool())
      last->setTextColor(10, "orange");
  }
}
