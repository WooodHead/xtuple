/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "loadappui.h"

#include <QDomDocument>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()
#include <limits.h>

#define DEBUG false

LoadAppUI::LoadAppUI(const QString &name, const int order,
                     const bool system, const bool enabled,
                     const QString & comment, const QString &filename)
  : Loadable("loadappui", name, order, system, comment, filename)
{
  _enabled = enabled;
  _pkgitemtype = "U";
}

LoadAppUI::LoadAppUI(const QDomElement &elem, const bool system,
                     QStringList &msg, QList<bool> &fatal)
  : Loadable(elem, system, msg, fatal)
{
  _pkgitemtype = "U";

  if (elem.nodeName() != "loadappui")
  {
    msg.append(TR("Creating a LoadAppUI element from a %1 node.")
                         .arg(elem.nodeName()));
    fatal.append(false);
  }

  if (elem.hasAttribute("grade"))
  {
    msg.append(TR("Node %1 '%2' has a 'grade' attribute but "
                      "should use 'order' instead.")
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

int LoadAppUI::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  int errLine = 0;
  int errCol = 0;
  QDomDocument doc;
  if (! doc.setContent(pdata, &errMsg, &errLine, &errCol))
  {
    errMsg = (TR("<font color=red>Error parsing file %1: %2 on "
                          "line %3 column %4</font>")
                          .arg(_filename).arg(errMsg).arg(errLine).arg(errCol));
    return -1;
  }

  QDomElement root = doc.documentElement();
  if (root.tagName() != "ui")
  {
    errMsg = TR("<font color=red>XML Document %1 does not have root"
                         " node of 'ui'</font>")
                         .arg(_filename);
    return -2;
  }

  if (DEBUG)
    qDebug("LoadAppUI::writeToDB() name before looking for class node: %s",
           qPrintable(_name));
  QDomElement n = root.firstChildElement("class");
  if (n.isNull())
  {
    errMsg = TR("<font color=red>XML Document %1 does not name its "
                          "class and is not a valid UI Form.")
                          .arg(_filename);
    return -3;
  }
  _name = n.text();
  if (DEBUG)
    qDebug("LoadAppUI::writeToDB() name after looking for class node: %s",
           qPrintable(_name));

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
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
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
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
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
    select.prepare(QString("SELECT uiform_id, -1, -1"
                           "  FROM uiform "
                           " WHERE ((uiform_name=:name)"
                           "   AND  (uiform_order=:grade));")
                        .arg(_system ? "" : "pkg"));
  else
    select.prepare(_pkgitemQueryStr);
  select.bindValue(":name",    _name);
  select.bindValue(":grade",   _grade);
  select.bindValue(":pkgname", pkgname);
  select.bindValue(":type",    _pkgitemtype);
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
    errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
    return -5;
  }

  if (formid >= 0)
    upsert.prepare(QString("UPDATE %1uiform "
                           "   SET uiform_order=:grade, "
                           "       uiform_enabled=:enabled,"
                           "       uiform_source=:source,"
                           "       uiform_notes=:notes "
                           " WHERE (uiform_id=:id); ")
                          .arg(_system ? "" : "pkg"));
  else
  {
    upsert.exec("SELECT NEXTVAL('uiform_uiform_id_seq');");
    if (upsert.first())
      formid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }
    upsert.prepare(QString("INSERT INTO %1uiform ("
                           "       uiform_id, uiform_name, uiform_order, "
                           "       uiform_enabled, uiform_source, uiform_notes) "
                           "VALUES (:id, :name, :grade,"
                           "       :enabled, :source, :notes);")
                          .arg(_system ? "" : "pkg"));
  }

  upsert.bindValue(":id",      formid);
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
    int tmp = upsertPkgItem(pkgitemid, pkgheadid, formid, errMsg);
    if (tmp < 0)
      return tmp;
  }

  return formid;
}
