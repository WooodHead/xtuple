/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef SITETYPES_H
#define SITETYPES_H

#include "guiclient.h"
#include "xwidget.h"
#include <parameter.h>

#include "ui_siteTypes.h"

class siteTypes : public XWidget, public Ui::siteTypes
{
    Q_OBJECT

public:
    siteTypes(QWidget* parent = 0, const char* name = 0, Qt::WFlags fl = Qt::Window);
    ~siteTypes();

public slots:
    virtual void sPrint();
    virtual void sNew();
    virtual void sEdit();
    virtual void sView();
    virtual void sDelete();
    virtual void sPopulateMenu( QMenu * menu );
    virtual void sFillList();

protected slots:
    virtual void languageChange();

};

#endif // SITETYPES_H
