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

#include "csvatlas.h"

#include <qdom.h>
//Added by qt3to4:
#include <Q3ValueList>

CSVAtlas::CSVAtlas()
{
}

CSVAtlas::CSVAtlas(const QDomElement & elem)
{
  QDomNodeList nList = elem.childNodes();
  for(unsigned int n = 0; n < nList.count(); ++n)
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
  for(unsigned int i = 0; i < _maps.count(); ++i)
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

