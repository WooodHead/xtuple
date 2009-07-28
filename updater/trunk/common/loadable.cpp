/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "loadable.h"

#include <QDomDocument>
#include <QRegExp>
#include <QSqlError>
#include <QVariant>     // used by XSqlQuery::value()
#include <limits.h>

#include "xsqlquery.h"

QRegExp Loadable::trueRegExp("^t(rue)?$",   Qt::CaseInsensitive);
QRegExp Loadable::falseRegExp("^f(alse)?$", Qt::CaseInsensitive);

QString Loadable::_sqlerrtxt = TR("The following error was "
                                  "encountered while trying to import %1 into "
                                  "the database:<br>%2<br>%3");
MetaSQLQuery Loadable::_pkgitemMql("SELECT COALESCE(pkgitem_item_id, -1),"
                                   "       pkghead_id,"
                                   "       COALESCE(pkgitem_id,      -1) "
                                   "  FROM pkghead LEFT OUTER JOIN"
                                   "       pkgitem ON ((pkgitem_pkghead_id=pkghead_id)"
                                   "               AND (pkgitem_type=<? value(\"type\") ?>)"
                                   "               AND (pkgitem_name=<? value(\"name\") ?>))"
                                   " WHERE (pkghead_name=<? value(\"pkgname\") ?>)");

Loadable::Loadable(const QString &nodename, const QString &name,
                   const int grade, const bool system, const QString &schema,
                   const QString &comment,
                   const QString &filename)
{
  _nodename = nodename;
  _name     = name;
  _grade    = grade;
  _system   = system;
  _schema   = schema;
  _comment  = comment;
  _filename = (filename.isEmpty() ? name : filename);

  _minMql    = 0;
  _maxMql    = 0;
  _selectMql = 0;
  _insertMql = 0;
  _updateMql = 0;
}

Loadable::Loadable(const QDomElement & elem, const bool system,
                   QStringList &/*msg*/, QList<bool> &/*fatal*/)
{
  _system = system;
  _nodename = elem.nodeName();
  _grade = 0;

  if (elem.hasAttribute("name"))
    _name   = elem.attribute("name");

  if (elem.hasAttribute("grade"))
  {
    if (elem.attribute("grade").contains("highest", Qt::CaseInsensitive))
      _grade = INT_MAX;
    else if (elem.attribute("grade").contains("lowest", Qt::CaseInsensitive))
      _grade = INT_MIN;
    else
      _grade = elem.attribute("grade").toInt();
  }
  else if (elem.hasAttribute("order"))
  {
    if (elem.attribute("order").contains("highest", Qt::CaseInsensitive))
      _grade = INT_MAX;
    else if (elem.attribute("order").contains("lowest", Qt::CaseInsensitive))
      _grade = INT_MIN;
    else
      _grade = elem.attribute("order").toInt();
  }

  if (elem.hasAttribute("file"))
    _filename = elem.attribute("file");
  else
    _filename = _name;

  if (elem.hasAttribute("schema"))
    _schema = elem.attribute("schema");

  if (elem.hasAttribute("onerror"))
    _onError = Script::nameToOnError(elem.attribute("onerror"));
  else
    _onError = Script::nameToOnError("Stop");

  _comment = elem.text().trimmed();

  _minMql    = 0;
  _maxMql    = 0;
  _selectMql = 0;
  _insertMql = 0;
  _updateMql = 0;
}

Loadable::~Loadable()
{
  if (_minMql)    delete _minMql;
  if (_maxMql)    delete _maxMql;
  if (_selectMql) delete _selectMql;
  if (_insertMql) delete _insertMql;
  if (_updateMql) delete _updateMql;
}

QDomElement Loadable::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement(_nodename);
  elem.setAttribute("name", _name);
  elem.setAttribute("grade", _grade);
  elem.setAttribute("file", _filename);
  if (! _schema.isEmpty())
    elem.setAttribute("schema", _schema);

  if(!_comment.isEmpty())
    elem.appendChild(doc.createTextNode(_comment));

  return elem;
}

int Loadable::writeToDB(const QByteArray &pdata, const QString pkgname,
                        QString &errMsg, ParameterList &params)
{
  params.append("name",   _name);
  params.append("type",   _pkgitemtype);
  params.append("source", QString(pdata));
  params.append("notes",  _comment);
  if (! pkgname.isEmpty())
  {
    params.append("pkgname", pkgname);

    // yuck - no Parameter::operator==(Parameter&) and no replace()
    QString tablename = params.value("tablename").toString();
    for (int i = 0; i < params.size(); i++)
    {
      if (params.at(i).name() == "tablename")
      {
        params.takeAt(i);
        params.append("tablename", "pkg" + tablename);
        break;
      }
    }
  }

  if (_minMql && _minMql->isValid() && _grade == INT_MIN)
  {
    XSqlQuery minOrder = _minMql->toQuery(params);
    if (minOrder.first())
      _grade = minOrder.value(0).toInt();
    else if (minOrder.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = minOrder.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -3;
    }
    else
      _grade = 0;
  }
  else if (_maxMql && _maxMql->isValid() && _grade == INT_MAX)
  {
    XSqlQuery maxOrder = _maxMql->toQuery(params);
    if (maxOrder.first())
      _grade = maxOrder.value(0).toInt();
    else if (maxOrder.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = maxOrder.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -4;
    }
    else
      _grade = 0;
  }

  params.append("grade", _grade);

  XSqlQuery select;
  int itemid    = -1;
  int pkgheadid = -1;
  int pkgitemid = -1;
  if (pkgname.isEmpty())
    select = _selectMql->toQuery(params);
  else
    select = _pkgitemMql.toQuery(params);

  if (select.first())
  {
    itemid    = select.value(0).toInt();
    pkgheadid = select.value(1).toInt();
    pkgitemid = select.value(2).toInt();
  }
  else if (select.lastError().type() != QSqlError::NoError)
  {
    QSqlError err = select.lastError();
    errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
    return -5;
  }
  params.append("id",     itemid);

  XSqlQuery upsert;
  if (itemid >= 0)
    upsert = _updateMql->toQuery(params);
  else
    upsert = _insertMql->toQuery(params);

  if (upsert.first())
    itemid = upsert.value("id").toInt();
  else if (upsert.lastError().type() != QSqlError::NoError)
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_filename)
                .arg(err.driverText())
                .arg(err.databaseText());
    return -7;
  }

  if (pkgheadid >= 0)
  {
    int tmp = upsertPkgItem(pkgitemid, pkgheadid, itemid, errMsg);
    if (tmp < 0)
      return tmp;
  }

  return itemid;
}

int Loadable::upsertPkgItem(int &pkgitemid, const int pkgheadid,
                            const int itemid, QString &errMsg)
{
  if (pkgheadid < 0)
    return 0;

  XSqlQuery select;
  XSqlQuery upsert;

  if (pkgitemid >= 0)
  {
    upsert.prepare("UPDATE pkgitem SET pkgitem_descrip=:descrip "
                   "WHERE (pkgitem_id=:id) "
                   "RETURNING pkgitem_id;");
    upsert.bindValue(":id",      pkgitemid);
  }
  else
  {
    upsert.prepare("INSERT INTO pkgitem ("
                   "    pkgitem_id, pkgitem_pkghead_id, pkgitem_type,"
                   "    pkgitem_item_id, pkgitem_name, pkgitem_descrip"
                   ") VALUES ("
                   "    DEFAULT, :headid, :type,"
                   "    :itemid, :name, :descrip) "
                   "RETURNING pkgitem_id;");
    upsert.bindValue(":headid",  pkgheadid);
    upsert.bindValue(":type",    _pkgitemtype);
    upsert.bindValue(":itemid",  itemid);
    upsert.bindValue(":name",    _name);
  }

  upsert.bindValue(":descrip", _comment);

  upsert.exec();
  if (upsert.first())
    pkgitemid = upsert.value("pkgitem_id").toInt();
  else if (upsert.lastError().type() != QSqlError::NoError)
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -21;
  }

  return pkgitemid;
}
