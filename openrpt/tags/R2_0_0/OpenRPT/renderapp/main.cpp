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

#include <QApplication>
#include <QWindowsStyle>
#include <QSqlDatabase>
#include <QStyleFactory>
#include <QMessageBox>

#ifdef Q_WS_MACX
#include <qmacstyle_mac.h>
#endif

#include <dbtools.h>
#include <login.h>

#include <parameter.h>
#include <xvariant.h>

#include "data.h"

#include <renderwindow.h>

typedef QPair<bool, QVariant> ParamPair;

int main(int argc, char *argv[])
{
  QMap<QString,ParamPair> paramList;
  QString username  = "";
  QString filename;
  QString printerName;
  bool    haveUsername    = FALSE;
  bool    haveDatabaseURL = FALSE;
  bool    loggedIn        = FALSE;
  bool    print           = FALSE;
  bool    close           = FALSE;

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

  if (app.argc() > 1)
  {
    haveUsername        = FALSE;
    bool    havePasswd          = FALSE;
    QString passwd              = "";

    for (int intCounter = 1; intCounter < app.argc(); intCounter++)
    {
      QString argument(app.argv()[intCounter]);

      if (argument.startsWith("-databaseURL=", false)) {
        haveDatabaseURL = TRUE;
        databaseURL    = argument.right(argument.length() - 13);
      }
      else if (argument.startsWith("-username=", false))
      {
        haveUsername = TRUE;
        username     = argument.right(argument.length() - 10);
      }
      else if (argument.startsWith("-passwd=", false))
      {
        havePasswd = TRUE;
        passwd     = argument.right(argument.length() - 8);
      }
      else if (argument.lower() == "-noauth")
      {
        haveUsername = TRUE;
        havePasswd   = TRUE;
      }
      else if (argument.lower() == "-print")
        print = true;
      else if (argument.lower() == "-close")
        close = true;
      else if (argument.startsWith("-printerName=", false))
        printerName = argument.right(argument.length() - 13);
      else if (argument.startsWith("-param=", false))
      {
        QString str = argument.right(argument.length() - 7);
        bool active = true;
        QString name;
        QString type;
        QString value;
        QVariant var;
        int sep = str.find('=');
        if(sep == -1)
          name = str;
        else
        {
          name = str.left(sep);
          value = str.right(str.length() - (sep + 1));
        }
        str = name;
        sep = str.find(':');
        if(sep != -1)
        {
          name = str.left(sep);
          type = str.right(str.length() - (sep + 1));
        }
        if(name.startsWith("-"))
        {
          name = name.right(name.length() - 1);
          active = false;
        }
        else if(name.startsWith("+"))
          name = name.right(name.length() - 1);
        if(!value.isEmpty())
          var = XVariant::decode(type, value);
        paramList[name] = ParamPair(active, var);
      }
      else if(!argument.startsWith("-"))
        filename = argument;
    }

    if ( (haveDatabaseURL) && (haveUsername) && (havePasswd) )
    {
      QSqlDatabase db;
      QString      protocol;
      QString      hostName;
      QString      dbName;
      QString      port;

      parseDatabaseURL(databaseURL, protocol, hostName, dbName, port);
      if("odbc" == protocol)
        db = QSqlDatabase::addDatabase("QODBC3");
      else
        db = QSqlDatabase::addDatabase("QPSQL7");
      if (!db.isValid())
      {
        QMessageBox::critical(0, QObject::tr("Can not load database driver"), QObject::tr("Unable to load the databse driver. Please contact your systems adminstrator."));
        QApplication::exit(-1);
      }

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
    params.append("name", _name);
    params.append("copyright", _copyright);
    params.append("version", _version);
    params.append("build", QString("%1 %2").arg(__DATE__).arg(__TIME__));

    if (haveUsername)
      params.append("username", username);

    if (haveDatabaseURL)
      params.append("databaseURL", databaseURL);

    login newdlg(0, "", TRUE);
    newdlg.set(params, 0);

    if (newdlg.exec() == QDialog::Rejected)
      return -1;
  }

  RenderWindow * mainwin = new RenderWindow();

  mainwin->_printerName = printerName;

  if(!filename.isEmpty())
    mainwin->fileOpen(filename);

  QMap<QString,ParamPair>::Iterator it;
  for ( it = paramList.begin(); it != paramList.end(); ++it ) {
    mainwin->updateParam(it.key(), it.data().second, it.data().first);
  }

  mainwin->show();
  app.setMainWidget(mainwin);

  if(print)
    mainwin->filePrint();

  if(close)
  {
    mainwin->fileExit();
    return 0;
  }

  return app.exec();
}

