/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2007 by OpenMFG, LLC
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 * Please contact info@openmfg.com with any questions on this license.
 */

#include "importwindow.h"

#include <QInputDialog>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlError>
#include <QTimerEvent>
#include <QFileDialog>
#include <QApplication>
#include <QMessageBox>
#include <QStringList>
#include <QDomNode>

#include "data.h"

#include "listboxreportitem.h"


/*
 *  Constructs a ImportWindow as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
ImportWindow::ImportWindow(QWidget* parent, const char* name, Qt::WFlags fl)
    : QMainWindow(parent, name, fl)
{
  setupUi(this);

  (void)statusBar();

  // signals and slots connections
  connect(helpIndexAction, SIGNAL(activated()), this, SLOT(helpIndex()));
  connect(helpContentsAction, SIGNAL(activated()), this, SLOT(helpContents()));
  connect(helpAboutAction, SIGNAL(activated()), this, SLOT(helpAbout()));
  connect(fileExitAction, SIGNAL(activated()), this, SLOT(fileExit()));
  connect(fileOpenAction, SIGNAL(activated()), this, SLOT(sAdd()));
  connect(_add, SIGNAL(clicked()), this, SLOT(sAdd()));
  connect(_import, SIGNAL(clicked()), this, SLOT(sImport()));
  connect(_remove, SIGNAL(clicked()), this, SLOT(sRemove()));
  connect(_selectAll, SIGNAL(clicked()), this, SLOT(sSelectAll()));
  connect(_reports, SIGNAL(doubleClicked(Q3ListBoxItem*)), this, SLOT(reportsDoubleClicked(Q3ListBoxItem*)));

  _reports->clear();
  _dbTimerId = startTimer(60000);
}

/*
 *  Destroys the object and frees any allocated resources
 */
ImportWindow::~ImportWindow()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void ImportWindow::languageChange()
{
    retranslateUi(this);
}

void ImportWindow::helpIndex()
{
  QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void ImportWindow::helpContents()
{
  QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void ImportWindow::helpAbout()
{
  QMessageBox::about(this, tr("Report Import Tool"),
    tr("%1 version %2"
       "\n\n%3 is a tool for importing report definition files into a database."
       "\n\n%4, All Rights Reserved").arg(_name).arg(_version).arg(_name).arg(_copyright));
}


void ImportWindow::fileExit()
{
  qApp->closeAllWindows();
}


void ImportWindow::sAdd()
{
  QStringList files = QFileDialog::getOpenFileNames(this, tr("Select one or more reports to open"), QString::null,
                                                    tr("Report Definitions (*.xml)"));
  if(!files.isEmpty())
    for(QStringList::Iterator it = files.begin(); it != files.end(); ++it)
      _reports->insertItem(new ListBoxReportItem(*it, 0));
}


void ImportWindow::sRemove()
{
  Q3ListBoxItem * item = _reports->firstItem();
  Q3ListBoxItem * next = 0;
  while(item)
  {
    next = item->next();
    if(item->isSelected())
      delete item;
    item = next;
  }
}


void ImportWindow::sImport()
{
  _log->append(tr("Import Started..."));
  Q3ListBoxItem * item = _reports->firstItem();
  Q3ListBoxItem * next = 0;
  while(item)
  {
    next = item->next();
    if(item->isSelected())
    {
      QString xml_file = ((ListBoxReportItem*)item)->report();

      QString report_name  = QString::null;
      QString report_desc  = QString::null;
      QString report_src   = QString::null;
      int     report_grade = ((ListBoxReportItem*)item)->grade();

      if(!xml_file.isEmpty())
      {
        QFile file(xml_file);
        if(file.open(QIODevice::ReadOnly))
        {
          QDomDocument doc;
          QString errMsg;
          int errLine, errCol;
          if(doc.setContent(&file, &errMsg, &errLine, &errCol))
          {
            QDomElement root = doc.documentElement();
            if(root.tagName() == "report")
            {
              for(QDomNode n = root.firstChild();
                    !n.isNull(); n = n.nextSibling())
              {
                if(n.nodeName() == "name")
                  report_name = n.firstChild().nodeValue();
                else if(n.nodeName() == "description")
                  report_desc = n.firstChild().nodeValue();
              }
              report_src = doc.toString();

              if(!report_name.isEmpty())
              {
                QSqlQuery qry;
                QSqlQuery query;

                qry.prepare("SELECT report_id "
                            "  FROM report "
                            " WHERE ((report_name=:rptname) "
                            "   AND (report_grade=:rptgrade));");
                qry.bindValue(":rptname",  report_name);
                qry.bindValue(":rptgrade", report_grade);
                qry.exec();
                if(qry.first())
                {
                  // update
                  query.prepare("UPDATE report "
                                "   SET report_descrip=:rptdescr, "
                                "       report_source=:rptsrc "
                                " where report_id=:rptid "
                                "   and report_name=:rptname;");
                  query.bindValue(":rptdescr", report_desc);
                  query.bindValue(":rptsrc",   report_src);
                  query.bindValue(":rptid", qry.value(0));
                  query.bindValue(":rptname",  report_name);
                }
                else
                {
                  // insert
                  query.prepare("INSERT INTO report "
                                "       (report_name, report_descrip, report_source, report_grade) "
                                "VALUES (:rptname, :rptdescr, :rptsrc, :rptgrade);");
                  query.bindValue(":rptname",  report_name);
                  query.bindValue(":rptdescr", report_desc);
                  query.bindValue(":rptsrc",   report_src);
                  query.bindValue(":rptgrade", report_grade);
                }
                
                if(!query.exec())
                {
                  QSqlError err = query.lastError();
                  _log->append(tr("<font color=red>The following error was encountered while trying to import %1 into the database:\n"
                                  "\t%2\n\t%3\n</font>")
                                .arg(xml_file)
                                .arg(err.driverText())
                                .arg(err.databaseText()));
                }
                else
                  _log->append(tr("Import successful of %1").arg(xml_file));
              }
              else
                _log->append(tr("<font color=orange>The document %1 does not have a report name defined\n</font>")
                              .arg(xml_file));
            }
            else
              _log->append(tr("<font color=red>XML Document %1 does not have root node of report\n</font>")
                            .arg(xml_file));
          }
          else
            _log->append(tr("<font color=red>Error parsing file %1: %2 on line %3 column %4\n</font>")
                          .arg(xml_file).arg(errMsg).arg(errLine).arg(errCol));
        }
        else
          _log->append(tr("<font color=red>Could not open the specified file: %1\n</font>")
                        .arg(xml_file));
      }
      else
        _log->append("<font color=red>Encountered and empty entry: No file name was given.\n</font>");
    }
    item = next;
  }
  _log->append(tr("Import complete!\n\n\n"));
}


void ImportWindow::sSelectAll()
{
  _reports->selectAll(TRUE);
}


void ImportWindow::timerEvent( QTimerEvent * e )
{
  if(e->timerId() == _dbTimerId)
  {
    QSqlDatabase db = QSqlDatabase::database(QSqlDatabase::defaultConnection,FALSE);
    if(db.isValid())
    {
      QSqlQuery qry("SELECT CURRENT_DATE;");
    }
    // if we are not connected then we have some problems!
  }
}


void ImportWindow::reportsDoubleClicked( Q3ListBoxItem * item )
{
  if(!item || item->rtti() != ListBoxReportItem::RTTI)
    return;

  ListBoxReportItem * ritem = (ListBoxReportItem*)item;

  bool ok = FALSE;
  int grade = QInputDialog::getInteger(this, tr("Edit Grade"), tr("Grade: "), ritem->grade(), 0, 99, 1, &ok);
  if(ok)
    ritem->setGrade(grade);
}
