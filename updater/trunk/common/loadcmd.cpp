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

#include "loadcmd.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QStringList>
#include <QVariant>     // used by QSqlQuery::bindValue()

#include "loadable.h"

#define DEBUG true

LoadCmd::LoadCmd(const QString &nodename, const QString &name,
                 const QString &module, const QString &title,
                 const QString &privname, const QString &executable,
                 const QStringList &args, const QString &comment)
  : Loadable(nodename, name, 0, false, comment)
{
  _args       = args;
  _executable = executable;
  _module     = module;
  _privname   = privname;
  _title      = title;
  _pkgitemtype= "D";
}

LoadCmd::LoadCmd(const QDomElement &elem, QStringList &msg, QList<bool> &fatal)
  : Loadable(elem, msg, fatal)
{
  _pkgitemtype= "D";

  if (_name.isEmpty())
  {
    msg.append(QObject::tr("This custom command has no name!"));
    fatal.append(true);
  }

  if (elem.hasAttribute("title"))
    _title = elem.attribute("title");
  else
  {
    msg.append(QObject::tr("Node %1 '%2' does not have a title. Its menu item "
                           "will be blank.")
                         .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(true);
  }

  if (elem.hasAttribute("module"))
    _module = elem.attribute("module");
  else
  {
    msg.append(QObject::tr("Node %1 '%2' does not name a module. The Custom "
                           "Command will not have a corresponding menu item.")
                       .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(true);
  }

  if (elem.hasAttribute("executable"))
    _executable = elem.attribute("executable");
  else
  {
    msg.append(QObject::tr("Node %1 '%2' does not name an executable. Nothing "
                           "will be done when the user selects the menu item.")
                       .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(true);
  }

  if (elem.hasAttribute("privname"))
    _privname = elem.attribute("privname");

  if (elem.hasAttribute("grade"))
  {
    msg.append(QObject::tr("Node %1 '%2' has a 'grade' attribute but Custom "
                      "Commands are not graded. This will be ignored.")
                       .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(false);
  }

  if (elem.hasAttribute("system"))
  {
    msg.append(QObject::tr("Node %1 '%2' has a 'system' attribute but Custom "
                      "Commands are not system elements. This will be ignored.")
                     .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(false);
  }

  for (QDomElement childElem = elem.firstChildElement("arg");
       ! childElem.isNull();
       childElem = childElem.nextSiblingElement("arg"))
  {
    if (childElem.hasAttribute("value"))
      _args.append(childElem.attribute("value").trimmed());
    else
    {
      msg.append(QObject::tr("Node %1 '%2' has an 'arg' with no 'value' attribute.")
                         .arg(elem.nodeName()).arg(elem.attribute("name")));
      fatal.append(false);
    }
  }

  if (DEBUG)
    qDebug("LoadCmd(QDomElement): %s %s, comment %s",
           qPrintable(_executable), qPrintable(_args.join(" ")),
           qPrintable(_comment));
}

QDomElement LoadCmd::createElement(QDomDocument &doc)
{
  QDomElement elem = doc.createElement("loadcmd");
  elem.setAttribute("name",        _name);
  elem.setAttribute("title",       _title);
  elem.setAttribute("executable",  _executable);
  elem.setAttribute("privname",    _privname);
  elem.setAttribute("module",      _module);

  if(!_comment.isEmpty())
    elem.appendChild(doc.createTextNode(_comment));

  if (! _args.isEmpty())
  {
    for (int i = 0; i < _args.size(); i++)
    {
      QDomElement argElem = doc.createElement("arg");
      elem.setAttribute("value", _args.at(i));
      elem.appendChild(argElem);
    }
  }

  return elem;
}

int LoadCmd::writeToDB(const QString pkgname, QString &errMsg)
{
  QString sqlerrtxt = QObject::tr("<font color=red>The following error was "
                                  "encountered while trying to import %1 into "
                                  "the database:<br>%2<br>%3</font>");
  QSqlQuery select;
  QSqlQuery upsert;

  int cmdid     = -1;
  int pkgheadid = -1;
  int pkgitemid = -1;
  if (pkgname.isEmpty())
    select.prepare("SELECT cmd_id, -1, -1"
                   "  FROM cmd "
                   " WHERE (cmd_name=:name);");
  else
    select.prepare("SELECT COALESCE(pkgitem_item_id, -1), pkghead_id,"
                   "       COALESCE(pkgitem_id,      -1) "
                   "  FROM pkghead LEFT OUTER JOIN"
                   "       pkgitem ON ((pkgitem_pkghead_id=pkghead_id)"
                   "               AND (pkgitem_type='D')"
                   "               AND (pkgitem_name=:name))"
                   " WHERE (pkghead_name=:pkgname)");
  select.bindValue(":name",    _name);
  select.bindValue(":pkgname", pkgname);
  select.exec();
  if(select.first())
  {
    cmdid    = select.value(0).toInt();
    pkgheadid = select.value(1).toInt();
    pkgitemid = select.value(2).toInt();
  }
  else if (select.lastError().type() != QSqlError::NoError)
  {
    QSqlError err = select.lastError();
    errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -5;
  }

  if (cmdid >= 0)
    upsert.prepare("UPDATE cmd "
                   "   SET cmd_module=:module, "
                   "       cmd_title=:title, "
                   "       cmd_privname=:privname, "
                   "       cmd_executable=:executable, "
                   "       cmd_descrip=:comment "
                   " WHERE (cmd_id=:id); ");
  else
  {
    upsert.prepare("SELECT NEXTVAL('cmd_cmd_id_seq');");
    upsert.exec();
    if (upsert.first())
      cmdid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }
    upsert.prepare("INSERT INTO cmd ("
                   "       cmd_id, cmd_module, cmd_title, cmd_descrip, "
                   "       cmd_privname, cmd_executable, cmd_name "
                   ") VALUES (:id, :module, :title, :comment,"
                   "          :privname, :executable, :name);");
  }

  upsert.bindValue(":id",        cmdid);
  upsert.bindValue(":module",    _module);
  upsert.bindValue(":title",     _title);
  upsert.bindValue(":comment",   _comment);
  upsert.bindValue(":privname",  _privname);
  upsert.bindValue(":executable",_executable);
  upsert.bindValue(":name",      _name);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -7;
  }

  QSqlQuery delargs;
  delargs.prepare("DELETE FROM cmdarg WHERE (cmdarg_cmd_id=:cmd_id);");
  delargs.bindValue(":cmd_id", cmdid);
  if (! delargs.exec())
  {
    QSqlError err = delargs.lastError();
    errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -8;
  }

  if (_args.size() > 0)
  {
    QSqlQuery insargs;
    insargs.prepare("INSERT INTO cmdarg (cmdarg_cmd_id, cmdarg_order, "
                    "cmdarg_arg) VALUES (:cmd_id, :order, :arg);");
    for (int i = 0; i < _args.size(); i++)
    {
      insargs.bindValue(":cmd_id", cmdid);
      insargs.bindValue(":order",  i);
      insargs.bindValue(":arg",    _args.at(i));
      if (! insargs.exec())
      {
        QSqlError err = insargs.lastError();
        errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
        return -9;
      }
    }
  }

  if (pkgheadid >= 0)
  {
    int tmp = upsertPkgItem(pkgitemid, pkgheadid, cmdid, errMsg);
    if (tmp < 0)
      return tmp;
  }

  return cmdid;
}
