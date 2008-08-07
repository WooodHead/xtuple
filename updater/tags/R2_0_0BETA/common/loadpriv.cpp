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

#include "loadpriv.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

#include "loadable.h"

LoadPriv::LoadPriv(const QString &nodename,
                   const QString &name, const QString &module,
                   const bool system, const QString &comment)
  : Loadable(nodename, name, 0, system, comment)
{
  _module = module;
  if (_module == "Custom" && ! _name.startsWith("Custom"))
    _name = "Custom" + _name;
  _pkgitemtype = "P";
}

LoadPriv::LoadPriv(const QDomElement &elem, QStringList &msg, QList<bool> &fatal)
  : Loadable(elem, msg, fatal)
{
  _pkgitemtype = "P";

  if (_name.isEmpty())
  {
    msg.append(QObject::tr("A Privilege %1 does not have a name."));
    fatal.append(true);
  }

  if (elem.hasAttribute("module"))
    _module = elem.attribute("module");
  else
  {
    _module = "Custom";
    msg.append(QObject::tr("The Privilege %1 has not been assigned to a "
                           "module. It will default to '%2'.")
                .arg(_name).arg(_module));
    fatal.append(false);
  }
}

QDomElement LoadPriv::createElement(QDomDocument &doc)
{
  QDomElement elem = doc.createElement("loadpriv");
  elem.setAttribute("name", _name);
  elem.setAttribute("module", _module);
  elem.setAttribute("system", _system);

  if(!_comment.isEmpty())
    elem.appendChild(doc.createTextNode(_comment));

  return elem;
}

int LoadPriv::writeToDB(const QString pkgname, QString &errMsg)
{
  QString sqlerrtxt = QObject::tr("<font color=red>The following error was "
                                  "encountered while trying to import %1 into "
                                  "the database:<br>%2<br>%3</font>");
  if (_name.isEmpty())
  {
    errMsg = QObject::tr("<font color=orange>The Privilege does not have"
                         " a name.</font>")
                         .arg(_name);
    return -1;
  }

  if (_module.isEmpty())
  {
    errMsg = QObject::tr("<font color=orange>The Privilege %1 has not been "
                         "assigned to a module and so may not be assignable "
                         ".</font>")
                         .arg(_name);
  }

  QSqlQuery select;
  QSqlQuery upsert;

  int privid    = -1;
  int pkgheadid = -1;
  int pkgitemid = -1;
  if (pkgname.isEmpty())
    select.prepare("SELECT priv_id, -1, -1"
                   "  FROM priv "
                   " WHERE (priv_name=:name);");
  else
    select.prepare("SELECT COALESCE(pkgitem_item_id, -1), pkghead_id,"
                   "       COALESCE(pkgitem_id,      -1) "
                   "  FROM pkghead LEFT OUTER JOIN"
                   "       pkgitem ON ((pkgitem_pkghead_id=pkghead_id)"
                   "               AND (pkgitem_type='P')"
                   "               AND (pkgitem_name=:name))"
                   " WHERE (pkghead_name=:pkgname)");
  select.bindValue(":name",    _name);
  select.bindValue(":pkgname", pkgname);
  select.exec();
  if(select.first())
  {
    privid    = select.value(0).toInt();
    pkgheadid = select.value(1).toInt();
    pkgitemid = select.value(2).toInt();
  }
  else if (select.lastError().type() != QSqlError::NoError)
  {
    QSqlError err = select.lastError();
    errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -5;
  }

  if (privid >= 0)
    upsert.prepare("UPDATE priv "
                   "   SET priv_module=:module, "
                   "       priv_descrip=:comment "
                   " WHERE (priv_id=:id); ");
  else
  {
    upsert.prepare("SELECT NEXTVAL('priv_priv_id_seq');");
    upsert.exec();
    if (upsert.first())
      privid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }
    upsert.prepare("INSERT INTO priv ("
                   "       priv_id, priv_module, priv_name, priv_descrip "
                   ") VALUES (:id, :module, :name, :comment);");
  }

  upsert.bindValue(":id",      privid);
  upsert.bindValue(":module",  _module);
  upsert.bindValue(":name",    _name);
  upsert.bindValue(":comment", _comment);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -7;
  }

  if (pkgheadid >= 0)
  {
    int tmp = upsertPkgItem(pkgitemid, pkgheadid, privid, errMsg);
    if (tmp < 0)
      return tmp;
  }

  return privid;
}
