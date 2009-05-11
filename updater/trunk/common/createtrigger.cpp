/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "createtrigger.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

#define DEBUG false

CreateTrigger::CreateTrigger(const QString &filename,
                             const QString &name, const QString &comment,
                             const OnError onError)
  : CreateDBObj("createtrigger", filename, name, comment, onError)
{
  _pkgitemtype = "G";
}

CreateTrigger::CreateTrigger(const QDomElement &elem, QStringList &msg, QList<bool> &fatal)
  : CreateDBObj(elem, msg, fatal)
{
  _pkgitemtype = "G";

  if (elem.nodeName() != "createtrigger")
  {
    msg.append(TR("Creating a CreateTrigger element from a %1 node.")
              .arg(elem.nodeName()));
    fatal.append(false);
  }
}

int CreateTrigger::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  if (DEBUG)
    qDebug("CreateTrigger::writeToDb(%s, %s, &errMsg)",
           pdata.data(), qPrintable(pkgname));

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
      return -6;
    }

    select.prepare("SELECT pg_trigger.oid AS oid "
                   "FROM pg_trigger, pg_class, pg_namespace "
                   "WHERE ((tgname=:name)"
                   "  AND  (tgrelid=pg_class.oid)"
                   "  AND  (relnamespace=pg_namespace.oid)"
                   "  AND  (nspname=:schema));");
    select.bindValue(":name",   _name);
    select.bindValue(":schema", pkgname);
    select.exec();
    if (select.first())
    {
      int tmp = upsertPkgItem(pkgheadid, select.value(0).toInt(), errMsg);
      if (tmp < 0)
        return tmp;
    }
    else if (select.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_filename)
                        .arg(select.lastError().databaseText())
                        .arg(select.lastError().driverText());
      return -7;
    }
    else // not found
    {
      errMsg = TR("Could not find trigger %1 in the database. The "
                           "script %2 does not match the contents.xml "
                           "description.")
                .arg(_name).arg(_filename);
      return -8;
    }
  }

  return 0;
}
