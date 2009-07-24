/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "loaderwindow.h"

#include <QApplication>
#include <QDomDocument>
#include <QFileDialog>
#include <QFileInfo>
#include <QList>
#include <QMessageBox>
#include <QProcess>
#include <QRegExp>
#include <QSettings>
#include <QSqlDatabase>
#include <QSqlError>
#include <QTimerEvent>

#include <gunzip.h>
#include <createfunction.h>
#include <createtable.h>
#include <createtrigger.h>
#include <createview.h>
#include <finalscript.h>
#include <loadappscript.h>
#include <loadappui.h>
#include <loadcmd.h>
#include <loadimage.h>
#include <loadmetasql.h>
#include <loadpriv.h>
#include <loadreport.h>
#include <package.h>
#include <pkgschema.h>
#include <prerequisite.h>
#include <script.h>
#include <tarfile.h>
#include <xsqlquery.h>

#include "data.h"

#include "xsqlquery.h"

#define DEBUG false

#if defined(Q_OS_WIN32)
#define NOCRYPT
#include <windows.h>
#undef LoadImage
#else
#if defined(Q_OS_MACX)
#include <stdlib.h>
#endif
#endif

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

bool LoaderWindow::openFile(QString pfilename)
{
  fileNew();
  
  QFileInfo fi(pfilename);
  if (fi.filePath().isEmpty())
    return false;
    
  QByteArray data = gunzipFile(fi.filePath());
  if(data.isEmpty())
  {
    QMessageBox::warning(this, tr("Error Opening File"),
                         tr("<p>The file %1 appears to be empty or it is not "
                            "compressed in the expected format.")
                         .arg(fi.filePath()));
    return false;
  }

  _files = new TarFile(data);
  if(!_files->isValid())
  {
    QMessageBox::warning(this, tr("Error Opening file"),
                         tr("<p>The file %1 does not appear to contain a valid "
                            "update package (not a valid TAR file?).")
                         .arg(fi.filePath()));
    delete _files;
    _files = 0;
    return false;
  }

  // find the content file
  QStringList list = _files->_list.keys();
  QString contentFile = QString::null;
  QStringList contentsnames;
  contentsnames << "package.xml" << "contents.xml";
  for (int i = 0; i < contentsnames.size() && contentFile.isNull(); i++)
  {
    QRegExp re(".*" + contentsnames.at(i) + "$");
    for(QStringList::Iterator mit = list.begin(); mit != list.end(); ++mit)
    {
      if(re.exactMatch(*mit))
      {
        if(!contentFile.isNull())
        {
          QMessageBox::warning(this, tr("Error Opening file"),
                               tr("<p>Multiple %1 files found in %2. "
                                  "Currently only packages containing a single "
                                  "content.xml file are supported.")
                               .arg(contentsnames.at(i)).arg(fi.filePath()));
          delete _files;
          _files = 0;
          return false;
        }
        contentFile = *mit;
      }
    }
  }

  QStringList msgList;
  QList<bool> fatalList;

  if(contentFile.isNull())
  {
    QMessageBox::warning(this, tr("Error Opening file"),
                         tr("<p>No %1 file was found in package %2.")
                         .arg(contentsnames.join(" or ")).arg(fi.filePath()));
    delete _files;
    _files = 0;
    return false;
  }
  else if (! contentFile.endsWith(contentsnames.at(0)))
  {
    qDebug("Deprecated Package Format: Packages for this version of "
           "the Updater should have their contents described by a file "
           "named %s. The current package being loaded uses an outdated "
           "file name %s.",
           qPrintable(contentsnames.at(0)), qPrintable(contentFile));
  }

  QByteArray docData = _files->_list[contentFile];
  QDomDocument doc;
  QString errMsg;
  int errLine, errCol;
  if(!doc.setContent(docData, &errMsg, &errLine, &errCol))
  {
    QMessageBox::warning(this, tr("Error Opening file"),
                         tr("<p>There was a problem reading the %1 file in "
                            "this package.<br>%2<br>Line %3, Column %4")
                         .arg(contentFile).arg(errMsg)
                         .arg(errLine).arg(errCol));
    delete _files;
    _files = 0;
    return false;
  }

  _text->clear();
  _text->setEnabled(true);

  QString delayedWarning;
  _package = new Package(doc.documentElement(), msgList, fatalList);
  if (msgList.size() > 0)
  {
    bool fatal = false;
    if (DEBUG)
      qDebug("LoaderWindow::fileOpen()  i fatal msg");
    for (int i = 0; i < msgList.size(); i++)
    {
      _text->append(QString("<br><font color=\"%1\">%2</font>")
                    .arg(fatalList.at(i) ? "red" : "orange")
                    .arg(msgList.at(i)));
      fatal = fatal || fatalList.at(i);
      if (DEBUG)
        qDebug("LoaderWindow::fileOpen() %2d %5d %s",
               i, fatalList.at(i), qPrintable(msgList.at(i)));
    }
    if (fatal)
    {
      _text->append(tr("<p><font color=\"red\">The %1 file appears "
                       "to be invalid.</font></p>").arg(contentFile));
      return false;
    }
    else
      delayedWarning = tr("<p><font color=\"orange\">The %1 file "
                          "seems to have problems. You should contact %2 "
                          "before proceeding.</font></p>")
                      .arg(contentFile)
                      .arg(_package->developer().isEmpty() ?
                           tr("the package developer") : _package->developer());
  }

  _pkgname->setText(tr("Package %1 (%2)").arg(_package->id()).arg(fi.filePath()));

  _progress->setValue(0);
  _progress->setMaximum(_files->_list.count() - 1);
  _progress->setEnabled(true);
  if (DEBUG)
    qDebug("LoaderWindow::fileOpen() progress initialized to max %d",
           _progress->maximum());

  _status->setEnabled(true);
  _status->setText(tr("<p><b>Checking Prerequisites!</b></p>"));
  _text->append("<p><b>Prerequisites</b>:<br/>");
  bool allOk = true;
  // check prereqs
  QString str;
  QStringList strlist;
  QStringList::Iterator slit;
  XSqlQuery qry;
  for(QList<Prerequisite>::iterator i = _package->_prerequisites.begin();
      i != _package->_prerequisites.end(); ++i)
  {
    _status->setText(tr("<p><b>Checking Prerequisites!</b></p><p>%1...</p>")
                       .arg((*i).name()));
    _text->append(tr("%1").arg((*i).name()));
    if (! (*i).met(errMsg))
    {
      allOk = false;
      str = QString("<blockquote><font size=\"+1\" color=\"red\"><b>%1</b></font></blockquote>").arg(tr("Failed"));
      if (! errMsg.isEmpty())
       str += tr("<p>%1</p>").arg(errMsg);

      strlist = (*i).providerList();
      if(strlist.count() > 0)
      {
        str += tr("<b>Requires:</b><br />");
        str += tr("<ul>");
        for(slit = strlist.begin(); slit != strlist.end(); ++slit)
          str += tr("<li>%1: %2</li>").arg((*i).provider(*slit).package()).arg((*i).provider(*slit).info());
        str += tr("</ul>");
      }
      
      str += tr("</blockquote>");
      _text->append(str);
      if (DEBUG)
        qDebug("%s", qPrintable(str));
    }
  }

  if(!allOk)
  {
    _status->setText(tr("<p><b>Checking Prerequisites!</b></p><p>One or more prerequisites <b>FAILED</b>. These prerequisites must be satisified before continuing.</p>"));
    return false;
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
  QString destver = fi.filePath();
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
  return true;
}

void LoaderWindow::fileOpen()
{
  fileNew();
  
  QSettings settings("xTuple.com", "Updater");
  QString path = settings.value("LastDirectory").toString();

  QString filename = QFileDialog::getOpenFileName(this,
                                                  tr("Open Package"), path,
                                                  tr("Package Files (*.gz);;All Files (*.*)"));

  if (! openFile(filename))
    return;
    
  QFileInfo fi(filename);
  settings.setValue("LastDirectory", fi.path());
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
      ShellExecute(w->winId(), 0, (TCHAR*)url.utf16(), 0, 0, SW_SHOWNORMAL );
    } , {
      ShellExecuteA( w->winId(), 0, url.toLocal8Bit(), 0, 0, SW_SHOWNORMAL );
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
      XSqlQuery qry("SELECT CURRENT_DATE;");
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

  XSqlQuery qry;
  if(!_multitrans && !_premultitransfile)
    qry.exec("begin;");

  PkgSchema schema(_package->name(),
                   tr("Schema to hold contents of %1").arg(_package->name()));
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

    if (schema.create(errMsg) >= 0 && schema.setPath(errMsg) >= 0)
      _text->append(tr("Saving Schema for Package was successful."));
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

  int ignoredErrCnt = 0;
  int tmpReturn     = 0;

  if (_package->_privs.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Privileges</b></p>"));
    _text->append(tr("<p>Loading new Privileges...</p>"));
    if(!qry.exec("ALTER TABLE pkgpriv DISABLE TRIGGER pkgprivaltertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    for(QList<LoadPriv>::iterator i = _package->_privs.begin();
        i != _package->_privs.end(); ++i)
    {
      LoadPriv priv = *i;
      tmpReturn = applyLoadable((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
      _progress->setValue(_progress->value() + 1);
    }
    if(!qry.exec("ALTER TABLE pkgpriv ENABLE TRIGGER pkgprivaltertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    _text->append(tr("<p>Completed importing new Privileges.</p>"));
  }
  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after privs",
           _progress->value(), _progress->maximum());

  if (_package->_scripts.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Schema</b></p>"));
    _text->append(tr("<p>Applying database change files...</p>"));
    for(QList<Script>::iterator i = _package->_scripts.begin();
        i != _package->_scripts.end(); ++i)
    {
      tmpReturn = applySql((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
    }
  }

  if (_package->_functions.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Function Definitions</b></p>"));
    _text->append(tr("<p>Loading new Function definitions...</p>"));
    for(QList<CreateFunction>::iterator i = _package->_functions.begin();
        i != _package->_functions.end(); ++i)
    {
      tmpReturn = applySql((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
    }
    _text->append(tr("<p>Completed importing new function definitions.</p>"));
  }

  if (_package->_tables.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Table Definitions</b></p>"));
    _text->append(tr("<p>Loading new Table definitions...</p>"));
    for(QList<CreateTable>::iterator i = _package->_tables.begin();
        i != _package->_tables.end(); ++i)
    {
      tmpReturn = applySql((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
    }
    _text->append(tr("<p>Completed importing new table definitions.</p>"));
  }

  if (_package->_triggers.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Trigger Definitions</b></p>"));
    _text->append(tr("<p>Loading new Trigger definitions...</p>"));
    for(QList<CreateTrigger>::iterator i = _package->_triggers.begin();
        i != _package->_triggers.end(); ++i)
    {
      tmpReturn = applySql((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
    }
    _text->append(tr("<p>Completed importing new trigger definitions.</p>"));
  }

  if (_package->_views.size() > 0)
  {
    _status->setText(tr("<p><b>Updating View Definitions</b></p>"));
    _text->append(tr("<p>Loading new View definitions...</p>"));
    for(QList<CreateView>::iterator i = _package->_views.begin();
        i != _package->_views.end(); ++i)
    {
      tmpReturn = applySql((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
    }
    _text->append(tr("<p>Completed importing new view definitions.</p>"));
  }

  if (_package->_metasqls.size() > 0)
  {
    _status->setText(tr("<p><b>Updating MetaSQL Statements</b></p>"));
    if(!qry.exec("ALTER TABLE metasql DISABLE TRIGGER metasqlaltertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    if (! _package->name().isEmpty() &&
       (! qry.exec("ALTER TABLE pkgmetasql DISABLE TRIGGER pkgmetasqlaltertrigger;")))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    _text->append(tr("<p>Loading new MetaSQL Statements...</p>"));
    for(QList<LoadMetasql>::iterator i = _package->_metasqls.begin();
        i != _package->_metasqls.end(); ++i)
    {
      tmpReturn = applyLoadable((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
      _progress->setValue(_progress->value() + 1);
    }
    if (! _package->name().isEmpty() &&
       (! qry.exec("ALTER TABLE pkgmetasql ENABLE TRIGGER pkgmetasqlaltertrigger;")))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    if(!qry.exec("ALTER TABLE metasql ENABLE TRIGGER metasqlaltertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    _text->append(tr("<p>Completed importing new MetaSQL Statements.</p>"));
  }
  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after metasql",
           _progress->value(), _progress->maximum());

  if (_package->_reports.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Report Definitions</b></p>"));
    _text->append(tr("<p>Loading new report definitions...</p>"));
    if (! _package->name().isEmpty() &&
       (! qry.exec("ALTER TABLE pkgreport DISABLE TRIGGER pkgreportaltertrigger;")))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    for(QList<LoadReport>::iterator i = _package->_reports.begin();
        i != _package->_reports.end(); ++i)
    {
      tmpReturn = applyLoadable((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
      _progress->setValue(_progress->value() + 1);
    }
    if (! _package->name().isEmpty() &&
       (! qry.exec("ALTER TABLE pkgreport ENABLE TRIGGER pkgreportaltertrigger;")))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    _text->append(tr("<p>Completed importing new report definitions.</p>"));
  }
  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after reports",
           _progress->value(), _progress->maximum());

  if (_package->_appuis.size() > 0)
  {
    _status->setText(tr("<p><b>Updating User Interface Definitions</b></p>"));
    _text->append(tr("<p>Loading User Interface definitions...</p>"));
    if(!qry.exec("ALTER TABLE pkguiform DISABLE TRIGGER pkguiformaltertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    for(QList<LoadAppUI>::iterator i = _package->_appuis.begin();
        i != _package->_appuis.end(); ++i)
    {
      if (DEBUG)
        qDebug("LoaderWindow::sStart() - loading ui %s in file %s",
               qPrintable((*i).name()), qPrintable((*i).filename()));
      tmpReturn = applyLoadable((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
      _progress->setValue(_progress->value() + 1);
    }
    if(!qry.exec("ALTER TABLE pkguiform ENABLE TRIGGER pkguiformaltertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    _text->append(tr("<p>Completed importing User Interface definitions.</p>"));
  }
  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after uis",
           _progress->value(), _progress->maximum());

  if (_package->_appscripts.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Application Script Definitions</b></p>"));
    _text->append(tr("<p>Loading Application Script definitions...</p>"));
    if(!qry.exec("ALTER TABLE pkgscript DISABLE TRIGGER pkgscriptaltertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    for(QList<LoadAppScript>::iterator i = _package->_appscripts.begin();
        i != _package->_appscripts.end(); ++i)
    {
      if (DEBUG)
        qDebug("LoaderWindow::sStart() - loading appscript %s in file %s",
               qPrintable((*i).name()), qPrintable((*i).filename()));
      tmpReturn = applyLoadable((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
      _progress->setValue(_progress->value() + 1);
    }
    if(!qry.exec("ALTER TABLE pkgscript ENABLE TRIGGER pkgscriptaltertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    _text->append(tr("<p>Completed importing Application Script definitions.</p>"));
  }
  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after app scripts",
           _progress->value(), _progress->maximum());

  if (_package->_cmds.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Custom Commands</b></p>"));
    _text->append(tr("<p>Loading new Custom Commands...</p>"));
    if (! _package->name().isEmpty() &&
        (! qry.exec("ALTER TABLE pkgcmd DISABLE TRIGGER pkgcmdaltertrigger;") ||
         ! qry.exec("ALTER TABLE pkgcmdarg DISABLE TRIGGER pkgcmdargaltertrigger;")))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    for(QList<LoadCmd>::iterator i = _package->_cmds.begin();
        i != _package->_cmds.end(); ++i)
    {
      if (DEBUG)
        qDebug("LoaderWindow::sStart() - loading cmd %s", qPrintable((*i).name()));
      tmpReturn = applyLoadable((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
      _progress->setValue(_progress->value() + 1);
    }
    if (! _package->name().isEmpty() &&
       (! qry.exec("ALTER TABLE pkgcmdarg ENABLE TRIGGER pkgcmdargaltertrigger;") ||
        ! qry.exec("ALTER TABLE pkgcmd ENABLE TRIGGER pkgcmdaltertrigger;")))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    _text->append(tr("<p>Completed importing new Custom Commands.</p>"));
  }
  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after cmds",
           _progress->value(), _progress->maximum());

  if (_package->_images.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Image Definitions</b></p>"));
    _text->append(tr("<p>Loading Image definitions...</p>"));
    if (! _package->name().isEmpty() &&
        ! qry.exec("ALTER TABLE pkgimage DISABLE TRIGGER pkgimagealtertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    for(QList<LoadImage>::iterator i = _package->_images.begin();
        i != _package->_images.end(); ++i)
    {
      if (DEBUG)
        qDebug("LoaderWindow::sStart() - loading image %s in file %s",
               qPrintable((*i).name()), qPrintable((*i).filename()));
      tmpReturn = applyLoadable((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
      _progress->setValue(_progress->value() + 1);
    }
    if (! _package->name().isEmpty() &&
        ! qry.exec("ALTER TABLE pkgimage ENABLE TRIGGER pkgimagealtertrigger;"))
    {
      qry.exec("ROLLBACK;");
      _text->append(_rollbackMsg);
      return;
    }
    _text->append(tr("<p>Completed importing Image definitions.</p>"));
  }
  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after images",
           _progress->value(), _progress->maximum());

  if (_package->_prerequisites.size() > 0)
  {
    _status->setText(tr("<p><b>Updating Package Dependencies</b></p>"));
    _text->append(tr("<p>Loading Package Dependencies...</p>"));
    for(QList<Prerequisite>::iterator i = _package->_prerequisites.begin();
        i != _package->_prerequisites.end(); ++i)
    {
      if ((*i).type() == Prerequisite::Dependency)
      {
        if (DEBUG)
          qDebug("LoaderWindow::sStart() - saving dependency %s",
                 qPrintable((*i).name()));
        if ((*i).writeToDB(_package->name(), errMsg) >= 0)
          _text->append(tr("Saving dependency %1 was successful.")
                        .arg((*i).name()));
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
      _progress->setValue(_progress->value() + 1);
    }
    _text->append(tr("<p>Completed updating dependencies.</p>"));
  }
  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after dependencies",
           _progress->value(), _progress->maximum());

  if (_package->_finalscripts.size() > 0)
  {
    _status->setText(tr("<p><b>Running Final Cleanup</b></p>"));
    _text->append(tr("<p>Applying final cleanup scripts...</p>"));
    for(QList<FinalScript>::iterator i = _package->_finalscripts.begin();
        i != _package->_finalscripts.end(); ++i)
    {
      tmpReturn = applySql((*i), _files->_list[prefix + (*i).filename()]);
      if (tmpReturn < 0)
        return;
      else
        ignoredErrCnt += tmpReturn;
    }
  }
  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after final cleanup",
           _progress->value(), _progress->maximum());

  _progress->setValue(_progress->value() + 1);

  if (_alwaysrollback->isChecked())
  {
    _text->append(tr("<p>The Update has been rolled back.</p>"));
    qry.exec("rollback;");
  }
  else if (ignoredErrCnt > 0 && (_multitrans || _premultitransfile) &&
           QMessageBox::question(this, tr("Ignore Errors?"),
                              tr("<p>One or more errors were ignored while "
                                 "processing this Package. Are you sure you "
                                 "want to commit these changes?</p><p>If you "
                                 "answer 'No' then this import will be rolled "
                                 "back.</p>"),
                              QMessageBox::Yes,
                              QMessageBox::No | QMessageBox::Default) == QMessageBox::Yes)
  {
    qry.exec("commit;");
    _text->append(tr("<p>The Update is now complete but errors were ignored!</p>"));
  }
  else if (ignoredErrCnt > 0)
  {
    qry.exec("rollback;");
    _text->append(_rollbackMsg);
  }
  else
  {
    qry.exec("commit;");
    _text->append(tr("<p>The Update is now complete!</p>"));
  }

  if (DEBUG)
    qDebug("LoaderWindow::sStart() progress %d out of %d after commit",
           _progress->value(), _progress->maximum());

  if (! _package->name().isEmpty() && schema.clearPath(errMsg) < 0)
  {
    _text->append(tr("<p><font color=\"orange\">The update completed "
                     "successfully but there was an error resetting "
                     "the schema path:</font></p><pre>%1</pre>"
                     "<p>Quit the updater and start it "
                     "again if you want to apply another update.</p>"));

  }
}

void LoaderWindow::setMultipleTransactions(bool mt)
{
  _multitrans = mt;
}

void LoaderWindow::setDebugPkg(bool p)
{
  _alwaysrollback->setVisible(p);
  _alwaysrollback->setEnabled(p);
}

int LoaderWindow::applySql(Script &pscript, const QByteArray psql)
{
  if (DEBUG)
    qDebug("LoaderWindow::applySql() - running script %s in file %s",
           qPrintable(pscript.name()), qPrintable(pscript.filename()));

  XSqlQuery qry;
  bool again     = false;
  int  returnVal = 0;
  do {
    QString message;
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

    int scriptreturn = pscript.writeToDB(psql, _package->name(), message);
    if (scriptreturn == -1)
    {
      _text->append(tr("<font color=%1>%2</font><br>")
                    .arg("orange")
                    .arg(message));
    }
    else if (scriptreturn < 0)
    {
      bool fatal = ! ((_multitrans || _premultitransfile) &&
                      pscript.onError() == Script::Ignore);
      _text->append(tr("<p><font color=%1>%2</font><br>")
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
          return scriptreturn;
          break;

        case Script::Ignore:
          if (DEBUG)
            qDebug("LoaderWindow::applySql() taking Script::Ignore branch");
          _text->append(tr("<font color=orange><b>IGNORING</b> the above "
                           "errors and skipping script %1.</font><br>")
                          .arg(pscript.filename()));
          returnVal++;
          break;

        case Script::Prompt:
          if (DEBUG)
            qDebug("LoaderWindow::applySql() taking Script::Prompt branch");
        default:
          if (DEBUG)
            qDebug("LoaderWindow::applySql() taking default branch");
          switch(QMessageBox::question(this, tr("Encountered an Error"),
                tr("<pre>%1.</pre><p>Please select the action "
                   "that you would like to take.").arg(message),
                tr("Retry"), tr("Ignore"), tr("Abort"), 0, 0 ))
          {
            case 0:
              _text->append(tr("RETRYING..."));
              again = true;
              break;
            case 1:
              _text->append(tr("<font color=orange><b>IGNORING</b> the "
                               "above errors at user request and "
                               "skipping script %1.</font><br>")
                              .arg(pscript.filename()) );
              returnVal++;
              break;
            case 2:
            default:
              qry.exec("rollback;");
              _text->append(_rollbackMsg);
              return scriptreturn;
              break;
          }
      }
    }
    else
      _text->append(tr("Import of %1 was successful.").arg(pscript.filename()));
  } while (again);
  if ((_multitrans || _premultitransfile) && ! _alwaysrollback->isChecked())
    qry.exec("commit;");
  else
    qry.exec("RELEASE SAVEPOINT updaterFile;");

  _progress->setValue(_progress->value() + 1);

  return returnVal;
}

// similar to applySql but Loadable::writeDoDB() returning -1 is a real error
int LoaderWindow::applyLoadable(Loadable &pscript, const QByteArray psql)
{
  if (DEBUG)
    qDebug("LoaderWindow::applyLoadable(%s in %s, %s)",
           qPrintable(pscript.name()), qPrintable(pscript.filename()),
           psql.data());

  XSqlQuery qry;
  bool again     = false;
  int  returnVal = 0;
  do {
    QString message;

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

    int scriptreturn = pscript.writeToDB(psql, _package->name(), message);
    if (scriptreturn < 0)
    {
      bool fatal = ! ((_multitrans || _premultitransfile) &&
                      pscript.onError() == Script::Ignore);
      _text->append(tr("<br/><font color=%1>%2</font><br/>")
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
            qDebug("LoaderWindow::applyLoadable() taking Script::Stop branch");
          qry.exec("rollback;");
          _text->append(_rollbackMsg);
          return scriptreturn;
          break;

        case Script::Ignore:
          if (DEBUG)
            qDebug("LoaderWindow::applyLoadable() taking Script::Ignore branch");
          _text->append(tr("<font color=orange><b>IGNORING</b> the above "
                           "errors and skipping script %1.</font><br>")
                          .arg(pscript.filename()));
          returnVal++;
          break;

        case Script::Prompt:
          if (DEBUG)
            qDebug("LoaderWindow::applyLoadable() taking Script::Prompt branch");
        default:
          if (DEBUG)
            qDebug("LoaderWindow::applyLoadable() taking default branch");
          switch(QMessageBox::question(this, tr("Encountered an Error"),
                tr("<pre>%1.</pre><p>Please select the action "
                   "that you would like to take.").arg(message),
                tr("Retry"), tr("Ignore"), tr("Abort"), 0, 0 ))
          {
            case 0:
              _text->append(tr("RETRYING..."));
              again = true;
              break;
            case 1:
              _text->append(tr("<font color=orange><b>IGNORING</b> the "
                               "above errors at user request and "
                               "skipping script %1.</font><br>")
                              .arg(pscript.filename()) );
              returnVal++;
              break;
            case 2:
            default:
              qry.exec("rollback;");
              _text->append(_rollbackMsg);
              return scriptreturn;
              break;
          }
      }
    }
    else
      _text->append(tr("Import of %1 was successful.").arg(pscript.filename()));
  } while (again);
  if ((_multitrans || _premultitransfile) && ! _alwaysrollback->isChecked())
    qry.exec("commit;");
  else
    qry.exec("RELEASE SAVEPOINT updaterFile;");

  _progress->setValue(_progress->value() + 1);

  return returnVal;
}
