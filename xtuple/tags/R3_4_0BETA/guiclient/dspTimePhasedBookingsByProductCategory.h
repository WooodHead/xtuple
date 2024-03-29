/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef DSPTIMEPHASEDBOOKINGSBYPRODUCTCATEGORY_H
#define DSPTIMEPHASEDBOOKINGSBYPRODUCTCATEGORY_H

#include "xwidget.h"
#include <QList>
#include <parameter.h>
#include "ui_dspTimePhasedBookingsByProductCategory.h"

class dspTimePhasedBookingsByProductCategory : public XWidget, public Ui::dspTimePhasedBookingsByProductCategory
{
    Q_OBJECT

public:
    dspTimePhasedBookingsByProductCategory(QWidget* parent = 0, const char* name = 0, Qt::WFlags fl = Qt::Window);
    ~dspTimePhasedBookingsByProductCategory();

    virtual ParameterList buildParameters();

public slots:
    virtual void sPrint();
    virtual void sViewBookings();
    virtual void sPopulateMenu( QMenu * pMenu, QTreeWidgetItem * pSelected, int pColumn );
    virtual void sFillList();
    virtual void sSubmit();

protected slots:
    virtual void languageChange();

private:
    int _column;
    QList<DatePair> _columnDates;

};

#endif // DSPTIMEPHASEDBOOKINGSBYPRODUCTCATEGORY_H
