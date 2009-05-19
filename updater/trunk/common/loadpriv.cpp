/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "loadpriv.h"

#include <QDomDocument>
#include <QSqlError>
#include <QVariant>     // used by XSqlQuery::bindValue()

#include "xsqlquery.h"

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

LoadPriv::LoadPriv(const QDomElement &elem, const bool system,
                   QStringList &msg, QList<bool> &fatal)
  : Loadable(elem, system, msg, fatal)
{
  _pkgitemtype = "P";

  if (_name.isEmpty())
  {
    msg.append(TR("A Privilege %1 does not have a name."));
    fatal.append(true);
  }

  if (elem.hasAttribute("module"))
    _module = elem.attribute("module");
  else
  {
    _module = "Custom";
    msg.append(TR("The Privilege %1 has not been assigned to a "
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

  if(!_comment.isEmpty())
    elem.appendChild(doc.createTextNode(_comment));

  return elem;
}

int LoadPriv::writeToDB(const QString pkgname, QString &errMsg)
{
  if (_name.isEmpty())
  {
    errMsg = TR("<font color=orange>The Privilege does not have a name.</font>")
               .arg(_name);
    return -1;
  }

  if (_module.isEmpty())
  {
    errMsg = TR("<font color=orange>The Privilege %1 has not been "
                 "assigned to a module and so may not be assignable.</font>")
               .arg(_name);
  }

  XSqlQuery select;
  XSqlQuery upsert;

  int privid    = -1;
  int pkgheadid = -1;
  int pkgitemid = -1;
  if (pkgname.isEmpty())
    select.prepare(QString("SELECT priv_id, -1, -1"
                           "  FROM %1priv "
                           " WHERE (priv_name=:name);")
                      .arg(_system ? "" : "pkg"));
  else
    select.prepare(_pkgitemQueryStr);
  select.bindValue(":name",    _name);
  select.bindValue(":pkgname", pkgname);
  select.bindValue(":type",    _pkgitemtype);
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
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -5;
  }

  if (privid >= 0)
    upsert.prepare(QString("UPDATE %1priv "
                           "   SET priv_module=:module, "
                           "       priv_descrip=:comment "
                           " WHERE (priv_id=:id); ")
              .arg(_system ? "" : "pkg"));
  else
  {
    upsert.exec("SELECT NEXTVAL('priv_priv_id_seq');");
    if (upsert.first())
      privid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }
    upsert.prepare(QString("INSERT INTO %1priv ("
                           "       priv_id, priv_module, priv_name, priv_descrip "
                           ") VALUES (:id, :module, :name, :comment);")
              .arg(_system ? "" : "pkg"));
  }

  upsert.bindValue(":id",      privid);
  upsert.bindValue(":module",  _module);
  upsert.bindValue(":name",    _name);
  upsert.bindValue(":comment", _comment);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
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
