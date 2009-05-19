/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "createdbobj.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QRegExp>
#include <QSqlError>
#include <QVariant>

#include "xsqlquery.h"

CreateDBObj::CreateDBObj()
{
}

CreateDBObj::CreateDBObj(const QString &nodename, const QString &filename,
                         const QString &name,
                         const QString &comment,  OnError onError)
{
  _comment  = comment;
  _filename = filename;
  _name     = name;
  _nodename = nodename;
  _onError  = onError;
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

  XSqlQuery select;
  select.prepare("SELECT pkgitem_id "
                 "FROM pkgitem "
                 "WHERE ((pkgitem_pkghead_id=:headid)"
                 "  AND  (pkgitem_type=:type)"
                 "  AND  (pkgitem_name=:name));");
  select.bindValue(":headid", pkgheadid);
  select.bindValue(":type",  _pkgitemtype);
  select.bindValue(":name",  _name);
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

  XSqlQuery upsert;

  if (pkgitemid >= 0)
    upsert.prepare("UPDATE pkgitem SET pkgitem_descrip=:descrip,"
                   "       pkgitem_item_id=:itemid "
                   "WHERE (pkgitem_id=:id);");
  else
  {
    upsert.exec("SELECT NEXTVAL('pkgitem_pkgitem_id_seq');");
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
  upsert.bindValue(":name",    _name);
  upsert.bindValue(":descrip", _comment);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
    return -22;
  }

  return pkgitemid;
}
