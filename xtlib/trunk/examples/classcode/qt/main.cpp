/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

/** \section ex_classcode Class Code Example
  
    The Class Code example is a simple application to retrieve a
    Class Code, edit it, and save the changes.

 */

#include <QSqlQuery>

#include <exceptions/xeDataNotFound.h>
#include <xtClassCode.h>
#include <xtAnyUtility.h>
#include <xtStorableQuery.h>

#include <iostream>

#include <QApplication>
#include <QMessageBox>
#include <QSqlDatabase>
#include <QSqlError>

#include "ClassCodeList.h"

using namespace std;

int main(int argc, char **argv)
{
  QApplication app(argc, argv);

    QString dbhost, dbport, dbuser, dbpass, dbname;

  for(int i = 1; i < app.arguments().size(); i++)
  {
    QString arg = app.arguments().at(i);
    if(arg.compare("-h") == 0)
      dbhost = app.arguments().at(++i);
    else if(arg.compare("-p") == 0)
      dbport = app.arguments().at(++i);
    else if(arg.compare("-U") == 0)
      dbuser = app.arguments().at(++i);
    else if(arg.compare("--password") == 0)
      dbpass = app.arguments().at(++i);
    else if(arg.compare("--help") == 0)
    {
      cout << app.arguments().at(0).toStdString() << " [--help] [-h <host>] [-p <port>] [-U <username>] [--password <password>] [dbname]" << endl;
      cout << endl;
      cout << "  --help                  This help page" << endl;
      cout << "  -h <host>               Host to connect to." << endl;
      cout << "  -p <port>               Port to connect to." << endl;
      cout << "  -U <username>           Username to connect as." << endl;
      cout << "  --password <password>   Username to connect as." << endl;
      cout << "  [dbname]                The database name to connect to." << endl;
      return 0;
    }
    else
      dbname = arg;
  }

  QSqlDatabase db = QSqlDatabase::addDatabase("QPSQL");
  if(!db.isValid())
  {
    cout << "Failed to instantiate Database object." << endl;
    return -1;
  }

  if(!dbhost.isEmpty())
    db.setHostName(dbhost);
  if(!dbport.isEmpty())
    db.setPort(dbport.toInt());
  if(!dbuser.isEmpty())
    db.setUserName(dbuser);
  if(!dbpass.isEmpty())
    db.setPassword(dbpass);
  if(!dbname.isEmpty())
    db.setDatabaseName(dbname);

  if(!db.open())
  {
    cout << "Failed to open Database object. " << db.lastError().text().toStdString() << endl;
    return -1;
  }

  try
  {
    ClassCodeList cclist;
    cclist.show();
    app.exec();
  }
  catch (std::exception & e)
  {
    QMessageBox::critical(0, "Error", QString("An unexpected exception was caught: %1\nterminating...").arg(QString::fromStdString(e.what())));
  }

  db.close();

  return 0;
}
