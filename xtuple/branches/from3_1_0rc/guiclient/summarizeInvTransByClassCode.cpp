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

#include "summarizeInvTransByClassCode.h"

#include <qvariant.h>
#include "qmessagebox.h"

/*
 *  Constructs a summarizeInvTransByClassCode as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
summarizeInvTransByClassCode::summarizeInvTransByClassCode(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : XDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(_close, SIGNAL(clicked()), this, SLOT(reject()));
    connect(_summarize, SIGNAL(clicked()), this, SLOT(sSummarize()));
    init();
}

/*
 *  Destroys the object and frees any allocated resources
 */
summarizeInvTransByClassCode::~summarizeInvTransByClassCode()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void summarizeInvTransByClassCode::languageChange()
{
    retranslateUi(this);
}


void summarizeInvTransByClassCode::init()
{
  _classCode->setType(ParameterGroup::ClassCode);
}

void summarizeInvTransByClassCode::sSummarize()
{
  if ( QMessageBox::warning( this, tr("Summarize Inventory Transactions?"),
                             tr( "<p>You are about to summarize Inventory Transactions for the selected Site and Class Code(s). "
                                 "Summarizing Inventory Transactions will delete any detailed Transaction information.<br>"
                                 "Are you sure that you want to summarize the selected Transactions?</p>" ),
                             tr("&Yes"), tr("&No"), QString::null, 0, 1) == 1)
  {
    reject();
    return;
  }

  QString sql( "SELECT summarizeTransactions(itemsite_id, :startDate, :endDate) AS result "
               "FROM itemsite, item "
               "WHERE ( (itemsite_item_id=item_id)" );

  if (_warehouse->isSelected())
    sql += " AND (itemsite_warehous_id=:warehous_id)";

  if (_classCode->isSelected())
    sql += " AND (item_classcode_id=:classcode_id)";
  else if (_classCode->isPattern())
    sql += " AND (item_classcode_id IN (SELECT classcode_id FROM classcode WHERE (classcode_code ~ :classcode_pattern)))";

  sql += ");";

  q.prepare(sql);
  _warehouse->bindValue(q);
  _classCode->bindValue(q);
  _dates->bindValue(q);
  q.exec();

  QMessageBox::information( this, tr("Summary Complete"),
                            tr("The selected Inventory Transactions have been summarized.") );
}
