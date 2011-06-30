/*
 * Copyright (c) 2002-2007 by OpenMFG, LLC
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

#include <stdlib.h>

#include <QCoreApplication>
#include <QString>
#include <QSqlDatabase>
#include <QFile>
#include <QSqlError>
#include <QTextStream>
#include <QSqlQuery>
#include <QVariant>
#include <QByteArray>
#include <dbtools.h>

int main(int argc, char *argv[])
{
  QCoreApplication application(argc, argv);
  application.addLibraryPath(".");

  if (application.argc() > 1)
  {
    QString databaseURL;
    QString username;
    QString passwd;
    QString arguments;

    for (int counter = 1; counter < application.argc(); counter++)
    {
      arguments = QString(application.argv()[counter]);

      if (arguments.startsWith("-databaseURL=", false))
        databaseURL = arguments.right(arguments.length() - 13);
      else if (arguments.startsWith("-username=", false))
        username = arguments.right(arguments.length() - 10);
      else if (arguments.startsWith("-passwd=", false))
        passwd = arguments.right(arguments.length() - 8);
    }

    if (  (databaseURL != "") && (username != "") ) {
      QSqlDatabase db;
      QString      protocol;
      QString      hostName;
      QString      dbName;
      QString      port;

// Open the Database Driver
      db = databaseFromURL(databaseURL);
      if (!db.isValid())
      {
        printf("Could not load the specified database driver.\n");
        exit(-1);
      }

//  Try to connect to the Database
      bool valport = FALSE;
      int iport = port.toInt(&valport);
      if(!valport) iport = 5432;
      db.setUserName(username);
      if(!passwd.isEmpty())
        db.setPassword(passwd);
      if (!db.open())
      {
        printf( "Host=%s, Database=%s, port=%s\n",
                (const char *)hostName,
                (const char *)dbName,
                (const char *)port );

        printf( "Could not log into database.  System Error: %s\n",
                (const char *)db.lastError().text() );
        exit(-1);
      }

      QSqlQuery().exec("SELECT login();");

      // first we need to determine if there is already a report in the database of the same
      // name and if so then we will perform an update instead of an insert
      QSqlQuery qry;
      qry.prepare("SELECT report_name, report_grade, report_source "
                  "  FROM report;");
      qry.exec();
      if(!qry.exec()) {
          QSqlError err = qry.lastError();
          printf("Error: %s\n\t%s\n", qPrintable( err.text() ),
                                    qPrintable( err.databaseText() ) );
          exit(-1);
      }
      QString fname;
      while(qry.next()) {
        fname = QString("%1-%2.xml").arg(qry.value(0).toString()).arg(qry.value(1).toString());
        fname.replace('/',"-");
        QFile file(fname);
        if(file.open(QIODevice::WriteOnly))
        {
          QTextStream stream( &file );
          stream << qry.value(2).toString();
          file.close();
        }
        else
          printf("Error: Could not open file %s: %s\n", fname.toLatin1().data(), file.errorString().toLatin1().data());
      }
    }
    else if (databaseURL == "")
      printf("You must specify a Database URL by using the -databaseURL= parameter.\n");
    else if (username == "")
      printf("You must specify a Database Username by using the -username= parameter.\n");
  }
  else
    printf( "Usage: exportrpt -databaseURL='$' -username='$' -passwd='$'\n");
  return 0;
}
