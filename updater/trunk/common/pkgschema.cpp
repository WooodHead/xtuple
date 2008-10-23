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

  int namespaceoid;
  QSqlQuery create;
  create.prepare("SELECT createPkgSchema(:name, :descrip) AS result;");
  create.bindValue(":name", _name);

  create.exec();
  if (create.first())
    namespaceoid = create.value(0).toInt();
  else if (create.lastError().type() != QSqlError::NoError)
  {
    errMsg = _sqlerrtxt.arg(_name)
                      .arg(create.lastError().databaseText())
                      .arg(create.lastError().driverText());
    return -2;
  }

  int patherr = setPath(errMsg);
  if (patherr < 0)
    return patherr;

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
  schemaq.exec(QString("SET SEARCH_PATH TO %1,%2;")
                 .arg(_name.toLower()).arg(path));
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

  path.remove(QRegExp("\\s*" + _name + ",", Qt::CaseInsensitive));

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
