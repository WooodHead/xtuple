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

#ifndef __LISTBOXREPORTITEM_H__
#define __LISTBOXREPORTITEM_H__

#include <q3listbox.h>

class ListBoxReportItem : public Q3ListBoxText
{
  public:
    ListBoxReportItem(const QString & name, int grade = 0);
    ListBoxReportItem(Q3ListBox * listbox, const QString & name, int grade = 0);
    ListBoxReportItem(Q3ListBox * listbox, const QString & name, int grade, Q3ListBoxItem * after);
    virtual ~ListBoxReportItem();

    QString report() const { return _name; }
    void setReport(const QString & name);

    int grade() const { return _grade; }
    void setGrade(int grade);

    int rtti() const;
    static int RTTI;

  protected:
    QString _name;
    int _grade;
};

#endif

