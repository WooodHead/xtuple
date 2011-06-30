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

#include <qapplication.h>
#include <qfontmetrics.h>
#include <qpainter.h>

#include "qlistboxvariant.h"

QListBoxVariant::QListBoxVariant(QListBox * listbox, const QVariant & var)
  : QListBoxItem(listbox) {
    _var = var;
}

QListBoxVariant::QListBoxVariant(const QVariant & var)
  : QListBoxItem() {
    _var = var;
}

QListBoxVariant::QListBoxVariant(QListBox* listbox, const QVariant & var, QListBoxItem *after) 
  : QListBoxItem(listbox, after) {
    _var = var;
}

QListBoxVariant::~QListBoxVariant() {
}

void QListBoxVariant::paint(QPainter * painter) {
    int itemHeight = height( listBox() );
    QFontMetrics fm = painter->fontMetrics();
    int yPos = ((itemHeight - fm.height()) / 2) + fm.ascent();
    painter->drawText(3, yPos, text());
}

int QListBoxVariant::height( const QListBox * lb ) const {
    int h = lb ? lb->fontMetrics().lineSpacing() + 2 : 0;
    return QMAX(h, QApplication::globalStrut().height());
}

int QListBoxVariant::width(const QListBox * lb) const {
    int w = lb ? lb->fontMetrics().width(text()) + 6 : 0;
    return QMAX(w, QApplication::globalStrut().width());
}

int QListBoxVariant::RTTI = 3546;

int QListBoxVariant::rtti() const {
    return RTTI;
}

QVariant QListBoxVariant::variant() const {
    return _var;
}

void QListBoxVariant::setVariant(const QVariant & var) {
    _var = var;
}

QString QListBoxVariant::text() const {
    QString value = _var.toString();
    QString type = _var.typeName();

    if(!type.isEmpty()) {
        value += " (" + type + ")";
    }
    return value;
}

