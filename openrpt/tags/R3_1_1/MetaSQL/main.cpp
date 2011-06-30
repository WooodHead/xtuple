/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2008 by OpenMFG, LLC
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

#include <QApplication>
#include <QTranslator>
#include <QSqlDatabase>
#include <QMessageBox>

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

	  QSqlDatabase db = databaseFromURL(_databaseURL);
      if (!db.isValid())
      {
        QMessageBox::critical(0, QObject::tr("Can not load database driver"),
          QObject::tr("Unable to load the database driver. Please contact your systems administrator."));
        QApplication::exit(-1);
      }

      db.setUserName(username);
      db.setPassword(passwd);

      if (!db.open())
      {
        QMessageBox::critical(0, QObject::tr("Unable to connect to database"),
          QObject::tr("Unable to connect to the database with the given information."));
        QApplication::exit(-1);
      }
      else
        _loggedIn = TRUE;
    }

  }

  _languages.addTranslationToDefault(":/common.qm");
  _languages.addTranslationToDefault(":/metasql.qm");
  _languages.installSelected();

  MQLEdit mainwin;
  mainwin.show();

  return app.exec();
}
