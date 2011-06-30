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

#ifndef __XSQLQUERY_H__
#define __XSQLQUERY_H__

#include <qsqlquery.h>

class XSqlQueryPrivate;

class XSqlQuery : public QSqlQuery
{
  public:
    XSqlQuery();
    XSqlQuery(QSqlDatabase);
    XSqlQuery(QSqlResult *);
    XSqlQuery(const QString &, QSqlDatabase db = QSqlDatabase());
    XSqlQuery(const QSqlQuery &);
    XSqlQuery(const XSqlQuery &);
    virtual ~XSqlQuery();
    XSqlQuery & operator=(const XSqlQuery &);

    virtual QVariant value(int i) const;
    virtual QVariant value(const char *) const;
    virtual QVariant value(const QString &) const;

    virtual bool first();
    virtual bool next();
    virtual bool prev();

    virtual int count();

    virtual bool prepare(const char *);
    virtual void bindValue(const char *, const QVariant &);

    virtual bool exec();
    bool exec(const char *);

    virtual int findFirst(int, int);
    virtual int findFirst(const QString &, int);
    virtual int findFirst(const QString &, const QString &);

    void trackFieldTotal(QString &);
    double getFieldTotal(QString &);
    double getFieldSubTotal(QString &);
    void resetSubTotals();
    void resetSubTotalsCurrent();

  private:
    XSqlQueryPrivate * _data;
};

#endif
