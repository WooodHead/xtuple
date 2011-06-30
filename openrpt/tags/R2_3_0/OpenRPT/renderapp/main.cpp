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
#include <QSqlDatabase>
#include <QMessageBox>

#include <dbtools.h>
#include <login.h>

#include <parameter.h>
#include <xvariant.h>

#include "data.h"

#include "renderwindow.h"

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
  // BVI::Sednacom
  // new options
  bool    pdfOutput = FALSE;
  QString pdfFileName;
  // BVI::Sednacom

  QString databaseURL = "";
  QString loadFromDB = "";

  QApplication app(argc, argv);
  app.addLibraryPath(".");

  _languages.addTranslationToDefault(":/common.qm");
  _languages.addTranslationToDefault(":/wrtembed.qm");
  _languages.addTranslationToDefault(":/renderer.qm");
  _languages.addTranslationToDefault(":/renderapp.qm");
  _languages.installSelected();

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
      // BVI::Sednacom
      // manage new arguments for CLI
      else if (argument.startsWith("-pdf", false)) {
        pdfOutput = true ;
      }
      else if (argument.startsWith("-outpdf=", false)) {
        pdfFileName = argument.right(argument.length() - 8 ) ;
      }
      // BVI::Sednacom
      else if (argument.startsWith("-loadfromdb=", false))
        loadFromDB = argument.right(argument.length() - 12);
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

      db = databaseFromURL( databaseURL );
      if (!db.isValid())
      {
        QMessageBox::critical(0, QObject::tr("Can not load database driver"), QObject::tr("Unable to load the database driver. Please contact your systems administrator."));
        QApplication::exit(-1);
      }

      db.setUserName(username);
      db.setPassword(passwd);

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
    params.append("name", RenderWindow::name());
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
  if(!loadFromDB.isEmpty())
    mainwin->fileLoad(loadFromDB);

  QMap<QString,ParamPair>::Iterator it;
  for ( it = paramList.begin(); it != paramList.end(); ++it ) {
    mainwin->updateParam(it.key(), it.data().second, it.data().first);
  }

  // BVI::Sednacom
  // do not display window for PDF output
  if (!pdfOutput)
    mainwin->show();
  // BVI::Sednacom
  app.setMainWidget(mainwin);

  if(print)
    mainwin->filePrint();

  // BVI::Sednacom
  // generate the PDF
  if (pdfOutput)
    mainwin->filePrintToPDF(pdfFileName);  
  // BVI::Sednacom

  if(close)
  {
    mainwin->fileExit();
    return 0;
  }

  return app.exec();
}

