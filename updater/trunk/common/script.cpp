#include "script.h"

#include <qdom.h>

Script::Script(const QString & name, OnError onError, const QString & comment)
  : _name(name), _comment(comment), _onError(onError)
{
}

Script::Script(const QDomElement & elem)
{
  _name = elem.attribute("name");
  _onError = nameToOnError(elem.attribute("onerror"));
  _comment = elem.text();
}

Script::~Script()
{
}

QDomElement Script::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement("script");

  elem.setAttribute("name", _name);
  elem.setAttribute("onerror", onErrorToName(_onError));

  if(!_comment.isEmpty())
    elem.appendChild(doc.createTextNode(_comment));

  return elem;
}

QString Script::onErrorToName(OnError onError)
{
  QString str = "Default";
  if(Stop == onError)
    str = "Stop";
  else if(Prompt == onError)
    str = "Prompt";
  else if(Ignore == onError)
    str = "Ignore";
  return str;
}

Script::OnError Script::nameToOnError(const QString & name)
{
  if("Stop" == name)
    return Stop;
  else if("Prompt" == name)
    return Prompt;
  else if("Ignore" == name)
    return Ignore;
  return Default;
}

QStringList Script::onErrorList(bool includeDefault)
{
  QStringList list;
  if(includeDefault)
    list << "Default";
  list << "Stop";
  list << "Prompt";
  list << "Ignore";
  return list;
}

