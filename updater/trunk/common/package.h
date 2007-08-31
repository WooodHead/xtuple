#ifndef __PACKAGE_H__
#define __PACKAGE_H__

#include <qstring.h>
#include <q3valuelist.h>

#include "prerequisite.h"
#include "script.h"
#include "loadreport.h"

class QDomDocument;
class QDomElement;

class Package
{
  public:
    Package(const QString & id = QString::null);
    Package(const QDomElement &);

    virtual ~Package();

    QDomElement createElement(QDomDocument &); 

    QString id() const { return _id; }
    void setId(const QString & id) { _id = id; }

    int versionMajor() const { return _majVersion; }
    int versionMinor() const { return _minVersion; }

    Q3ValueList<Prerequisite> _prerequisites;
    Q3ValueList<Script> _scripts;
    Q3ValueList<LoadReport> _reports;

    bool containsReport(const QString & reportname) const;
    bool containsScript(const QString & scriptname) const;
    bool containsPrerequisite(const QString & prereqname) const;

  protected:
    QString _id;
    int _majVersion;
    int _minVersion;
};

#endif

