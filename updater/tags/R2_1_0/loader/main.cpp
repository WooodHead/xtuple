/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include <QApplication>
#include <QMainWindow>
#include <QMessageBox>
#include <QSqlDatabase>
#include <QSqlError>
#include <QStyleFactory>
#include <QWindowsStyle>

#ifdef Q_WS_MACX
#include <QMacStyle>
#endif

#include <dbtools.h>
#include <login2.h>
#include <parameter.h>
#include <xsqlquery.h>

#include "data.h"

#include "loaderwindow.h"

int main(int argc, char* argv[])
{
  QString username  = "";
  bool    haveUsername    = FALSE;
  bool    haveDatabaseURL = FALSE;
  _loggedIn        = FALSE;
  bool multitrans = false;

  QString databaseURL = "";

  QApplication app(argc, argv);
  app.addLibraryPath(".");

#ifdef Q_WS_WIN
  if (QSysInfo::WindowsVersion == QSysInfo::WV_XP)
    app.setStyle(QStyleFactory::create("windowsxpstyle"));
#if QT_VERSION >= 0x040300
  else if (QSysInfo::WindowsVersion == QSysInfo::WV_VISTA)
    app.setStyle(QStyleFactory::create("windowsvistastyle"));
#endif
  else
    app.setStyle(new QWindowsStyle);
#elif defined Q_WS_MACX
  app.setStyle(new QMacStyle);
#else
  app.setStyle(new QWindowsStyle);
#endif

  if (argc > 1)
  {
    haveUsername        = FALSE;
    bool    havePasswd          = FALSE;
    QString passwd              = "";

    for (int intCounter = 1; intCounter < argc; intCounter++)
    {
      QString argument(argv[intCounter]);

      if (argument.startsWith("-databaseURL=", Qt::CaseInsensitive)) {
        haveDatabaseURL = TRUE;
        databaseURL    = argument.right(argument.length() - 13);
      }
      else if (argument.startsWith("-username=", Qt::CaseInsensitive))
      {
        haveUsername = TRUE;
        username     = argument.right(argument.length() - 10);
      }
      else if (argument.startsWith("-passwd=", Qt::CaseInsensitive))
      {
        havePasswd = TRUE;
        passwd     = argument.right(argument.length() - 8);
      }
      else if (argument.toLower() == "-noauth")
      {
        haveUsername = TRUE;
        havePasswd   = TRUE;
      }
      else if (argument.toLower() == "-multitrans")
        multitrans = true;

    }

    if ( (haveDatabaseURL) && (haveUsername) && (havePasswd) )
    {
      QSqlDatabase db;
      QString      protocol;
      QString      hostName;
      QString      dbName;
      QString      port;

      db = QSqlDatabase::addDatabase("QPSQL7");
      if (!db.isValid())
      {
        QMessageBox::critical(0, QObject::tr("Can not load database driver"), QObject::tr("Unable to load the databse driver. Please contact your systems adminstrator."));
        QApplication::exit(-1);
      }

      parseDatabaseURL(databaseURL, protocol, hostName, dbName, port);
      db.setDatabaseName(dbName);
      db.setUserName(username);
      db.setPassword(passwd);
      db.setHostName(hostName);
      db.setPort(port.toInt());

      if (!db.open())
      {
        QMessageBox::critical(0, QObject::tr("Unable to connect to database"), QObject::tr("Unable to connect to the database with the given information."));
        QApplication::exit(-1);
      }
      else
        _loggedIn = TRUE;
    }

  }

  if(!_loggedIn)
  {
    ParameterList params;
    params.append("name", _name);
    params.append("copyright", _copyright.toAscii().data());
    params.append("version",   _version.toAscii().data());
    params.append("build", __DATE__ " " __TIME__); // use C++ string concat

    if (haveUsername)
      params.append("username", _user);

    if (haveDatabaseURL)
      params.append("databaseURL", databaseURL.toAscii().data());

    if (_evaluation)
      params.append("evaluation");

    login2 newdlg(0, "", TRUE);
    newdlg.set(params, 0);

    if (newdlg.exec() == QDialog::Rejected)
      return -1;
    else
    {
      databaseURL = newdlg._databaseURL;
      _user = newdlg._user;
      _loggedIn = TRUE;
    }

    QSqlQuery su;
    su.prepare("SELECT rolsuper FROM pg_roles WHERE (rolname=:user);");
    su.bindValue(":user", _user);
    su.exec();
    if (su.first())
    {
      if (! su.value(0).toBool() &&
          QMessageBox::question(0, QObject::tr("Not Super User"),
                                QObject::tr("You are not logged in as a "
                                            "database super user. The update "
                                            "may fail. Are you sure you want "
                                            "to continue?"),
                                QMessageBox::Yes,
                                QMessageBox::No | QMessageBox::Default) == QMessageBox::No)
        return -2;
    }
    else if (su.lastError().type() != QSqlError::NoError &&
             QMessageBox::question(0, QObject::tr("System Error"),
                            QObject::tr("<p>The application received a database "
                                        "error while trying to check the user "
                                        "status of %1. Would you like to try to "
                                        "update anyway?<br><pre>%2")
                            .arg(_user)
                            .arg(su.lastError().databaseText()),
                            QMessageBox::Yes,
                            QMessageBox::No | QMessageBox::Default) == QMessageBox::No)
      return -3;
  }

  LoaderWindow * mainwin = new LoaderWindow();
  mainwin->setMultipleTransactions(multitrans);
  mainwin->show();

  return app.exec();
}
