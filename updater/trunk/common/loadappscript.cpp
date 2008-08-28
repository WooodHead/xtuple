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

#include "loadappscript.h"

#include <QDomElement>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()
#include <limits.h>

LoadAppScript::LoadAppScript(const QString &name, const int order,
                             const bool system, const bool enabled,
                             const QString &comment, const QString &filename)
  : Loadable("loadappscript", name, order, system, comment, filename)
{
  _enabled = enabled;
  _pkgitemtype = "C";
}

LoadAppScript::LoadAppScript(const QDomElement &elem, const bool system,
                             QStringList &msg, QList<bool> &fatal)
  : Loadable(elem, system, msg, fatal)
{
  _pkgitemtype = "C";

  if (_name.isEmpty())
  {
    msg.append(TR("The script in %1 does not have a name.")
                         .arg(_filename));
    fatal.append(true);
  }

  if (elem.nodeName() != "loadappscript")
  {
    msg.append(TR("Creating a LoadAppScript element from a %1 node.")
           .arg(elem.nodeName()));
    fatal.append(false);
  }

  if (elem.hasAttribute("grade"))
  {
    msg.append(TR("Node %1 '%2' has a 'grade' attribute but should use "
                      "'order' instead.")
                   .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(false);
  }

  if (elem.hasAttribute("order"))
  {
    if (elem.attribute("order").contains("highest", Qt::CaseInsensitive))
      _grade = INT_MAX;
    else if (elem.attribute("order").contains("lowest", Qt::CaseInsensitive))
      _grade = INT_MIN;
    else
      _grade = elem.attribute("order").toInt();
  }

  _enabled = true;
  if (elem.hasAttribute("enabled"))
  {
    if (elem.attribute("enabled").contains(trueRegExp))
      _enabled = true;
    else if (elem.attribute("enabled").contains(falseRegExp))
      _enabled = false;
    else
    {
      msg.append(TR("Node %1 '%2' has an 'enabled' attribute that is "
                        "neither 'true' nor 'false'. Using '%3'.")
                         .arg(elem.nodeName()).arg(elem.attribute("name"))
                         .arg(_enabled ? "true" : "false"));
      fatal.append(false);
    }
  }
}

int LoadAppScript::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  if (_name.isEmpty())
  {
    errMsg = TR("<font color=orange>The script does not have"
                         " a name.</font>");
    return -1;
  }

  if (pdata.isEmpty())
  {
    errMsg = TR("<font color=orange>The script %1 is empty.</font>")
                         .arg(_filename);
    return -2;
  }

  if (_grade == INT_MIN)
  {
    QSqlQuery minOrder;
    minOrder.prepare("SELECT MIN(script_order) AS min "
                     "FROM script "
                     "WHERE (script_name=:name);");
    minOrder.bindValue(":name", _name);
    minOrder.exec();
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
  else if (_grade == INT_MAX)
  {
    QSqlQuery maxOrder;
    maxOrder.prepare("SELECT MAX(script_order) AS max "
                     "FROM script "
                     "WHERE (script_name=:name);");
    maxOrder.bindValue(":name", _name);
    maxOrder.exec();
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

  QSqlQuery select;
  QSqlQuery upsert;

  int scriptid  = -1;
  int pkgheadid = -1;
  int pkgitemid = -1;
  if (pkgname.isEmpty())
    select.prepare(QString("SELECT script_id, -1, -1"
                         "  FROM %1script "
                         " WHERE ((script_name=:name)"
                         "   AND  (script_order=:grade));")
                       .arg(_system ? "" : "pkg"));
  else
    select.prepare(_pkgitemQueryStr);
  select.bindValue(":name",    _name);
  select.bindValue(":pkgname", pkgname);
  select.bindValue(":grade",   _grade);
  select.bindValue(":type",    _pkgitemtype);
  select.exec();
  if(select.first())
  {
    scriptid  = select.value(0).toInt();
    pkgheadid = select.value(1).toInt();
    pkgitemid = select.value(2).toInt();
  }
  else if (select.lastError().type() != QSqlError::NoError)
  {
    QSqlError err = select.lastError();
    errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
    return -5;
  }

  if (scriptid >= 0)
  upsert.prepare(QString("UPDATE %1script "
                         "   SET script_order=:grade, "
                         "       script_enabled=:enabled,"
                         "       script_source=:source,"
                         "       script_notes=:notes "
                         " WHERE (script_id=:id); ")
                       .arg(_system ? "" : "pkg"));
  else
  {
    upsert.prepare("SELECT NEXTVAL('script_script_id_seq');");
    upsert.exec();
    if (upsert.first())
      scriptid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }

    upsert.prepare(QString("INSERT INTO %1script "
                           "       (script_id, script_name, script_order, "
                           "        script_enabled, script_source, script_notes) "
                           "VALUES (:id, :name, :grade, "
                           "        :enabled, :source, :notes);")
                        .arg(_system ? "" : "pkg"));
  }

  upsert.bindValue(":id",      scriptid);
  upsert.bindValue(":grade",   _grade);
  upsert.bindValue(":enabled", _enabled);
  upsert.bindValue(":source",  QString(pdata));
  upsert.bindValue(":notes",   _comment);
  upsert.bindValue(":name",    _name);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
    return -7;
  }

  if (pkgheadid >= 0)
  {
    int tmp = upsertPkgItem(pkgitemid, pkgheadid, scriptid, errMsg);
    if (tmp < 0)
      return tmp;
  }

  return scriptid;
}
