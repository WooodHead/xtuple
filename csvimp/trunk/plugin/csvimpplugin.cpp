/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include <QtGui>

#include "csvimpplugin.h"

#include <QMessageBox>
#include <QMainWindow>

#include "csvtoolwindow.h"

QMainWindow *CSVImpPlugin::CSVToolWindow(QWidget *parent, Qt::WindowFlags flags)
{
  QMainWindow *tmp = new CSVToolWindow::CSVToolWindow(parent, flags);
  return tmp;
}

void CSVImpPlugin::clearImportLog()
{
  QMessageBox::information(0, "clearImportLog", "clearImportLog not implemented through plugin");
}

bool CSVImpPlugin::deleteMap()
{
  QMessageBox::information(0, "deleteMap", "deleteMap not implemented through plugin");
  return false;
}

void CSVImpPlugin::editAtlas()
{
  QMessageBox::information(0, "editAtlas", "editAtlas not implemented through plugin");
}

bool CSVImpPlugin::importCSV()
{
  QMessageBox::information(0, "importCSV", "importCSV not implemented through plugin");
  return false;
}

bool CSVImpPlugin::newCSV()
{
  QMessageBox::information(0, "newCSV", "newCSV not implemented through plugin");
  return false;
}

bool CSVImpPlugin::newMap()
{
  QMessageBox::information(0, "newMap", "newMap not implemented through plugin");
  return false;
}

bool CSVImpPlugin::openAtlas()
{
  QMessageBox::information(0, "openAtlas", "openAtlas not implemented through plugin");
  return false;
}

bool CSVImpPlugin::openCSV()
{
  QMessageBox::information(0, "openCSV", "openCSV not implemented through plugin");
  return false;
}

bool CSVImpPlugin::printAtlas()
{
  QMessageBox::information(0, "printAtlas", "printAtlas not implemented through plugin");
  return false;
}

bool CSVImpPlugin::printCSV()
{
  QMessageBox::information(0, "printCSV", "printCSV not implemented through plugin");
  return false;
}

bool CSVImpPlugin::renameMap()
{
  QMessageBox::information(0, "renameMap", "renameMap not implemented through plugin");
  return false;
}

bool CSVImpPlugin::saveAtlas()
{
  QMessageBox::information(0, "saveAtlas", "saveAtlas not implemented through plugin");
  return false;
}

bool CSVImpPlugin::saveAtlasAs()
{
  QMessageBox::information(0, "saveAtlasAs", "saveAtlasAs not implemented through plugin");
  return false;
}

bool CSVImpPlugin::saveCSV()
{
  QMessageBox::information(0, "saveCSV", "saveCSV not implemented through plugin");
  return false;
}

bool CSVImpPlugin::saveCSVAs()
{
  QMessageBox::information(0, "saveCSVAs", "saveCSVAs not implemented through plugin");
  return false;
}

void CSVImpPlugin::viewImportLog()
{
  QMessageBox::information(0, "viewImportLog", "viewImportLog not implemented through plugin");
}

Q_EXPORT_PLUGIN2(csvimpplugin, CSVImpPlugin);
