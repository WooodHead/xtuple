/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "csvatlas.h"

#include <QDomElement>
#include <QDomNodeList>
#include <QDomDocument>
#include <Q3ValueList>

CSVAtlas::CSVAtlas()
{
}

CSVAtlas::CSVAtlas(const QDomElement & elem)
{
  QDomNodeList nList = elem.childNodes();
  for(int n = 0; n < nList.count(); ++n)
  {
    QDomElement elemThis = nList.item(n).toElement();
    if(elemThis.tagName() == "Description")
      setDescription(elemThis.text());
    else if(elemThis.tagName() == "CSVMap")
    {
      CSVMap map(elemThis);
      _maps.append(map);
    }
    else
    {
      // ERROR
    }
  }
}

CSVAtlas::~CSVAtlas()
{
}

QDomElement CSVAtlas::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement("CSVAtlas");

  if(!_description.isEmpty())
  {
    QDomElement desc = doc.createElement("Description");
    desc.appendChild(doc.createTextNode(_description));
    elem.appendChild(desc);
  }

  Q3ValueList<CSVMap>::iterator it;
  for(it = _maps.begin(); it != _maps.end(); ++it)
    elem.appendChild((*it).createElement(doc));

  return elem;
}

void CSVAtlas::setDescription(const QString & desc)
{
  _description = desc;
}

void CSVAtlas::setMap(const CSVMap & m)
{
  for(int i = 0; i < _maps.count(); ++i)
  {
    if(_maps[i].name() == m.name())
    {
      _maps[i] = m;
      return;
    }
  }
  _maps.append(m);
}

bool CSVAtlas::removeMap(const QString & name)
{
  Q3ValueList<CSVMap>::iterator it;
  for(it = _maps.begin(); it != _maps.end(); ++it)
  {
    if((*it).name() == name)
    {
      it = _maps.remove(it);
      return TRUE;
    }
  }
  return FALSE;
}

CSVMap CSVAtlas::map(const QString & name) const
{
  Q3ValueList<CSVMap>::const_iterator it;
  for(it = _maps.begin(); it != _maps.end(); ++it)
  {
    if((*it).name() == name)
      return *it;
  }
  return CSVMap();
}

QStringList CSVAtlas::mapList() const
{
  QStringList list;
  Q3ValueList<CSVMap>::const_iterator it;
  for(it = _maps.begin(); it != _maps.end(); ++it)
  {
    list.append((*it).name());
  }
  return list;
}

