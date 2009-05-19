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

QString Loadable::_sqlerrtxt = TR("<font color=red>The following error was "
                                  "encountered while trying to import %1 into "
                                  "the database:<br>%2<br>%3</font>");
QString Loadable::_pkgitemQueryStr("SELECT COALESCE(pkgitem_item_id, -1),"
                                   "       pkghead_id,"
                                   "       COALESCE(pkgitem_id,      -1) "
                                   "  FROM pkghead LEFT OUTER JOIN"
                                   "       pkgitem ON ((pkgitem_pkghead_id=pkghead_id)"
                                   "               AND (pkgitem_type=:type)"
                                   "               AND (pkgitem_name=:name))"
                                   " WHERE (pkghead_name=:pkgname)");

Loadable::Loadable(const QString &nodename, const QString &name,
                   const int grade, const bool system, const QString &comment,
                   const QString &filename)
{
  _nodename = nodename;
  _name     = name;
  _grade    = grade;
  _system   = system;
  _comment  = comment;
  _filename = (filename.isEmpty() ? name : filename);
}

Loadable::Loadable(const QDomElement & elem, const bool system,
                   QStringList &/*msg*/, QList<bool> &/*fatal*/)
{
  _system = system;
  _nodename = elem.nodeName();

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

  if (elem.hasAttribute("file"))
    _filename = elem.attribute("file");
  else
    _filename = _name;

  if (elem.hasAttribute("onerror"))
    _onError = Script::nameToOnError(elem.attribute("onerror"));
  else
    _onError = Script::nameToOnError("Stop");

  _comment = elem.text().trimmed();
}

Loadable::~Loadable()
{
}

QDomElement Loadable::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement(_nodename);
  elem.setAttribute("name", _name);
  elem.setAttribute("grade", _grade);
  elem.setAttribute("file", _filename);

  if(!_comment.isEmpty())
    elem.appendChild(doc.createTextNode(_comment));

  return elem;
}

int Loadable::upsertPkgItem(int &pkgitemid, const int pkgheadid,
                            const int itemid, QString &errMsg)
{
  if (pkgheadid < 0)
    return 0;

  XSqlQuery select;
  XSqlQuery upsert;

  if (pkgitemid >= 0)
    upsert.prepare("UPDATE pkgitem SET pkgitem_descrip=:descrip "
                   "WHERE (pkgitem_id=:id);");
  else
  {
    upsert.exec("SELECT NEXTVAL('pkgitem_pkgitem_id_seq');");
    if (upsert.first())
      pkgitemid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -20;
    }
    upsert.prepare("INSERT INTO pkgitem ("
                   "    pkgitem_id, pkgitem_pkghead_id, pkgitem_type,"
                   "    pkgitem_item_id, pkgitem_name, pkgitem_descrip"
                   ") VALUES ("
                   "    :id, :headid, :type,"
                   "    :itemid, :name, :descrip);");
    upsert.bindValue(":headid",  pkgheadid);
    upsert.bindValue(":type",    _pkgitemtype);
    upsert.bindValue(":itemid",  itemid);
    upsert.bindValue(":name",    _name);
  }

  upsert.bindValue(":id",      pkgitemid);
  upsert.bindValue(":descrip", _comment);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -21;
  }

  return pkgitemid;
}
