/*
 * Common Public Attribution License Version 1.0. 
 * 
 * The contents of this file are subject to the Common Public Attribution 
 * License Version 1.0 (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License 
 * at http://www.xTuple.com/CPAL.  The License is based on the Mozilla 
 * Public License Version 1.1 but Sections 14 and 15 have been added to 
 * cover use of software over a computer network and provide for limited 
 * attribution for the Original Developer. In addition, Exhibit A has 
 * been modified to be consistent with Exhibit B.
 * 
 * Software distributed under the License is distributed on an "AS IS" 
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See 
 * the License for the specific language governing rights and limitations 
 * under the License. 
 * 
 * The Original Code is xTuple ERP: PostBooks Edition
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2008 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
 * 
 * Contributor(s): ______________________.
 * 
 * Alternatively, the contents of this file may be used under the terms 
 * of the xTuple End-User License Agreeement (the xTuple License), in which 
 * case the provisions of the xTuple License are applicable instead of 
 * those above.  If you wish to allow use of your version of this file only 
 * under the terms of the xTuple License and not to allow others to use 
 * your version of this file under the CPAL, indicate your decision by 
 * deleting the provisions above and replace them with the notice and other 
 * provisions required by the xTuple License. If you do not delete the 
 * provisions above, a recipient may use your version of this file under 
 * either the CPAL or the xTuple License.
 * 
 * EXHIBIT B.  Attribution Information
 * 
 * Attribution Copyright Notice: 
 * Copyright (c) 1999-2008 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by xTuple ERP: PostBooks Edition
 * 
 * Attribution URL: www.xtuple.org 
 * (to be included in the "Community" menu of the application if possible)
 * 
 * Graphic Image as provided in the Covered Code, if any. 
 * (online at www.xtuple.com/poweredby)
 * 
 * Display of Attribution Information is required in Larger Works which 
 * are defined in the CPAL as a work which combines Covered Code or 
 * portions thereof with code not governed by the terms of the CPAL.
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
    select.bindValue(":schema", pkgname);
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
