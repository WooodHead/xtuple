/*
 * Copyright (c) 2002-2007 by OpenMFG, LLC
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * If you do not wish to be bound by the terms of the GNU General Public
 * License, DO NOT USE THIS SOFTWARE.  Please contact OpenMFG, LLC at
 * info@openmfg.com for details on how to purchase a commercial license.
 */

#ifndef RENDERWINDOW_H
#define RENDERWINDOW_H

#include <QMainWindow>
#include <QMap>

#include "ui_renderwindow.h"

class RenderWindow : public QMainWindow, public Ui::RenderWindow
{
    Q_OBJECT

public:
    RenderWindow(QWidget* parent = 0, const char* name = 0, Qt::WFlags fl = Qt::WType_TopLevel);
    ~RenderWindow();

    QString _printerName;

    virtual ParameterList getParameterList();

public slots:
    virtual void helpAbout();
    virtual void fileOpen();
    virtual void fileOpen( const QString & filename );
    virtual void filePrint();
    virtual void filePrintToPDF();
    // BVI::Sednacom
    // declare the new member
    virtual void filePrintToPDF( QString & pdfFileName );
    // BVI::Sednacom
    virtual void fileExit();
    virtual void updateParam( const QString & name, const QVariant & value, bool active );

protected:
    QMap<QString, QList<QPair<QString,QString> > > _lists;
    QDomDocument _doc;
    QMap<QString,QVariant> _params;

protected slots:
    virtual void languageChange();

    virtual void sAdd();
    virtual void sEdit();
    virtual void sDelete();
    virtual void sSelectionChanged();
    virtual void sList();
};

#endif // RENDERWINDOW_H
