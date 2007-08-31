#ifndef __PREREQUISITE_H__
#define __PREREQUISITE_H__

#include <qstring.h>
#include <q3valuelist.h>
#include <qstringlist.h>

class QDomDocument;
class QDomElement;

class PrerequisiteProvider
{
  public:
    PrerequisiteProvider(const QString & package = QString::null,
                         const QString & info = QString::null);
    PrerequisiteProvider(const QDomElement &);
    virtual ~PrerequisiteProvider();

    QDomElement createElement(QDomDocument &);

    bool isValid() const { return !_package.isEmpty(); }

    QString package() const { return _package; }
    void setPackage(const QString & package) { _package = package; }

    QString info() const { return _info; }
    void setInfo(const QString & info) { _info = info; }

  protected:
    QString _package;
    QString _info;
};

class Prerequisite
{
  public:
    Prerequisite();
    Prerequisite(const QDomElement &);
    virtual ~Prerequisite();

    QDomElement createElement(QDomDocument &);

    enum Type
    {
      None = 0,
      Query
    };

    QString name() const { return _name; }
    void setName(const QString & name) { _name = name; }

    Type type() const { return _type; }
    void setType(Type type) { _type = type; }

    QString message() const { return _message; }
    void setMessage(const QString & message) { _message = message; }

    QString query() const { return _query; }
    void setQuery(const QString & query) { _query = query; }

    void setProvider(const PrerequisiteProvider &);
    bool removeProvider(const QString &);
    PrerequisiteProvider provider(const QString &) const;
    QStringList providerList() const;

    static QString typeToName(Type);
    static Type nameToType(const QString &);
    static QStringList typeList(bool includeNone = TRUE);

  protected:
    QString _name;
    Type _type;
    QString _message;

    QString _query;
    
    Q3ValueList<PrerequisiteProvider> _providers;
};

#endif

