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
 * The Original Code is PostBooks Accounting, ERP, and CRM Suite. 
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2007 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
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
 * Copyright (c) 1999-2007 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by PostBooks, an open source solution from xTuple
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

#ifndef __CSVMAP_H__
#define __CSVMAP_H__

#include <qstring.h>
#include <qstringlist.h>
#include <qvariant.h>
#include <q3valuelist.h>

class QDomDocument;
class QDomElement;

class CSVMapField
{
  public:
    CSVMapField(const QString & name = QString::null);
    CSVMapField(const QDomElement &);
    virtual ~CSVMapField();

    void setName(const QString &);
    QString name() const { return _name; }

    void setIsKey(bool);
    bool isKey() const { return _isKey; }

    void setType(QVariant::Type);
    QVariant::Type type() const { return _type; }

    enum Action {
      Action_Default,
      Action_UseColumn,
      Action_UseEmptyString,
      Action_UseAlternateValue,
      Action_UseNull
    };
    void setAction(Action);
    Action action() const { return _action; }

    enum IfNull {
      Nothing,
      UseDefault,
      UseEmptyString,
      UseAlternateValue,
      UseAlternateColumn
    };
    void setIfNullAction(IfNull);
    IfNull ifNullAction() const { return _ifNullAction; } 
    void setIfNullActionAlt(IfNull);
    IfNull ifNullActionAlt() const { return _ifNullActionAlt; }

    void setColumn(unsigned int);
    unsigned int column() const { return _column; }
    void setColumnAlt(unsigned int);
    unsigned int columnAlt() const { return _columnAlt; }

    void setValueAlt(const QString &);
    QString valueAlt() const { return _valueAlt; }

    bool isEmpty() const { return _name.isEmpty(); }
    bool isDefault() const;

    QDomElement createElement(QDomDocument &);

    static QString ifNullToName(IfNull);
    static IfNull nameToIfNull(const QString &);
    static QStringList ifNullList(bool altList = FALSE);

    static QString actionToName(Action);
    static Action nameToAction(const QString &);
    static QStringList actionList();

  private:
    QString _name;
    bool    _isKey;
    QVariant::Type _type;
    Action _action;
    unsigned int _column;
    IfNull  _ifNullAction;
    unsigned int _columnAlt;
    IfNull  _ifNullActionAlt;
    QString _valueAlt;
};

class CSVMap
{
  public:
    CSVMap(const QString & name = QString::null);
    CSVMap(const QDomElement &);
    virtual ~CSVMap();

    void setName(const QString &);
    QString name() const { return _name; }
    void setTable(const QString &);
    QString table() const { return _table; }
    void setDescription(const QString &);
    QString description() const { return _description; }
    enum Action { Insert, Update, Append };
    void setAction(Action);
    Action action() const { return _action; }

    void setField(const CSVMapField &);
    bool removeField(const QString &);
    CSVMapField field(const QString &) const;
    QStringList fieldList() const;
    Q3ValueList<CSVMapField> fields() const { return _fields; }

    void setSqlPre(const QString &);
    QString sqlPre() const { return _sqlPre; }
    void setSqlPreContinueOnError(bool);
    bool sqlPreContinueOnError() { return _sqlPreContinueOnError; }
    void setSqlPost(const QString &);
    QString sqlPost() const { return _sqlPost; }

    bool isEmpty() const { return _name.isEmpty(); }

    void simplify();

    QDomElement createElement(QDomDocument &);

    static QString actionToName(Action);
    static Action nameToAction(const QString &);

  protected:
    Q3ValueList<CSVMapField> _fields;

  private:
    QString _sqlPre;
    bool    _sqlPreContinueOnError;
    QString _sqlPost;
    QString _name;
    QString _table;
    Action _action;
    QString _description;
};

#endif

