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
 * The Original Code is PostBooks Accounting, ERP, and CRM Suite. 
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2007 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
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
 * Copyright (c) 1999-2007 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by PostBooks, an open source solution from xTuple
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
  : _name(QString::null), _type(None), _message(QString::null), _query(QString::null)
{
}

Prerequisite::Prerequisite(const QDomElement & elem)
  : _message(QString::null), _query(QString::null)
{
  _name = elem.attribute("name");
  _type = nameToType(elem.attribute("type"));

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
    else
    {
      // ERROR?
    }
  }
}

Prerequisite::~Prerequisite()
{
}

QDomElement Prerequisite::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement("prerequisite");
  QDomElement elemThis;

  elem.setAttribute("name", _name);
  elem.setAttribute("type", typeToName(_type));

  if(Query == _type)
  {
    elemThis = doc.createElement("query");
    elemThis.appendChild(doc.createTextNode(_query));
    elem.appendChild(elemThis);
  }

  if(!_message.isEmpty())
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
  if(type == Query)
    str = "Query";
  return str;
}

Prerequisite::Type Prerequisite::nameToType(const QString & name)
{
  if("Query" == name)
    return Query;
  return None;
}

QStringList Prerequisite::typeList(bool includeNone)
{
  QStringList list;
  if(includeNone)
    list << "None";
  list << "Query";
  return list;
}
