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

#include "dspBookingsBySalesRep.h"

#include <qvariant.h>
#include <qmessagebox.h>
#include <qstatusbar.h>
#include "rptBookingsBySalesRep.h"

/*
 *  Constructs a dspBookingsBySalesRep as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
dspBookingsBySalesRep::dspBookingsBySalesRep(QWidget* parent, const char* name, Qt::WFlags fl)
    : QMainWindow(parent, name, fl)
{
    setupUi(this);

    (void)statusBar();

    // signals and slots connections
    connect(_print, SIGNAL(clicked()), this, SLOT(sPrint()));
    connect(_close, SIGNAL(clicked()), this, SLOT(close()));
    connect(_query, SIGNAL(clicked()), this, SLOT(sFillList()));
    init();
}

/*
 *  Destroys the object and frees any allocated resources
 */
dspBookingsBySalesRep::~dspBookingsBySalesRep()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void dspBookingsBySalesRep::languageChange()
{
    retranslateUi(this);
}


void dspBookingsBySalesRep::init()
{
  statusBar()->hide();

  _salesrep->setType(XComboBox::SalesRepsActive);
  _productCategory->setType(ProductCategory);
  _dates->setStartNull(tr("Earliest"), omfgThis->startOfTime(), TRUE);
  _dates->setEndNull(tr("Latest"), omfgThis->endOfTime(), TRUE);

  _soitem->addColumn(tr("S/O #"),       _orderColumn, Qt::AlignRight  );
  _soitem->addColumn(tr("Ord. Date"),   _dateColumn,  Qt::AlignCenter );
  _soitem->addColumn(tr("Cust. #"),     _orderColumn, Qt::AlignRight  );
  _soitem->addColumn(tr("Customer"),    -1,           Qt::AlignLeft   );
  _soitem->addColumn(tr("Item Number"), _itemColumn,  Qt::AlignLeft   );
  _soitem->addColumn(tr("Ordered"),     _qtyColumn,   Qt::AlignRight  );
  _soitem->addColumn(tr("Unit Price"),  _priceColumn, Qt::AlignRight  );
  _soitem->addColumn(tr("Ext'd Price"), _moneyColumn, Qt::AlignRight  );
}

void dspBookingsBySalesRep::sPrint()
{
  ParameterList params;
  _warehouse->appendValue(params);
  _productCategory->appendValue(params);
  _dates->appendValue(params);
  params.append("salesrep_id", _salesrep->id());
  params.append("print");

  rptBookingsBySalesRep newdlg(this, "", TRUE);
  newdlg.set(params);
}

void dspBookingsBySalesRep::sFillList()
{
  if (!checkParameters())
      return;

  if (_dates->allValid())
  {
    QString sql( "SELECT coitem_id, cohead_number,"
                 "       formatDate(cohead_orderdate),"
                 "       cust_number, cust_name,"
                 "       item_number,"
                 "       formatQty(coitem_qtyord),"
                 "       formatSalesPrice(coitem_price),"
                 "       formatMoney(coitem_qtyord * coitem_price / item_invpricerat) "
                 "FROM coitem, cohead, cust, itemsite, item, prodcat "
                 "WHERE ( (coitem_cohead_id=cohead_id)"
                 " AND (cohead_cust_id=cust_id)"
                 " AND (coitem_itemsite_id=itemsite_id)"
                 " AND (coitem_status <> 'X')"
                 " AND (itemsite_item_id=item_id)"
                 " AND (item_prodcat_id=prodcat_id)"
                 " AND (cohead_salesrep_id=:salesrep_id)"
                 " AND (cohead_orderdate BETWEEN :startDate AND :endDate)" );

    if (_warehouse->isSelected())
      sql += " AND (itemsite_warehous_id=:warehous_id)";

    if (_productCategory->isSelected())
      sql += " AND (prodcat_id=:prodcat_id)";
    else if (_productCategory->isPattern())
      sql += " AND (prodcat_code ~ :prodcat_pattern)";

    sql += ") "
           "ORDER BY cohead_orderdate";

    q.prepare(sql);
    _warehouse->bindValue(q);
    _productCategory->bindValue(q);
    _dates->bindValue(q);
    q.bindValue(":salesrep_id", _salesrep->id());
    q.exec();
    _soitem->populate(q);
  }
  else
    _soitem->clear();
}

bool dspBookingsBySalesRep::checkParameters()
{
    if (!_dates->startDate().isValid())
    {
        if(isVisible()) {
            QMessageBox::warning( this, tr("Enter Start Date"),
                                  tr("Please enter a valid Start Date.") );
            _dates->setFocus();
        }
        return FALSE;
    }

    if (!_dates->endDate().isValid())
    {
        if(isVisible()) {
            QMessageBox::warning( this, tr("Enter End Date"),
                                  tr("Please enter a valid End Date.") );
            _dates->setFocus();
        }
        return FALSE;
    }

    return TRUE;
}

