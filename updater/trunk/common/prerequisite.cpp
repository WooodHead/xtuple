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

#include "prerequisite.h"

#include <QDomDocument>
#include <QList>
#include <QSqlError>
#include <QSqlQuery>

#include "licensewindow.h"

#define TR(a) QObject::tr(a)

#define DEBUG false

QString Prerequisite::_sqlerrtxt = TR("The following error was "
                                      "encountered while trying to "
                                      "check the prerequisite %1:"
                                      "<br>%2<br>%3");

PrerequisiteProvider::PrerequisiteProvider(const QString & package, const QString & info)
  : _package(package), _info(info)
{
}

PrerequisiteProvider::PrerequisiteProvider(const QDomElement & elem)
{
  _package = elem.attribute("name");
  _info = elem.text();
}

PrerequisiteProvider::~PrerequisiteProvider()
{
}

QDomElement PrerequisiteProvider::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement("providedby");

  elem.setAttribute("name", _package);
  elem.appendChild(doc.createTextNode(_info));

  return elem;
}

Prerequisite::Prerequisite()
{
  _dependency = 0;
  _message    = QString::null;
  _name       = QString::null;
  _query      = QString::null;
  _type       = None;
}

Prerequisite::Prerequisite(const Prerequisite &p)
{
  if (p._dependency)
    _dependency = new DependsOn(p._dependency->name(),
                                p._dependency->version(),
                                p._dependency->developer());
  else
    _dependency = 0;

  _message    = p._message;
  _name       = p._name;
  _query      = p._query;
  _type       = p._type;
}

Prerequisite::Prerequisite(const QDomElement & elem)
{
  _dependency = 0;
  _message    = QString::null;
  _name       = elem.attribute("name");
  _query      = QString::null;
  _type       = nameToType(elem.attribute("type"));

  QDomNodeList nList = elem.childNodes();
  for(int n = 0; n < nList.count(); ++n)
  {
    QDomElement elemThis = nList.item(n).toElement();
    if(elemThis.tagName() == "query")
      _query = elemThis.text();
    else if(elemThis.tagName() == "message")
      _message = elemThis.text();
    else if(elemThis.tagName() == "providedby")
    {
      PrerequisiteProvider provider(elemThis);
      if(provider.isValid())
        _providers.append(provider);
    }
    else if (elemThis.tagName() == "dependson")
      _dependency = new DependsOn(elemThis.attribute("name"),
                                  elemThis.attribute("version"),
                                  elemThis.attribute("developer"));
    else
    {
      // ERROR?
    }
  }
  if (DEBUG)
    qDebug("Prerequisite(QDomElement&): name %s, type %d (%s), message %s, "
           "dependency %p (%s %s %s), query %s",
           qPrintable(_name), _type, qPrintable(typeToName(_type)),
           qPrintable(_message), _dependency,
           qPrintable(_dependency ? _dependency->name()     : QString()),
           qPrintable(_dependency ? _dependency->version()  : QString()),
           qPrintable(_dependency ? _dependency->developer(): QString()),
           qPrintable(_query));
}

Prerequisite::~Prerequisite()
{
  if (DEBUG)
    qDebug("Prerequisite::~Prerequisite(): name %s, type %d (%s), message %s",
           qPrintable(_name), _type, qPrintable(typeToName(_type)),
           qPrintable(_message));
  if (_dependency)
  {
    delete _dependency;
    _dependency = 0;
  }
}

QDomElement Prerequisite::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement("prerequisite");
  QDomElement elemThis;

  elem.setAttribute("name", _name);
  elem.setAttribute("type", typeToName(_type));

  switch (_type)
  {
    case Query:
      elemThis = doc.createElement("query");
      elemThis.appendChild(doc.createTextNode(_query));
      elem.appendChild(elemThis);
      break;

    case License:
      break;

    case Dependency:
      elemThis = doc.createElement("dependson");
      elemThis.setAttribute("name", _dependency->name());
      if (! _dependency->developer().isEmpty())
        elemThis.setAttribute("developer", _dependency->developer());
      if (! _dependency->version().isEmpty())
        elemThis.setAttribute("version", _dependency->version());
      break;

    default:
      break;
  }

  if (! _message.isEmpty())
  {
    elemThis = doc.createElement("message");
    elemThis.appendChild(doc.createTextNode(_message));
    elem.appendChild(elemThis);
  }

  QList<PrerequisiteProvider>::iterator it = _providers.begin();
  for(; it != _providers.end(); ++it)
  {
    if((*it).isValid())
      elem.appendChild((*it).createElement(doc));
  }

  return elem;
}

void Prerequisite::setProvider(const PrerequisiteProvider & p)
{
  for(int i = 0; i < _providers.count(); ++i)
  {
    if(_providers[i].package() == p.package())
    {
      _providers[i] = p;
      return;
    }
  }
  _providers.append(p);
}

bool Prerequisite::removeProvider(const QString & package)
{
  QList<PrerequisiteProvider>::iterator it = _providers.begin();
  for(; it != _providers.end(); ++it)
  {
    if((*it).package() == package)
    {
      it = _providers.erase(it);
      return TRUE;
    }
  }
  return FALSE;
}

PrerequisiteProvider Prerequisite::provider(const QString & package) const
{
  QList<PrerequisiteProvider>::const_iterator it = _providers.begin();
  for(; it != _providers.end(); ++it)
  {
    if((*it).package() == package)
      return *it;
  }
  return PrerequisiteProvider();
}

QStringList Prerequisite::providerList() const
{
  QStringList list;
  QList<PrerequisiteProvider>::const_iterator it = _providers.begin();
  for(; it != _providers.end(); ++it)
    list.append((*it).package());
  return list;
}

QString Prerequisite::typeToName(Type type)
{
  QString str = "None";
  switch (type)
  {
    case Query:      str = "Query";      break;
    case License:    str = "License";    break;
    case Dependency: str = "Dependency"; break;
    case None: break;
    default:   break;
  }
  return str;
}

Prerequisite::Type Prerequisite::nameToType(const QString & name)
{
  if ("query" == name.toLower())
    return Query;
  else if ("license" == name.toLower())
    return License;
  else if ("dependency" == name.toLower())
    return Dependency;
  return None;
}

QStringList Prerequisite::typeList(bool includeNone)
{
  QStringList list;
  if(includeNone)
    list << "None";
  list << "Query";
  list << "License";
  list << "Dependency";
  return list;
}

bool Prerequisite::met(QString &errMsg)
{
  if (DEBUG)
    qDebug("Prerequisite::met() name %s, type %d (%s), message %s, "
           "dependency %p (%s %s %s), query %s",
           qPrintable(_name), _type, qPrintable(typeToName(_type)),
           qPrintable(_message), _dependency,
           qPrintable(/*_dependency ? _dependency->name()     :*/ QString()),
           qPrintable(/*_dependency ? _dependency->version()  :*/ QString()),
           qPrintable(/*_dependency ? _dependency->developer():*/ QString()),
           qPrintable(_query));

  bool returnVal = false;

  switch (_type)
  {
    case Query:
      {
      QSqlQuery query;
      query.exec(_query);
      if (query.first())
      {
        returnVal = query.value(0).toBool();
        errMsg    = _message;
      }
      else if (query.lastError().type() != QSqlError::NoError)
        errMsg = _sqlerrtxt.arg(_name).arg(query.lastError().databaseText())
                           .arg(query.lastError().driverText());
      else
      {
        returnVal = false;
        errMsg    = _message;
      }
      break;
      }

    case License:
      {
      LicenseWindow newdlg(_message);
      returnVal = (newdlg.exec() == QDialog::Accepted);
      if (! returnVal)
        errMsg = TR("The user declined to accept the usage license.");
      break;
      }

    case Dependency:
      {
      QString sql = "SELECT * FROM pkghead WHERE ((pkghead_name=:name) ";
      if (! _dependency->version().isEmpty())
        sql += "AND (pkghead_version=:version) ";
      if (! _dependency->developer().isEmpty())
        sql += "AND (pkghead_developer=:developer) ";
      sql += ");";

      QSqlQuery query;
      query.prepare(sql);
      query.bindValue(":name",      _dependency->name());
      query.bindValue(":version",   _dependency->version());
      query.bindValue(":developer", _dependency->developer());
      query.exec();
      if (query.first())
        returnVal = true;
      else if (query.lastError().type() != QSqlError::NoError)
        errMsg = _sqlerrtxt.arg(_name).arg(query.lastError().databaseText())
                           .arg(query.lastError().driverText());
      else
        errMsg = TR("%1<br>The prerequisite %2 has not been met. It "
                             "requires that the package %3 (version %4, "
                             "developer %5) be installed first.")
                    .arg(_message).arg(_name).arg(_dependency->name())
                    .arg(_dependency->version().isEmpty() ?
                         TR("Unspecified") : _dependency->version())
                    .arg(_dependency->developer().isEmpty() ?
                         TR("Unspecified") : _dependency->developer());
      break;
      }

    default:
      errMsg = TR("Encountered an unknown Prerequisite type. "
                           "Prerequisite '%1' has not been validated.")
                        .arg(_name);
      break;
  }

  return returnVal;
}

int Prerequisite::writeToDB(const QString pkgname, QString &errMsg)
{
  if (DEBUG)
    qDebug("Prerequisite::writeToDB(%s, &errMsg)", qPrintable(pkgname));

  if (! pkgname.isEmpty() && _dependency)
  {
    QSqlQuery select;
    int pkgheadid = -1;
    select.prepare("SELECT pkghead_id FROM pkghead WHERE (pkghead_name=:name);");
    select.bindValue(":name", pkgname);
    select.exec();
    if (select.first())
      pkgheadid = select.value(0).toInt();
    else if (select.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_name)
                         .arg(select.lastError().databaseText())
                         .arg(select.lastError().driverText());
      return -1;
    }

    int parentid = -1;
    QString sql = "SELECT * FROM pkghead WHERE ((pkghead_name=:name) ";
    if (! _dependency->version().isEmpty())
      sql += "AND (pkghead_version=:version) ";
    if (! _dependency->developer().isEmpty())
      sql += "AND (pkghead_developer=:developer) ";
    sql += ") ORDER BY pkghead_version DESC LIMIT 1;";

    select.prepare(sql);
    select.bindValue(":name",      _dependency->name());
    select.bindValue(":version",   _dependency->version());
    select.bindValue(":developer", _dependency->developer());
    select.exec();
    if (select.first())
      parentid = select.value(0).toInt();
    else if (select.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_name)
                         .arg(select.lastError().databaseText())
                         .arg(select.lastError().driverText());
      return -2;
    }
    else
    {
      errMsg = TR("Could not record the dependency %1 of package %2 "
                           "on package %3 (version %4, developer %5) because "
                           "the record for %6 was not found.")
                    .arg(_name).arg(pkgname).arg(_dependency->name())
                    .arg(_dependency->version().isEmpty() ?
                         TR("Unspecified") : _dependency->version())
                    .arg(_dependency->developer().isEmpty() ?
                         TR("Unspecified") : _dependency->developer())
                    .arg(_dependency->name());
      return -3;
    }

    int pkgdepid = -1;
    select.prepare("SELECT * FROM pkgdep "
                   "WHERE ((pkgdep_pkghead_id=:pkgheadid)"
                   "  AND  (pkgdep_parent_pkghead_id=:parentid));");
    select.bindValue(":pkgheadid", pkgheadid);
    select.bindValue(":parentid",  parentid);
    select.exec();
    if (select.first())
      pkgdepid=select.value(0).toInt();
    else if (select.lastError().type() != QSqlError::NoError)
    {
      errMsg = _sqlerrtxt.arg(_name)
                         .arg(select.lastError().databaseText())
                         .arg(select.lastError().driverText());
      return -4;
    }

    QSqlQuery upsert;
    if (pkgdepid > 0)
      upsert.prepare("UPDATE pkgdep "
                     "SET pkgdep_pkghead_id=:pkgheadid,"
                     "    pkgdep_parent_pkghead_id=:parentid "
                     "WHERE (pkgdep_id=:pkgdepid);");
    else
    {
      upsert.exec("SELECT NEXTVAL('pkgdep_pkgdep_id_seq');");
      if (upsert.first())
        pkgdepid = upsert.value(0).toInt();
      else if (upsert.lastError().type() != QSqlError::NoError)
      {
        QSqlError err = upsert.lastError();
        errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
        return -5;
      }
      upsert.prepare("INSERT INTO pkgdep ("
                     "   pkgdep_id, pkgdep_pkghead_id, pkgdep_parent_pkghead_id"
                     ") VALUES ("
                     "    :pkgdepid, :pkgheadid, :parentid);");
    }

    upsert.bindValue(":pkgdepid",   pkgdepid);
    upsert.bindValue(":pkgheadid",  pkgheadid);
    upsert.bindValue(":parentid",   parentid);

    if (! upsert.exec())
    {
      QSqlError err = upsert.lastError();
      errMsg = _sqlerrtxt.arg(_name).arg(err.driverText()).arg(err.databaseText());
      return -6;
    }

    return pkgdepid;
  }

  return 0;
}
