/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
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
