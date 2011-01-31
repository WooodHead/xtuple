/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef __ClassCode_H__
#define __ClassCode_H__

#include <QDialog>

#include "ui_ClassCode.h"

class xtClassCode;

class ClassCode : public QDialog, public Ui::ClassCode
{
  Q_OBJECT

  public:
    ClassCode(xtClassCode * pcode, QWidget * parent = 0);
    virtual ~ClassCode();

  public slots:
    virtual void accept();

  private:
    xtClassCode * cc;
};

#endif // __ClassCode_H__
