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

#ifndef __LOADABLE_H__
#define __LOADABLE_H__

#include <QString>
#include <QStringList>

class QDomDocument;
class QDomElement;

#define TR(a) QObject::tr(a)

class Loadable
{
  public:
    Loadable(const QString &nodename, const QString &name,
             const int grade = 0, const bool system = false,
             const QString &comment = QString::null,
             const QString &filename = QString::null);
    Loadable(const QDomElement &, const bool system, QStringList &, QList<bool> &);

    virtual ~Loadable();

    virtual QDomElement createElement(QDomDocument &doc);

    virtual QString comment()  const { return _comment; }
    virtual QString filename() const { return _filename; }
    virtual int     grade()    const { return _grade; }
    virtual bool    isValid()  const { return !_nodename.isEmpty() &&
                                              !_name.isEmpty();}
    virtual QString name()     const { return _name; }
    virtual QString nodename() const { return _nodename; }
    virtual void    setComment(const QString & comment) { _comment  = comment; }
    virtual void    setFilename(const QString &filename){ _filename = filename;}
    virtual void    setGrade(int grade)                 { _grade = grade; }
    virtual void    setName(const QString & name)       { _name = name; }
    virtual void    setSystem(const bool p)             { _system = p; }
    virtual bool    system()   const { return _system; }

    virtual int     writeToDB(const QByteArray &data, const QString pkgname,
                              QString &errMsg) = 0;

    static QRegExp trueRegExp;
    static QRegExp falseRegExp;

  protected:
    QString _comment;
    QString _filename;
    int     _grade;
    bool    _inpackage;
    QString _name;
    QString _nodename;
    QString _pkgitemtype;
    bool    _system;

    virtual int upsertPkgItem(int &pkgitemid, const int pkghead,
                              const int itemid, QString &errMsg);

    static QString _sqlerrtxt;
    static QString _pkgitemQueryStr;
};

#endif
