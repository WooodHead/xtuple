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

#include "csvdata.h"

#include <qfile.h>
#include <qwidget.h>
#include <q3textstream.h>
#include <qapplication.h>
#include <qdatetime.h>
#include <qmessagebox.h>
#include <qlabel.h>
#include <q3progressbar.h>

#include <csvloadprogress.h>

CSVData::CSVData(QObject * parent, const char * name)
  : QObject(parent, name)
{
  _firstRowHeaders = FALSE;
  _numColumns = 0;
}

CSVData::~CSVData() {
}

void CSVData::setFirstRowHeaders(bool y)
{
  if(_firstRowHeaders != y)
  {
    _firstRowHeaders = y;
  }
}

unsigned int CSVData::rows()
{
  int n = _rows.count();
  if(_firstRowHeaders)
    --n;
  if(n < 0)
    n = 0;
  return n;
}

QString CSVData::header( unsigned int column)
{
  if(_firstRowHeaders)
  {
    if(_rows.count() > 0)
    {
      QStringList cols = _rows[0];
      if(column < cols.count())
      {
        return cols[column];
      }
    }
  }

  return QString::null;
}

QString CSVData::value(unsigned int row, unsigned int column)
{
  if(_firstRowHeaders)
    ++row;

  if(row < _rows.count())
  {
    QStringList cols = _rows[row];
    if(column < cols.count())
    {
      return cols[column];
    }
  }

  return QString::null;
}

bool CSVData::load(QString filename, QWidget * parent)
{
  QFile file;

  file.setName(filename);
  if(!file.open(QIODevice::ReadOnly))
  {
    if(parent)
      QMessageBox::critical(parent, tr("Open Failed"),
        tr("Could not open file for reading: %1").arg(qApp->translate("QFile", file.errorString())));
    return FALSE;
  }

  CSVLoadProgress * progress = 0;
  QTime time;
  if(parent)
  {
    progress = new CSVLoadProgress(parent, "csv load progress");
    progress->setModal(TRUE);
    progress->_file->setText(filename);
    progress->_totBytes->setText(QString("%1").arg(file.size()));
    progress->_readBytes->setText(QString("%1").arg(file.at()));
    progress->_readRecords->setText("0");
    progress->_progressBar->setProgress(file.at(), file.size());

    progress->show();
    qApp->processEvents();
  }
  time.start();

  Q3TextStream in(&file);

  bool inQuote = FALSE;
  bool haveText = FALSE;
  bool peeked = FALSE;
  QString field = QString::null;
  QChar c = QChar();
  QStringList row = QStringList();
  while(!in.atEnd())
  {
    if(progress && time.elapsed() > 200)
    {
      qApp->processEvents();

      if(!progress->isShown())
      {
        delete progress;
        return FALSE; // True for False?
      }

      progress->_readBytes->setText(QString("%1").arg(file.at()));
      progress->_readRecords->setText(QString("%1").arg(rows()));
      progress->_progressBar->setProgress(file.at());

      time.restart();
    }

    if(peeked)
      peeked = FALSE;
    else
      in >> c;

    // If we are inside a quoted string we handle
    // everything differently
    if(inQuote)
    {
      if('"' == c)
      {
        in >> c;
        if('"' == c)
          field += c;
        else
        {
          peeked = TRUE;
          inQuote = FALSE;
        }
      }
      else
        field += c;
    }
    else
    {
      if(',' == c || '\r' == c || '\n' == c) 
      {
        // end of field processing
        if(!field.isNull() && haveText)
          field = field.stripWhiteSpace();

        row.append(field);

        field = QString::null;
        inQuote = FALSE;
        haveText = FALSE;

        if('\r' == c || '\n' == c)
        {
          if('\r' == c)
          {
            in >> c;
            if('\n' != c)
              peeked = TRUE;
          }

          // end of line processing
          _numColumns = QMAX(_numColumns, row.count());
          _rows.append(row);
          row = QStringList();
        }
      }
      else if('"' == c)
      {
        inQuote = TRUE; 
        if(field.isNull())
          field = QString("");
      }
      else if(c.isSpace() && haveText)
        field += c;
      else if(!c.isSpace())
      {
        haveText = TRUE;
        field += c;
      }
    }
  }

  // Make sure any left over data is properly added to
  // the lists of information
  if(!field.isNull())
  {
    if(haveText)
      field = field.stripWhiteSpace();
    row.append(field);
  }
  if(!row.isEmpty())
  {
    _numColumns = QMAX(_numColumns, row.count());
    _rows.append(row);
  }

  if(progress)
  {
    progress->close();
    qApp->processEvents();
    delete progress;
  }

  return TRUE;
}

