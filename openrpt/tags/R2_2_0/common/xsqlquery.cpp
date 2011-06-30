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

#include <QSqlRecord>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>
#include <QSqlDriver>
#include <QSqlResult>
#include <QCursor>
#include <QApplication>
#include <QMap>

#include "xsqlquery.h"

class XSqlQueryPrivate {
public:
  XSqlQueryPrivate() {}
  XSqlQueryPrivate(const XSqlQueryPrivate & p)
  {
    *this = p;
  }
  virtual ~XSqlQueryPrivate() {}

  XSqlQueryPrivate & operator=(const XSqlQueryPrivate & p)
  {
    _fieldTotals = p._fieldTotals;
    _fieldSubTotals = p._fieldSubTotals;
    return *this;
  }

  QMap<QString, double> _fieldTotals;
  QMap<QString, double> _fieldSubTotals;
};

static QList<XSqlQueryErrorListener*> _errorListeners;

static void notifyErrorListeners(XSqlQuery * source)
{
  if(!source)
    return;

  XSqlQueryErrorListener * listener = 0;
  for(int i = 0; i < _errorListeners.size(); i++)
  {
    listener = _errorListeners.at(i);
    if(listener)
      listener->error(source->executedQuery(), source->lastError());
  }
}


XSqlQueryErrorListener::XSqlQueryErrorListener() {}
XSqlQueryErrorListener::~XSqlQueryErrorListener()
{
  XSqlQuery::removeErrorListener(this);
}

XSqlQuery::XSqlQuery() :
  QSqlQuery()
{
  _data = 0;
}

XSqlQuery::XSqlQuery(QSqlDatabase db) :
  QSqlQuery(db)
{
  _data = 0;
}

XSqlQuery::XSqlQuery(QSqlResult * r) :
  QSqlQuery(r)
{
  _data = 0;
}

XSqlQuery::XSqlQuery(const QString &pSql, QSqlDatabase db) :
  QSqlQuery(QString::null, db)
{
  _data = 0;
  qApp->setOverrideCursor(Qt::WaitCursor);
  exec(pSql.toAscii().data());
  qApp->restoreOverrideCursor();
}

XSqlQuery::XSqlQuery(const QSqlQuery & other) :
  QSqlQuery(other)
{
  _data = 0;
}

XSqlQuery::XSqlQuery(const XSqlQuery & other) :
  QSqlQuery(other)
{
  _data = 0;
  if (other._data)
    _data = new XSqlQueryPrivate(*other._data);
}

XSqlQuery::~XSqlQuery()
{
  if (_data)
    delete _data;
  _data = 0;
}

XSqlQuery & XSqlQuery::operator=(const XSqlQuery & other)
{
  if (other._data)
  {
    if (_data)
      *_data = *other._data;
    else
      _data = new XSqlQueryPrivate(*other._data);
  }
  else
  {
    if (_data)
      delete _data;
    _data = 0;
  }
  
  QSqlQuery::operator=(other);
  return *this;
}

QVariant XSqlQuery::value(int i) const
{
  return QSqlQuery::value(i);
}

QVariant XSqlQuery::value(const char *pName) const
{
  return value(QString(pName));
}

QVariant XSqlQuery::value(const QString & name) const
{
  if (name.isEmpty()) 
    return QVariant();

  QSqlRecord r = record();
  if (!r.isEmpty())
    return value(r.indexOf(name));

  return QVariant();
}

int XSqlQuery::count()
{
  QSqlRecord rec = record();

  if (!rec.isEmpty())
    return rec.count();
  else
    return 0;
}

bool XSqlQuery::exec()
{
  qApp->setOverrideCursor(Qt::WaitCursor);
  bool returnValue = QSqlQuery::exec();
  qApp->restoreOverrideCursor();

  if(false == returnValue)
    notifyErrorListeners(this);

  return returnValue;
}

bool XSqlQuery::exec(const char *pSql)
{
  qApp->setOverrideCursor(Qt::WaitCursor);
  bool returnValue = QSqlQuery::exec(QString(pSql));
  qApp->restoreOverrideCursor();

  if(false == returnValue)
    notifyErrorListeners(this);

  return returnValue;
}

bool XSqlQuery::prepare(const char *pSql)
{
  bool ret;
  ret = QSqlQuery::prepare(QString(pSql));
  bindValue(":firstnullfix", QVariant());
  return ret;
}

void XSqlQuery::bindValue(const char *pName, const QVariant &pValue)
{
  QSqlQuery::bindValue(QString(pName), pValue);
}

bool XSqlQuery::first()
{
  if (QSqlQuery::first())
  {
    if (_data)
    {
      // initial all our values
      resetSubTotals();
      QMapIterator<QString,double> mit(_data->_fieldTotals);
      while(mit.hasNext())
      {
        mit.next();
        _data->_fieldTotals[mit.key()] = value(mit.key()).toDouble();
        _data->_fieldSubTotals[mit.key()] = value(mit.key()).toDouble();
      }
    }
    return TRUE;
  }
  return FALSE;
}

bool XSqlQuery::next()
{
  if (QSqlQuery::next())
  {
    if (_data)
    {
      // increment all our values
      QMapIterator<QString,double> mit(_data->_fieldTotals);
      while(mit.hasNext())
      {
        mit.next();
        _data->_fieldTotals[mit.key()] += value(mit.key()).toDouble();
        _data->_fieldSubTotals[mit.key()] += value(mit.key()).toDouble();
      }
    }
    return TRUE;
  }
  return FALSE;
}

bool XSqlQuery::previous()
{
  if (!_data)
    return QSqlQuery::previous();

  QMap<QString,double> delta;
  QMapIterator<QString,double> mit(_data->_fieldTotals);
  while(mit.hasNext())
  {
    mit.next();
    delta[mit.key()] = value(mit.key()).toDouble();
  }
  if (QSqlQuery::previous())
  {
    mit = delta;
    while(mit.hasNext())
    {
      mit.next();
      _data->_fieldTotals[mit.key()] -= mit.value();
      _data->_fieldSubTotals[mit.key()] -= mit.value();
    }
    return TRUE;
  }
  return FALSE;
}

bool XSqlQuery::prev()
{
  return previous();
}

void XSqlQuery::trackFieldTotal(QString & fld)
{
  if (!_data)
    _data = new XSqlQueryPrivate();

  if (!_data->_fieldTotals.contains(fld))
      _data->_fieldTotals[fld] = 0.0;

  if (!_data->_fieldSubTotals.contains(fld))
      _data->_fieldSubTotals[fld] = 0.0;
}

double XSqlQuery::getFieldTotal(QString & fld)
{
  if (_data)
  {
    if (_data->_fieldTotals.contains(fld))
      return _data->_fieldTotals[fld];
  }
  return 0.0;
}

double XSqlQuery::getFieldSubTotal(QString & fld)
{
  if (_data)
    if (_data->_fieldSubTotals.contains(fld))
      return _data->_fieldSubTotals[fld];

  return 0.0;
}

void XSqlQuery::resetSubTotals()
{
  if (_data)
  {
    // initial all our values to 0.0
    QMapIterator<QString,double> mit(_data->_fieldSubTotals);
    while(mit.hasNext())
    {
      mit.next();
      _data->_fieldSubTotals[mit.key()] = 0.0;
    }
  }
}

void XSqlQuery::resetSubTotalsCurrent()
{
  if (_data)
  {
    // initial all our values to the absolute value of the current record
    QMapIterator<QString,double> mit(_data->_fieldTotals);
    while(mit.hasNext())
    {
      mit.next();
      _data->_fieldSubTotals[mit.key()] = value(mit.key()).toDouble();
    }
  }
}

int XSqlQuery::findFirst(int pField, int pTarget)
{
  if (first())
  {
    do
    {
      if (value(pField).toInt() == pTarget)
        return at();
    }
    while (next());
  }

  return -1;
}

int XSqlQuery::findFirst(const QString &pField, int pTarget)
{
  if (first())
  {
    do
    {
      if (value(pField).toInt() == pTarget)
        return at();
    }
    while (next());
  }

  return -1;
}

int XSqlQuery::findFirst(const QString &pField, const QString &pTarget)
{
  if (first())
  {
    do
    {
      if (value(pField).toString() == pTarget)
        return at();
    }
    while (next());
  }

  return -1;
}

void XSqlQuery::addErrorListener(XSqlQueryErrorListener* listener)
{
  if(!_errorListeners.contains(listener))
    _errorListeners.append(listener);
}

void XSqlQuery::removeErrorListener(XSqlQueryErrorListener* listener)
{
  int i = _errorListeners.indexOf(listener);
  while(-1 != i)
  {
    _errorListeners.removeAt(i);
    i = _errorListeners.indexOf(listener);
  }
}

