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

#include "loaderwindow.h"

#include <QVariant>
#include <QApplication>
#include <QMessageBox>
#include <QFileDialog>
#include <QSqlDatabase>
#include <QDomDocument>
#include <QRegExp>
#include <QTimerEvent>
#include <QList>
#include <QSqlQuery>
#include <QSqlError>
#include <xsqlquery.h>
#include <tarfile.h>
#include <gunzip.h>
#include <package.h>

/*
 *  Constructs a LoaderWindow as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
LoaderWindow::LoaderWindow(QWidget* parent, const char* name, Qt::WindowFlags fl)
    : QMainWindow(parent, fl)
{
  setupUi(this);
  setObjectName(name);

  (void)statusBar();

  _multitrans = false;
  _premultitransfile = false;
  _package = 0;
  _files = 0;
  _dbTimerId = startTimer(60000);
  fileNew();
}

/*
 *  Destroys the object and frees any allocated resources
 */
LoaderWindow::~LoaderWindow()
{
  // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void LoaderWindow::languageChange()
{
  retranslateUi(this);
}

void LoaderWindow::fileNew()
{
  // we don't actually create files here but we are using this as the
  // stub to unload and properly setup the UI to respond correctly to
  // having no package currently loaded.
  if(_package != 0)
  {
    delete _package;
    _package = 0;
  }

  if(_files != 0)
  {
    delete _files;
    _files = 0;
  }

  _name->setText(tr("No Package is currently loaded."));

  _status->clear();
  _status->setEnabled(false);

  _progress->setValue(0);
  _progress->setEnabled(false);

  _text->clear();
  _text->setEnabled(false);

  _start->setEnabled(false);
}


void LoaderWindow::fileOpen()
{
  fileNew();

  QString filename = QFileDialog::getOpenFileName(this);
  if(filename.isEmpty())
    return;

  QByteArray data = gunzipFile(filename);
  if(data.isEmpty())
  {
    QMessageBox::warning(this, tr("Error Opening file"), tr("There was an error opening the file you selected."));
    return;
  }

  _files = new TarFile(data);
  if(!_files->isValid())
  {
    QMessageBox::warning(this, tr("Error Opening file"), tr("There was an error parsing the file you selected."));
    delete _files;
    _files = 0;
    return;
  }

  // find the content file
  QStringList list = _files->_list.keys();
  QString contentFile = QString::null;
  QRegExp re(".*contents.xml$");
  for(QStringList::Iterator mit = list.begin(); mit != list.end(); ++mit)
  {
    if(re.exactMatch(*mit))
    {
      if(!contentFile.isNull())
      {
        QMessageBox::warning(this, tr("Error Opening file"), tr("Multiple content files found.\nCurrently only packages containing a single content file are supported."));
        delete _files;
        _files = 0;
        return;
      }
      contentFile = *mit;
    }
  }

  if(contentFile.isNull())
  {
    QMessageBox::warning(this, tr("Error Opening file"), tr("No content file was found in this package."));
    delete _files;
    _files = 0;
    return;
  }

  QByteArray docData = _files->_list[contentFile];
  QDomDocument doc;
  QString errMsg;
  int errLine, errCol;
  if(!doc.setContent(docData, &errMsg, &errLine, &errCol))
  {
    QMessageBox::warning(this, tr("Error Opening file"), tr("There was a problem reading the content file in this package.\n%1\nLine %2, Column %3").arg(errMsg).arg(errLine).arg(errCol));
    delete _files;
    _files = 0;
    return;
  }

  _package = new Package(doc.documentElement());
  _name->setText(tr("Package %1 (%2)").arg(_package->id()).arg(filename));

  _progress->setValue(0);
  _progress->setMaximum(_files->_list.count() - 1);
  _progress->setEnabled(true);

  _text->clear();
  _text->setEnabled(true);

  _status->setEnabled(true);
  _status->setText(tr("<p><b>Checking Prerequisites!</b></p>"));
  _text->setText("<p><b>Prerequisites</b>:</p>");
  bool allOk = true;
  // check prereqs
  QList<Prerequisite>::iterator it = _package->_prerequisites.begin();
  QString str;
  QStringList strlist;
  QStringList::Iterator slit;
  QSqlQuery qry;
  for(; it != _package->_prerequisites.end(); ++it)
  {
    Prerequisite p = *it;
    bool passed = false;
    _status->setText(tr("<p><b>Checking Prerequisites!</b></p><p>%1...</p>").arg(p.name()));
    _text->append(tr("<p>%1</p>").arg(p.name()));
    switch(p.type())
    {
      case Prerequisite::Query:
        qry.exec(p.query());
        passed = false;
        if(qry.first())
          passed = qry.value(0).toBool();

        if(!passed)
        {
          allOk = false;
          //QMessageBox::warning(this, tr("Prerequisite Not Met"), tr("The prerequisite %1 was not met.").arg(p.name()));

          str = tr("<p><blockquote><font size=\"+1\" color=\"red\"><b>Failed</b></font><br />");
          if(!p.message().isEmpty())
           str += tr("<p>%1</p>").arg(p.message());

          strlist = p.providerList();
          if(strlist.count() > 0)
          {
            str += tr("<b>Requires:</b><br />");
            str += tr("<ul>");
            for(slit = strlist.begin(); slit != strlist.end(); ++slit)
              str += tr("<li>%1: %2</li>").arg(p.provider(*slit).package()).arg(p.provider(*slit).info());
            str += tr("</ul>");
          }
          
          str += tr("</blockquote></blockquote></p>");
          _text->append(str);
        }
        break;
      default:
        QMessageBox::warning(this, tr("Unhandled Prerequisite"), tr("Encountered an unknown Prerequisite type. Prerequisite %1 has not been validated.").arg(p.name()));
    }
  }

  if(!allOk)
  {
    _status->setText(tr("<p><b>Checking Prerequisites!</b></p><p>One or more prerequisites <b>FAILED</b>. These prerequisites must be satisified before continuing.</p>"));
    return;
  }

  _status->setText(tr("<p><b>Checking Prerequisites!</b></p><p>Check completed.</p>"));
  _text->append(tr("<p><b><font color=\"green\">Ready to Start update!</font></b></p>"));
  _text->append(tr("<p><b>NOTE</b>: Have you backed up your database? If not, you should "
                   "backup your database now. It is good practice to backup a database "
                   "before updating it.</p>"));

  /*
  single vs multiple transaction functionality was added at around the same
  time as OpenMFG/PostBooks 2.3.0 was being developed. before 2.3.0, update
  scripts from xTuple (OpenMFG, LLC) assumed multiple transactions (one per
  file within the package). take advantage of the update package naming
  conventions to see if we've been given a pre-2.3.0 file and *need* to use
  multiple transactions.
  */
  _premultitransfile = false;
  QString destver = filename;
  // if follows OpenMFG/xTuple naming convention
  if (destver.contains(QRegExp(".*/?[12][0123][0-9]((alpha|beta|rc)[1-9])?"
			       "to"
			       "[1-9][0-9][0-9]((alpha|beta|rc)[1-9])?.gz$")))
  {
    qDebug("%s", destver.toAscii().data());
    destver.remove(QRegExp(".*/?[12][0123][0-9]((alpha|beta|rc)[1-9])?to"));
    qDebug("%s", destver.toAscii().data());
    destver.remove(QRegExp("((alpha|beta|rc)[1-9])?.gz$"));
    qDebug("%s", destver.toAscii().data());
    // now destver is just the destination release #
    if (destver.toInt() < 230)
      _premultitransfile = true;
  }
  else
    qDebug("not one of our old files");

  _start->setEnabled(true);
}


void LoaderWindow::fileExit()
{
  qApp->closeAllWindows();
}


void LoaderWindow::helpIndex()
{
  QMessageBox::information(this, tr("Not yet implimented"), tr("This feature has not yet been implimented."));
}


void LoaderWindow::helpContents()
{
  QMessageBox::information(this, tr("Not yet implimented"), tr("This feature has not yet been implimented."));
}


void LoaderWindow::helpAbout()
{
  QMessageBox::about(this, tr("Update Manager"),
    tr("Apply update packages to your OpenMFG database."
       "\n\nCopyright (c) 2004-2005 OpenMFG, LLC., All Rights Reserved"));
}


void LoaderWindow::timerEvent( QTimerEvent * e )
{
  if(e->timerId() == _dbTimerId)
  {
    QSqlDatabase db = QSqlDatabase::database(QSqlDatabase::defaultConnection,FALSE);
    if(db.isValid())
      QSqlQuery qry("SELECT CURRENT_DATE;");
    // if we are not connected then we have some problems!
  }
}


/*
 use _multitrans to see if the user requested a single transaction wrapped
 around the entire import
 but use _premultitransfile to see if we need multiple transactions
 even if the user requested one.
 */
void LoaderWindow::sStart()
{
  _start->setEnabled(false);

  QString prefix = QString::null;
  if(!_package->id().isEmpty())
    prefix = _package->id() + "/";

  QSqlQuery qry;
  if(!_multitrans && !_premultitransfile)
    qry.exec("begin;");

  // update scripts here
  _status->setText(tr("<p><b>Updating Schema</b></p>"));
  _text->setText(tr("<p>Applying database change files...</p>"));
  QList<Script>::iterator sit = _package->_scripts.begin();
  Script script;
  for(; sit != _package->_scripts.end(); ++sit)
  {
    script = *sit;

    QByteArray scriptData = _files->_list[prefix + script.name()];
    if(scriptData.isEmpty())
    {
      QMessageBox::warning(this, tr("File Missing"), tr("The file %1 is missing from this package.").arg(script.name()));
      continue;
    }

    QString sql(scriptData);

    bool again = true;
    int r = 0;
    while(again) {
      again = false;
      if(_multitrans || _premultitransfile)
        qry.exec("begin;");
      if(!qry.exec(sql))
      {
        QSqlError err = qry.lastError();
        QString message = tr("The following error was encountered while "
                             "trying to import %1 into the database:<br>\n"
                             "\t%2<br>\n\t%3")
                      .arg(script.name())
                      .arg(err.driverText())
                      .arg(err.databaseText());
        _text->append(tr("<p>"));
        if((_multitrans || _premultitransfile) && script.onError() == Script::Ignore)
          _text->append(tr("<font color=orange>%1</font><br>").arg(message));
        else
          _text->append(tr("<font color=red>%1</font><br>").arg(message));
        qry.exec("rollback;");
        if(!_multitrans && !_premultitransfile)
        {
          _text->append(tr("<p>"));
          _text->append(tr("<font color=red>The upgrade has been aborted due to an error and your database was rolled back to the state it was in when the upgrade was initiated.</font><br>"));
          return;
        }
        switch(script.onError())
        {
          case Script::Ignore:
            _text->append(tr("<font color=orange><b>IGNORING</b> the above "
                             "errors and skipping script %1.</font><br>")
                            .arg(script.name()));
            break;
          case Script::Stop:
          case Script::Prompt:
          case Script::Default:
          default:
            r = QMessageBox::question(this, tr("Encountered an Error"),
                  tr("%1.\n"
                     "Please select the action that you would like to take.").arg(message),
                  tr("Retry"), tr("Ignore"), tr("Abort"), 0, 0 );
            if(r == 0)
            {
              _text->append(tr("RETRYING..."));
              again = true;
            }
            else if(r == 1)
              _text->append(tr("<font color=orange><b>IGNORING</b> the above errors at user "
                               "request and skipping script %1.</font><br>")
                              .arg(script.name()) );
            else
              if(r == 2) return;
        }
      }
    }
    if(_multitrans || _premultitransfile)
      qry.exec("commit;");
    _progress->setValue(_progress->value() + 1);
  }

  // load reports here
  _status->setText(tr("<p><b>Updating Report Definitions</b></p>"));
  _text->append(tr("<p>Loading new report definitions...</p>"));
  QList<LoadReport>::iterator rit = _package->_reports.begin();
  LoadReport report;
  for(; rit != _package->_reports.end(); ++rit)
  {
    report = *rit;
    QByteArray reportData = _files->_list[prefix + report.name()];
    if(reportData.isEmpty())
    {
      QMessageBox::warning(this, tr("File Missing"), tr("The file %1 is missing from this package.").arg(report.name()));
      continue;
    }

    QString report_name = QString::null;
    QString report_desc = QString::null;
    QString report_src  = QString::null;
    int     report_grade = report.grade();

    QDomDocument doc;
    QString errMsg;
    int errLine, errCol;
    if(doc.setContent(reportData, &errMsg, &errLine, &errCol))
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
          QSqlQuery query;

          QString sql("SELECT report_id "
                      "  FROM report "
                      " WHERE ((report_name=:rptname) "
                      "   AND (report_grade=:rptgrade) );");
          qry.prepare(sql);
          qry.bindValue(":rptname",  report_name);
          qry.bindValue(":rptgrade", report_grade);
          qry.exec();
          if(qry.first())
          {
            // update
            sql = QString("UPDATE report "
                          "   SET report_descrip=:rptdescr, "
                          "       report_source=:rptsrc "
                          " where report_id=:rptid "
                          "   and report_name=:rptname;");
            query.prepare(sql);
            query.bindValue(":rptdescr", report_desc);
            query.bindValue(":rptsrc",   report_src);
            query.bindValue(":rptid",    qry.value(0).toInt());
            query.bindValue(":rptname",  report_name);
          }
          else
         {
            // insert
            sql = QString("INSERT INTO report "
                          "       (report_name, report_descrip, report_source, report_grade) "
                          "VALUES (:rptname, :rptdescr, :rptsrc, :rptgrade);");
            query.prepare(sql);
            query.bindValue(":rptname",  report_name);
            query.bindValue(":rptdescr", report_desc);
            query.bindValue(":rptsrc",   report_src);
            query.bindValue(":rptgrade", report_grade);
          }

          if(!query.exec())
          {
            QSqlError err = query.lastError();
            _text->append(tr("<font color=red>The following error was encountered while"
                             " trying to import %1 into the database:\n"
                             "\t%2\n\t%3</font>")
                          .arg(report.name())
                          .arg(err.driverText())
                          .arg(err.databaseText()));
          }
          else
            _text->append(tr("Import successful of %1").arg(report.name()));
        }
        else
          _text->append(tr("<font color=orange>The document %1 does not have"
                           " a report name defined</font>")
                        .arg(report.name()));
      }
      else
        _text->append(tr("<font color=red>XML Document %1 does not have root"
                         " node of report</font>")
                      .arg(report.name()));
    }
    else
      _text->append(tr("<font color=red>Error parsing file %1: %2 on line %3 column %4</font>")
                    .arg(report.name()).arg(errMsg).arg(errLine).arg(errCol));
    _progress->setValue(_progress->value() + 1);
  }
  _text->append(tr("<p>Completed importing new report definitions.</p>"));

  _progress->setValue(_progress->value() + 1);

  if(!_multitrans && !_premultitransfile)
    qry.exec("commit;");

  _text->append(tr("<p>The Update is now complete!</p>"));
}

void LoaderWindow::setMultipleTransactions(bool mt)
{
  _multitrans = mt;
}

