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

#include "loadappui.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

LoadAppUI::LoadAppUI(const QString &name, const int order,
                     const bool system, const bool enabled,
                     const QString & comment)
  : Loadable("loadappui", name, order, system, comment)
{
  _enabled = enabled;
}

LoadAppUI::LoadAppUI(const QDomElement &elem)
  : Loadable(elem)
{
  if (elem.nodeName() != "loadappui")
    QMessageBox::warning(0, "Improper call to LoadAppUI(QDomElement)",
                         QString("Creating a LoadAppUI element from a %1 node.")
                         .arg(elem.nodeName()));

  if (elem.hasAttribute("grade"))
    QMessageBox::warning(0, "Improper call to LoadAppUI(QDomElement)",
                         QString("Node %1 '%2' has a 'grade' attribute but "
                                 "should use 'order' instead.")
                         .arg(elem.nodeName()).arg(elem.attribute("name")));

  if (elem.hasAttribute("order"))
  {
    if (elem.attribute("order").contains("highest", Qt::CaseInsensitive))
      _grade = INT_MAX;
    else if (elem.attribute("order").contains("lowest", Qt::CaseInsensitive))
      _grade = INT_MIN;
    else
      _grade = elem.attribute("order").toInt();
  }
  if (elem.hasAttribute("enabled"))
    _enabled = elem.attribute("enabled").contains(trueRegExp);
}

int LoadAppUI::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  QString sqlerrtxt = QObject::tr("<font color=red>The following error was "
                                  "encountered while trying to import %1 into "
                                  "the database:<br>%2<br>%3</font>");
  if (_name.isEmpty())
  {
    errMsg = QObject::tr("<font color=orange>The UI Form does not have"
                         " a name.</font>")
                         .arg(_name);
    return -1;
  }

  if (pdata.isEmpty())
  {
    errMsg = QObject::tr("<font color=orange>The form %1 is empty.</font>")
                         .arg(_name);
    return -2;
  }

  if (_grade == INT_MIN)
  {
    QSqlQuery minOrder;
    minOrder.prepare("SELECT MIN(uiform_order) AS min "
                     "FROM uiform "
                     "WHERE (uiform_name=:name);");
    minOrder.bindValue(":name", _name);
    minOrder.exec();
    if (minOrder.first())
      _grade = minOrder.value(0).toInt();
    else if (minOrder.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = minOrder.lastError();
      errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -3;
    }
    else
      _grade = 0;
  }
  else if (_grade == INT_MAX)
  {
    QSqlQuery maxOrder;
    maxOrder.prepare("SELECT MAX(uiform_order) AS max "
                     "FROM uiform "
                     "WHERE (uiform_name=:name);");
    maxOrder.bindValue(":name", _name);
    maxOrder.exec();
    if (maxOrder.first())
      _grade = maxOrder.value(0).toInt();
    else if (maxOrder.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = maxOrder.lastError();
      errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -4;
    }
    else
      _grade = 0;
  }

  QSqlQuery select;
  QSqlQuery upsert;

  int formid    = -1;
  int pkgheadid = -1;
  int pkgitemid = -1;
  if (pkgname.isEmpty())
    select.prepare("SELECT uiform_id, -1, -1"
                   "  FROM uiform "
                   " WHERE ((uiform_name=:name)"
                   "   AND  (uiform_order=:grade));");
  else
    select.prepare("SELECT COALESCE(pkgitem_item_id, -1), pkghead_id,"
                   "       COALESCE(pkgitem_id,      -1) "
                   "  FROM pkghead LEFT OUTER JOIN"
                   "       pkgitem ON ((pkgitem_pkghead_id=pkghead_id)"
                   "               AND (pkgitem_type='U')"
                   "               AND (pkgitem_name=:name))"
                   " WHERE (pkghead_name=:pkgname)");
  select.bindValue(":name",    _name);
  select.bindValue(":grade",   _grade);
  select.bindValue(":pkgname", pkgname);
  select.exec();
  if(select.first())
  {
    formid    = select.value(0).toInt();
    pkgheadid = select.value(1).toInt();
    pkgitemid = select.value(2).toInt();
  }
  else if (select.lastError().type() != QSqlError::NoError)
  {
    QSqlError err = select.lastError();
    errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -5;
  }

  if (formid >= 0)
    upsert.prepare("UPDATE uiform "
                   "   SET uiform_order=:grade, "
                   "       uiform_enabled=:enabled,"
                   "       uiform_source=:source,"
                   "       uiform_notes=:notes "
                   " WHERE (uiform_id=:id); ");
  else
  {
    upsert.prepare("SELECT NEXTVAL('uiform_uiform_id_seq');");
    upsert.exec();
    if (upsert.first())
      formid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }
    upsert.prepare("INSERT INTO uiform ("
                   "       uiform_id, uiform_name, uiform_order, "
                   "       uiform_enabled, uiform_source, uiform_notes) "
                   "VALUES (:id, :name, :grade, :enabled, :source, :notes);");
  }

  upsert.bindValue(":id",      formid);
  upsert.bindValue(":grade",   _grade);
  upsert.bindValue(":enabled", _enabled);
  upsert.bindValue(":source",  pdata);
  upsert.bindValue(":notes",   _comment);
  upsert.bindValue(":name",    _name);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -7;
  }

  if (pkgheadid >= 0)
  {
    int tmp = upsertPkgItem(pkgitemid, pkgheadid, "U", formid, _name,
                            _comment, errMsg);
    if (tmp < 0)
      return tmp;
  }

  return formid;
}
