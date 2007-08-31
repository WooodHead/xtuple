#include "loadreport.h"

#include <qdom.h>

LoadReport::LoadReport(const QString & name, int grade, const QString & comment)
  : _name(name), _comment(comment), _grade(grade)
{
}

LoadReport::LoadReport(const QDomElement & elem)
{
  _name = elem.attribute("name");
  _grade = elem.attribute("grade").toInt();
  _comment = elem.text();
}

LoadReport::~LoadReport()
{
}

QDomElement LoadReport::createElement(QDomDocument & doc)
{
  QDomElement elem = doc.createElement("loadreport");
  elem.setAttribute("name", _name);
  elem.setAttribute("grade", _grade);

  if(!_comment.isEmpty())
    elem.appendChild(doc.createTextNode(_comment));

  return elem;
}
