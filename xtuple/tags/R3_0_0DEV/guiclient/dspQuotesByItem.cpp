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
 * (c) 1999-2008 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
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
 * Copyright (c) 1999-2008 by OpenMFG, LLC, d/b/a xTuple
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

#include "dspQuotesByItem.h"

#include <QVariant>
#include <QStatusBar>
#include <QWorkspace>
#include "salesOrder.h"

/*
 *  Constructs a dspQuotesByItem as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
dspQuotesByItem::dspQuotesByItem(QWidget* parent, const char* name, Qt::WFlags fl)
    : XMainWindow(parent, name, fl)
{
    setupUi(this);

    (void)statusBar();

    // signals and slots connections
    connect(_item, SIGNAL(newId(int)), this, SLOT(sFillList()));
    connect(_so, SIGNAL(populateMenu(QMenu*,QTreeWidgetItem*,int)), this, SLOT(sPopulateMenu(QMenu*)));
    connect(_close, SIGNAL(clicked()), this, SLOT(close()));
    connect(_dates, SIGNAL(updated()), this, SLOT(sFillList()));
    init();
}

/*
 *  Destroys the object and frees any allocated resources
 */
dspQuotesByItem::~dspQuotesByItem()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void dspQuotesByItem::languageChange()
{
    retranslateUi(this);
}

//Added by qt3to4:
#include <QMenu>

void dspQuotesByItem::init()
{
  statusBar()->hide();

  _dates->setStartNull(tr("Earliest"), omfgThis->startOfTime(), TRUE);
  _dates->setStartCaption(tr("Starting Order Date"));
  _dates->setEndNull(tr("Latest"), omfgThis->endOfTime(), TRUE);
  _dates->setEndCaption(tr("Ending Order Date"));

  _item->setType(ItemLineEdit::cSold);

  _so->addColumn(tr("Quote #"),    _orderColumn, Qt::AlignLeft   );
  _so->addColumn(tr("Quote Date"), _dateColumn,  Qt::AlignCenter );
  _so->addColumn(tr("Customer"),   -1,           Qt::AlignLeft   );
  _so->addColumn(tr("Quoted"),    _qtyColumn,   Qt::AlignRight  );

  connect(omfgThis, SIGNAL(salesOrdersUpdated(int, bool)), this, SLOT(sFillList())); 
}

enum SetResponse dspQuotesByItem::set(ParameterList &pParams)
{
  QVariant param;
  bool     valid;

  param = pParams.value("item_id", &valid);
  if (valid)
    _item->setId(param.toInt());

  param = pParams.value("startDate", &valid);
  if (valid)
    _dates->setStartDate(param.toDate());

  param = pParams.value("endDate", &valid);
  if (valid)
    _dates->setEndDate(param.toDate());

  return NoError;
}

void dspQuotesByItem::sPopulateMenu(QMenu *menuThis)
{
  menuThis->insertItem(tr("Edit..."), this, SLOT(sEditOrder()), 0);
  menuThis->insertItem(tr("View..."), this, SLOT(sViewOrder()), 0);
}

void dspQuotesByItem::sEditOrder()
{
  ParameterList params;
  params.append("mode", "editQuote");
  params.append("quhead_id", _so->id());
      
  salesOrder *newdlg = new salesOrder();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void dspQuotesByItem::sViewOrder()
{
  ParameterList params;
  params.append("mode", "viewQuote");
  params.append("quhead_id", _so->id());
      
  salesOrder *newdlg = new salesOrder();
  newdlg->set(params);
  omfgThis->handleNewWindow(newdlg);
}

void dspQuotesByItem::sFillList()
{
  if ((_item->isValid()) && (_dates->allValid()))
  {
    q.prepare( "SELECT quhead_id, quhead_number,"
               "       formatDate(quhead_quotedate), "
               "       cust_name,"
               "       formatQty(quitem_qtyord)"
               "FROM quhead, quitem, cust "
               "WHERE ( (quitem_quhead_id=quhead_id)"
               " AND (quhead_cust_id=cust_id)"
               " AND (quhead_quotedate BETWEEN :startDate AND :endDate)"
               " AND (quitem_item_id=:item_id) ) "
               "ORDER BY quhead_number;" );
   _dates->bindValue(q);
    q.bindValue(":item_id", _item->id());
    q.exec();
    _so->populate(q);
  }
  else
    _so->clear();
}

