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

#include "sectioneditor.h"
#include "detailsectiondialog.h"
#include "reportwindow.h"
#include "reportsection.h"

#include <QVariant>
#include <QComboBox>
#include <QLineEdit>
#include <QMessageBox>

#include <querysource.h>

/*
 *  Constructs a SectionEditor as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
SectionEditor::SectionEditor(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(buttonOk, SIGNAL(clicked()), this, SLOT(accept()));
    connect(btnAdd, SIGNAL(clicked()), this, SLOT(btnAdd_clicked()));
    connect(btnEdit, SIGNAL(clicked()), this, SLOT(btnEdit_clicked()));
    connect(btnRemove, SIGNAL(clicked()), this, SLOT(btnRemove_clicked()));
    connect(btnMoveUp, SIGNAL(clicked()), this, SLOT(btnMoveUp_clicked()));
    connect(brnMoveDown, SIGNAL(clicked()), this, SLOT(brnMoveDown_clicked()));
    connect(cbReportHeader, SIGNAL(toggled(bool)), this, SLOT(cbReportHeader_toggled(bool)));
    connect(cbReportFooter, SIGNAL(toggled(bool)), this, SLOT(cbReportFooter_toggled(bool)));
    connect(cbHeadFirst, SIGNAL(toggled(bool)), this, SLOT(cbHeadFirst_toggled(bool)));
    connect(cbHeadLast, SIGNAL(toggled(bool)), this, SLOT(cbHeadLast_toggled(bool)));
    connect(cbHeadEven, SIGNAL(toggled(bool)), this, SLOT(cbHeadEven_toggled(bool)));
    connect(cbHeadOdd, SIGNAL(toggled(bool)), this, SLOT(cbHeadOdd_toggled(bool)));
    connect(cbFootFirst, SIGNAL(toggled(bool)), this, SLOT(cbFootFirst_toggled(bool)));
    connect(cbFootLast, SIGNAL(toggled(bool)), this, SLOT(cbFootLast_toggled(bool)));
    connect(cbFootEven, SIGNAL(toggled(bool)), this, SLOT(cbFootEven_toggled(bool)));
    connect(cbFootOdd, SIGNAL(toggled(bool)), this, SLOT(cbFootOdd_toggled(bool)));
    connect(cbHeadAny, SIGNAL(toggled(bool)), this, SLOT(cbHeadAny_toggled(bool)));
    connect(cbFootAny, SIGNAL(toggled(bool)), this, SLOT(cbFootAny_toggled(bool)));
}

/*
 *  Destroys the object and frees any allocated resources
 */
SectionEditor::~SectionEditor()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void SectionEditor::languageChange()
{
    retranslateUi(this);
}

void SectionEditor::btnAdd_clicked()
{
    // lets add a new section
    QString name = "unnamed";
    int i = 0;
    while(i < 100 && rw->findSection(name) != -1) {
	    i++;
	    name = QString().sprintf("unnamed%d", i);
    }
    if(rw->findSection(name) != -1) {
        QMessageBox::warning(this, tr("Error Encountered"), tr("Unable to add a new section because a non-unique name could be generated."));
	    return;
    }
    ReportSectionDetail * rsd = new ReportSectionDetail(rw,rw->vbox);
    rsd->setTitle(name);
    rw->insertSection(rw->detailSectionCount(), rsd);
    lbSections->insertItem(name);
    lbSections->setCurrentItem(lbSections->count()-1);
    btnEdit_clicked();
}

void SectionEditor::btnEdit_clicked()
{
    // get which ever item is currently selected and edit it
    if(!rw) return;
    int idx = lbSections->currentItem();
    if(idx < 0) return;
    DetailSectionDialog * dsd = new DetailSectionDialog(this);
    ReportSectionDetail * rsd = rw->getSection(idx);
    dsd->setReportSectionDetail(rsd);
    dsd->tbName->setText(rsd->getTitle());
    dsd->breakAtEnd->setChecked(rsd->pageBreak()==ReportSectionDetail::BreakAtEnd);
    dsd->cbQuery->clear();
    int selected_item = -1;
    for(unsigned int i = 0; i < rw->qsList->size(); i++) {
        dsd->cbQuery->insertItem(rw->qsList->get(i)->name());
        if(rw->qsList->get(i)->name() == rsd->query()) {
            selected_item = i;
            dsd->cbQuery->setCurrentItem(i);
        }
    }
    if(selected_item == -1) {
        // set a value of some kind so the user knows the 
        // current value is invalid
        dsd->cbQuery->insertItem(tr("-- Select Query --"),0);
    }
    
    // because of some changes we take the changes regardless
    bool exitLoop = FALSE;
    while(!exitLoop) {
        dsd->exec();
    
        QString name = dsd->tbName->text();
        QString query = dsd->cbQuery->currentText();
        if(query == tr("-- Select Query --")) query = QString::null;
        bool breakatend = dsd->breakAtEnd->isChecked();

        if(name != rsd->getTitle() && rw->findSection(name) != -1) {
            QMessageBox::warning(this, tr("Error Encountered"),
                tr("Tried to add a new Detail section with a non-unique name."));
        } else {
            if(name != rsd->getTitle()) {
                rsd->setTitle(name);
                lbSections->changeItem(name,idx);
            }

            rsd->setQuery(query);
            if(breakatend)
              rsd->setPageBreak(ReportSectionDetail::BreakAtEnd);
            else
              rsd->setPageBreak(ReportSectionDetail::BreakNone);

            exitLoop = TRUE;
        }
    }
	
    if(dsd) delete dsd;
}

void SectionEditor::btnRemove_clicked()
{
   // get the selected item and delete it
    if(rw) {
        int idx = lbSections->currentItem();
        if(idx != -1) {
           lbSections->removeItem(idx);
           rw->removeSection(idx, TRUE);
        }
    }
}

void SectionEditor::btnMoveUp_clicked()
{
    if(rw) {
        // get the selected item and move it up in the list
        int idx = lbSections->currentItem();
        if(idx <= 0) return;
        QString s = lbSections->currentText();
        lbSections->removeItem(idx);
        lbSections->insertItem(s, idx-1);
        ReportSectionDetail * rsd = rw->getSection(idx);
        rw->removeSection(idx);
        rw->insertSection(idx-1,rsd);
        rw->setModified(TRUE);
    }
}

void SectionEditor::brnMoveDown_clicked()
{
    if(rw) {
        // get the selectged item and move it down in the list
        int idx = lbSections->currentItem();
        if(idx == (int)(lbSections->count() - 1)) return;
        QString s = lbSections->currentText();
        lbSections->removeItem(idx);
        lbSections->insertItem(s, idx+1);
        ReportSectionDetail * rsd = rw->getSection(idx);
        rw->removeSection(idx);
        rw->insertSection(idx+1,rsd);
        rw->setModified(TRUE);
    }
}

void SectionEditor::cbReportHeader_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertReportHead();
        } else {
            rw->removeReportHead();
        }
    }

}

void SectionEditor::cbReportFooter_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertReportFoot();
        } else {
            rw->removeReportFoot();
        }
    }

}

void SectionEditor::cbHeadFirst_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageHeadFirst();
        } else {
            rw->removePageHeadFirst();
        }
    }

}

void SectionEditor::cbHeadLast_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageHeadLast();
        } else {
            rw->removePageHeadLast();
        }
    }

}

void SectionEditor::cbHeadEven_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageHeadEven();
        } else {
            rw->removePageHeadEven();
        }
    }

}

void SectionEditor::cbHeadOdd_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageHeadOdd();
        } else {
            rw->removePageHeadOdd();
        }
    }

}

void SectionEditor::cbFootFirst_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageFootFirst();
        } else {
            rw->removePageFootFirst();
        }
    }

}

void SectionEditor::cbFootLast_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageFootLast();
        } else {
            rw->removePageFootLast();
        }
    }

}

void SectionEditor::cbFootEven_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageFootEven();
        } else {
            rw->removePageFootEven();
        }
    }

}

void SectionEditor::cbFootOdd_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageFootOdd();
        } else {
            rw->removePageFootOdd();
        }
    }

}


void SectionEditor::init( ReportWindow * rw )
{
    this->rw = NULL;
    // set all the properties

    cbReportHeader->setChecked(rw->getReportHead()!=NULL);
    cbReportFooter->setChecked(rw->getReportFoot()!=NULL);

    cbHeadFirst->setChecked(rw->getPageHeadFirst()!=NULL);
    cbHeadOdd->setChecked(rw->getPageHeadOdd()!=NULL);
    cbHeadEven->setChecked(rw->getPageHeadEven()!=NULL);
    cbHeadLast->setChecked(rw->getPageHeadLast()!=NULL);
    cbHeadAny->setChecked(rw->getPageHeadAny()!=NULL);

    cbFootFirst->setChecked(rw->getPageFootFirst()!=NULL);
    cbFootOdd->setChecked(rw->getPageFootOdd()!=NULL);
    cbFootEven->setChecked(rw->getPageFootEven()!=NULL);
    cbFootLast->setChecked(rw->getPageFootLast()!=NULL);
    cbFootAny->setChecked(rw->getPageFootAny()!=NULL);

    lbSections->clear();
    for(int i = 0; i < rw->detailSectionCount(); i++) {
        lbSections->insertItem(rw->getSection(i)->getTitle());
    }

    // now set the rw value
    this->rw = rw;
}

void SectionEditor::cbHeadAny_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageHeadAny();
        } else {
            rw->removePageHeadAny();
        }
    }
}

void SectionEditor::cbFootAny_toggled( bool yes )
{
    if(rw != NULL) {
        if(yes) {
            rw->insertPageFootAny();
        } else {
            rw->removePageFootAny();
        }
    }
}
