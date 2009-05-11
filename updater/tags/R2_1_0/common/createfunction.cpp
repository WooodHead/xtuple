/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "createfunction.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

#define DEBUG false

CreateFunction::CreateFunction(const QString &filename, 
                               const QString &name, const QString &comment,
                               const OnError onError)
  : CreateDBObj("createfunction", filename, name, comment, onError)
{
  _pkgitemtype = "F";
}

CreateFunction::CreateFunction(const QDomElement &elem, QStringList &msg, QList<bool> &fatal)
  : CreateDBObj(elem, msg, fatal)
{
  _pkgitemtype = "F";

  if (elem.nodeName() != "createfunction")
  {
    msg.append(TR("Creating a CreateFunction element from a %1 node.")
              .arg(elem.nodeName()));
    fatal.append(false);
  }
}

int CreateFunction::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  if (DEBUG)
    qDebug("CreateFunction::writeToDb(%s, %s, &errMsg)",
           pdata.data(), qPrintable(pkgname));

  QSqlQuery oidq;
  QMap<QString,int> oldoids;

  if (! pkgname.isEmpty())
  {
    oidq.prepare("SELECT pg_proc.oid, oidvectortypes(proargtypes) "
                 "FROM pg_proc, pg_namespace "
                 "WHERE ((pg_namespace.oid=pronamespace)"
                 "  AND  (proname=:name)"
                 "  AND  (nspname=:schema));");
    oidq.bindValue(":name",   _name);
    oidq.bindValue(":schema", pkgname);

    oidq.exec();
    while (oidq.next())
    {
      oldoids.insert(oidq.value(1).toString(), oidq.value(0).toInt());
    }
    if (oidq.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_filename)
                        .arg(oidq.lastError().databaseText())
                        .arg(oidq.lastError().driverText());
      return -1;
    }
    if (DEBUG)
    {
      QMap<QString, int>::const_iterator i = oldoids.constBegin();
      while (i != oldoids.constEnd())
      {
        qDebug("CreateFunction::writeToDB() %s(%s) -> %d",
               qPrintable(_name), qPrintable(i.key()), i.value());
        i++;
      }
    }
  }

  int returnVal = Script::writeToDB(pdata, pkgname, errMsg);
  if (returnVal < 0)
    return returnVal;

  if (! pkgname.isEmpty())
  {
    QSqlQuery select;
    int pkgheadid = -1;
    select.prepare("SELECT pkghead_id FROM pkghead WHERE (pkghead_name=:name);");
    select.bindValue(":name", pkgname);
    select.exec();
    if (select.first())
      pkgheadid = select.value(0).toInt();
    else if (select.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_filename)
                        .arg(select.lastError().databaseText())
                        .arg(select.lastError().driverText());
      return -4;
    }

    oidq.exec();        // reuse the query
    int count = 0;
    while (oidq.next())
    {
      if (DEBUG)
        qDebug("CreateFunction::writeToDB() oid = %d, argtypes = %s",
               oidq.value(0).toInt(), qPrintable(oidq.value(1).toString()));
      int tmp = upsertPkgItem(pkgheadid, oldoids,
                              oidq.value(1).toString(), oidq.value(0).toInt(),
                              errMsg);
      if (tmp < 0)
        return tmp;
      count++;
    }
    if (oidq.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_filename)
                        .arg(oidq.lastError().databaseText())
                        .arg(oidq.lastError().driverText());
      return -5;
    }
    if (count == 0)
    {
      errMsg = TR("Could not find function %1 in the database for package %2. "
                  "The script %3 does not match the contents.xml description.")
                .arg(_name).arg(pkgname).arg(_filename);
      return -6;
    }
  }

  return 0;
}

// the value of pkgitem_name differs from the version in createdbobj.cpp
int CreateFunction::upsertPkgItem(const int pkgheadid,
                                  const QMap<QString, int> oldoids,
                                  const QString argtypes, const int itemid,
                                  QString &errMsg)
{
  if (DEBUG)
    qDebug("CreateFunction::upsertPkgItem(%d, QMap, %s, %d, &errMsg)",
           pkgheadid, qPrintable(argtypes), itemid);

  if (pkgheadid < 0)
    return 0;

  int pkgitemid = -1;

  QSqlQuery select;
  select.prepare("SELECT pkgitem_id "
                 "FROM pkgitem "
                 "WHERE ((pkgitem_pkghead_id=:headid)"
                 "  AND  (pkgitem_type=:type)"
                 "  AND  (pkgitem_item_id=:id));");
  select.bindValue(":headid", pkgheadid);
  select.bindValue(":type",  _pkgitemtype);
  select.bindValue(":id",    oldoids.value(argtypes));
  select.exec();
  if (select.first())
    pkgitemid = select.value(0).toInt();
  if (select.lastError().type() != QSqlError::NoError)
  {
    errMsg = _sqlerrtxt.arg(_filename)
                      .arg(select.lastError().databaseText())
                      .arg(select.lastError().driverText());
    return -20;
  }

  QSqlQuery upsert;

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
  upsert.bindValue(":name",    _name + "(" + argtypes + ")");
  upsert.bindValue(":descrip", _comment);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -22;
  }

  return pkgitemid;
}
