/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef __CSVIMPPLUGIN_H__
#define __CSVIMPPLUGIN_H__

#include <QObject>
#include "csvimpplugininterface.h"

class CSVImpPlugin : public QObject, CSVImpPluginInterface
{
  Q_OBJECT
  Q_INTERFACES(CSVImpPluginInterface)

  public:
    virtual QMainWindow *CSVToolWindow(QWidget *parent = 0, Qt::WindowFlags flags = 0);
    virtual void clearImportLog();
    virtual bool deleteMap();
    virtual void editAtlas();
    virtual bool importCSV();
    virtual bool newCSV();
    virtual bool newMap();
    virtual bool openAtlas();
    virtual bool openCSV();
    virtual bool printAtlas();
    virtual bool printCSV();
    virtual bool renameMap();
    virtual bool saveAtlas();
    virtual bool saveAtlasAs();
    virtual bool saveCSV();
    virtual bool saveCSVAs();
    virtual void viewImportLog();

};

#endif
