/*
 * Copyright (c) 2002-2005 by OpenMFG, LLC
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

#ifndef __QUERYSOURCE_H__
#define __QUERYSOURCE_H__

#include <qobject.h>
#include <qstring.h>
#include <qptrlist.h>

class QuerySourceList;

class QuerySource
{
  public:
    QuerySource();
    QuerySource(const QString & n, const QString & q = QString::null);
    ~QuerySource();

    void setName(const QString &);
    QString name();
    void setQuery(const QString &);
    QString query();

  private:
    QString _name;
    QString _query;

    friend class QuerySourceList;
    QuerySourceList *_inList;
    void updated();
};

class QuerySourceList : public QObject
{
  Q_OBJECT
  public:
    QuerySourceList(QObject * parent = 0, const char * name = 0);
    ~QuerySourceList();

    unsigned int size();

    bool add(QuerySource * qs);

    QuerySource * remove(int i);
    QuerySource * remove(QuerySource * qs);
    QuerySource * remove(const QString & name);

    QuerySource * get(int i);
    QuerySource * get(const QString & name);

  signals:
    void updated();

  private:
    QPtrList<QuerySource> _srcList;

    friend class QuerySource;
    void childUpdated(QuerySource *);
};

#endif
