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
#include <QWindowsStyle>
#include <QSplashScreen>
#include <QSqlDatabase>
#include <QStyleFactory>
#include <QMessageBox>

#ifdef Q_WS_MACX
#include <qmacstyle_mac.h>
#endif

#include <xsqlquery.h>
#include <dbtools.h>
#include <login.h>

#include <parameter.h>

#include <data.h>

#include "csvtoolwindow.h"

int main(int argc, char *argv[])
{
  QString username  = "";
  bool    haveUsername    = FALSE;
  bool    haveDatabaseURL = FALSE;
  bool    loggedIn        = FALSE;

  QString databaseURL = "";

  QApplication app(argc, argv);
  app.addLibraryPath(".");

#ifdef Q_WS_WIN
  if (app.winVersion() == QSysInfo::WV_XP)
    app.setStyle(QStyleFactory::create("windowsxpstyle"));
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

      if (argument.contains("-databaseURL=")) {
        haveDatabaseURL = TRUE;
        databaseURL    = argument.right(argument.length() - 13);
      }
      else if (argument.contains("-username="))
      {
        haveUsername = TRUE;
        username     = argument.right(argument.length() - 10);
      }
      else if (argument.contains("-passwd="))
      {
        havePasswd = TRUE;
        passwd     = argument.right(argument.length() - 8);
      }
      else if (argument.contains("-noAuth"))
      {
        haveUsername = TRUE;
        havePasswd   = TRUE;
      }

    }

    if ( (haveDatabaseURL) && (haveUsername) && (havePasswd) )
    {
      QSqlDatabase db;
      QString      hostName;
      QString      dbName;
      QString      port;

      db = QSqlDatabase::addDatabase("QPSQL7");
      if (!db.isValid())
      {
        QMessageBox::critical(0, QObject::tr("Can not load database driver"), QObject::tr("Unable to load the databse driver. Please contact your systems adminstrator."));
        QApplication::exit(-1);
      }

      QString protocol;
      parseDatabaseURL(databaseURL, protocol, hostName, dbName, port);
      db.setDatabaseName(dbName);
      db.setUserName(username);
      db.setPassword(passwd);
      db.setHostName(hostName);
      bool valport = false;
      int iport = port.toInt(&valport);
      if(!valport) iport = 5432;
      db.setPort(iport);
      
      if (!db.open())
      {
        QMessageBox::critical(0, QObject::tr("Unable to connect to database"), QObject::tr("Unable to connect to the database with the given information."));
        QApplication::exit(-1);
      }
      else
        loggedIn = TRUE;
    }

  }

  if(!loggedIn)
  {
    ParameterList params;
    params.append("name",      CSVImp::name);
    params.append("copyright", CSVImp::copyright);
    params.append("version",   CSVImp::version);
    params.append("build",     CSVImp::build);

    if (haveUsername)
      params.append("username", username);

    if (haveDatabaseURL)
      params.append("databaseURL", databaseURL);

    login newdlg(0, "", TRUE);
    QPixmap tmpPixmap(":/images/splashCSVimp.png");
    newdlg._logo->setPixmap(tmpPixmap);
    QSplashScreen splash(tmpPixmap);
    newdlg.set(params, &splash);

    if (newdlg.exec() == QDialog::Rejected)
      return -1;
  }

  CSVToolWindow * mainwin = new CSVToolWindow();
  mainwin->show();

  QObject::connect(&app, SIGNAL(lastWindowClosed()), &app, SLOT(quit()));
  return app.exec();
}
