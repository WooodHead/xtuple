/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef __CSVDATA_H__
#define __CSVDATA_H__

#include <QObject>
#include <QString>
#include <QStringList>
#include <Q3ValueList>

class QWidget;

class CSVData : public QObject
{
  Q_OBJECT
  public:
    CSVData(QObject * = 0, const char * = 0);
    virtual ~CSVData();

    bool firstRowHeaders() { return _firstRowHeaders; }
    void setFirstRowHeaders(bool);

    unsigned int rows();
    unsigned int columns() { return _numColumns; }

    QString header(int);
    QString value(int, int);

    bool load(QString, QWidget* = 0);

  protected:

  private:
    bool _firstRowHeaders;
   // unsigned int _numColumns;
    int _numColumns;

    Q3ValueList<QStringList> _rows;
};

#endif

