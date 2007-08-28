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

#include "dspARAging.h"

#include <QVariant>
#include <QMessageBox>
#include <openreports.h>
#include "rptARAging.h"

/*
 *  Constructs a dspARAging as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
dspARAging::dspARAging(QWidget* parent, const char* name, Qt::WFlags fl)
    : QMainWindow(parent, name, fl)
{
  setupUi(this);

  (void)statusBar();

  // signals and slots connections
  connect(_close, SIGNAL(clicked()), this, SLOT(close()));
  connect(_query, SIGNAL(clicked()), this, SLOT(sFillList()));
  connect(_print, SIGNAL(clicked()), this, SLOT(sPrint()));
  connect(_calendar, SIGNAL(newCalendarId(int)), this, SLOT(sCalendarSelected(int)));

  _date->setDate( omfgThis->dbDate() );
  
  _list->addColumn( tr("Period/Customer"),          -1, Qt::AlignLeft   );
  _list->addColumn( tr("Doc. Type"),      _orderColumn, Qt::AlignLeft   );
  _list->addColumn( tr("Doc. Number"),     _itemColumn, Qt::AlignLeft   );
  _list->addColumn( tr("Due Date"),        _dateColumn, Qt::AlignCenter );
  _list->addColumn( tr("Balance"),     _bigMoneyColumn, Qt::AlignRight  );
}

/*
 *  Destroys the object and frees any allocated resources
 */
dspARAging::~dspARAging()
{
  // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void dspARAging::languageChange()
{
  retranslateUi(this);
}

void dspARAging::sPrint()
{
  ParameterList params;
  params.append("calhead_id", _calendar->id());
  params.append("date", _date->date());
  params.append("relDate", _date->date());
  params.append("print");

  rptARAging newdlg(this, "", TRUE);
  newdlg.set(params);
}

void dspARAging::sCalendarSelected( int id )
{
  q.prepare("SELECT calhead_type"
                "  FROM calhead"
                " WHERE (calhead_id=:calheadid); ");
  q.bindValue(":calheadid", id);
  q.exec();
  if( q.first() && (q.value("calhead_type").toString() == "A") )
    _date->setEnabled(false);
  else
    _date->setEnabled(true);
}

void dspARAging::sFillList()
{
  _list->clear();

  q.prepare("SELECT calitem_id, (calitem_name || '  (' || calitem_periodstart || '-' || calitem_periodend || ')') AS period,"
            "       cust_id, (cust_number || '-' || cust_name) AS customer,"
            "       aropen_id, aropen_doctype, aropen_docnumber, formatDate(aropen_duedate) AS f_duedate,"
            "       formatMoney((aropen_amount - aropen_paid) * CASE WHEN(aropen_doctype IN ('C', 'R')) THEN -1 ELSE 1 END) AS f_balance,"
            "       ((aropen_amount - aropen_paid) * CASE WHEN(aropen_doctype IN ('C', 'R')) THEN -1 ELSE 1 END) AS balance"
            "  FROM aropen, cust,"
            "       ( SELECT rcalitem_id AS calitem_id,"
            "                rcalitem_name AS calitem_name,"
            "                (findPeriodStart(rcalitem_id) + COALESCE(:offset,0)) AS calitem_periodstart,"
            "                (findPeriodEnd(rcalitem_id) + COALESCE(:offset,0)) AS calitem_periodend"
            "           FROM rcalitem"
            "          WHERE (rcalitem_calhead_id=:calhead_id)"
            "          UNION"
            "         SELECT acalitem_id AS calitem_id,"
            "                acalitem_name AS calitem_name,"
            "                findPeriodStart(acalitem_id) AS calitem_periodstart,"
            "                findPeriodEnd(acalitem_id) AS calitem_periodend"
            "           FROM acalitem"
            "          WHERE (acalitem_calhead_id=:calhead_id) ) AS calitem"
            " WHERE ((aropen_cust_id=cust_id)"
            "   AND  (aropen_duedate BETWEEN calitem_periodstart AND calitem_periodend)"
            "   AND  ((aropen_amount - aropen_paid) > 0))"
            " ORDER BY calitem_periodstart DESC, cust_number, aropen_duedate;");
  q.bindValue(":calhead_id", _calendar->id());
  q.bindValue(":offset", omfgThis->dbDate().daysTo(_date->date()));
  q.exec();

  XListViewItem * period = 0;
  XListViewItem * cust   = 0;
  XListViewItem * last   = 0;
  int periodid = -1;
  double periodtotal = 0.0;
  int custid   = -1;
  double custtotal = 0.0;
  while(q.next())
  {
    if(q.value("calitem_id").toInt() != periodid)
    {
      if(period)
      {
        if(cust)
          last = new XListViewItem(cust, last, -1, -1, "", "", tr("Subtotal:"), "", formatMoney(custtotal));
        last = new XListViewItem(period, cust, -1, -1, tr("Total:"), "", "", "", formatMoney(periodtotal));
      }
      periodid = q.value("calitem_id").toInt();
      last = period = new XListViewItem(_list, period, periodid, 1, q.value("period"));
      periodtotal = 0;
      cust = 0;
      custid = -1;
      custtotal = 0;
    }

    if(q.value("cust_id").toInt() != custid)
    {
      if(cust)
        last = new XListViewItem(cust, last, -1, -1, "", "", tr("Subtotal:"), "", formatMoney(custtotal));
      custid = q.value("cust_id").toInt();
      last = cust = new XListViewItem(period, cust, custid, 2, q.value("customer"));
      custtotal = 0;
    }

    last = new XListViewItem(cust, last, q.value("aropen_id").toInt(), 3,
      "", q.value("aropen_doctype"), q.value("aropen_docnumber"),
      q.value("f_duedate"), q.value("f_balance"));

    custtotal += q.value("balance").toDouble();
    periodtotal += q.value("balance").toDouble();
  }

  if(period)
  {
    if(cust)
      last = new XListViewItem(cust, last, -1, -1, "", "", tr("Subtotal:"), "", formatMoney(custtotal));
    last = new XListViewItem(period, cust, -1, -1, tr("Total:"), "", "", "", formatMoney(periodtotal));
  }

  _list->openAll();
}

