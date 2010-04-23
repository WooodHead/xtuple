/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include <QtGui>

#include "csvimpplugin.h"

#include <QMainWindow>

#include "csvatlaswindow.h"
#include "csvtoolwindow.h"

#define DEBUG true

CSVImpPlugin::CSVImpPlugin(QObject *parent)
  : QObject(parent)
{
  _atlasdir      = QString::null;
  _atlaswindow   = 0;
  _csvdir        = QString::null;
  _csvtoolwindow = 0;
}

QMainWindow *CSVImpPlugin::getCSVAtlasWindow(QWidget *parent, Qt::WindowFlags flags)
{
  if (! _atlaswindow)
  {
    CSVToolWindow *csvtool = qobject_cast<CSVToolWindow*>(getCSVToolWindow(parent, flags));
    if (csvtool)
    {
      _atlaswindow = csvtool->atlasWindow();
      connect(_atlaswindow, SIGNAL(destroyed(QObject*)), this, SLOT(cleanupDestroyedObject(QObject*)));
      if (_atlasdir.isEmpty())
      _atlaswindow->setDir(_csvdir);
    else
      _atlaswindow->setDir(_atlasdir);
    }
  }

  if (DEBUG)
    qDebug("CSVImpPlugin::getAtlasToolWindow() returning %p, Atlas dir [%s]",
           _atlaswindow, qPrintable(_atlasdir));
  return _atlaswindow;
}

QMainWindow *CSVImpPlugin::getCSVToolWindow(QWidget *parent, Qt::WindowFlags flags)
{
  if (! _csvtoolwindow)
  {
    _csvtoolwindow = new CSVToolWindow(parent, flags);
    connect(_csvtoolwindow, SIGNAL(destroyed(QObject*)), this, SLOT(cleanupDestroyedObject(QObject*)));

    _csvtoolwindow->sFirstRowHeader(_firstLineIsHeader);
    _csvtoolwindow->setDir(_csvdir);
    if (_atlasdir.isEmpty())
      _csvtoolwindow->atlasWindow()->setDir(_csvdir);
    else
      _csvtoolwindow->atlasWindow()->setDir(_atlasdir);
  }

  if (DEBUG)
    qDebug("CSVImpPlugin::getCSVToolWindow() returning %p "
           "with CSV dir %s, Atlas dir %s",
           _csvtoolwindow, qPrintable(_csvdir), qPrintable(_atlasdir));
  return _csvtoolwindow;
}

void CSVImpPlugin::clearImportLog()
{
  if (_csvtoolwindow)
    _csvtoolwindow->clearImportLog();
}

QString CSVImpPlugin::getImportLog()
{
  if (_csvtoolwindow)
    return _csvtoolwindow->getImportLog();

  return QString::null;
}

bool CSVImpPlugin::importCSV()
{
  _csvtoolwindow->clearImportLog();
  _csvtoolwindow->importStart();
  return getImportLog().isEmpty();
}

bool CSVImpPlugin::openAtlas(QString filename)
{
  if (DEBUG) qDebug("CSVImpPlugin::openAtlas(%s)", qPrintable(filename));

  CSVAtlasWindow *atlaswind = qobject_cast<CSVAtlasWindow*>(getCSVAtlasWindow(qobject_cast<QWidget*>(parent())));
  if (atlaswind)
  {
    atlaswind->fileOpen(filename);
    if (DEBUG)
      qDebug("CSVImpPlugin::openAtlas() opened [%s]", qPrintable(filename));
    return true;
  }

  return false;
}

bool CSVImpPlugin::openCSV(QString filename)
{
  CSVToolWindow *csvtool = qobject_cast<CSVToolWindow*>(getCSVToolWindow(qobject_cast<QWidget*>(parent())));
  if (csvtool)
  {
    csvtool->fileOpen(filename);
    return true;
  }

  return false;
}

void CSVImpPlugin::setAtlasDir(QString dirname)
{
  if (DEBUG) qDebug("CSVImpPlugin::setAltasDir(%s)", qPrintable(dirname));

  _atlasdir = dirname;
  if (_csvtoolwindow)
    _csvtoolwindow->atlasWindow()->setDir(dirname);
}

bool CSVImpPlugin::setAtlasMap(const QString mapname)
{
  if (_csvtoolwindow && _csvtoolwindow->atlasWindow())
    return _csvtoolwindow->atlasWindow()->setMap(mapname);

  return false;
}

void CSVImpPlugin::setCSVDir(QString dirname)
{
  if (DEBUG) qDebug("CSVImpPlugin::setCSVDir(%s)", qPrintable(dirname));
  _csvdir = dirname;
  if (_csvtoolwindow)
    _csvtoolwindow->setDir(dirname);
}

bool CSVImpPlugin::setFirstLineHeader(bool isheader)
{
  if (DEBUG) qDebug("CSVImpPlugin::setFirstLineHeader(%d)", isheader);
  _firstLineIsHeader = isheader;
  if (_csvtoolwindow)
    _csvtoolwindow->sFirstRowHeader(isheader);

  return true;
}

void CSVImpPlugin::cleanupDestroyedObject(QObject *object)
{
  if (DEBUG)
    qDebug("CSVImpPlugin::cleanupDestroyedObject(%s %p)",
           object ? object->metaObject()->className() : "[unknown]", object);
  if (object == _csvtoolwindow)
  {
    _csvtoolwindow = 0;
    _firstLineIsHeader = false;
  }
  else if (object == _atlaswindow)
    _atlaswindow = 0;
}

Q_EXPORT_PLUGIN2(csvimpplugin, CSVImpPlugin);
