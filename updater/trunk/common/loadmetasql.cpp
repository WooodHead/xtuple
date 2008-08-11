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

#include "loadmetasql.h"

#include <QDomDocument>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

#define DEBUG true

LoadMetasql::LoadMetasql(const QString &name, const QString &group,
                         const bool system,
                         const QString &comment, const QString &filename)
  : Loadable("loadmetasql", name, 0, system, comment, filename)
{
  _pkgitemtype = "M";
  _group = group;
}

LoadMetasql::LoadMetasql(const QDomElement &elem, QStringList &msg, QList<bool> &fatal)
  : Loadable(elem, msg, fatal)
{
  if (DEBUG)
    qDebug("LoadMetasql::LoadMetasql(QDomElement) entered");

  _pkgitemtype = "M";

  if (_name.isEmpty())
  {
    msg.append(TR("The MetaSQL statement in %1 does not have a name.")
                       .arg(_filename));
    fatal.append(true);
  }

  if (elem.nodeName() != "loadmetasql")
  {
    msg.append(TR("Creating a LoadMetasql element from a %1 node.")
              .arg(elem.nodeName()));
    fatal.append(false);
  }

  if (elem.hasAttribute("group"))
    _group = elem.attribute("group");

  if (elem.hasAttribute("grade") || elem.hasAttribute("order"))
  {
    msg.append(TR("Node %1 '%2' has a 'grade' or 'order' attribute "
                           "but these are ignored for MetaSQL statements.")
                           .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(false);
  }

  if (elem.hasAttribute("enabled"))
  {
    msg.append(TR("Node %1 '%2' has an 'enabled' "
                           "attribute which is ignored for MetaSQL statements.")
                       .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(false);
  }

  if (elem.hasAttribute("system"))
  {
    msg.append(TR("Node %1 '%2' has a 'system' attribute "
                           "which is ignored for MetaSQL statements.")
                       .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(false);
  }
}

int LoadMetasql::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  if (pdata.isEmpty())
  {
    errMsg = TR("<font color=orange>The MetaSQL statement %1 is empty.</font>")
                         .arg(_name);
    return -2;
  }

  QString metasqlStr = QString(pdata);
  QStringList lines  = metasqlStr.split("\n");
  QRegExp groupRE    = QRegExp("(^\\s*--\\s*GROUP:\\s*)(.*)",Qt::CaseInsensitive);
  QRegExp nameRE     = QRegExp("(^\\s*--\\s*NAME:\\s*)(.*)", Qt::CaseInsensitive);
  QRegExp notesRE    = QRegExp("(^\\s*--\\s*NOTES:\\s*)(.*)",Qt::CaseInsensitive);
  QRegExp dashdashRE = QRegExp("(^\\s*--\\s*)(.*)");

  for (int i = 0; i < lines.size(); i++)
  {
    if (DEBUG)
      qDebug("LoadMetasql::writeToDB looking at %s", qPrintable(lines.at(i)));

    if (groupRE.indexIn(lines.at(i)) >= 0)
    {
      _group = groupRE.cap(2);
      if (DEBUG)
        qDebug("LoadMetasql::writeToDB() found group %s", qPrintable(_group));
    }
    else if (nameRE.indexIn(lines.at(i)) >= 0)
    {
      _name = nameRE.cap(2);
      if (DEBUG)
        qDebug("LoadMetasql::writeToDB() found name %s", qPrintable(_name));
    }
    else if (notesRE.indexIn(lines.at(i)) >= 0)
    {
      _comment = notesRE.cap(2);
      while (dashdashRE.indexIn(lines.at(++i)) >= 0)
        _comment += " " + dashdashRE.cap(2);
      if (DEBUG)
        qDebug("LoadMetasql::writeToDB() found notes %s", qPrintable(_comment));
    }
  }

  if (DEBUG)
    qDebug("LoadMetasql::writeToDB(): name %s group %s notes %s\n%s",
           qPrintable(_name), qPrintable(_group), qPrintable(_comment),
           qPrintable(metasqlStr));

  QSqlQuery upsert;
  int metasqlid = -1;

  upsert.prepare("SELECT saveMetasql(:group, :name, :notes, :query) AS result;");
  upsert.bindValue(":group", _group);
  upsert.bindValue(":name",  _name);
  upsert.bindValue(":notes", _comment);
  upsert.bindValue(":query", metasqlStr);
  upsert.exec();
  if (upsert.first())
  {
    metasqlid = upsert.value(0).toInt();
    if (metasqlid < 0)
    {
      errMsg = TR("The %1 stored procedure failed, returning %2.")
                .arg("saveMetasql").arg(metasqlid);
      return -5;
    }
  }
  else if (upsert.lastError().type() != QSqlError::NoError)
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
    return -6;
  }
  else
  {
    errMsg = TR("Saving the MetaSQL statement returned 0 rows. This should "
                "not be possible.");
    return -6;
  }

  if (DEBUG)
    qDebug("LoadMetasql::writeToDB() executed %s and got %d in return",
           qPrintable(upsert.executedQuery()), metasqlid);

  if (! pkgname.isEmpty())
  {
    QSqlQuery select;
    int pkgitemid = -1;
    int pkgheadid = -1;
    select.prepare(_pkgitemQueryStr);
    select.bindValue(":name",    _group + "-" + _name);
    select.bindValue(":pkgname", pkgname);
    select.bindValue(":type",    _pkgitemtype);
    select.exec();
    if(select.first())
    {
      pkgheadid = select.value(1).toInt();
      pkgitemid = select.value(2).toInt();
    }
    else if (select.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = select.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -7;
    }

    QString simplename = _name;
    _name = _group + "-" + _name;
    int tmp = upsertPkgItem(pkgitemid, pkgheadid, metasqlid, errMsg);
    _name = simplename;
    if (tmp < 0)
      return tmp;
  }

  return metasqlid;
}
