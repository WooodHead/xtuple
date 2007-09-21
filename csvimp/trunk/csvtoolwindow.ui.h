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

#include <qapplication.h>
#include <qdatetime.h>
#include <qstatusbar.h>
#include <qinputdialog.h>
#include <qsqlquery.h>
#include <qmap.h>
#include <qsqlerror.h>
#include <qsqldatabase.h>
#include <qvariant.h>
#include <q3progressbar.h>
#include <qlabel.h>
#include <q3textedit.h>
//Added by qt3to4:
#include <QTimerEvent>
#include <Q3ValueList>
#include <QPixmap>

#include "csvatlas.h"
#include <csvimportprogress.h>

#include "images/CSVimpIcon.xpm"

void CSVToolWindow::fileNew()
{
  QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void CSVToolWindow::fileOpen()
{
  fileOpenAction->setEnabled(FALSE);
  _firstRowHeader->setEnabled(FALSE);
  QString fileName = Q3FileDialog::getOpenFileName(QString::null, QString::null, this);
  if(!fileName.isEmpty()) {
    statusBar()->message(tr("Loading..."));

    if(_data == 0)
      _data = new CSVData(this);
    else
    {
      delete _data;
      _data = new CSVData(this);
      _table->setNumRows(0);
      _table->setNumCols(0);
    }

    _data->load(fileName, this);
    _data->setFirstRowHeaders(_firstRowHeader->isChecked());
    int rows = _data->rows();
    int cols = _data->columns();
    _table->setNumRows(rows);
    _table->setNumCols(cols);
    if(_firstRowHeader->isChecked())
    {
      QString header;
      for(int h = 0; h < cols; h++)
      {
        QString header = _data->header(h);
        if(header.isEmpty())
          header = QString("%1").arg(h+1);
        else
          header = QString("%1 (%2)").arg(h+1).arg(header);
        _table->horizontalHeader()->setLabel(h, header);
      }
    }
    QTime time;
    time.start();
    QString v = QString::null;
    for(int r = 0; r < rows; r++)
    {
      for(int c = 0; c < cols; c++)
      {
        v = _data->value(r, c);
        if(QString::null == v)
          v = tr("(NULL)");
        _table->setText(r, c, v);
      }
      if(time.elapsed() > 200)
      {
        statusBar()->message(tr("Displaying Record %1 of %2").arg(r+1).arg(rows));
        qApp->processEvents();
        time.restart();
      }
    }
  }  
  statusBar()->clear();
  _firstRowHeader->setEnabled(TRUE);
  fileOpenAction->setEnabled(TRUE);
}


void CSVToolWindow::fileSave()
{
  QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void CSVToolWindow::fileSaveAs()
{
  QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void CSVToolWindow::filePrint()
{
  QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void CSVToolWindow::fileExit()
{
  qApp->closeAllWindows();
}


void CSVToolWindow::helpIndex()
{
  QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void CSVToolWindow::helpContents()
{
  QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void CSVToolWindow::helpAbout()
{
  QMessageBox::about(this, tr("About %1").arg(_name),
    tr("%1 version %2"
       "\n\n%3 is a tool for importing CSV files into a database."
       "\n\n%4, All Rights Reserved").arg(_name).arg(_version).arg(_name).arg(_copyright));
}


void CSVToolWindow::mapEdit()
{
  _atlasWindow->show();
}


void CSVToolWindow::init()
{
  setIcon(QPixmap(CSVimpIcon));
  _table->setNumRows(0);
  _atlasWindow = new CSVAtlasWindow(this);
  _log = new LogWindow(this);
  _data = 0;
  _dbTimerId = startTimer(60000);
}


void CSVToolWindow::sFirstRowHeader( bool yes )
{
  if(_data)
  {
    _data->setFirstRowHeaders(yes);
    int cols = _data->columns();
    if(yes)
    {
      QString header;
      for(int h = 0; h < cols; h++)
      {
        QString header = _data->header(h);
        if(header.isEmpty())
          header = QString("%1").arg(h+1);
        else
          header = QString("%1 (%2)").arg(h+1).arg(header);
        _table->horizontalHeader()->setLabel(h, header);
      }
      _table->removeRow(0);
    }
    else
    {
      for(int h = 0; h < cols; h++)
        _table->horizontalHeader()->setLabel(h, QString("%1").arg(h+1));
      if(_data->rows() > 0)
      {
        _table->insertRows(0);
        QString v = QString::null;
        for(int c = 0; c < cols; c++)
        {
          v = _data->value(0, c);
          if(QString::null == v)
            v = tr("(NULL)");
          _table->setText(0, c, v);
        }
      }
    }
  }
}


void CSVToolWindow::importStart()
{
  CSVAtlas * atlas = _atlasWindow->getAtlas();
  QStringList mList = atlas->mapList();

  if(mList.isEmpty())
  {
    QMessageBox::warning(this, tr("No Maps Loaded"),
      tr("There are no maps loaded to select from.\n"
         "Either load an atlas that contains maps or create a new one before continuing."));
    return;
  }

  mList.sort();
  bool valid;
  QString name = QInputDialog::getItem(tr("Select Map"), tr("Select Map:"), mList, 0, FALSE, &valid, this);
  if(!valid)
    return;

  CSVMap map = atlas->map(name);
  map.simplify();
  Q3ValueList<CSVMapField> fields = map.fields();

  if(map.name() != name || fields.isEmpty())
  {
    QMessageBox::warning(this, tr("Invalid Map"), tr("The selected map does not appear to be valid."));
    return;
  }

  CSVMap::Action action = map.action();
  if(action != CSVMap::Insert)
  {
    QMessageBox::warning(this, tr("Action not implimented"),
      tr("The action %1 for this map is not supported yet.").arg(CSVMap::actionToName(action)));
    return;
  }

  if(!_data || _data->rows() < 1)
  {
    QMessageBox::warning(this, tr("No data"), tr("There is no data to process. Load a CSV file before continuing."));
    return;
  }

  int total = _data->rows();
  int current = 0, error = 0, ignored = 0;

  /////
  QString errMsg;
  if(!map.sqlPre().stripWhiteSpace().isEmpty())
  {
    QSqlQuery pre;
    if(!pre.exec(map.sqlPre()))
    {
      errMsg = QString("ERROR Running Pre SQL query: %1").arg(pre.lastError().text());
      _log->_log->append("\n\n----------------------\n");
      _log->_log->append(errMsg);
      _log->show();
      if(map.sqlPreContinueOnError())
        _log->_log->append(tr("\n\nContinuing with rest of import\n\n"));
      else
      {
        QMessageBox::warning(this, tr("Error"), tr("There was an error running the pre sql query.\nPlease see the log for more details. Aborting transaction."));
        return;
      }
    }
  }

  QTime time;

  CSVImportProgress * progress = new CSVImportProgress(this);
  progress->setModal(TRUE);
  progress->_map->setText(map.name());
  progress->_action->setText(CSVMap::actionToName(action));
  progress->_total->setText(QString("%1").arg(total));
  progress->_current->setText("0");
  progress->_error->setText("0");
  progress->_ignored->setText("0");
  progress->_progress->setProgress(0, total);

  progress->show();
  qApp->processEvents();

  time.start();

  QString query;
  QString front;
  QString back;
  QString value;
  QString label;
  QVariant var;

  QStringList errorList;
  
  for(current = 0; current < total; ++current)
  {
    if(time.elapsed() > 200)
    {
      qApp->processEvents();

      if(!progress->isShown())
        break; // leave the loop

      progress->_current->setText(QString("%1").arg(current));
      progress->_error->setText(QString("%1").arg(error));
      progress->_ignored->setText(QString("%1").arg(ignored));
      progress->_progress->setProgress(current);

      time.restart();
    }

    if(action == CSVMap::Insert)
    {
      query = QString("INSERT INTO %1 ").arg(map.table());
      front = "(";
      back = " VALUES(";
      Q3ValueList<CSVMapField>::iterator it;
      QMap<QString,QVariant> values;
      for(it = fields.begin(); it != fields.end(); ++it)
      {
        switch((*it).action())
        {
          case CSVMapField::Action_UseColumn:
          {
            value = _data->value(current, (*it).column()-1);
            if(value.isNull())
            {
              switch ((*it).ifNullAction())
              {
                case CSVMapField::UseDefault:
                  continue;
                case CSVMapField::UseEmptyString:
                {
                  var = QVariant(QString(""));
                  break;
                }
                case CSVMapField::UseAlternateValue:
                {
                  var = QVariant((*it).valueAlt());
                  break;
                }
                case CSVMapField::UseAlternateColumn:
                {
                  value = _data->value(current, (*it).columnAlt()-1);
                  if(value.isNull())
                  {
                    switch ((*it).ifNullActionAlt())
                    {
                      case CSVMapField::UseDefault:
                        continue;
                      case CSVMapField::UseEmptyString:
                      {
                        var = QVariant(QString(""));
                        break;
                      }
                      case CSVMapField::UseAlternateValue:
                      {
                        var = QVariant((*it).valueAlt());
                        break;
                      }
                      default: // Nothing
                        var = QVariant(QString::null);
                    }
                  }
                  else
                    var = QVariant(value);
                  break;
                }
                default: // Nothing
                  var = QVariant(QString::null);
              }
            }
            else
              var = QVariant(value);
            break;
          }
          case CSVMapField::Action_UseEmptyString:
          {
            var = QVariant(QString(""));
            break;
          }
          case CSVMapField::Action_UseAlternateValue:
          {
            var = QVariant((*it).valueAlt());
            break;
          }
          case CSVMapField::Action_UseNull:
          {
            var = QVariant(QString::null);
            break;
          }
          default:
            continue;
        }

        label = ":" + (*it).name();
        if(!values.empty())
        {
          front += ", ";
          back  += ", ";
        }
        values.insert(label, var);
        front += (*it).name();
        back  += label;
      }

      if(values.empty())
      {
        ignored++;
        errMsg = QString("IGNORED Record %1: There are no columns to insert").arg(current+1);
        errorList.append(errMsg);
        continue;
      }

      front += ") ";
      back += ")";
      query += front + back;
      QSqlQuery qry;
      qry.prepare(query);
      
      QMap<QString,QVariant>::iterator vit;
      for(vit = values.begin(); vit != values.end(); ++vit)
        qry.bindValue(vit.key(), vit.data());

      if(!qry.exec())
      {
        error++;
        errMsg = QString("ERROR Record %1: %2").arg(current+1).arg(qry.lastError().text());
        errorList.append(errMsg);
      }
      //_log->_log->append("\n\n" + qry.executedQuery());
    }
  }

  delete progress;
  progress = 0;

  // do some reporting here on the results including error message and
  // marking any unprocessed records and the like
  if(error == 0 && ignored == 0)
    QMessageBox::information(this, tr("Import Complete"), tr("Your import was completed successfully."));
  else
  {
    _log->_log->append("\n\n------------------\n");
    errMsg = QString("Map: %1\nTable: %2\nMethod: %3\n\n").arg(map.name(), map.table(), CSVMap::actionToName(map.action()));
    errMsg += QString("Total Records: %1\n").arg(total);
    errMsg += QString("# Processed:   %1\n").arg(current);
    errMsg += QString("# Ignored:     %1\n").arg(ignored);
    errMsg += QString("# Errors:      %1\n\n").arg(error);
    _log->_log->append(errMsg);
    _log->_log->append(errorList.join("\n"));
    _log->show();
  }

  if(!map.sqlPost().stripWhiteSpace().isEmpty())
  {
    QSqlQuery post;
    if(!post.exec(map.sqlPost()))
    {
      errMsg = QString("ERROR Running Post SQL query: %1").arg(post.lastError().text());
      _log->_log->append("\n\n----------------------\n");
      _log->_log->append(errMsg);
      _log->show();
      QMessageBox::warning(this, tr("Error"), tr("There was an error running the post sql query.\nPlease see the log for more details."));
      return;
    }
  }

}


void CSVToolWindow::sImportViewLog()
{
  _log->show();
}


void CSVToolWindow::timerEvent( QTimerEvent * e )
{
  if(e->timerId() == _dbTimerId)
  {
    QSqlDatabase db = QSqlDatabase::database(QSqlDatabase::defaultConnection,FALSE);
    if(db.open())
    {
      QSqlQuery qry("SELECT CURRENT_DATE;");
    }
    // if we are not connected then we have some problems!
  }
}
