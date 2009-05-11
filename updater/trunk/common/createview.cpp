/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "createview.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

#define DEBUG false

CreateView::CreateView(const QString &filename,
                       const QString &name, const QString &comment,
                       const OnError onError)
  : CreateDBObj("createview", filename, name, comment, onError)
{
  _pkgitemtype = "V";
  _relkind     = "v";
}

CreateView::CreateView(const QDomElement &elem, QStringList &msg, QList<bool> &fatal)
  : CreateDBObj(elem, msg, fatal)
{
  _pkgitemtype = "V";
  _relkind     = "v";

  if (elem.nodeName() != "createview")
  {
    msg.append(TR("Creating a CreateView element from a %1 node.")
              .arg(elem.nodeName()));
    fatal.append(false);
  }
}

int CreateView::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  if (DEBUG)
    qDebug("CreateView::writeToDb(%s, %s, &errMsg)",
           pdata.data(), qPrintable(pkgname));

  if (pdata.isEmpty())
  {
    errMsg = TR("<font color=orange>The file %1 is empty.</font>")
                         .arg(_filename);
    return -1;
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
      return -6;
    }

    select.prepare("SELECT pg_class.oid AS oid "
                   "FROM pg_class, pg_namespace "
                   "WHERE ((relname=:name)"
                   "  AND  (relkind=:relkind)"
                   "  AND  (relnamespace=pg_namespace.oid)"
                   "  AND  (nspname=:schema));");
    select.bindValue(":name",   _name);
    select.bindValue(":schema", pkgname);
    select.bindValue(":relkind",_relkind);
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
      errMsg = TR("Could not find view %1 in the database. The "
                           "script %2 does not match the contents.xml "
                           "description.")
                .arg(_name).arg(_filename);
      return -8;
    }
  }

  return 0;
}
