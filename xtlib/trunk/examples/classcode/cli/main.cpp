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

#include <QCoreApplication>
#include <QString>
#include <QStringList>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlError>
#include <QVariant>

#include <exceptions/xeDataNotFound.h>
#include <xtClassCode.h>
#include <xtAnyUtility.h>
#include <xtStorableQuery.h>

#include <iostream>

using namespace std;

int main(int argc, char **argv)
{
  QCoreApplication app(argc, argv);

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

  cout << endl;
  cout << "Welcome to the xTuple Domain Command Line Interface (CLI) Example" << endl;
  cout << endl;
  cout << "This example will allow you to connect a  database and show a list" << endl;
  cout << "of Class Codes in that database and allow you to view/edit/save" << endl;
  cout << "the results." << endl;
  cout << endl;

  if(!db.open())
  {
    cout << "Failed to open Database object. " << db.lastError().text().toStdString() << endl;
    return -1;
  }

  try
  {
    xtClassCode * cc = 0;
    string input = "m";

    do
    {
      if(input == "m")
      {
        cout << endl;
        cout << "Menu:" << endl;
        cout << " m   Show Menu" << endl;
        cout << " l   List All Class Codes" << endl;
        cout << " f   Find Class Codes" << endl;
        cout << " e   Edit Class Code (by id)" << endl;
        cout << " k   Lock the record" << endl;
        cout << " v   View current Class Code" << endl;
        cout << " c   Change property" << endl;
        cout << " s   Save Current Class Code" << endl;
        cout << " u   Unlock the record" << endl;
        cout << " n   New Class Code" << endl;
        cout << " x   Exit" << endl;
      }
      else if(input == "l" || input == "f")
      {
        try
        {
          string expn, exval, isregex;
          if(input == "f")
          {
            cout << "Search which property? ";
            getline(cin, expn);
            cout << "Do you want to use a Regular Expression? [n] ";
            getline(cin, isregex);
            cout << "Value to search for? ";
            getline(cin, exval);
          }
          xtClassCode ex;
          if(isregex == "y" || isregex == "Y")
            ex.setProperty(expn, QRegExp(QString::fromStdString(exval)));
          else
            ex.setProperty(expn, QString::fromStdString(exval));
          xtStorableQuery<xtClassCode> sq(&ex);
          sq.exec();
          set<xtClassCode*> codes = sq.result();
          if(codes.empty())
            cout << "No Class Codes found." << endl;
          else
          {
            for(set<xtClassCode*>::const_iterator ci = codes.begin(); ci != codes.end(); ci++)
              cout << (*ci)->getId() << "\t" << xtAnyUtility::toString((*ci)->getCode()) << endl;
          }
        }
        catch (exception & e)
        {
          cout << "Error while finding records: " << e.what() << endl;
        }
      }
      else if(input == "e")
      {
        cout << "Enter ID: ";
        getline(cin, input);
        if(cc)
        {
          delete cc;
          cc = 0;
        }
        try
        {
          int id = QString::fromStdString(input).toInt();
          cc = new xtClassCode();
          cc->load(id);
          if(!cc->isValid())
            cout << "No item with the specified id " << id << " could be found." << endl;
        }
        catch (xeDataNotFound &e)
        {
          cout << "Error loading data: " << e.what() << endl;
        }
      }
      else if(input == "v")
      {
        if(cc)
        {
          set<string> plist = cc->getPropertyNames(xtlib::ValueRole);
          for(set<string>::const_iterator it = plist.begin(); it != plist.end(); it++)
            cout << *it << " = " << xtAnyUtility::toString(cc->getProperty(*it)) << endl;
        }
        else
          cout << "No Object loaded." << endl;
      }
      else if(input == "c")
      {
        if(cc)
        {
          string propName, strValue;
          cout << "Property Name to change: ";
          getline(cin, propName);
          cout << "New value: ";
          getline(cin, strValue);
          cc->setProperty(propName, QString::fromStdString(strValue));
        }
        else
          cout << "No Object loaded." << endl;
      }
      else if(input == "s")
      {
        if(cc)
          cc->save();
        else
          cout << "No Object loaded." << endl;
      }
      else if(input == "n")
      {
        if(cc)
        {
          delete cc;
          cc = 0;
        }
        cc = new xtClassCode();
        cout << "New Class Code created." << endl;
      }
      else if(input == "k")
      {
        if(cc)
          cc->lock();
      }
      else if(input == "u")
      {
        if(cc)
          cc->unlock();
      }
      else
        cout << "Unknown command " << input << "." << endl;

      cout << endl;
      cout << "Command: ";
      getline(cin, input);
    } while(input != "x");
  }
  catch (std::exception & e)
  {
    cout << "An unexpected exception was caught: " << e.what() << endl;
    cout << "    terminating..." << endl;
  }

  db.close();

  return 0;
}
