// Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.

/** \section ex_classcode Class Code Example
  
    The Class Code example is a simple application to retrieve a
    Class Code, edit it, and save the changes.

 */

#include <exceptions/xeDataNotFound.h>
#include <xtDatabase.h>
#include <xtClassCode.h>
#include <xtAnyUtility.h>
#include <xtStorableQuery.h>

#include <boost/lexical_cast.hpp>
#include <boost/regex.hpp>

#include <iostream>

#include <QApplication>
#include <QMessageBox>

#include "ClassCodeList.h"

using namespace std;

int main(int argc, char **argv)
{
  QApplication app(argc, argv);

  string dbhost, dbport, dbuser, dbpass, dbname;

  for(int i = 1; i < argc; i++)
  {
    if(strcmp("-h", argv[i]) == 0)
      dbhost = argv[++i];
    else if(strcmp("-p", argv[i]) == 0)
      dbport = argv[++i];
    else if(strcmp("-U", argv[i]) == 0)
      dbuser = argv[++i];
    else if(strcmp("--password", argv[i]) == 0)
      dbpass = argv[++i];
    else if(strcmp("--help", argv[i]) == 0)
    {
      cout << argv[0] << " [--help] [-h <host>] [-p <port>] [-U <username>] [--password <password>] [dbname]" << endl;
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
      dbname = argv[i];
  }

  string connectOptions;
  if(!dbhost.empty())
    connectOptions += " host="+dbhost;
  if(!dbport.empty())
    connectOptions += " port="+dbport;
  if(!dbuser.empty())
    connectOptions += " user="+dbuser;
  if(!dbpass.empty())
    connectOptions += " password="+dbpass;
  if(!dbname.empty())
    connectOptions += " dbname="+dbname;

  xtDatabase * db = xtDatabase::getInstance();
  if(!db)
  {
    QMessageBox::critical(0, "Error", "Failed to instantiate xtDatabase object.");
    return -1;
  }

  try
  {
    db->open(connectOptions);

    ClassCodeList cclist;
    cclist.show();
    app.exec();
  }
  catch (std::exception & e)
  {
    QMessageBox::critical(0, "Error", QString("An unexpected exception was caught: %1\nterminating...").arg(QString::fromStdString(e.what())));
  }

  db->close();

  return 0;
}
