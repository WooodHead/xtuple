/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "csvdata.h"

#include <QFile>
#include <QProgressDialog>

#include "interactivemessagehandler.h"

class  CSVDataPrivate
{
  public:
    CSVDataPrivate(CSVData *parent)
      : _parent(parent)
    {
    }

    void append(QString theline)
    {
      _line.append(theline);
    }

    QStringList parse(QString line)
    {
      QStringList result;
      bool    inQuote  = false;
      QString field    = QString::null;
      bool    haveText = false;

      // handle everything differently inside double-quotes
      for (int i = 0; i < line.length(); i++)
      {
        QChar c = line.at(i);
        if (inQuote)
        {
          if('"' == c && '"' == line.at(i + 1))
          {
            field += c;
            i++;
          }
          else if ('"' == c)
            inQuote = false;
          else
            field += c;
        }
        else
        {
          if (_parent->delimiter() == c || '\r' == c || '\n' == c)
          {
            if(!field.isNull() && haveText)
              field = field.trimmed();
            result.append(field);

            field    = QString::null;
            inQuote  = false;
            haveText = false;

            if (('\r' == c && '\n' == line.at(i + 1)) ||
                ('\n' == c && '\r' == line.at(i + 1)))
              c = line.at(++i);
          }
          else if('"' == c)
          {
            inQuote = true;
            if(field.isNull())
              field = QString("");
          }
          else if(c.isSpace() && haveText)
            field += c;
          else
          {
            haveText = true;
            field += c;
          }
        }
      }

      return result;
    }

    QStringList _line;
    CSVData    *_parent;
};

CSVData::CSVData(QObject *parent, const char *name, const QChar delim)
  : QObject(parent),
    _data(0),
    _firstRowHeaders(false),
    _stopped(false)
{
  _data = new CSVDataPrivate(this);
  setObjectName(name ? name : "_CSVData");
  _msghandler = new InteractiveMessageHandler(this);
  setDelimiter(delim);
}

CSVData::~CSVData() {
  if (_data)
  {
    delete _data;
    _data = 0;
  }
}

unsigned int CSVData::columns()
{
  unsigned int n = 0;
  if (_data && _data->_line.count() > 0)
    n = _data->parse(_data->_line[0]).size();

  return n;
}

QChar CSVData::delimiter() const
{
  return _delimiter;
}

void CSVData::setDelimiter(const QChar delim)
{
  _delimiter = delim.isNull() ? ',' : delim;
}

bool CSVData::firstRowHeaders() const
{
  return _firstRowHeaders;
}

void CSVData::setFirstRowHeaders(bool y)
{
  if (_firstRowHeaders != y)
    _firstRowHeaders = y;
}

QString CSVData::header(int column)
{
  if (_firstRowHeaders && _data->_line.count() > 0)
  {
     QStringList header = _data->parse(_data->_line[0]);
     if (column < header.count())
        return header[column];
  }

  return QString::null;
}

bool CSVData::load(QString filename, QWidget *parent)
{
  QFile file(filename);

  if(!file.open(QIODevice::ReadOnly))
  {
    _msghandler->message(QtWarningMsg, tr("Open Failed"),
                         tr("<p>Could not open %1 for reading: %2")
                         .arg(filename, file.errorString()));
    return false;
  }

  QString          progresstext(tr("Loading %1: %2 bytes out of %3, %4 lines"));
  QProgressDialog *progress = 0;
  int              expected = file.size();
  _stopped = false;

  if (parent)
  {
    progress = new QProgressDialog(progresstext
                                     .arg(filename).arg(0).arg(expected).arg(0),
                                   tr("Stop"), 0, expected, parent);
    progress->setWindowModality(Qt::WindowModal);
    connect(progress, SIGNAL(canceled()), this, SLOT(sUserCanceled()));
  }

  for (qint64 bytes = 0, lines = 0; ! file.atEnd() && ! _stopped; bytes++, lines++)
  {
    char   buf[1024];
    qint64 lineLength = file.readLine(buf, sizeof(buf));
    if (lineLength == -1)
    {
      _msghandler->message(QtWarningMsg, tr("Read Error"),
                           tr("<p>Error Reading %1: %2")
                             .arg(filename, file.errorString()));
      return false;
    }

    bytes += lineLength;
    _data->append(QString(buf));

    if (progress)
    {
      progress->setValue(bytes);
      progress->setLabelText(progresstext
                   .arg(filename).arg(bytes).arg(expected).arg(lines));
    }
  }

  if (progress)
    progress->setValue(expected);

  return true;
}

XAbstractMessageHandler *CSVData::messageHandler() const
{
  return _msghandler;
}

void CSVData::setMessageHandler(XAbstractMessageHandler *handler)
{
  _msghandler = handler;
}

unsigned int CSVData::rows()
{
  int n = _data ? _data->_line.count() : 0;
  if (_firstRowHeaders)
    --n;
  if(n < 0)
    n = 0;

  return n;
}

QString CSVData::value(int row, int column)
{
  if (_firstRowHeaders)
    ++row;

  if(row < _data->_line.count())
  {
    QStringList line = _data->parse(_data->_line[row]);
    if (column < line.count())
      return line[column];
  }

  return QString::null;
}

void CSVData::sUserCanceled()
{
  _stopped = true;
}
