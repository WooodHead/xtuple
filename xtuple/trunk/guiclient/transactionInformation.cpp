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

#include "transactionInformation.h"

#include <qvariant.h>
#include <qmessagebox.h>

/*
 *  Constructs a transactionInformation as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
transactionInformation::transactionInformation(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(_item, SIGNAL(newId(int)), _warehouse, SLOT(findItemsites(int)));
    connect(_item, SIGNAL(warehouseIdChanged(int)), _warehouse, SLOT(setId(int)));
    connect(_save, SIGNAL(clicked()), this, SLOT(sSave()));
    connect(_close, SIGNAL(clicked()), this, SLOT(reject()));
    init();

    //If not multi-warehouse hide whs control
    if (!_metrics->boolean("MultiWhs"))
    {
      _warehouseLit->hide();
      _warehouse->hide();
    }
}

/*
 *  Destroys the object and frees any allocated resources
 */
transactionInformation::~transactionInformation()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void transactionInformation::languageChange()
{
    retranslateUi(this);
}


void transactionInformation::init()
{
  _item->setReadOnly(TRUE);
}

enum SetResponse transactionInformation::set(ParameterList &pParams)
{
  QVariant param;
  bool     valid;

  param = pParams.value("invhist_id", &valid);
  if (valid)
  {
    _invhistid = param.toInt();

    q.prepare( "SELECT invhist_itemsite_id, invhist_transtype, invhist_analyze, invhist_user,"
               "       formatDateTime(invhist_transdate) AS f_datetime,"
               "       formatQty(invhist_invqty) AS f_qty,"
               "       formatQty(invhist_qoh_before) AS f_before,"
               "       formatQty(invhist_qoh_after) AS f_after,"
               "       invhist_comments "
               "FROM invhist "
               "WHERE (invhist_id=:invhist_id);" );
    q.bindValue(":invhist_id", _invhistid);
    q.exec();
    if (q.first())
    {
      _analyze->setChecked(q.value("invhist_analyze").toBool());
      _transactionType->setText(q.value("invhist_transtype").toString());
      _transactionDate->setText(q.value("f_datetime").toString());
      _username->setText(q.value("invhist_user").toString());
      _item->setItemsiteid(q.value("invhist_itemsite_id").toInt());
      _transactionQty->setText(q.value("f_qty").toString());
      _qohBefore->setText(q.value("f_before").toString());
      _qohAfter->setText(q.value("f_after").toString());
      _notes->setText(q.value("invhist_comments").toString());
    }
    else
      systemError( this, tr("A System Error occurred at transactionInformation::%1, invhist_id=%2.")
                         .arg(__LINE__)
                         .arg(_invhistid) );
  }

  param = pParams.value("mode", &valid);
  if (valid)
  {
    if (param.toString() == "edit")
      _mode = cEdit;
    else if (param.toString() == "view")
    {
      _mode = cView;

      _analyze->setEnabled(FALSE);

      _save->hide();
      _close->setText(tr("&Close"));
      _close->setFocus();
    }
  }

  return NoError;
}

void transactionInformation::sSave()
{
  q.prepare( "UPDATE invhist "
             "SET invhist_analyze=:invhist_analyze "
             "WHERE (invhist_id=:invhist_id);" );
  q.bindValue(":invhist_analyze", QVariant(_analyze->isChecked(), 0));
  q.bindValue(":invhist_id", _invhistid);
  q.exec();

  accept();
}

