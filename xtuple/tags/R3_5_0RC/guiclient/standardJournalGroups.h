/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef STANDARDJOURNALGROUPS_H
#define STANDARDJOURNALGROUPS_H

#include "guiclient.h"
#include "xwidget.h"
#include "ui_standardJournalGroups.h"

class standardJournalGroups : public XWidget, public Ui::standardJournalGroups
{
    Q_OBJECT

public:
    standardJournalGroups(QWidget* parent = 0, const char* name = 0, Qt::WFlags fl = Qt::Window);
    ~standardJournalGroups();

    virtual void init();

public slots:
    virtual void sNew();
    virtual void sPost();
    virtual void sEdit();
    virtual void sView();
    virtual void sDelete();
    virtual void sFillList();
    virtual void sPopulateMenu( QMenu * );
    virtual void sPrint();

protected slots:
    virtual void languageChange();

};

#endif // STANDARDJOURNALGROUPS_H
