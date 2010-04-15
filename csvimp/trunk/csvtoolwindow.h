/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "ui_csvtoolwindow.h"

class CSVAtlasWindow;
class CSVData;
class QTimerEvent;
class LogWindow;

class CSVToolWindow : public QMainWindow, public Ui::CSVToolWindow
{
  Q_OBJECT
    
  public:
    CSVToolWindow(QWidget *parent = 0);
    ~CSVToolWindow();

  public slots:
    void fileExit();
    void fileNew();
    void fileOpen();
    void filePrint();
    void fileSave();
    void fileSaveAs();
    void helpAbout();
    void helpContents();
    void helpIndex();
    void importStart();
    void mapEdit();
    void sFirstRowHeader(bool yes);
    void sImportViewLog();
    void timerEvent(QTimerEvent *e);

  protected slots:
    void languageChange();
    void sUserCanceled();

  protected:
    CSVAtlasWindow *_atlasWindow;
    CSVData        *_data;
    int             _dbTimerId;
    LogWindow      *_log;
    bool            _stopped;
};
