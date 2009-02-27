/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "csvdata.h"

#include <QFile>
#include <QWidget>
#include <Q3TextStream>
#include <QApplication>
#include <QDateTime>
#include <QMessageBox>
#include <QLabel>
#include <Q3ProgressBar>

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

QString CSVData::header(int column)
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

QString CSVData::value(int row, int column)
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

