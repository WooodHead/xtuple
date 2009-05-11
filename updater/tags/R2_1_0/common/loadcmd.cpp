/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "loadcmd.h"

#include <QDomDocument>
#include <QSqlQuery>
#include <QSqlError>
#include <QStringList>
#include <QVariant>     // used by QSqlQuery::bindValue()

#include "loadable.h"

#define DEBUG false

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

LoadCmd::LoadCmd(const QDomElement &elem, const bool system,
                 QStringList &msg, QList<bool> &fatal)
  : Loadable(elem, system, msg, fatal)
{
  _pkgitemtype= "D";

  // name isn't required, at least according to the db and guiclient

  if (elem.hasAttribute("title"))
    _title = elem.attribute("title");
  else
  {
    msg.append(TR("Node %1 '%2' does not have a title. Its menu item "
                           "will be blank.")
                         .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(true);
  }

  if (elem.hasAttribute("module"))
    _module = elem.attribute("module");
  else
  {
    msg.append(TR("Node %1 '%2' does not name a module. The Custom "
                           "Command will not have a corresponding menu item.")
                       .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(true);
  }

  if (elem.hasAttribute("executable"))
    _executable = elem.attribute("executable");
  else
  {
    msg.append(TR("Node %1 '%2' does not name an executable. Nothing "
                           "will be done when the user selects the menu item.")
                       .arg(elem.nodeName()).arg(elem.attribute("name")));
    fatal.append(true);
  }

  if (elem.hasAttribute("privname"))
    _privname = elem.attribute("privname");

  if (elem.hasAttribute("grade"))
  {
    msg.append(TR("Node %1 '%2' has a 'grade' attribute but Custom "
                      "Commands are not graded. This will be ignored.")
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
      msg.append(TR("Node %1 '%2' has an 'arg' with no 'value' attribute.")
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
  QSqlQuery select;
  QSqlQuery upsert;

  int cmdid     = -1;
  int pkgheadid = -1;
  int pkgitemid = -1;
  if (pkgname.isEmpty())
    select.prepare(QString("SELECT cmd_id, -1, -1"
                           "  FROM %1cmd "
                           " WHERE (cmd_name=:name);")
                          .arg(_system ? "" : "pkg"));
  else
    select.prepare(_pkgitemQueryStr);
  select.bindValue(":name",    _name);
  select.bindValue(":pkgname", pkgname);
  select.bindValue(":type",    _pkgitemtype);
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
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -5;
  }

  if (cmdid >= 0)
    upsert.prepare(QString("UPDATE %1cmd "
                           "   SET cmd_module=:module, "
                           "       cmd_title=:title, "
                           "       cmd_privname=:privname, "
                           "       cmd_executable=:executable, "
                           "       cmd_descrip=:comment "
                           " WHERE (cmd_id=:id); ")
                          .arg(_system ? "" : "pkg"));
  else
  {
    upsert.exec("SELECT NEXTVAL('cmd_cmd_id_seq');");
    if (upsert.first())
      cmdid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }
    upsert.prepare(QString("INSERT INTO %1cmd ("
                           "       cmd_id, cmd_module, cmd_title, cmd_descrip, "
                           "       cmd_privname, cmd_executable, cmd_name "
                           ") VALUES (:id, :module, :title, :comment,"
                           "          :privname, :executable, :name);")
                          .arg(_system ? "" : "pkg"));
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
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -7;
  }

  QSqlQuery delargs;
  delargs.prepare(QString("DELETE FROM %1cmdarg WHERE (cmdarg_cmd_id=:cmd_id);")
                          .arg(_system ? "" : "pkg"));
  delargs.bindValue(":cmd_id", cmdid);
  if (! delargs.exec())
  {
    QSqlError err = delargs.lastError();
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -8;
  }

  if (_args.size() > 0)
  {
    QSqlQuery insargs;
    insargs.prepare(QString("INSERT INTO %1cmdarg (cmdarg_cmd_id, cmdarg_order, "
                            "cmdarg_arg) VALUES (:cmd_id, :order, :arg);")
                          .arg(_system ? "" : "pkg"));
    for (int i = 0; i < _args.size(); i++)
    {
      insargs.bindValue(":cmd_id", cmdid);
      insargs.bindValue(":order",  i);
      insargs.bindValue(":arg",    _args.at(i));
      if (! insargs.exec())
      {
        QSqlError err = insargs.lastError();
        errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
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
