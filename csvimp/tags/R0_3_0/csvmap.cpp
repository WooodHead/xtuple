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

#include "csvmap.h"

#include <qdom.h>
//Added by qt3to4:
#include <Q3ValueList>

CSVMap::CSVMap(const QString & name)
{
  _name = name;
  _description = QString::null;
  _action = Insert;
  _sqlPre = QString::null;
  _sqlPreContinueOnError = false;
  _sqlPost = QString::null;
}

CSVMap::CSVMap(const QDomElement & elem)
{
  _name = QString::null;
  _description = QString::null;
  _action = Insert;
  _sqlPre = QString::null;
  _sqlPreContinueOnError = false;
  _sqlPost = QString::null;

  QDomNodeList nList = elem.childNodes();
  for(unsigned int n = 0; n < nList.count(); ++n)
  {
    QDomElement elemThis = nList.item(n).toElement();
    if(elemThis.tagName() == "Name")
      setName(elemThis.text());
    else if(elemThis.tagName() == "Table")
      setTable(elemThis.text());
    else if(elemThis.tagName() == "Action")
      setAction(nameToAction(elemThis.text()));
    else if(elemThis.tagName() == "Description")
      setDescription(elemThis.text());
    else if(elemThis.tagName() == "PreSQL")
    {
      setSqlPre(elemThis.text());
      QDomAttr attr = elemThis.attributeNode("continueOnError");
      if(!attr.isNull() && attr.value() == "true")
        _sqlPreContinueOnError = true;
    }
    else if(elemThis.tagName() == "PostSQL")
      setSqlPost(elemThis.text());
    else if(elemThis.tagName() == "CSVMapField")
    {
      CSVMapField field(elemThis);
      _fields.append(field);
    }
    else
    {
      // ERROR
    }
  }
}

CSVMap::~CSVMap()
{
}

QDomElement CSVMap::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement("CSVMap");
  QDomElement elemThis;

  elemThis = doc.createElement("Name");
  elemThis.appendChild(doc.createTextNode(_name));
  elem.appendChild(elemThis);

  elemThis = doc.createElement("Table");
  elemThis.appendChild(doc.createTextNode(_table));
  elem.appendChild(elemThis);

  elemThis = doc.createElement("Action");
  elemThis.appendChild(doc.createTextNode(actionToName(_action)));
  elem.appendChild(elemThis);

  if(!_description.isEmpty())
  {
    elemThis = doc.createElement("Description");
    elemThis.appendChild(doc.createTextNode(_description));
    elem.appendChild(elemThis);
  }

  if(!_sqlPre.isEmpty())
  {
    elemThis = doc.createElement("PreSQL");
    if(_sqlPreContinueOnError)
      elemThis.setAttribute("continueOnError","true");
    elemThis.appendChild(doc.createTextNode(_sqlPre));
    elem.appendChild(elemThis);
  }

  if(!_sqlPost.isEmpty())
  {
    elemThis = doc.createElement("PostSQL");
    elemThis.appendChild(doc.createTextNode(_sqlPost));
    elem.appendChild(elemThis);
  }

  Q3ValueList<CSVMapField>::iterator it;
  for(it = _fields.begin(); it != _fields.end(); ++it)
  {
    if(!(*it).isDefault())
      elem.appendChild((*it).createElement(doc));
  }

  return elem;
}

void CSVMap::setName(const QString & name)
{
  _name = name;
}

void CSVMap::setTable(const QString & table)
{
  _table = table;
}

void CSVMap::setDescription(const QString & desc)
{
  _description = desc;
}

void CSVMap::setAction(Action act)
{
  _action = act;
}

void CSVMap::setField(const CSVMapField & f)
{
  for(unsigned int i = 0; i < _fields.count(); ++i)
  {
    if(_fields[i].name() == f.name())
    {
      _fields[i] = f;
      return;
    }
  }
  _fields.append(f);
}

bool CSVMap::removeField(const QString & name)
{
  Q3ValueList<CSVMapField>::iterator it;
  for(it = _fields.begin(); it != _fields.end(); ++it)
  {
    if((*it).name() == name)
    {
      it = _fields.remove(it);
      return TRUE;
    }
  }
  return FALSE;
}

CSVMapField CSVMap::field(const QString & name) const
{
  Q3ValueList<CSVMapField>::const_iterator it;
  for(it = _fields.begin(); it != _fields.end(); ++it)
  {
    if((*it).name() == name)
      return *it;
  }
  return CSVMapField();
}

QStringList CSVMap::fieldList() const
{
  QStringList list;
  Q3ValueList<CSVMapField>::const_iterator it;
  for(it = _fields.begin(); it != _fields.end(); ++it)
  {
    list.append((*it).name());
  }
  return list;
}

void CSVMap::setSqlPre(const QString & sql)
{
  _sqlPre = sql;
}

void CSVMap::setSqlPreContinueOnError(bool b)
{
  _sqlPreContinueOnError = b;
}

void CSVMap::setSqlPost(const QString & sql)
{
  _sqlPost = sql;
}

void CSVMap::simplify()
{
  Q3ValueList<CSVMapField>::iterator it = _fields.begin();
  while(it != _fields.end())
  {
    if((*it).isDefault())
      it = _fields.remove(it);
    else
      ++it;
  }
}

QString CSVMap::actionToName(Action act)
{
  QString str = "Unknown";
  if(act == Insert)
    str = "Insert";
  else if(act == Update)
    str = "Update";
  else if(act == Append)
    str = "Append";
  return str;
}

CSVMap::Action CSVMap::nameToAction(const QString & name)
{
  if("Insert" == name)
    return Insert;
  else if("Update" == name)
    return Update;
  else if("Append" == name)
    return Append;
  return Insert;
}

//
// CSVMapField
//
CSVMapField::CSVMapField(const QString & name)
{
  _name = name;
  _isKey = FALSE;
  _type  = QVariant::Invalid;
  _action = Action_Default;
  _column = 1;
  _ifNullAction = Nothing;
  _columnAlt = 1;
  _ifNullActionAlt = Nothing;
  _valueAlt = QString::null;
}

CSVMapField::CSVMapField(const QDomElement & elem)
{
  _name = QString::null;
  _isKey = FALSE;
  _type  = QVariant::Invalid;
  _action = Action_Default;
  _column = 1;
  _ifNullAction = Nothing;
  _columnAlt = 1;
  _ifNullActionAlt = Nothing;
  _valueAlt = QString::null;

  Action action = Action_Default;

  QDomNodeList nList = elem.childNodes();
  for(unsigned int n = 0; n < nList.count(); ++n)
  {
    QDomElement elemThis = nList.item(n).toElement();
    if(elemThis.tagName() == "Name")
      setName(elemThis.text());
    else if(elemThis.tagName() == "isKey")
      setIsKey(TRUE);
    else if(elemThis.tagName() == "Type")
      setType(QVariant::nameToType(elemThis.text()));
    else if(elemThis.tagName() == "Action")
      action = nameToAction(elemThis.text());
    else if(elemThis.tagName() == "Column")
    {
      if(action == Action_Default) action = Action_UseColumn;
      setColumn(elemThis.text().toInt());
    }
    else if(elemThis.tagName() == "AltColumn")
      setColumnAlt(elemThis.text().toInt());
    else if(elemThis.tagName() == "IfNull")
      setIfNullAction(nameToIfNull(elemThis.text()));
    else if(elemThis.tagName() == "AltIfNull")
      setIfNullActionAlt(nameToIfNull(elemThis.text()));
    else if(elemThis.tagName() == "AltValue")
      setValueAlt(elemThis.text());
    else
    {
      // ERROR
    }
  }
  if(action != Action_Default)
    setAction(action);
}

CSVMapField::~CSVMapField()
{
}

QDomElement CSVMapField::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement("CSVMapField");
  QDomElement elemThis;

  elemThis = doc.createElement("Name");
  elemThis.appendChild(doc.createTextNode(_name));
  elem.appendChild(elemThis);

  if(_isKey)
    elem.appendChild(doc.createElement("isKey"));

  if(_type != QVariant::Invalid)
  {
    elemThis = doc.createElement("Type");
    elemThis.appendChild(doc.createTextNode(QVariant::typeToName(_type)));
    elem.appendChild(elemThis);
  }

  if(_action == Action_UseColumn)
  {
    elemThis = doc.createElement("Column");
    elemThis.appendChild(doc.createTextNode(QString("%1").arg(_column)));
    elem.appendChild(elemThis);

    if(_ifNullAction != Nothing)
    {
      elemThis = doc.createElement("IfNull");
      elemThis.appendChild(doc.createTextNode(ifNullToName(_ifNullAction)));
      elem.appendChild(elemThis);
    }

    if(_ifNullAction == UseAlternateColumn)
    {
      elemThis = doc.createElement("AltColumn");
      elemThis.appendChild(doc.createTextNode(QString("%1").arg(_columnAlt)));
      elem.appendChild(elemThis);

      if(_ifNullActionAlt != Nothing && _ifNullActionAlt != UseAlternateColumn)
      {
        elemThis = doc.createElement("AltIfNull");
        elemThis.appendChild(doc.createTextNode(ifNullToName(_ifNullActionAlt)));
        elem.appendChild(elemThis);
      }
    }
  }
  else if(_action != Action_Default)
  {
    elemThis = doc.createElement("Action");
    elemThis.appendChild(doc.createTextNode(actionToName(_action)));
    elem.appendChild(elemThis);
  }

  if(_action == Action_UseAlternateValue
    || (_action == Action_UseColumn
      && (_ifNullAction == UseAlternateValue
       || _ifNullActionAlt == UseAlternateValue) ) )
  {
    elemThis = doc.createElement("AltValue");
    elemThis.appendChild(doc.createTextNode(_valueAlt));
    elem.appendChild(elemThis);
  }

  return elem;
}

void CSVMapField::setName(const QString & name)
{
  _name = name;
}

void CSVMapField::setIsKey(bool y)
{
  _isKey = y;
}

void CSVMapField::setType(QVariant::Type t)
{
  _type = t;
}

void CSVMapField::setIfNullAction(IfNull in)
{
  _ifNullAction = in;
}

void CSVMapField::setIfNullActionAlt(IfNull in)
{
  _ifNullActionAlt = in;
}

void CSVMapField::setColumn(unsigned int col)
{
  if(col == 0)
    col = 1;
  _column = col;
}

void CSVMapField::setColumnAlt(unsigned int col)
{
  if(col == 0)
    col = 1;
  _columnAlt = col;
}

void CSVMapField::setValueAlt(const QString & str)
{
  _valueAlt = str;
}

void CSVMapField::setAction(Action a)
{
  _action = a;
}

bool CSVMapField::isDefault() const
{
  if(!_isKey && _action == Action_Default)
    return TRUE;
  return FALSE;
}

QString CSVMapField::ifNullToName(IfNull in)
{
  QString str = "Nothing";
  if(UseEmptyString == in)
    str = "UseEmptyString";
  else if(UseDefault == in)
    str = "UseDefault";
  else if(UseAlternateColumn == in)
    str = "UseAlternateColumn";
  else if(UseAlternateValue == in)
    str = "UseAlternateValue";
  return str;
}

CSVMapField::IfNull CSVMapField::nameToIfNull(const QString & name)
{
  if("UseEmptyString" == name)
    return UseEmptyString;
  else if("UseDefault" == name)
    return UseDefault;
  else if("UseAlternateColumn" == name)
    return UseAlternateColumn;
  else if("UseAlternateValue" == name)
    return UseAlternateValue;
  return Nothing;
}

QStringList CSVMapField::ifNullList(bool altList)
{
  QStringList list;
  list << "Nothing";
  list << "UseDefault";
  list << "UseEmptyString";
  list << "UseAlternateValue";
  if(!altList)
    list << "UseAlternateColumn";
  return list;
}

QString CSVMapField::actionToName(Action a)
{
  QString str = "Default";
  if(Action_UseColumn == a)
    str = "UseColumn";
  else if(Action_UseEmptyString == a)
    str = "UseEmptyString";
  else if(Action_UseAlternateValue == a)
    str = "UseAlternateValue";
  else if(Action_UseNull == a)
    str = "UseNull";
  return str;
}

CSVMapField::Action CSVMapField::nameToAction(const QString & name)
{
  if("UseColumn" == name)
    return Action_UseColumn;
  else if("UseEmptyString" == name)
    return Action_UseEmptyString;
  else if("UseAlternateValue" == name)
    return Action_UseAlternateValue;
  else if("UseNull" == name)
    return Action_UseNull;
  return Action_Default;
}

QStringList CSVMapField::actionList()
{
  QStringList list;
  list << "Default";
  list << "UseColumn";
  list << "UseEmptyString";
  list << "UseAlternateValue";
  list << "UseNull";
  return list;
}
