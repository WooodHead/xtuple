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

#include "loadreport.h"

#include <QDomDocument>
#include <QMessageBox>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>     // used by QSqlQuery::bindValue()

LoadReport::LoadReport(const QString &name, const int grade, const bool system,
                       const QString &comment, const QString &filename)
  : Loadable("loadreport", name, grade, system, comment, filename)
{
  _pkgitemtype = "R";
}

LoadReport::LoadReport(const QDomElement & elem, const bool system,
                       QStringList &msg, QList<bool> &fatal)
  : Loadable(elem, system, msg, fatal)
{
  _pkgitemtype = "R";

  if (elem.nodeName() != "loadreport")
  {
    msg.append(TR("Creating a LoadAppReport element from a %1 node.")
                       .arg(elem.nodeName()));
    fatal.append(false);
  }
}

int LoadReport::writeToDB(const QByteArray &pdata, const QString pkgname, QString &errMsg)
{
  int errLine = 0;
  int errCol  = 0;
  QDomDocument doc;
  if (! doc.setContent(pdata, &errMsg, &errLine, &errCol))
  {
    errMsg = (TR("<font color=red>Error parsing file %1: %2 on "
                          "line %3 column %4</font>")
                          .arg(_filename).arg(errMsg).arg(errLine).arg(errCol));
    return -1;
  }

  QDomElement root = doc.documentElement();
  if(root.tagName() != "report")
  {
    errMsg = TR("<font color=red>XML Document %1 does not have root"
                         " node of report</font>")
                         .arg(_filename);
    return -2;
  }

  for(QDomNode n = root.firstChild(); !n.isNull(); n = n.nextSibling())
  {
    if(n.nodeName() == "name")
      _name = n.firstChild().nodeValue();
    else if(n.nodeName() == "description")
      _comment = n.firstChild().nodeValue();
  }
  QString report_src = doc.toString();

  if(_filename.isEmpty())
  {
    errMsg = TR("<font color=orange>The document %1 does not have"
                         " a report name defined</font>")
                         .arg(_filename);
    return -3;
  }

  if (_grade == INT_MIN)
  {
    QSqlQuery minOrder;
    minOrder.prepare("SELECT MIN(report_grade) AS min "
                     "FROM report "
                     "WHERE (report_name=:name);");
    minOrder.bindValue(":name", _name);
    minOrder.exec();
    if (minOrder.first())
      _grade = minOrder.value(0).toInt();
    else if (minOrder.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = minOrder.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -4;
    }
    else
      _grade = 0;
  }
  else if (_grade == INT_MAX)
  {
    QSqlQuery maxOrder;
    maxOrder.prepare("SELECT MAX(report_grade) AS max "
                     "FROM report "
                     "WHERE (report_name=:name);");
    maxOrder.bindValue(":name", _name);
    maxOrder.exec();
    if (maxOrder.first())
      _grade = maxOrder.value(0).toInt();
    else if (maxOrder.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = maxOrder.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -5;
    }
    else
      _grade = 0;
  }

  QSqlQuery select;
  QSqlQuery upsert;

  int reportid  = -1;
  int pkgheadid = -1;
  int pkgitemid = -1;

  /* The following ugliness exists to avoid
      ERROR:  duplicate key violates unique constraint "report_name_grade_idx"
   */
  QString rptselect("SELECT report_id, -1, -1"
                    "  FROM report "
                    " WHERE ((report_name=:name) "
                    "    AND (report_grade=:grade) );");

  if (pkgname.isEmpty())
  {
    select.prepare(rptselect);
    select.bindValue(":name",    _name);
    select.bindValue(":grade",   _grade);
    select.exec();
    if(select.first())
      reportid = select.value(0).toInt();
    else if (select.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = select.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }
  }
  else 
  {
    select.prepare(_pkgitemQueryStr);
    select.bindValue(":name",    _name);
    select.bindValue(":pkgname", pkgname);
    select.bindValue(":grade",   _grade);
    select.bindValue(":type",    _pkgitemtype);
    select.exec();
    if(select.first())
    {
      reportid  = select.value(0).toInt();
      pkgheadid = select.value(1).toInt();
      pkgitemid = select.value(2).toInt();
    }
    else if (select.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = select.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -7;
    }
    if (reportid < 0)   // select told us there's no report *in* the package
    {
      // if there's a version of the report that's not part of the package
      select.prepare(rptselect);
      select.bindValue(":name",    _name);
      select.bindValue(":grade",   _grade);
      select.exec();
      if(select.first())
      {
        // then insert a new one with a higher grade
        QSqlQuery next;
        next.prepare("SELECT MIN(sequence_value) AS next "
                         "FROM sequence "
                         "WHERE ((sequence_value NOT IN ("
                         "      SELECT report_grade"
                         "      FROM report"
                         "      WHERE (report_name=:name)))"
                         "  AND (sequence_value>=:grade));");
        next.bindValue(":name", _name);
        next.bindValue(":grade",   _grade);
        next.exec();
        if (next.first())
          _grade = next.value(0).toInt();
        else if (next.lastError().type() != QSqlError::NoError)
        {
          QSqlError err = next.lastError();
          errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
          return -8;
        }
      }
      else if (select.lastError().type() != QSqlError::NoError)
      {
        QSqlError err = select.lastError();
        errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
        return -9;
      }
    }
  }

  if (reportid >= 0)
    upsert.prepare(QString("UPDATE %1report "
                           "   SET report_descrip=:notes, "
                           "       report_source=:source "
                           " WHERE (report_id=:id);")
                          .arg(_system ? "" : "pkg"));
  else
  {
    upsert.prepare("SELECT NEXTVAL('report_report_id_seq');");
    upsert.exec();
    if (upsert.first())
      reportid = upsert.value(0).toInt();
    else if (upsert.lastError().type() != QSqlError::NoError)
    {
      QSqlError err = upsert.lastError();
      errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
      return -10;
    }

    upsert.prepare(QString("INSERT INTO %1report "
                           "       (report_id, report_name, report_grade, "
                           "        report_source, report_descrip)"
                           "VALUES (:id, :name, :grade, :source, :notes);")
                          .arg(_system ? "" : "pkg"));
  }

  upsert.bindValue(":id",      reportid);
  upsert.bindValue(":grade",   _grade);
  upsert.bindValue(":source",  report_src);
  upsert.bindValue(":notes",   _comment);
  upsert.bindValue(":name",    _name);

  if (!upsert.exec())
  {
    QSqlError err = upsert.lastError();
    errMsg = _sqlerrtxt.arg(_filename).arg(err.driverText()).arg(err.databaseText());
    return -11;
  }

  if (pkgheadid >= 0)
  {
    int tmp = upsertPkgItem(pkgitemid, pkgheadid, reportid, errMsg);
    if (tmp < 0)
      return tmp;
  }

  return 0;
}
