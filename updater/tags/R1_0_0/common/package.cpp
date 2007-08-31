#include "package.h"

#include <qdom.h>
//Added by qt3to4:
#include <Q3ValueList>

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
    int idx = version.find('.');
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

  QDomNodeList nList = elem.childNodes();
  for(unsigned int n = 0; n < nList.count(); ++n)
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
    else
    {
      // ERROR?
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

  Q3ValueList<Prerequisite>::iterator pit;
  for(pit = _prerequisites.begin(); pit != _prerequisites.end(); ++pit)
    elem.appendChild((*pit).createElement(doc));

  Q3ValueList<Script>::iterator sit;
  for(sit = _scripts.begin(); sit != _scripts.end(); ++sit)
    elem.appendChild((*sit).createElement(doc));

  Q3ValueList<LoadReport>::iterator rit;
  for(rit = _reports.begin(); rit != _reports.end(); ++rit)
    elem.appendChild((*rit).createElement(doc));

  return elem;
}

bool Package::containsReport(const QString & reportname) const
{
  Q3ValueList<LoadReport>::const_iterator it;
  for(it = _reports.begin(); it != _reports.end(); ++it)
  {
    if((*it).name() == reportname)
      return true;
  }
  return false;
}

bool Package::containsScript(const QString & scriptname) const
{
  Q3ValueList<Script>::const_iterator it;
  for(it = _scripts.begin(); it != _scripts.end(); ++it)
  {
    if((*it).name() == scriptname)
      return true;
  }
  return false;
}

bool Package::containsPrerequisite(const QString & prereqname) const
{
  Q3ValueList<Prerequisite>::const_iterator it;
  for(it = _prerequisites.begin(); it != _prerequisites.end(); ++it)
  {
    if((*it).name() == prereqname)
      return true;
  }
  return false;
}

