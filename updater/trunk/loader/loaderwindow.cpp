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
 * The Original Code is xTuple ERP: PostBooks Edition
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2008 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
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
 * Copyright (c) 1999-2008 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by xTuple ERP: PostBooks Edition
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

#include <QApplication>
#include <QDomDocument>
#include <QFileDialog>
#include <QList>
#include <QMessageBox>
#include <QProcess>
#include <QRegExp>
#include <QSqlDatabase>
#include <QSqlError>
#include <QSqlQuery>
#include <QTimerEvent>

#include <gunzip.h>
#include <createfunction.h>
#include <createschema.h>
#include <createtable.h>
#include <createtrigger.h>
#include <createview.h>
#include <loadappscript.h>
#include <loadappui.h>
#include <loadcmd.h>
#include <loadimage.h>
#include <loadpriv.h>
#include <loadreport.h>
#include <package.h>
#include <prerequisite.h>
#include <script.h>
#include <tarfile.h>
#include <xsqlquery.h>

#include "data.h"

#define DEBUG false

QString LoaderWindow::_rollbackMsg(tr("<p><font color=red>The upgrade has "
                                      "been aborted due to an error and your "
                                      "database was rolled back to the state "
                                      "it was in when the upgrade was "
                                      "initiated.</font><br>"));

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

LoaderWindow::~LoaderWindow()
{
  // no need to delete child widgets, Qt does it all for us
}

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

  _pkgname->setText(tr("No Package is currently loaded."));

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
    QMessageBox::warning(this, tr("Error Opening File"),
                         tr("<p>The file %1 appears to be empty or it is not "
                            "compressed in the expected format.")
                         .arg(filename));
    return;
  }

  _files = new TarFile(data);
  if(!_files->isValid())
  {
    QMessageBox::warning(this, tr("Error Opening file"),
                         tr("<p>The file %1 does not appear to contain a valid "
                            "update package (not a valid TAR file?).")
                         .arg(filename));
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
        QMessageBox::warning(this, tr("Error Opening file"),
                             tr("<p>Multiple content.xml files found in %1. "
                                "Currently only packages containing a single "
                                "content.xml file are supported.")
                             .arg(filename));
        delete _files;
        _files = 0;
        return;
      }
      contentFile = *mit;
    }
  }

  if(contentFile.isNull())
  {
    QMessageBox::warning(this, tr("Error Opening file"),
                         tr("<p>No contents.xml file was found in package %1.")
                         .arg(filename));
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
    QMessageBox::warning(this, tr("Error Opening file"),
                         tr("<p>There was a problem reading the contents.xml "
                            "file in this package.<br>%1<br>Line %2, "
                            "Column %3").arg(errMsg).arg(errLine).arg(errCol));
    delete _files;
    _files = 0;
    return;
  }

  _text->clear();
  _text->setEnabled(true);

  QStringList msgList;
  QList<bool> fatalList;
  QString delayedWarning;
  _package = new Package(doc.documentElement(), msgList, fatalList);
  if (msgList.size() > 0)
  {
    bool fatal = false;
    if (DEBUG)
      qDebug("LoaderWindow::fileOpen()  i fatal msg");
    for (int i = 0; i < msgList.size(); i++)
    {
      _text->append(QString("<p><font color=%1>%2</font></p>")
                    .arg(fatalList.at(i) ? "red" : "orange")
                    .arg(msgList.at(i)));
      fatal = fatal || fatalList.at(i);
      if (DEBUG)
        qDebug("LoaderWindow::fileOpen() %2d %5d %s",
               i, fatalList.at(i), qPrintable(msgList.at(i)));
    }
    if (fatal)
    {
      _text->append(tr("<p><font color=\"red\">The contents.xml file appears "
                       "to be invalid.</font></p>"));
      return;
    }
    else
      delayedWarning = tr("<p><font color=\"orange\">The contents.xml file "
                          "seems to have problems. You should contact %1 "
                          "before proceeding.</font></p>")
                      .arg(_package->developer().isEmpty() ?
                           tr("the package developer") : _package->developer());
  }

  _pkgname->setText(tr("Package %1 (%2)").arg(_package->id()).arg(filename));

  _progress->setValue(0);
  _progress->setMaximum(_files->_list.count() - 1);
  _progress->setEnabled(true);

  _status->setEnabled(true);
  _status->setText(tr("<p><b>Checking Prerequisites!</b></p>"));
  _text->append("<p><b>Prerequisites</b>:</p>");
  bool allOk = true;
  // check prereqs
  QString str;
  QStringList strlist;
  QStringList::Iterator slit;
  QSqlQuery qry;
  for(QList<Prerequisite>::iterator i = _package->_prerequisites.begin();
      i != _package->_prerequisites.end(); ++i)
  {
    Prerequisite p = *i;
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
        QMessageBox::warning(this, tr("Unhandled Prerequisite"),
                             tr("<p>Encountered an unknown Prerequisite type. "
                                "Prerequisite '%1' has not been validated.")
                             .arg(p.name()));
    }
  }

  if(!allOk)
  {
    _status->setText(tr("<p><b>Checking Prerequisites!</b></p><p>One or more prerequisites <b>FAILED</b>. These prerequisites must be satisified before continuing.</p>"));
    return;
  }

  _status->setText(tr("<p><b>Checking Prerequisites!</b></p><p>Check completed.</p>"));
  if (delayedWarning.isEmpty())
    _text->append(tr("<p><b><font color=\"green\">Ready to Start update!</font></b></p>"));
  else
  {
    _text->append(tr("<p><b>Ready to Start update!</b></p>"));
    _text->append(delayedWarning);
  }
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
    if (DEBUG)
      qDebug("%s", destver.toAscii().data());
    destver.remove(QRegExp(".*/?[12][0123][0-9]((alpha|beta|rc)[1-9])?to"));
    if (DEBUG)
      qDebug("%s", destver.toAscii().data());
    destver.remove(QRegExp("((alpha|beta|rc)[1-9])?.gz$"));
    if (DEBUG)
      qDebug("%s", destver.toAscii().data());
    // now destver is just the destination release #
    if (destver.toInt() < 230)
      _premultitransfile = true;
  }
  else
  {
    if (DEBUG)
      qDebug("not one of our old files");
  }

  _start->setEnabled(true);
}


void LoaderWindow::fileExit()
{
  qApp->closeAllWindows();
}


void LoaderWindow::helpContents()
{
  launchBrowser(this, "http://wiki.xtuple.org/UpdaterDoc");
}

// copied from xtuple/guiclient/guiclient.cpp and made independent of Qt3Support
// TODO: put in a generic place and use both from there or use WebKit instead
void LoaderWindow::launchBrowser(QWidget * w, const QString & url)
{
#if defined(Q_OS_WIN32)
  // Windows - let the OS do the work
  QT_WA( {
      ShellExecute(w->winId(), 0, (TCHAR*)url.ucs2(), 0, 0, SW_SHOWNORMAL );
    } , {
      ShellExecuteA( w->winId(), 0, url.local8Bit(), 0, 0, SW_SHOWNORMAL );
    } );
#else
  QString b(getenv("BROWSER"));
  QStringList browser;
  if (! b.isEmpty())
    browser = b.split(':');

#if defined(Q_OS_MACX)
  browser.append("/usr/bin/open");
#else
  // append this on linux just as a good guess
  browser.append("/usr/bin/firefox");
  browser.append("/usr/bin/mozilla");
#endif
  for(QStringList::const_iterator i=browser.begin(); i!=browser.end(); ++i) {
    QString app = *i;
    if(app.contains("%s")) {
      app.replace("%s", url);
    } else {
      app += " " + url;
    }
    app.replace("%%", "%");
    QProcess *proc = new QProcess(w);
    QStringList args = app.split(QRegExp(" +"));
    QString appname = args.takeFirst();

    proc->start(appname, args);
    if (proc->waitForStarted() &&
        proc->waitForFinished())
      return;

    QMessageBox::warning(w, tr("Failed to open URL"),
                         tr("<p>Before you can run a web browser you must "
                            "set the environment variable BROWSER to point "
                            "to the browser executable.") );
  }
#endif  // if not windows
}

void LoaderWindow::helpAbout()
{
  QMessageBox::about(this, _name,
    tr("<p>Apply update packages to your xTuple ERP database."
       "<p>Version %1</p>"
       "<p>%2</p>"
       "All Rights Reserved")
    .arg(_version).arg(_copyright));
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
  _text->setText("<p></p>");

  QString prefix = QString::null;
  if(!_package->id().isEmpty())
    prefix = _package->id() + "/";

  QSqlQuery qry;
  if(!_multitrans && !_premultitransfile)
    qry.exec("begin;");

  QString errMsg;
  int pkgid = -1;
  if (! _package->name().isEmpty())
  {
    pkgid = _package->writeToDB(errMsg);
    if (pkgid >= 0)
      _text->append(tr("Saving Package Header was successful."));
    else
    {
      _text->append(errMsg);
      qry.exec("rollback;");
      if(!_multitrans && !_premultitransfile)
      {
        _text->append(_rollbackMsg);
        return;
      }
    }
  }

  _status->setText(tr("<p><b>Updating Privileges</b></p>"));
  _text->append(tr("<p>Loading new Privileges...</p>"));
  for(QList<LoadPriv>::iterator i = _package->_privs.begin();
      i != _package->_privs.end(); ++i)
  {
    LoadPriv priv = *i;
    if (priv.writeToDB(_package->name(), errMsg) >= 0)
      _text->append(tr("Import of %1 was successful.").arg(priv.name()));
    else
    {
      _text->append(errMsg);
      qry.exec("rollback;");
      if(!_multitrans && !_premultitransfile)
      {
        _text->append(_rollbackMsg);
        return;
      }
    }
    _progress->setValue(_progress->value() + 1);
  }
  _text->append(tr("<p>Completed importing new Privileges.</p>"));

  // update scripts here
  _status->setText(tr("<p><b>Updating Schema</b></p>"));
  _text->append(tr("<p>Applying database change files...</p>"));
  Script script;
  for(QList<Script>::iterator i = _package->_scripts.begin();
      i != _package->_scripts.end(); ++i)
  {
    if (applySql((*i), _files->_list[prefix + (*i).filename()]) < 0)
      return;
  }

  _status->setText(tr("<p><b>Updating Schema Definitions</b></p>"));
  _text->append(tr("<p>Loading new Schema definitions...</p>"));
  for(QList<CreateSchema>::iterator i = _package->_schemas.begin();
      i != _package->_schemas.end(); ++i)
  {
    if (applySql((*i), _files->_list[prefix + (*i).filename()]) < 0)
      return;
  }
  _text->append(tr("<p>Completed importing new schema definitions.</p>"));

  _status->setText(tr("<p><b>Updating Function Definitions</b></p>"));
  _text->append(tr("<p>Loading new Function definitions...</p>"));
  for(QList<CreateFunction>::iterator i = _package->_functions.begin();
      i != _package->_functions.end(); ++i)
  {
    if (applySql((*i), _files->_list[prefix + (*i).filename()]) < 0)
      return;
  }
  _text->append(tr("<p>Completed importing new function definitions.</p>"));

  _status->setText(tr("<p><b>Updating Table Definitions</b></p>"));
  _text->append(tr("<p>Loading new Table definitions...</p>"));
  for(QList<CreateTable>::iterator i = _package->_tables.begin();
      i != _package->_tables.end(); ++i)
  {
    if (applySql((*i), _files->_list[prefix + (*i).filename()]) < 0)
      return;
  }
  _text->append(tr("<p>Completed importing new table definitions.</p>"));

  _status->setText(tr("<p><b>Updating Trigger Definitions</b></p>"));
  _text->append(tr("<p>Loading new Trigger definitions...</p>"));
  for(QList<CreateTrigger>::iterator i = _package->_triggers.begin();
      i != _package->_triggers.end(); ++i)
  {
    if (applySql((*i), _files->_list[prefix + (*i).filename()]) < 0)
      return;
  }
  _text->append(tr("<p>Completed importing new trigger definitions.</p>"));

  _status->setText(tr("<p><b>Updating View Definitions</b></p>"));
  _text->append(tr("<p>Loading new View definitions...</p>"));
  for(QList<CreateView>::iterator i = _package->_views.begin();
      i != _package->_views.end(); ++i)
  {
    if (applySql((*i), _files->_list[prefix + (*i).filename()]) < 0)
      return;
  }
  _text->append(tr("<p>Completed importing new view definitions.</p>"));

  _status->setText(tr("<p><b>Updating Report Definitions</b></p>"));
  _text->append(tr("<p>Loading new report definitions...</p>"));
  for(QList<LoadReport>::iterator i = _package->_reports.begin();
      i != _package->_reports.end(); ++i)
  {
    LoadReport report = *i;
    QByteArray data = _files->_list[prefix + report.filename()];
    if(data.isEmpty())
    {
      QMessageBox::warning(this, tr("File Missing"),
                           tr("<p>The file %1 in this package is empty.").
                           arg(report.filename()));
      continue;
    }
    if (report.writeToDB(data, _package->name(), errMsg) >= 0)
      _text->append(tr("Import of %1 was successful.").arg(report.filename()));
    else
    {
      _text->append(errMsg);
      qry.exec("rollback;");
      if(!_multitrans && !_premultitransfile)
      {
        _text->append(_rollbackMsg);
        return;
      }
    }
    _progress->setValue(_progress->value() + 1);
  }
  _text->append(tr("<p>Completed importing new report definitions.</p>"));

  _status->setText(tr("<p><b>Updating User Interface Definitions</b></p>"));
  _text->append(tr("<p>Loading User Interface definitions...</p>"));
  for(QList<LoadAppUI>::iterator i = _package->_appuis.begin();
      i != _package->_appuis.end(); ++i)
  {
    LoadAppUI appui = *i;
    if (DEBUG)
      qDebug("LoaderWindow::sStart() - loading ui %s in file %s",
             qPrintable(appui.name()), qPrintable(appui.filename()));
    QByteArray data = _files->_list[prefix + appui.filename()];
    if(data.isEmpty())
    {
      QMessageBox::warning(this, tr("File Missing"),
                           tr("<p>The file %1 in this package is empty.").
                           arg(appui.filename()));
      continue;
    }
    if (appui.writeToDB(data, _package->name(), errMsg) >= 0)
      _text->append(tr("Import of %1 was successful.").arg(appui.filename()));
    else
    {
      _text->append(errMsg);
      qry.exec("rollback;");
      if(!_multitrans && !_premultitransfile)
      {
        _text->append(_rollbackMsg);
        return;
      }
    }
    _progress->setValue(_progress->value() + 1);
  }
  _text->append(tr("<p>Completed importing User Interface definitions.</p>"));

  _status->setText(tr("<p><b>Updating Application Script Definitions</b></p>"));
  _text->append(tr("<p>Loading Application Script definitions...</p>"));
  for(QList<LoadAppScript>::iterator i = _package->_appscripts.begin();
      i != _package->_appscripts.end(); ++i)
  {
    LoadAppScript appscript = *i;
    if (DEBUG)
      qDebug("LoaderWindow::sStart() - loading appscript %s in file %s",
             qPrintable(appscript.name()), qPrintable(appscript.filename()));
    QByteArray data = _files->_list[prefix + appscript.filename()];
    if(data.isEmpty())
    {
      QMessageBox::warning(this, tr("File Missing"),
                           tr("<p>The file %1 in this package is empty.").
                           arg(appscript.filename()));
      continue;
    }
    if (appscript.writeToDB(data, _package->name(), errMsg) >= 0)
      _text->append(tr("Import of %1 was successful.").arg(appscript.filename()));
    else
    {
      _text->append(errMsg);
      qry.exec("rollback;");
      if(!_multitrans && !_premultitransfile)
      {
        _text->append(_rollbackMsg);
        return;
      }
    }
    _progress->setValue(_progress->value() + 1);
  }
  _text->append(tr("<p>Completed importing Application Script definitions.</p>"));

  _status->setText(tr("<p><b>Updating Custom Commands</b></p>"));
  _text->append(tr("<p>Loading new Custom Commands...</p>"));
  for(QList<LoadCmd>::iterator i = _package->_cmds.begin();
      i != _package->_cmds.end(); ++i)
  {
    LoadCmd cmd = *i;
    if (DEBUG)
      qDebug("LoaderWindow::sStart() - loading cmd %s", qPrintable(cmd.name()));
    if (cmd.writeToDB(_package->name(), errMsg) >= 0)
      _text->append(tr("Import of %1 was successful.").arg(cmd.name()));
    else
    {
      _text->append(errMsg);
      qry.exec("rollback;");
      if(!_multitrans && !_premultitransfile)
      {
        _text->append(_rollbackMsg);
        return;
      }
    }
    _progress->setValue(_progress->value() + 1);
  }
  _text->append(tr("<p>Completed importing new Custom Commands.</p>"));

  _status->setText(tr("<p><b>Updating Image Definitions</b></p>"));
  _text->append(tr("<p>Loading Image definitions...</p>"));
  for(QList<LoadImage>::iterator i = _package->_images.begin();
      i != _package->_images.end(); ++i)
  {
    LoadImage image = *i;
    if (DEBUG)
      qDebug("LoaderWindow::sStart() - loading image %s in file %s",
             qPrintable(image.name()), qPrintable(image.filename()));
    QByteArray data = _files->_list[prefix + image.filename()];
    if(data.isEmpty())
    {
      QMessageBox::warning(this, tr("File Missing"),
                           tr("<p>The file %1 in this package is empty.").
                           arg(image.filename()));
      continue;
    }
    if (image.writeToDB(data, _package->name(), errMsg) >= 0)
      _text->append(tr("Import of %1 was successful.").arg(image.filename()));
    else
    {
      _text->append(errMsg);
      qry.exec("rollback;");
      if(!_multitrans && !_premultitransfile)
      {
        _text->append(_rollbackMsg);
        return;
      }
    }
    _progress->setValue(_progress->value() + 1);
  }
  _text->append(tr("<p>Completed importing Image definitions.</p>"));

  _progress->setValue(_progress->value() + 1);

  if(!_multitrans && !_premultitransfile)
    qry.exec("commit;");

  _text->append(tr("<p>The Update is now complete!</p>"));
}

void LoaderWindow::setMultipleTransactions(bool mt)
{
  _multitrans = mt;
}

int LoaderWindow::applySql(Script &pscript, const QByteArray psql)
{
  if (DEBUG)
    qDebug("LoaderWindow::applySql() - running script %s in file %s",
           qPrintable(pscript.name()), qPrintable(pscript.filename()));

  QSqlQuery qry;
  bool again = true;
  int  r     = 0;
  while (again)
  {
    QString message;
    again      = false;
    bool fatal = true;

    if(_multitrans || _premultitransfile)
    {
      qry.exec("begin;");
      if (pscript.onError() == Script::Default)
        pscript.setOnError(Script::Prompt);
    }
    else
    {
      qry.exec("SAVEPOINT updaterFile;");
      if (pscript.onError() == Script::Default)
        pscript.setOnError(Script::Stop);
    }

    int returnVal = pscript.writeToDB(psql, _package->name(), message);
    if (returnVal == -1)
    {
      _text->append(tr("<font color=%1>%2</font><br>")
                    .arg("orange")
                    .arg(message));
    }
    else if (returnVal < 0)
    {
      if ((_multitrans || _premultitransfile) &&
          pscript.onError() == Script::Ignore)
        fatal = false;

      _text->append(tr("<p>"));
      _text->append(tr("<font color=%1>%2</font><br>")
                    .arg(fatal ? "red" : "orange")
                    .arg(message));
      if(_multitrans || _premultitransfile)
        qry.exec("rollback;");
      else
        qry.exec("ROLLBACK TO updaterFile;");

      switch (pscript.onError())
      {
        case Script::Stop:
          if (DEBUG)
            qDebug("LoaderWindow::applySql() taking Script::Stop branch");
          qry.exec("rollback;");
          _text->append(_rollbackMsg);
          return returnVal;
          break;

        case Script::Ignore:
          if (DEBUG)
            qDebug("LoaderWindow::applySql() taking Script::Ignore branch");
          _text->append(tr("<font color=orange><b>IGNORING</b> the above "
                           "errors and skipping script %1.</font><br>")
                          .arg(pscript.filename()));
          break;

        case Script::Prompt:
          if (DEBUG)
            qDebug("LoaderWindow::applySql() taking Script::Prompt branch");
        default:
          if (DEBUG)
            qDebug("LoaderWindow::applySql() taking default branch");
          r = QMessageBox::question(this, tr("Encountered an Error"),
                tr("<pre>%1.</pre><p>Please select the action "
                   "that you would like to take.").arg(message),
                tr("Retry"), tr("Ignore"), tr("Abort"), 0, 0 );
          if(r == 0)
          {
            _text->append(tr("RETRYING..."));
            again = true;
          }
          else if(r == 1)
            _text->append(tr("<font color=orange><b>IGNORING</b> the "
                             "above errors at user request and "
                             "skipping script %1.</font><br>")
                            .arg(pscript.filename()) );
          else if(r == 2)
          {
            qry.exec("rollback;");
            return returnVal;
          }
      }
    }
    else
      _text->append(tr("Import of %1 was successful.").arg(pscript.filename()));
  }
  if(_multitrans || _premultitransfile)
    qry.exec("commit;");
  else
    qry.exec("RELEASE SAVEPOINT updaterFile;");

  _progress->setValue(_progress->value() + 1);

  return 0;
}
