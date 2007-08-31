#include <qapplication.h>
#include <q3mainwindow.h>
#include <qwindowsstyle.h>
#include <qsqldatabase.h>
#include <qstylefactory.h>
#include <qmessagebox.h>

#ifdef Q_WS_MACX
#include <qmacstyle_mac.h>
#endif

#include <xsqlquery.h>
#include <dbtools.h>
#include <login2.h>

#include <parameter.h>

#include "data.h"

#include <loaderwindow.h>

int main(int argc, char* argv[])
{
  QString username  = "";
  bool    haveUsername    = FALSE;
  bool    haveDatabaseURL = FALSE;
  _loggedIn        = FALSE;

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
    params.append("copyright", _copyright);
    params.append("version", _version);
    params.append("build", QString("%1 %2").arg(__DATE__).arg(__TIME__));

    if (haveUsername)
      params.append("username", _user);

    if (haveDatabaseURL)
      params.append("databaseURL", databaseURL);

    if (_evaluation)
      params.append("evaluation");

    login2 newdlg(0, "", TRUE);
    newdlg.set(params, 0);

    if (newdlg.exec() == QDialog::Rejected)
      return -1;
    else
    {
      databaseURL = newdlg._databaseURL;
      _usrid = newdlg._userid;
      _user = newdlg._user;
      _loggedIn = TRUE;
    }
  }

  LoaderWindow * mainwin = new LoaderWindow();
  mainwin->show();

  app.setMainWidget(mainwin);
  return app.exec();
}

