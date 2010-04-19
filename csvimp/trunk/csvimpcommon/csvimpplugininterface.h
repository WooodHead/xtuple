/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef __CSVIMPPLUGININTERFACE_H__
#define __CSVIMPPLUGININTERFACE_H__

class QMainWindow;

class CSVImpPluginInterface
{
  public:
    virtual ~CSVImpPluginInterface() {};

    virtual QMainWindow *getCSVToolWindow(QWidget *parent = 0, Qt::WindowFlags flags = 0) = 0;
    virtual void clearImportLog() = 0;
    virtual bool deleteMap()      = 0;
    virtual void editAtlas()      = 0;
    virtual bool importCSV()      = 0;
    virtual bool newCSV()         = 0;
    virtual bool newMap()         = 0;
    virtual bool openAtlas()      = 0;
    virtual bool openCSV()        = 0;
    virtual bool printAtlas()     = 0;
    virtual bool printCSV()       = 0;
    virtual bool renameMap()      = 0;
    virtual bool saveAtlas()      = 0;
    virtual bool saveAtlasAs()    = 0;
    virtual bool saveCSV()        = 0;
    virtual bool saveCSVAs()      = 0;
    virtual void setCSVDir(QString dirname) = 0;
    virtual void viewImportLog()  = 0;
};

Q_DECLARE_INTERFACE(CSVImpPluginInterface,
                    "org.xtuple.Plugin.CSVImpPluginInterface/0.1");
#endif
