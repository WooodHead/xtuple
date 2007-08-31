#ifndef __SCRIPT_H__
#define __SCRIPT_H__

#include <qstring.h>
#include <qstringlist.h>

class QDomDocument;
class QDomElement;

class Script
{
  public:
    enum OnError {
      Default = 0,
      Stop,
      Prompt,
      Ignore
    };

    Script(const QString & name = QString::null, OnError onError = Default,
           const QString & comment = QString::null);
    Script(const QDomElement &);

    virtual ~Script();

    QDomElement createElement(QDomDocument &);

    bool isValid() const { return !_name.isEmpty(); }

    QString name() const { return _name; }
    void setName(const QString & name) { _name = name; }

    OnError onError() const { return _onError; }
    void setOnError(OnError onError) { _onError = onError; }

    QString comment() const { return _comment; }
    void setComment(const QString & comment) { _comment = comment; }

    static QString onErrorToName(OnError);
    static OnError nameToOnError(const QString &);
    static QStringList onErrorList(bool includeDefault = TRUE);

  protected:
    QString _name;
    QString _comment;

    OnError _onError;
};

#endif

