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

#ifndef __PAGESIZEINFO_H__
#define __PAGESIZEINFO_H__

#include <qstring.h>

class PageSizeInfo
{
  public:
    PageSizeInfo(const QString&, int, int, int);
    PageSizeInfo();
    virtual ~PageSizeInfo();

    const QString & name();
    const int qpValue();
    const int width();
    const int height();
    const int area();

    bool isNull();

    static const PageSizeInfo & getByName(const QString &);
    static const PageSizeInfo & getByValue(int);

  protected:
    QString _name;
    int _qpValue;
    int _width;
    int _height;

    int _area;
    bool _null;
};

#endif
