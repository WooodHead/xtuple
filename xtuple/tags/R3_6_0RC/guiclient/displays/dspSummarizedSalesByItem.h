/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef DSPSUMMARIZEDSALESBYITEM_H
#define DSPSUMMARIZEDSALESBYITEM_H

#include "display.h"

#include "ui_dspSummarizedSalesByItem.h"

class dspSummarizedSalesByItem : public display, public Ui::dspSummarizedSalesByItem
{
    Q_OBJECT

public:
    dspSummarizedSalesByItem(QWidget* parent = 0, const char* name = 0, Qt::WFlags fl = Qt::Window);

    virtual bool setParams(ParameterList & params);

public slots:
    virtual void sPopulateMenu(QMenu * menuThis, QTreeWidgetItem*, int);
    virtual void sViewDetail();

protected slots:
    virtual void languageChange();

};

#endif // DSPSUMMARIZEDSALESBYITEM_H
