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

#include "pkgschema.h"

#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

#define TR(a) QObject::tr(a)

#define DEBUG false

QString PkgSchema::_sqlerrtxt = TR("<font color=red>The following error was "
                                  "encountered while trying to import %1 into "
                                  "the database:<br>%2<br>%3</font>");

PkgSchema::PkgSchema(const QString &name, const QString &comment)
{
  _name    = name;
  _comment = comment;
}

PkgSchema::~PkgSchema()
{
}

int PkgSchema::create(QString &errMsg)
{
  if (DEBUG)
    qDebug("PkgSchema::create(&errMsg)");

  if (_name.isEmpty())
  {
    errMsg = QString("Cannot create a schema for this package without a name.");
    return -1;
  }

  int namespaceoid = -1;
  int i = 0;
  do {
    QSqlQuery select;
    select.prepare("SELECT oid FROM pg_namespace WHERE (nspname=:name);");
    select.bindValue(":name", _name);
    select.exec();
    if (select.first())
      namespaceoid = select.value(0).toInt();
    else if (select.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_name)
                        .arg(select.lastError().databaseText())
                        .arg(select.lastError().driverText());
      return -2;
    }
    else
    {
      QSqlQuery create;
      create.exec(QString("CREATE SCHEMA %1;").arg(_name));
      if (create.lastError().type() != QSqlError::NoError)
      {
        errMsg = _sqlerrtxt.arg(_name)
                          .arg(create.lastError().databaseText())
                          .arg(create.lastError().driverText());
        return -3;
      }
      create.exec(QString("GRANT ALL ON SCHEMA %1 TO GROUP openmfg;").arg(_name));
      if (create.lastError().type() != QSqlError::NoError)
      {
        errMsg = _sqlerrtxt.arg(_name)
                          .arg(create.lastError().databaseText())
                          .arg(create.lastError().driverText());
        return -4;
      }

    }
  } while (namespaceoid < 0 && ++i < 2);

  int patherr = setPath(errMsg);
  if (patherr < 0)
    return patherr;

  QStringList childTable;
  childTable  << "cmd"
              << "cmdarg"
              << "image"
              << "metasql"
              << "priv"
              << "report"
              << "script"
              << "uiform"
              ;

  for (int i = 0; i < childTable.size(); i++)
  {
    QSqlQuery select;
    select.prepare("SELECT oid "
                   "FROM pg_class "
                   "WHERE ((relname=:child) AND (relnamespace=:schemaid));");
    select.bindValue(":child", "pkg" + childTable.at(i));
    select.bindValue(":schemaid", namespaceoid);
    select.exec();
    if (select.first())
      continue; // nothing to do for this child
    else if (select.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_name)
                        .arg(select.lastError().databaseText())
                        .arg(select.lastError().driverText());
      return -5;
    }

    QSqlQuery create;
    create.prepare(QString("CREATE TABLE pkg%1 () INHERITS (%2);")
                   .arg(childTable.at(i)).arg(childTable.at(i)));
    create.exec();
    if (create.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_name)
                        .arg(create.lastError().databaseText())
                        .arg(create.lastError().driverText());
      return -6;
    }

    QSqlQuery alt;
    alt.prepare(QString("ALTER TABLE pkg%1 "
                        "ALTER %2_id SET NOT NULL, "
                        "ADD PRIMARY KEY (%3_id), "
                        "ALTER %4_id SET DEFAULT NEXTVAL('%5_%6_id_seq');")
                   .arg(childTable.at(i)).arg(childTable.at(i))
                   .arg(childTable.at(i)).arg(childTable.at(i))
                   .arg(childTable.at(i)).arg(childTable.at(i))
                   );
    alt.exec();
    if (alt.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_name)
                        .arg(alt.lastError().databaseText())
                        .arg(alt.lastError().driverText());
      return -7;
    }

    alt.prepare(QString("REVOKE ALL ON pkg%1 FROM PUBLIC; "
                        "GRANT  ALL ON pkg%2 TO GROUP openmfg; ")
                   .arg(childTable.at(i)).arg(childTable.at(i))
                   );
    alt.exec();
    if (alt.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_name)
                        .arg(alt.lastError().databaseText())
                        .arg(alt.lastError().driverText());
      return -7;
    }

    if (childTable.at(i) == "cmdarg")
    {
      alt.exec(QString("ALTER TABLE pkgcmdarg "
                       "ADD FOREIGN KEY (cmdarg_cmd_id) "
                       "REFERENCES pkgcmd(cmd_id);"));
      if (alt.lastError().type() != QSqlError::NoError)
      {
        errMsg = _sqlerrtxt.arg(_name)
                          .arg(alt.lastError().databaseText())
                          .arg(alt.lastError().driverText());
        return -8;
      }
    }

    QSqlQuery triggerq;
    triggerq.exec(QString(
                  "SELECT dropIfExists('TRIGGER', 'pkg%1beforetrigger', '%2');"
                  "CREATE TRIGGER pkg%3beforetrigger "
                  "BEFORE INSERT OR UPDATE OR DELETE "
                  "ON pkg%4 FOR EACH ROW "
                  "EXECUTE PROCEDURE _pkg%5beforetrigger();")
                  .arg(childTable.at(i)) .arg(childTable.at(i))
                  .arg(childTable.at(i)) .arg(childTable.at(i))
                  .arg(childTable.at(i))
                  );
    if (triggerq.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_name)
                        .arg(triggerq.lastError().databaseText())
                        .arg(triggerq.lastError().driverText());
      return -9;
    }
  }

  int tmp = upsertPkgItem(namespaceoid, errMsg);
  if (tmp < 0)
    return tmp;

  return 0;
}

int PkgSchema::getPath(QString &path, QString &errMsg)
{
  QSqlQuery pathq;
  pathq.exec("SELECT CURRENT_SCHEMAS(false);");
  if (pathq.first())
    path = pathq.value(0).toString();
  else
  {
    errMsg = _sqlerrtxt.arg(_name)
                      .arg(pathq.lastError().databaseText())
                      .arg(pathq.lastError().driverText());
    return -8;
  }

  if (DEBUG)
    qDebug("PkgSchema::getPath() selected %s", qPrintable(path));

  path.remove(0, path.indexOf("{") + 1);
  path.remove(path.indexOf("}"), path.size());

  if (DEBUG)
    qDebug("PkgSchema::getPath() extracted %s", qPrintable(path));

  return 0;
}

int PkgSchema::setPath(QString &errMsg)
{
  QString path;
  int result = getPath(path, errMsg);
  if (result < 0)
    return result;

  QSqlQuery schemaq;
  schemaq.exec(QString("SET SEARCH_PATH TO %1,%2;").arg(_name).arg(path));
  if (schemaq.lastError().type() != QSqlError::NoError)
  {
    errMsg = _sqlerrtxt.arg(_name)
                      .arg(schemaq.lastError().databaseText())
                      .arg(schemaq.lastError().driverText());
    return -8;
  }

  return 0;
}

int PkgSchema::clearPath(QString &errMsg)
{
  QString path;
  int result = getPath(path, errMsg);
  if (result < 0)
    return result;

  path.remove(QRegExp("\\s*" + _name + ","));

  QSqlQuery schemaq;
  schemaq.exec(QString("SET SEARCH_PATH TO %1;").arg(path));
  if (schemaq.lastError().type() != QSqlError::NoError)
  {
    errMsg = _sqlerrtxt.arg(_name)
                      .arg(schemaq.lastError().databaseText())
                      .arg(schemaq.lastError().driverText());
    return -9;
  }

  return 0;
}

int PkgSchema::upsertPkgItem(const int itemid,
                               QString &errMsg)
{
  int pkgheadid = -1;
  int pkgitemid = -1;

  QSqlQuery select;
  select.prepare("SELECT pkghead_id, COALESCE(pkgitem_id, -1) "
                 "FROM pkghead LEFT OUTER JOIN"
                 "     pkgitem ON ((pkgitem_name=pkghead_name)"
                 "             AND (pkgitem_pkghead_id=pkghead_id)"
                 "             AND (pkgitem_type='S'))"
                 "WHERE (pkghead_name=:name);");
  select.bindValue(":name",  _name);
  select.exec();
  if (select.first())
  {
    pkgheadid = select.value(0).toInt();
    pkgitemid = select.value(1).toInt();
  }
  else if (select.lastError().type() != QSqlError::NoError)
  {
    errMsg = _sqlerrtxt.arg(_name)
                      .arg(select.lastError().databaseText())
                      .arg(select.lastError().driverText());
    return -20;
  }
  else
  {
    errMsg = TR("Could not find pkghead record for package %1.").arg(_name);
    return -21;
  }

  QSqlQuery upsert;

  if (pkgitemid >= 0)
    upsert.prepare("UPDATE pkgitem SET pkgitem_descrip=:descrip,"
                   "       pkgitem_item_id=:itemid "
                   "WHERE (pkgitem_id=:id);");
  else
  {
    upsert.prepare("SELECT NEXTVAL('pkgitem_pkgitem_id_seq');");
    upsert.exec();
    if (upsert.first())
      pkgitemid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -22;
    }
    upsert.prepare("INSERT INTO pkgitem ("
                   "    pkgitem_id, pkgitem_pkghead_id, pkgitem_type,"
                   "    pkgitem_item_id, pkgitem_name, pkgitem_descrip"
                   ") VALUES ("
                   "    :id, :headid, 'S',"
                   "    :itemid, :name, :descrip);");
  }

  upsert.bindValue(":id",      pkgitemid);
  upsert.bindValue(":headid",  pkgheadid);
  upsert.bindValue(":itemid",  itemid);
  upsert.bindValue(":name",    _name);
  upsert.bindValue(":descrip", _comment);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -23;
  }

  return pkgitemid;
}
