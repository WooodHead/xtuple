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

#include "package.h"

#include <QDomDocument>
#include <QList>
#include <QMessageBox>

#include "loadreport.h"
#include "prerequisite.h"
#include "script.h"

Package::Package(const QString & id)
  : _id(id), _majVersion(-1), _minVersion(-1)
{
}

Package::Package(const QDomElement & elem)
  : _majVersion(-1), _minVersion(-1)
{
  _id = elem.attribute("id");
  QString version = elem.attribute("version");
  if(!version.isEmpty())
  {
    int idx = version.indexOf('.');
    if(idx != -1)
    {
      bool ok = FALSE;
      _majVersion = version.left(idx).toInt(&ok);
      if(!ok)
        _majVersion = -1;

      _minVersion = version.right(version.length() - (idx + 1)).toInt(&ok);
      if(!ok)
        _minVersion = -1;
    }
  }

  QStringList reportedErrorTags;

  QDomNodeList nList = elem.childNodes();
  for(int n = 0; n < nList.count(); ++n)
  {
    QDomElement elemThis = nList.item(n).toElement();
    if(elemThis.tagName() == "prerequisite")
    {
      Prerequisite prereq(elemThis);
      _prerequisites.append(prereq);
    }
    else if(elemThis.tagName() == "script")
    {
      Script script(elemThis);
      _scripts.append(script);
    }
    else if(elemThis.tagName() == "loadreport")
    {
      LoadReport report(elemThis);
      _reports.append(report);
    }
    else if (! reportedErrorTags.contains(elemThis.tagName()))
    {
      QMessageBox::warning(0, QObject::tr("Unknown Package Element"),
                           QObject::tr("This package contains reference to an "
                                       "element '%1'. The application does not "
                                       "know how to process and so it will be "
                                       "ignored.")
                           .arg(elemThis.tagName()));
      reportedErrorTags << elemThis.tagName();
    }
  }
}

Package::~Package()
{
}

QDomElement Package::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement("package");
  elem.setAttribute("id", _id);
  elem.setAttribute("version", "1.0");

  QList<Prerequisite>::iterator pit = _prerequisites.begin();
  for(; pit != _prerequisites.end(); ++pit)
    elem.appendChild((*pit).createElement(doc));

  QList<Script>::iterator sit = _scripts.begin();
  for(; sit != _scripts.end(); ++sit)
    elem.appendChild((*sit).createElement(doc));

  QList<LoadReport>::iterator rit = _reports.begin();
  for(; rit != _reports.end(); ++rit)
    elem.appendChild((*rit).createElement(doc));

  return elem;
}

bool Package::containsReport(const QString & reportname) const
{
  QList<LoadReport>::const_iterator it = _reports.begin();
  for(; it != _reports.end(); ++it)
  {
    if((*it).name() == reportname)
      return true;
  }
  return false;
}

bool Package::containsScript(const QString & scriptname) const
{
  QList<Script>::const_iterator it = _scripts.begin();
  for(; it != _scripts.end(); ++it)
  {
    if((*it).name() == scriptname)
      return true;
  }
  return false;
}

bool Package::containsPrerequisite(const QString & prereqname) const
{
  QList<Prerequisite>::const_iterator it = _prerequisites.begin();
  for(; it != _prerequisites.end(); ++it)
  {
    if((*it).name() == prereqname)
      return true;
  }
  return false;
}

