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

#include "rowcontroller.h"

RowController::RowController(Q3Table * table, int row, QObject * parent, const char * name)
  : QObject(parent, name)
{
  _row = row;
  _action = 0;
  _column = 0;
  _ifNull = 0;
  _altColumn = 0;
  _altIfNull = 0;
  _altValue = 0;
  connect(table, SIGNAL(valueChanged(int, int)), this, SLOT(valueChanged(int, int)));
}

RowController::~RowController()
{
  _row = 0;
  _action = 0;
  _column = 0;
  _ifNull = 0;
  _altColumn = 0;
  _altIfNull = 0;
  _altValue = 0;
}

void RowController::setAction(Q3ComboTableItem * combo)
{
  _action = combo;
}

void RowController::setColumn(QSpinBox * spinner)
{
  _column = spinner;
}

void RowController::setIfNull(Q3ComboTableItem * combo)
{
  _ifNull = combo;
}

void RowController::setAltColumn(QSpinBox * spinner)
{
  _altColumn = spinner;
}

void RowController::setAltIfNull(Q3ComboTableItem * combo)
{
  _altIfNull = combo;
}

void RowController::setAltValue(Q3TableItem * item)
{
  _altValue = item;
}

void RowController::finishSetup()
{
  if(!(_action && _column && _ifNull && _altColumn && _altIfNull && _altValue))
  {
    qDebug("RowController::finishSetup() called when not all values set.");
    return;
  }

  QString str = _action->currentText();
  if(str == "Default" || str == "UseEmptyString" || str == "UseNull")
  {
    _column->setEnabled(FALSE);
    _ifNull->setEnabled(FALSE);
    _altColumn->setEnabled(FALSE);
    _altIfNull->setEnabled(FALSE);
    _altValue->setEnabled(FALSE);
  }
  else if(str == "UseColumn")
  {
    _column->setEnabled(TRUE);
    _ifNull->setEnabled(TRUE);

    str = _ifNull->currentText();
    if(str == "Nothing" || str == "UseDefault" || str == "UseEmptyString")
    {
      _altColumn->setEnabled(FALSE);
      _altIfNull->setEnabled(FALSE);
      _altValue->setEnabled(FALSE);
    }
    else if(str == "UseAlternateValue")
    {
      _altColumn->setEnabled(FALSE);
      _altIfNull->setEnabled(FALSE);
      _altValue->setEnabled(TRUE);
    }
    else if(str == "UseAlternateColumn")
    {
      _altColumn->setEnabled(TRUE);
      _altIfNull->setEnabled(TRUE);

      str = _altIfNull->currentText();
      if(str == "UseAlternateValue")
        _altValue->setEnabled(TRUE);
      else
        _altValue->setEnabled(FALSE);
    }
  }
  else if(str == "UseAlternateValue")
  {
    _column->setEnabled(FALSE);
    _ifNull->setEnabled(FALSE);
    _altColumn->setEnabled(FALSE);
    _altIfNull->setEnabled(FALSE);
    _altValue->setEnabled(TRUE);
  }
}

void RowController::valueChanged(int row, int col)
{
  if(row == _row && (col == 4 || col == 6 || col == 8))
    finishSetup();
}
