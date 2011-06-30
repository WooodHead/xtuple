/*
 * Copyright (c) 2002-2006 by OpenMFG, LLC
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

#ifndef SECTIONEDITOR_H
#define SECTIONEDITOR_H

class ReportWindow;

#include <QtGui/QDialog>

#include "ui_sectioneditor.h"

class SectionEditor : public QDialog, public Ui::SectionEditor
{
    Q_OBJECT

public:
    SectionEditor(QWidget* parent = 0, const char* name = 0, bool modal = false, Qt::WFlags fl = 0);
    ~SectionEditor();

public slots:
    virtual void btnAdd_clicked();
    virtual void btnEdit_clicked();
    virtual void btnRemove_clicked();
    virtual void btnMoveUp_clicked();
    virtual void brnMoveDown_clicked();
    virtual void cbReportHeader_toggled( bool yes );
    virtual void cbReportFooter_toggled( bool yes );
    virtual void cbHeadFirst_toggled( bool yes );
    virtual void cbHeadLast_toggled( bool yes );
    virtual void cbHeadEven_toggled( bool yes );
    virtual void cbHeadOdd_toggled( bool yes );
    virtual void cbFootFirst_toggled( bool yes );
    virtual void cbFootLast_toggled( bool yes );
    virtual void cbFootEven_toggled( bool yes );
    virtual void cbFootOdd_toggled( bool yes );
    virtual void init( ReportWindow * rw );
    virtual void cbHeadAny_toggled( bool yes );
    virtual void cbFootAny_toggled( bool yes );

protected:
    ReportWindow * rw;

protected slots:
    virtual void languageChange();

};

#endif // SECTIONEDITOR_H
