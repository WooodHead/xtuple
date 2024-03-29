/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef DSPAPAPPLICATIONS_H
#define DSPAPAPPLICATIONS_H

#include "guiclient.h"

#include "xwidget.h"
#include <QMenu>

#include "ui_dspAPApplications.h"

class dspAPApplications : public XWidget, public Ui::dspAPApplications
{
    Q_OBJECT

  public:
    dspAPApplications(QWidget* parent = 0, const char* name = 0, Qt::WFlags fl = Qt::Window);
    ~dspAPApplications();

    virtual bool setParams(ParameterList &);

  public slots:
    virtual void sFillList();
    virtual void sPopulateMenu(QMenu*);
    virtual void sPrint();
    virtual void sViewCheck();
    virtual void sViewCreditMemo();
    virtual void sViewDebitMemo();
    virtual void sViewVoucher();

  protected slots:
    virtual void languageChange();

};

#endif // DSPARAPPLICATIONS_H
