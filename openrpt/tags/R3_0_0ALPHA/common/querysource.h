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

#ifndef __QUERYSOURCE_H__
#define __QUERYSOURCE_H__

#include <QObject>
#include <QString>
#include <QList>

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
    QuerySourceList(QObject * parent = 0);
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
    QList<QuerySource*> _srcList;

    friend class QuerySource;
    void childUpdated(QuerySource *);
};

#endif
