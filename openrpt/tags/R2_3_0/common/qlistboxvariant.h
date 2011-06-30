/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2008 by OpenMFG, LLC
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

#ifndef __QLISTBOXVARIANT_H__
#define __QLISTBOXVARIANT_H__

#include <q3listbox.h>
#include <qvariant.h>

class QListBoxVariant : public Q3ListBoxItem {
    public:
        QListBoxVariant(Q3ListBox * listbox, const QVariant & var = QVariant());
        QListBoxVariant(const QVariant & var = QVariant());
        QListBoxVariant(Q3ListBox * listbox, const QVariant & var, Q3ListBoxItem * after);
        ~QListBoxVariant();

        int height(const Q3ListBox * lb) const;
        int width(const Q3ListBox * lb) const;

        QString text() const;

        int rtti() const;
        static int RTTI;

        QVariant variant() const;
        void setVariant(const QVariant &);

    protected:
        void paint(QPainter *);

        QVariant _var;

    private:	// Disabled copy constructor and operator=
#if defined(Q_DISABLE_COPY)
        QListBoxVariant( const QListBoxVariant & );
        QListBoxVariant &operator=(const QListBoxVariant & );
#endif
};

#endif

