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
 * The Original Code is xTuple ERP: PostBooks Edition 
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
 * Powered by xTuple ERP: PostBooks Edition
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

#include "pricingScheduleAssignments.h"

#include <QVariant>
#include <QMessageBox>
#include <QStatusBar>
#include <openreports.h>
#include <parameter.h>
#include "pricingScheduleAssignment.h"

/*
 *  Constructs a pricingScheduleAssignments as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
pricingScheduleAssignments::pricingScheduleAssignments(QWidget* parent, const char* name, Qt::WFlags fl)
    : XMainWindow(parent, name, fl)
{
  setupUi(this);

  (void)statusBar();

  // signals and slots connections
  connect(_print, SIGNAL(clicked()), this, SLOT(sPrint()));
  connect(_new, SIGNAL(clicked()), this, SLOT(sNew()));
  connect(_edit, SIGNAL(clicked()), this, SLOT(sEdit()));
  connect(_delete, SIGNAL(clicked()), this, SLOT(sDelete()));
  connect(_close, SIGNAL(clicked()), this, SLOT(close()));
  connect(_view, SIGNAL(clicked()), this, SLOT(sView()));
  connect(_ipsass, SIGNAL(valid(bool)), _view, SLOT(setEnabled(bool)));

  statusBar()->hide();
  
  _ipsass->addColumn(tr("Ship-To"),          _itemColumn, Qt::AlignCenter );
  _ipsass->addColumn(tr("Customer #"),       _itemColumn, Qt::AlignCenter );
  _ipsass->addColumn(tr("Cust. Name"),       150,         Qt::AlignCenter );
  _ipsass->addColumn(tr("Cust. Type"),       _itemColumn, Qt::AlignCenter );
  _ipsass->addColumn(tr("Pricing Schedule"), -1, Qt::AlignCenter );

  if (_privileges->check("AssignPricingSchedules"))
  {
    connect(_ipsass, SIGNAL(valid(bool)), _edit, SLOT(setEnabled(bool)));
    connect(_ipsass, SIGNAL(valid(bool)), _delete, SLOT(setEnabled(bool)));
    connect(_ipsass, SIGNAL(itemSelected(int)), _edit, SLOT(animateClick()));
  }
  else
  {
    _new->setEnabled(FALSE);
    connect(_ipsass, SIGNAL(itemSelected(int)), _view, SLOT(animateClick()));
  }

  sFillList();
}

/*
 *  Destroys the object and frees any allocated resources
 */
pricingScheduleAssignments::~pricingScheduleAssignments()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void pricingScheduleAssignments::languageChange()
{
    retranslateUi(this);
}

void pricingScheduleAssignments::sPrint()
{
  orReport report("PricingScheduleAssignments");
  if (report.isValid())
    report.print();
  else
    report.reportError(this);
}

void pricingScheduleAssignments::sNew()
{
  ParameterList params;
  params.append("mode", "new");

  pricingScheduleAssignment newdlg(this, "", TRUE);
  newdlg.set(params);

  if (newdlg.exec() != XDialog::Rejected)
    sFillList();
}

void pricingScheduleAssignments::sEdit()
{
  ParameterList params;
  params.append("mode", "edit");
  params.append("ipsass_id", _ipsass->id());

  pricingScheduleAssignment newdlg(this, "", TRUE);
  newdlg.set(params);

  if (newdlg.exec() != XDialog::Rejected)
    sFillList();
}

void pricingScheduleAssignments::sView()
{
  ParameterList params;
  params.append("mode", "view");
  params.append("ipsass_id", _ipsass->id());

  pricingScheduleAssignment newdlg(this, "", TRUE);
  newdlg.set(params);
  newdlg.exec();
}

void pricingScheduleAssignments::sDelete()
{
  q.prepare( "DELETE FROM ipsass "
             "WHERE (ipsass_id=:ipsass_id);" );
  q.bindValue(":ipsass_id", _ipsass->id());
  q.exec();

  sFillList();
}

void pricingScheduleAssignments::sFillList()
{
  _ipsass->populate( "SELECT ipsass_id,"
                     "       CASE WHEN (ipsass_shipto_id != -1) THEN (SELECT shipto_num FROM shipto WHERE (shipto_id=ipsass_shipto_id))"
                     "            WHEN (COALESCE(LENGTH(ipsass_shipto_pattern), 0) > 0) THEN ipsass_shipto_pattern"
                     "            ELSE TEXT('ANY')"
                     "       END AS shiptonum,"
                     "       CASE WHEN (ipsass_shipto_id != -1) THEN (SELECT cust_number FROM shipto, cust WHERE ((shipto_cust_id=cust_id) AND (shipto_id=ipsass_shipto_id))) "
                     "            WHEN (ipsass_cust_id=-1) THEN TEXT('Any')"
                     "            ELSE (SELECT cust_number FROM cust WHERE (cust_id=ipsass_cust_id))"
                     "       END AS custnumber,"
                     "       CASE WHEN (ipsass_shipto_id != -1) THEN (SELECT cust_name FROM shipto, cust WHERE ((shipto_cust_id=cust_id) AND (shipto_id=ipsass_shipto_id))) "
                     "            WHEN (ipsass_cust_id=-1) THEN ''"
                     "            ELSE (SELECT cust_name FROM cust WHERE (cust_id=ipsass_cust_id))"
                     "       END AS custname,"
                     "       CASE WHEN (ipsass_cust_id != -1) THEN TEXT('N/A')"
                     "            WHEN (ipsass_shipto_id != -1) THEN TEXT('N/A')"
                     "            WHEN (COALESCE(LENGTH(ipsass_shipto_pattern),0) > 0) THEN TEXT('N/A')"
                     "            WHEN (ipsass_custtype_id=-1) THEN ipsass_custtype_pattern"
                     "            ELSE (SELECT custtype_code FROM custtype WHERE (custtype_id=ipsass_custtype_id))"
                     "       END AS custtype,"
                     "       ipshead_name "
                     "FROM ipsass, ipshead "
                     "WHERE (ipshead_id=ipsass_ipshead_id) "
                     "ORDER BY custname, custtype;" );
}

