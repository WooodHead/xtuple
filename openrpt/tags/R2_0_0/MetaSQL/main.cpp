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

#include <qapplication.h>
#include <qwindowsstyle.h>
#include <qtranslator.h>
#include <qsqldatabase.h>
#include <qmessagebox.h>
#include <qstylefactory.h>

#ifdef Q_WS_MACX
#include <qmacstyle_mac.h>
#endif

#include <xsqlquery.h>
#include <dbtools.h>
#include <login.h>

#include <parameter.h>

#include "data.h"

#include "mqledit.h"

int main(int argc, char *argv[])
{
  QString username  = "";
  bool    haveUsername    = FALSE;
  bool    haveDatabaseURL = FALSE;
  _loggedIn        = FALSE;

  _databaseURL = "";

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
        _databaseURL    = argument.right(argument.length() - 13);
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

      parseDatabaseURL(_databaseURL, protocol, hostName, dbName, port);
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

  MQLEdit * mainwin = new MQLEdit();
  mainwin->show();

  app.setMainWidget(mainwin);
  return app.exec();
}
