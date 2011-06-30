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

#include "colorlist.h"
#include "coloreditor.h"

#include <QVariant>
#include <QMessageBox>

/*
 *  Constructs a ColorList as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
ColorList::ColorList(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : QDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(_btnClose, SIGNAL(clicked()), this, SLOT(accept()));
    connect(_btnAdd, SIGNAL(clicked()), this, SLOT(_btnAdd_clicked()));
    connect(_btnEdit, SIGNAL(clicked()), this, SLOT(_btnEdit_clicked()));
    connect(_btnDelete, SIGNAL(clicked()), this, SLOT(_btnDelete_clicked()));
    connect(_lbColors, SIGNAL(doubleClicked(Q3ListBoxItem*)), this, SLOT(_lbColors_dblClick(Q3ListBoxItem*)));
}

/*
 *  Destroys the object and frees any allocated resources
 */
ColorList::~ColorList()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void ColorList::languageChange()
{
    retranslateUi(this);
}

void ColorList::_btnAdd_clicked()
{
    if(!_colorMap) {
        QMessageBox::critical(this, tr("Error"),tr("This dialog was not properly setup and cannot perform the requested action!"),1,0,0);
        return;
    }
    ColorEditor ce(this);

    bool exitLoop = FALSE;
    while (!exitLoop)
    {
        if(ce.exec() == QDialog::Accepted) {
            QString name = ce.getColorName();
            QColor color = ce.getColor();

            if(name.length() < 1) {
                QMessageBox::warning(this, tr("Warning"),
                    tr("No color name was specified!\nPlease specify a name for this color."), 1, 0, 0);
            }
	        else if(_colorMap->contains(name)) {
                QMessageBox::warning(this, tr("Warning"),
                    tr("The color name you specified is already in use!\nPlease specify a UNIQUE name for this color."), 1, 0, 0);
            }
            else
            {
              _colorMap->insert(name, color);
              _lbColors->insertItem(name);
              exitLoop = TRUE;
            }
        } else {
            exitLoop = TRUE;
        }
    }
}

void ColorList::_lbColors_dblClick( Q3ListBoxItem * item )
{
    if(!_colorMap) {
        QMessageBox::critical(this, tr("Error"),tr("This dialog was not properly setup and cannot perform the requested action!"),1,0,0);
        return;
    }
    if(item != 0) {
        QString name = item->text();
        ColorEditor ce(this);
        ce.setColorName(name);
        ce.setColor((*_colorMap)[name]);
        bool exitLoop = FALSE;
        while(!exitLoop) {
            if(ce.exec() == QDialog::Accepted) {
                QString new_name = ce.getColorName();
                QColor  new_color = ce.getColor();

                if(new_name.length() < 1) {
                    QMessageBox::warning(this, tr("Warning"),
                        tr("No color name was specified!\nPlease specify a name for this color."), 1, 0, 0);
                }
                else if(new_name != name && _colorMap->contains(new_name)) {
                    QMessageBox::warning(this, tr("Warning"),
                        tr("The color name you specified is already in use!\nPlease specify a UNIQUE name for this color."), 1, 0, 0);
                }
                else
                {
                    if(new_name != name) {
                        _colorMap->remove(name);
                        _lbColors->changeItem(new_name, _lbColors->index(item));
                        name = new_name;
                    }

                    _colorMap->insert(name, new_color);

                    exitLoop = TRUE;
                }
            } else {
                exitLoop = TRUE;
            }
        }
    }
}

void ColorList::_btnEdit_clicked()
{
    int citem = _lbColors->currentItem();
    if(citem != -1) {
	    _lbColors_dblClick(_lbColors->item(citem));
    }
}

void ColorList::_btnDelete_clicked()
{
    if(!_colorMap) {
        QMessageBox::critical(this, tr("Error"),tr("This dialog was not properly setup and cannot perform the requested action!"),1,0,0);
        return;
    }

    int citem = _lbColors->currentItem();
    if(citem != -1) {
        QString name = _lbColors->text(citem);
        _colorMap->remove(name);
        _lbColors->removeItem(citem);
    }
}


void ColorList::init( QMap<QString, QColor> * cmap)
{
    _colorMap = cmap;

    QMapIterator<QString, QColor> cit(*_colorMap);
    while(cit.hasNext())
    {
        cit.next();
        _lbColors->insertItem(cit.key());
    }
}

