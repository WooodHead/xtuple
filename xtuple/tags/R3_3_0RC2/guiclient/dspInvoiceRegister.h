/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef DSPINVOICEREGISTER_H
#define DSPINVOICEREGISTER_H

#include "guiclient.h"
#include "xwidget.h"
#include <parameter.h>

#include "ui_dspInvoiceRegister.h"

class dspInvoiceRegister : public XWidget, public Ui::dspInvoiceRegister
{
    Q_OBJECT

public:
    dspInvoiceRegister(QWidget* parent = 0, const char* name = 0, Qt::WFlags fl = Qt::Window);
    ~dspInvoiceRegister();

    virtual bool setParams(ParameterList &params);

public slots:
    virtual enum SetResponse set( const ParameterList & pParams );
    virtual void sPopulateMenu( QMenu * );
    virtual void sPrint();
    virtual void sFillList();
    virtual void sViewCreditMemo();
    virtual void sViewInvoice();

protected slots:
    virtual void languageChange();

};

#endif // DSPINVOICEREGISTER_H
