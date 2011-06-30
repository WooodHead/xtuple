/*
 * Copyright (c) 2002-2005 by OpenMFG, LLC
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

#include <qapplication.h>
#include <qstring.h>
#include <qregexp.h>
#include <qsqldatabase.h>

#include <qfile.h>

#include <qdom.h>

#include <dbtools.h>

int main(int argc, char *argv[])
{
  if (argc > 1)
  {
    QApplication application(argc, argv, FALSE);

    QString databaseURL;
    QString username;
    QString passwd;
    QString arguments;

    QString xml_file = QString::null;
    int     report_grade = 0;

    for (int counter = 1; counter < argc; counter++)
    {
      arguments = argv[counter];

      if (arguments.contains("-databaseURL="))
        databaseURL = arguments.right(arguments.length() - 13);
      else if (arguments.contains("-username="))
        username = arguments.right(arguments.length() - 10);
      else if (arguments.contains("-passwd="))
        passwd = arguments.right(arguments.length() - 8);
      else if (arguments.contains("-f="))
        xml_file = arguments.right(arguments.length() - 3);
      else if (arguments.contains("-grade="))
        report_grade = (arguments.right(arguments.length() - 7)).toInt();
    }

    QString report_name = QString::null;
    QString report_desc = QString::null;
    QString report_src  = QString::null;

    if(xml_file != "") {
        QFile file(xml_file);
        if(file.open( IO_ReadOnly )) {
            QDomDocument doc;
            QString errMsg;
            int errLine, errCol;
            if(doc.setContent(&file, &errMsg, &errLine, &errCol)) {
                QDomElement root = doc.documentElement();
                if(root.tagName() == "report") {
                    for(QDomNode n = root.firstChild();
                            !n.isNull(); n = n.nextSibling() ) {
                        if(n.nodeName() == "name") {
                            report_name = n.firstChild().nodeValue();
                        } else if(n.nodeName() == "description") {
                            report_desc = n.firstChild().nodeValue();
                        }
                    }
                    report_src  = doc.toString();

                    if(report_name == "") {
                        printf("The document %s does not have a report name defined\n", (const char*)xml_file);
                    }
                } else {
                    printf("XML Document %s does not have root node of report\n",(const char*)xml_file);
                }
            } else {
                printf("Error parsing file %s: %s on line %d column %d\n",
                    (const char*)xml_file, (const char*)errMsg, errLine, errCol);
            }
        } else {
            printf("Could not open the specified file: %s\n", (const char*)xml_file);
        }
    } else {
        printf("You must specify an XML file to load by using the -f= parameter.\n");
    }

    if(report_name == "" || report_src == "") {
        // an error message already should have been displayed to the user
        exit(-1);
    }

    if (  (databaseURL != "") &&
          (username != "")    &&
          (passwd != "")          ) {
      QSqlDatabase *db;
      QString      hostName;
      QString      dbName;
      QString      port;

// Open the Database Driver
      db = QSqlDatabase::addDatabase("QPSQL7");
      if (!db)
      {
        printf("Could not load the specified database driver.\n");
        exit(-1);
      }

//  Try to connect to the Database
      parseDatabaseURL(databaseURL, hostName, dbName, port);
      bool valport = FALSE;
      int iport = port.toInt(&valport);
      if(!valport) iport = 5432;
      db->setDatabaseName(dbName);
      db->setPort(iport);
      db->setUserName(username);
      db->setPassword(passwd);
      db->setHostName(hostName);
      if (!db->open())
      {
        printf( "Host=%s, Database=%s, port=%s\n",
                (const char *)hostName,
                (const char *)dbName,
                (const char *)port );

        printf( "Could not log into database.  System Error: %s\n",
                (const char *)db->lastError().driverText() );
        exit(-1);
      }

      QSqlQuery().exec("SELECT login();");

      // first we need to determine if there is already a report in the database of the same
      // name and if so then we will perform an update instead of an insert
      QSqlQuery qry;
      qry.prepare("SELECT report_id "
                  "  FROM report "
                  " WHERE ((report_name=:report_name) "
                  "   AND (report_grade=:report_grade));");
      qry.bindValue(":report_name", report_name);
      qry.bindValue(":report_grade", report_grade);
      qry.exec();
      QSqlQuery query;
      if(qry.first()) {
          // update
          query.prepare("UPDATE report "
                        "   SET report_descrip=:report_desc, "
                        "       report_source =:report_src "
                        " WHERE ((report_id=:report_id) "
                        "   AND (report_name=:report_name));");
          query.bindValue(":report_id", qry.value(0));
      } else {
          // insert
          query.prepare("INSERT INTO report "
                        "       (report_name, report_descrip, report_source, report_grade) "
                        "VALUES (:report_name, :report_desc, :report_src, :report_grade);");
      }
      query.bindValue(":report_name", report_name);
      query.bindValue(":report_desc", report_desc);
      query.bindValue(":report_src", report_src);
      query.bindValue(":report_grade", report_grade);

      if(!query.exec()) {
          QSqlError err = query.lastError();
          printf("Error: %s\n\t%s\n", (const char*)err.driverText(),
                                    (const char*)err.databaseText());
          exit(-1);
      }
      
    }
    else if (databaseURL == "")
      printf("You must specify a Database URL by using the -databaseURL= parameter.\n");
    else if (username == "")
      printf("You must specify a Database Username by using the -username= parameter.\n");
    else if (passwd == "")
      printf("You must specify a Database Password by using the -passwd= parameter.\n");
  }
  else
    printf( "Usage: import -databaseURL='$' -username='$' -passwd='$' -grade=# -f='$'\n");
  return 0;
}
