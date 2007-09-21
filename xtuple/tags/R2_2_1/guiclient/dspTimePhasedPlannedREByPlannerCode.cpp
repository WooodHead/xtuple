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

#include "dspTimePhasedPlannedREByPlannerCode.h"

#include <qvariant.h>
#include <qstatusbar.h>
#include <qmessagebox.h>
#include <parameter.h>
#include "rptTimePhasedPlannedREByPlannerCode.h"
#include "OpenMFGGUIClient.h"

/*
 *  Constructs a dspTimePhasedPlannedREByPlannerCode as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
dspTimePhasedPlannedREByPlannerCode::dspTimePhasedPlannedREByPlannerCode(QWidget* parent, const char* name, Qt::WFlags fl)
    : QMainWindow(parent, name, fl)
{
    setupUi(this);

    (void)statusBar();

    QButtonGroup* _costsGroupInt = new QButtonGroup(this);
    _costsGroupInt->addButton(_useStandardCost);
    _costsGroupInt->addButton(_useActualCost);

    QButtonGroup* _salesPriceGroupInt = new QButtonGroup(this);
    _salesPriceGroupInt->addButton(_useListPrice);
    _salesPriceGroupInt->addButton(_useAveragePrice);

    // signals and slots connections
    connect(_query, SIGNAL(clicked()), this, SLOT(sFillList()));
    connect(_print, SIGNAL(clicked()), this, SLOT(sPrint()));
    connect(_close, SIGNAL(clicked()), this, SLOT(close()));
    connect(_calendar, SIGNAL(newCalendarId(int)), _periods, SLOT(populate(int)));
    connect(_useAveragePrice, SIGNAL(toggled(bool)), _startEvalDateLit, SLOT(setEnabled(bool)));
    connect(_useAveragePrice, SIGNAL(toggled(bool)), _startEvalDate, SLOT(setEnabled(bool)));
    connect(_useAveragePrice, SIGNAL(toggled(bool)), _endEvalDateLit, SLOT(setEnabled(bool)));
    connect(_useAveragePrice, SIGNAL(toggled(bool)), _endEvalDate, SLOT(setEnabled(bool)));
    connect(_calendar, SIGNAL(select(ParameterList&)), _periods, SLOT(load(ParameterList&)));
    init();
}

/*
 *  Destroys the object and frees any allocated resources
 */
dspTimePhasedPlannedREByPlannerCode::~dspTimePhasedPlannedREByPlannerCode()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void dspTimePhasedPlannedREByPlannerCode::languageChange()
{
    retranslateUi(this);
}


void dspTimePhasedPlannedREByPlannerCode::init()
{
  statusBar()->hide();

  _plannerCode->setType(PlannerCode);

  _plannedRE->addColumn("", 80, Qt::AlignRight);
}

void dspTimePhasedPlannedREByPlannerCode::sPrint()
{
  ParameterList params;
  params.append("print");
  _periods->getSelected(params);
  _warehouse->appendValue(params);
  _plannerCode->appendValue(params);

  if (_useStandardCost->isChecked())
    params.append("standardCost");
  else if (_useActualCost->isChecked())
    params.append("actualCost");

  if (_useListPrice->isChecked())
    params.append("listPrice");
  else if (_useAveragePrice->isChecked())
  {
    params.append("averagePrice");
    params.append("startDate", _startEvalDate->date());
    params.append("endDate", _endEvalDate->date());
  }

  rptTimePhasedPlannedREByPlannerCode newdlg(this, "", TRUE);
  newdlg.set(params);
}

void dspTimePhasedPlannedREByPlannerCode::sFillList()
{
  if(_useAveragePrice->isChecked() && !(_startEvalDate->isValid() && _endEvalDate->isValid()))
  {
    QMessageBox::information(this, tr("Average Price Requires Dates"),
                                   tr("The Average Price option requires that you specify a valid\n"
                                      "date range to evaluate the average price."));
    return;
  }

  _plannedRE->clear();

  while (_plannedRE->columns() > 1)
    _plannedRE->removeColumn(1);

  QString       sql("SELECT ");

  bool show    = FALSE;
  int  columns = 1;
  XListViewItem *cursor = _periods->firstChild();
  if (cursor)
  {
    do
    {
      if (_periods->isSelected(cursor))
      {
        if (show)
          sql += ",";
        else
          show = TRUE;

        sql += QString(" SUM(plannedCost(plancode_id, warehous_id, '%1', %2)) AS cost%3,")
               .arg((_useStandardCost->isChecked()) ? 'S' : 'A')
               .arg(cursor->id())
               .arg(columns);

        if (_useListPrice->isChecked())
          sql += QString(" SUM(plannedRevenue(plancode_id, warehous_id, 'L', %1)) AS revenue%2 ")
                 .arg(cursor->id())
                 .arg(columns++);
        else
          sql += QString(" SUM(plannedRevenue(plancode_id, warehous_id, 'A', %1, date('%2'), date('%3'))) AS revenue%4 ")
                 .arg(cursor->id())
                 .arg(_startEvalDate->dateString())
                 .arg(_endEvalDate->dateString())
                 .arg(columns++);

        _plannedRE->addColumn(formatDate(((PeriodListViewItem *)cursor)->startDate()), _qtyColumn, Qt::AlignRight);

        _columnDates.append(DatePair(((PeriodListViewItem *)cursor)->startDate(), ((PeriodListViewItem *)cursor)->endDate()));
      }
    }
    while ((cursor = cursor->nextSibling()));
  }

  if (show)
  {
    sql += " FROM plancode, warehous";

    if (_warehouse->isSelected())
      sql += " WHERE ( (warehous_id=:warehous_id)";

    if (_plannerCode->isSelected())
    {
      if (_warehouse->isSelected())
        sql += " AND (plancode_id=:plancode_id)";
      else
        sql += " WHERE ( (plancode_id=:plancode_id)";
    }
    else if (_plannerCode->isPattern())
    {
      if (_warehouse->isSelected())
        sql += " AND (plancode_code ~ :plancode_pattern)";
      else
        sql += " WHERE ( (plancode_code ~ :plancode_pattern)";
    }

    if ( (_warehouse->isSelected()) || (!_plannerCode->isAll()) )
      sql += ");";
    else
      sql += ";";

    q.prepare(sql);
    _warehouse->bindValue(q);
    _plannerCode->bindValue(q);
    q.exec();
    if (q.first())
    {
      XListViewItem *cost    = new XListViewItem( _plannedRE, 0, QVariant(tr("Cost")),
                                                  formatMoney(q.value("cost1").toDouble()) );

      XListViewItem *revenue = new XListViewItem( _plannedRE, cost, 0, QVariant(tr("Revenue")),
                                                  formatMoney(q.value("revenue1").toDouble()) );

      XListViewItem *profit  = new XListViewItem( _plannedRE, revenue,  0, QVariant(tr("Gross Profit")),
                                                  formatMoney(q.value("revenue1").toDouble() - q.value("cost1").toDouble() ) );
                       
      for (int bucketCounter = 1; bucketCounter < columns; bucketCounter++)
      {
        cost->setText(bucketCounter, formatMoney(q.value(QString("cost%1").arg(bucketCounter)).toDouble()));
        revenue->setText(bucketCounter, formatMoney(q.value(QString("revenue%1").arg(bucketCounter)).toDouble()));

        profit->setText( bucketCounter,
                         formatMoney( q.value(QString("revenue%1").arg(bucketCounter)).toDouble() -
                                      q.value(QString("cost%1").arg(bucketCounter)).toDouble() ) );
      }
    }
  }
}

