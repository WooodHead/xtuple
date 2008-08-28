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

#ifndef __PREREQUISITE_H__
#define __PREREQUISITE_H__

#include <QString>
#include <QList>
#include <QStringList>

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

class DependsOn
{
  public:
    DependsOn(const QString &name, const QString &version = QString(),
               const QString &developer = QString())
    {
      _name      = name;
      _version   = version;
      _developer = developer;
    };

    QString developer() { return _developer; };
    QString name()      { return _name; };
    QString version()   { return _version; };

  private:
    QString _developer;
    QString _name;
    QString _version;
};

class Prerequisite
{
  public:
    Prerequisite();
    Prerequisite(const Prerequisite &);
    Prerequisite(const QDomElement &);
    virtual ~Prerequisite();

    QDomElement createElement(QDomDocument &);

    enum Type
    {
      None = 0,
      Query,
      License,
      Dependency
    };

    virtual bool met(QString &);
    virtual int  writeToDB(const QString, QString &);

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
    DependsOn  *_dependency;
    QString    _message;
    QString    _name;
    QString    _query;
    Type       _type;
    
    QList<PrerequisiteProvider> _providers;

    static QString _sqlerrtxt;
};

#endif

