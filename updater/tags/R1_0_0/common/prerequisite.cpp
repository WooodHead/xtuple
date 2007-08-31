#include "prerequisite.h"

#include <qdom.h>
//Added by qt3to4:
#include <Q3ValueList>

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
  for(unsigned int n = 0; n < nList.count(); ++n)
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

  Q3ValueList<PrerequisiteProvider>::iterator it;
  for(it = _providers.begin(); it != _providers.end(); ++it)
  {
    if((*it).isValid())
      elem.appendChild((*it).createElement(doc));
  }

  return elem;
}

void Prerequisite::setProvider(const PrerequisiteProvider & p)
{
  for(unsigned int i = 0; i < _providers.count(); ++i)
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
  Q3ValueList<PrerequisiteProvider>::iterator it;
  for(it = _providers.begin(); it != _providers.end(); ++it)
  {
    if((*it).package() == package)
    {
      it = _providers.remove(it);
      return TRUE;
    }
  }
  return FALSE;
}

PrerequisiteProvider Prerequisite::provider(const QString & package) const
{
  Q3ValueList<PrerequisiteProvider>::const_iterator it;
  for(it = _providers.begin(); it != _providers.end(); ++it)
  {
    if((*it).package() == package)
      return *it;
  }
  return PrerequisiteProvider();
}

QStringList Prerequisite::providerList() const
{
  QStringList list;
  Q3ValueList<PrerequisiteProvider>::const_iterator it;
  for(it = _providers.begin(); it != _providers.end(); ++it)
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
