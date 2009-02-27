/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef __ROWCONTROLLER_H__
#define __ROWCONTROLLER_H__

#include <QObject>
#include <Q3Table>
#include <QSpinBox>

class RowController : public QObject
{
  Q_OBJECT
  public:
    RowController(Q3Table * table, int row, QObject* parent, const char * name = 0);
    virtual ~RowController();

    void setAction(Q3ComboTableItem*);
    void setColumn(QSpinBox*);
    void setIfNull(Q3ComboTableItem*);
    void setAltColumn(QSpinBox*);
    void setAltIfNull(Q3ComboTableItem*);
    void setAltValue(Q3TableItem*);

    void finishSetup();

  protected slots:
    void valueChanged(int row, int col);

  private:
    int _row;
    Q3ComboTableItem * _action;    // 4
    QSpinBox * _column;           // 5
    Q3ComboTableItem * _ifNull;    // 6
    QSpinBox * _altColumn;        // 7
    Q3ComboTableItem * _altIfNull; // 8
    Q3TableItem * _altValue;       // 9
};

#endif

