/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2007 by OpenMFG, LLC
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 * Please contact info@openmfg.com with any questions on this license.
 */

#ifndef PAGESETUP_H
#define PAGESETUP_H

#include <QtGui/QDialog>

#include "ui_pagesetup.h"

class PageSetup : public QDialog, public Ui::PageSetup
{
    Q_OBJECT

public:
    PageSetup(QWidget* parent = 0, const char* name = 0, bool modal = false, Qt::WFlags fl = 0);
    ~PageSetup();

public slots:
    virtual void cbPaperSize_activated( const QString & str );
    virtual QString getPaperSize();
    virtual double getPaperWidth();
    virtual double getPaperHeight();
    virtual void setPaperSize( const QString & str );
    virtual void setPaperSize( double w, double h );
    virtual double getMarginBottom();
    virtual double getMarginLeft();
    virtual double getMarginRight();
    virtual double getMarginTop();
    virtual void setMargins( double t, double b, double l, double r );
    virtual bool isPortrait();
    virtual void setPortrait( bool yes );
    virtual const QString getLabelType();
    virtual void setLabelType( const QString & type );
    virtual void init();

protected slots:
    virtual void languageChange();

    virtual void enableCustom( bool yes );
    virtual void enableLabels( bool yes );


};

#endif // PAGESETUP_H
