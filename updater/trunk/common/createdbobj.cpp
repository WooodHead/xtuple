/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "createdbobj.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QRegExp>
#include <QSqlError>
#include <QVariant>

#include "metasql.h"
#include "xsqlquery.h"

#define DEBUG false

CreateDBObj::CreateDBObj()
{
}

CreateDBObj::CreateDBObj(const QString &nodename, const QString &filename,
                         const QString &name,     const QString &comment,
                         const QString &schema,   OnError onError)
{
  _comment  = comment;
  _filename = filename;
  _name     = name;
  _nodename = nodename;
  _oidMql   = 0;
  _schema   = schema;
  _onError  = onError;
}

CreateDBObj::CreateDBObj(const QDomElement & elem, QStringList &msg, QList<bool> &fatal)
{
  _nodename = elem.nodeName();

  if (elem.hasAttribute("name"))
    _name = elem.attribute("name");
  else
  {
    msg.append(TR("The contents.xml must name the object for %1.")
               .arg(_nodename));
    fatal.append("false");
  }

  if (elem.hasAttribute("file"))
    _filename = elem.attribute("file");
  else
  {
    msg.append(TR("The contents.xml must name the file for %1.")
               .arg(_nodename));
    fatal.append(true);
  }

  if (elem.hasAttribute("schema"))
    _schema = elem.attribute("schema");

  if (elem.hasAttribute("onerror"))
    _onError = nameToOnError(elem.attribute("onerror"));

  _comment = elem.text().trimmed();
}

CreateDBObj::~CreateDBObj()
{
}

QDomElement CreateDBObj::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement(_nodename);

  elem.setAttribute("file", _filename);

  if (! _name.isEmpty())
    elem.setAttribute("name", _name);

  if (! _schema.isEmpty())
    elem.setAttribute("schema", _schema);

  if (!_comment.isEmpty())
    elem.appendChild(doc.createTextNode(_comment));

  return elem;
}

// this differs from the version it was copied from in loadable.cpp
int CreateDBObj::upsertPkgItem(const QString &destschema, const int itemid,
                               QString &errMsg)
{
  if (DEBUG)
    qDebug("CreateDbObj::upsertPkgItem(%s, %d, &errMsg)",
           qPrintable(destschema), itemid);

  if ("public" == destschema)
    return 0;

  int pkgitemid = -1;
  int pkgheadid = -1;

  XSqlQuery select;
  select.prepare("SELECT COALESCE(pkgitem_id, -1), pkghead_id "
                 "FROM pkghead LEFT OUTER JOIN"
                 "     pkgitem ON ((pkgitem_pkghead_id=pkghead_id)"
                 "            AND  (pkgitem_type=:type)"
                 "            AND  (pkgitem_name=:name))"
                 "WHERE (pkghead_name=:pkgname);");
  select.bindValue(":pkgname", destschema);
  select.bindValue(":type",    _pkgitemtype);
  select.bindValue(":name",    _name);
  select.exec();
  if (select.first())
  {
    pkgitemid = select.value(0).toInt();
    pkgheadid = select.value(1).toInt();
  }
  if (select.lastError().type() != QSqlError::NoError)
  {
    errMsg = _sqlerrtxt.arg(_filename)
                      .arg(select.lastError().databaseText())
                      .arg(select.lastError().driverText());
    return -20;
  }

  XSqlQuery upsert;

  if (pkgitemid >= 0)
    upsert.prepare("UPDATE pkgitem SET pkgitem_descrip=:descrip,"
                   "       pkgitem_item_id=:itemid "
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
      return -21;
    }
    upsert.prepare("INSERT INTO pkgitem ("
                   "    pkgitem_id, pkgitem_pkghead_id, pkgitem_type,"
                   "    pkgitem_item_id, pkgitem_name, pkgitem_descrip"
                   ") VALUES ("
                   "    :id, :headid, :type,"
                   "    :itemid, :name, :descrip);");
  }

  upsert.bindValue(":id",      pkgitemid);
  upsert.bindValue(":headid",  pkgheadid);
  upsert.bindValue(":type",    _pkgitemtype);
  upsert.bindValue(":itemid",  itemid);
  upsert.bindValue(":name",    _name);
  upsert.bindValue(":descrip", _comment);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -22;
  }

  return pkgitemid;
}

int CreateDBObj::writeToDB(const QByteArray &pdata, const QString pkgname,
                           ParameterList &params, QString &errMsg)
{
  if (DEBUG)
    qDebug("CreateDBObj::writeToDB(%s, %s, &errMsg)",
           pdata.data(), qPrintable(pkgname));

  QString destschema;
  if (! _schema.isEmpty())
    destschema = _schema;
  else if (pkgname.isEmpty())
    destschema = "public";
  else if (! pkgname.isEmpty())
    destschema = pkgname;

  int returnVal = Script::writeToDB(pdata, pkgname, errMsg);
  if (returnVal < 0)
    return returnVal;

  params.append("name", _name);
  params.append("schema", destschema);

  XSqlQuery oidq = _oidMql->toQuery(params);
  if (oidq.first())
  {
    int tmp = upsertPkgItem(destschema, oidq.value(0).toInt(), errMsg);
    if (tmp < 0)
      return tmp;
  }
  else if (oidq.lastError().type() != QSqlError::NoError)
  {
    errMsg = _sqlerrtxt.arg(_filename)
                       .arg(oidq.lastError().databaseText())
                       .arg(oidq.lastError().driverText());
    return -7;
  }
  else // not found
  {
    errMsg = TR("Could not find %1 in the database. The "
                "script %2 does not match the package.xml description.")
            .arg(_name).arg(_filename);
    return -8;
  }

  return returnVal;
}
