/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef __ClassCodeList_H__
#define __ClassCodeList_H__

#include <QWidget>

#include <set>

#include "ui_ClassCodeList.h"

class xtClassCode;

class ClassCodeList : public QWidget, protected Ui::ClassCodeList
{
  Q_OBJECT

  public:
    ClassCodeList();
    virtual ~ClassCodeList();

  public slots:
    virtual void sQuery();
    virtual void sEdit();
    virtual void sNew();
};

#endif // __ClassCodeList_H__

