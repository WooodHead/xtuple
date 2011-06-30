/*
 * Copyright (c) 2002-2006 by OpenMFG, LLC
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * If you do not wish to be bound by the terms of the GNU General Public
 * License, DO NOT USE THIS SOFTWARE.  Please contact OpenMFG, LLC at
 * info@openmfg.com for details on how to purchase a commercial license.
 */

#ifndef MQLEDIT_H
#define MQLEDIT_H

class ParameterEdit;
class LogOutput;
class ResultsOutput;

#include <QMainWindow>

#include "ui_mqledit.h"

class MQLEdit : public QMainWindow, public Ui::MQLEdit
{
    Q_OBJECT

  public:
    MQLEdit(QWidget* parent = 0, const char* name = 0, Qt::WFlags fl = Qt::WType_TopLevel);
    ~MQLEdit();

  public slots:
    virtual void fileNew();
    virtual void fileOpen();
    virtual void fileSave();
    virtual void fileSaveAs();
    virtual void filePrint();
    virtual void fileExit();
    virtual void editFind();
    virtual void helpIndex();
    virtual void helpContents();
    virtual void helpAbout();
    virtual void fileDatabaseConnect();
    virtual void fileDatabaseDisconnect();
    virtual void parseQuery();
    virtual void execQuery();
    virtual void showLog();
    virtual void showResults();
    virtual void showExecutedSQL();

  protected:
    ResultsOutput * _results;
    QString _fileName;
    ParameterEdit * _pEdit;
    LogOutput * _log;
    LogOutput * _sql;

    virtual bool askSaveIfModified();
    virtual bool save();
    virtual bool saveAs();

  protected slots:
    virtual void languageChange();

    virtual void showParamList();
};

#endif // MQLEDIT_H
