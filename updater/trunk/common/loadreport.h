#ifndef __LOADREPORT_H__
#define __LOADREPORT_H__

#include <qstring.h>

class QDomDocument;
class QDomElement;

class LoadReport
{
  public:
    LoadReport(const QString & name = QString::null, int grade = 0,
               const QString & comment = QString::null);
    LoadReport(const QDomElement &);

    virtual ~LoadReport();

    QDomElement createElement(QDomDocument &);

    bool isValid() const { return !_name.isEmpty(); }

    QString name() const { return _name; }
    void setName(const QString & name) { _name = name; }

    int grade() const { return _grade; }
    void setGrade(int grade) { _grade = grade; }

    QString comment() const { return _comment; }
    void setComment(const QString & comment) { _comment = comment; }

  protected:
    QString _name;
    QString _comment;

    int _grade;
};

#endif

