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

#include "createdbobj.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QRegExp>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>

CreateDBObj::CreateDBObj()
{
}

CreateDBObj::CreateDBObj(const QString &nodename, const QString &filename,
                         const QString &schema,   const QString &name,
                         const QString &comment,  OnError onError)
{
  _comment  = comment;
  _filename = filename;
  _name     = name;
  _nodename = nodename;
  _onError  = onError;
  _schema   = schema;
}

CreateDBObj::CreateDBObj(const QDomElement & elem, QStringList &msg, QList<bool> &fatal)
{
  _nodename = elem.nodeName();

  if (elem.hasAttribute("name"))
    _name = elem.attribute("name");
  else
  {
    msg.append(TR("The contents.xml must name the object for %1.")
               .arg(_nodename));
    fatal.append("false");
  }

  if (elem.hasAttribute("file"))
    _filename = elem.attribute("file");
  else
  {
    msg.append(TR("The contents.xml must name the file for %1.")
               .arg(_nodename));
    fatal.append(true);
  }

  if (elem.hasAttribute("schema"))
    _schema = elem.attribute("schema");
  else
  {
    _schema = "public";
    msg.append(TR("No explicit schema for %1; defaulting to %2.")
               .arg(_nodename).arg(_schema));
    fatal.append(false);
  }

  if (elem.hasAttribute("onerror"))
    _onError = nameToOnError(elem.attribute("onerror"));

  _comment = elem.text().trimmed();
}

CreateDBObj::~CreateDBObj()
{
}

QDomElement CreateDBObj::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement(_nodename);

  elem.setAttribute("file", _filename);

  if (! _name.isEmpty())
    elem.setAttribute("name", _name);

  if (! _schema.isEmpty())
    elem.setAttribute("schema", _schema);

  if(!_comment.isEmpty())
    elem.appendChild(doc.createTextNode(_comment));

  return elem;
}

// this differs from the version it was copied from in loadable.cpp
int CreateDBObj::upsertPkgItem(const int pkgheadid, const int itemid,
                               QString &errMsg)
{
  QString sqlerrtxt = TR("<font color=red>The following error was "
                                  "encountered while trying to import %1 into "
                                  "the database:<br>%2<br>%3</font>");
  if (pkgheadid < 0)
    return 0;

  int pkgitemid = -1;

  QSqlQuery select;
  select.prepare("SELECT pkgitem_id "
                 "FROM pkgitem "
                 "WHERE ((pkgitem_pkghead_id=:headid)"
                 "  AND  (pkgitem_type=:type)"
                 "  AND  (pkgitem_name=:name));");
  select.bindValue(":headid", pkgheadid);
  select.bindValue(":type",  _pkgitemtype);
  select.bindValue(":name",  _schema + "." + _name);
  select.exec();
  if (select.first())
    pkgitemid = select.value(0).toInt();
  if (select.lastError().type() != QSqlError::NoError)
  {
    errMsg = sqlerrtxt.arg(_filename)
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
    upsert.prepare("SELECT NEXTVAL('pkgitem_pkgitem_id_seq');");
    upsert.exec();
    if (upsert.first())
      pkgitemid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
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
  upsert.bindValue(":name",    _schema + "." + _name);
  upsert.bindValue(":descrip", _comment);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -22;
  }

  return pkgitemid;
}
