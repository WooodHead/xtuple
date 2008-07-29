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

#include "createtable.h"

#include <QBuffer>
#include <QDomDocument>
#include <QImage>
#include <QImageWriter>
#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

#include <quuencode.h>

#define DEBUG true

CreateTable::CreateTable(const QString &filename, const QString &schema,
                         const QString &name, const QString &comment)
  : CreateDBObj("createtable", filename, schema, name, comment)
{
  _pkgitemtype = "T";
  _reltype     = "T";
}

CreateTable::CreateTable(const QDomElement &elem, QStringList &msg, QList<bool> &fatal)
  : CreateDBObj(elem, msg, fatal)
{
  _pkgitemtype = "T";
  _reltype     = "T";

  if (elem.nodeName() != "createtable")
  {
    msg.append(QObject::tr("Creating a CreateTable element from a %1 node.")
              .arg(elem.nodeName()));
    fatal.append(false);
  }
}

int CreateTable::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  if (DEBUG)
    qDebug("CreateTable::writeToDb(%s, %s, &errMsg)",
           pdata.data(), qPrintable(pkgname));

  QString sqlerrtxt = QObject::tr("<font color=red>The following error was "
                                  "encountered while trying to import %1 into "
                                  "the database:<br>%2<br>%3</font>");

  if (pdata.isEmpty())
  {
    errMsg = QObject::tr("<font color=orange>The file %1 is empty.</font>")
                         .arg(_filename);
    return -1;
  }

  QSqlQuery create;
  create.prepare(QString(pdata));
  create.exec();
  if (create.lastError().type() != QSqlError::NoError)
  {
    errMsg = sqlerrtxt.arg(_filename)
                      .arg(create.lastError().databaseText())
                      .arg(create.lastError().driverText());
    return -3;
  }

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
      errMsg = sqlerrtxt.arg(_filename)
                        .arg(select.lastError().databaseText())
                        .arg(select.lastError().driverText());
      return -4;
    }

    select.prepare("SELECT pg_class.oid AS oid "
                   "FROM pg_class, pg_namespace "
                   "WHERE ((relname=:name)"
                   "  AND  (relnamespace=pg_namespace.oid)"
                   "  AND  (nspname=:schema));");
    select.bindValue(":name",   _name);
    select.bindValue(":schema", _schema);
    select.exec();
    if (select.first())
    {
      int tmp = upsertPkgItem(pkgheadid, select.value(0).toInt(), errMsg);
      if (tmp < 0)
        return tmp;
    }
    else if (select.lastError().type() != QSqlError::NoError)
    {
      errMsg = sqlerrtxt.arg(_filename)
                        .arg(select.lastError().databaseText())
                        .arg(select.lastError().driverText());
      return -5;
    }
    else // not found
    {
      errMsg = QObject::tr("Could not find table %1 in the database. The "
                           "script %2 does not match the contents.xml "
                           "description.")
                .arg(_name).arg(_filename);
      return -6;
    }
  }

  return 0;
}
