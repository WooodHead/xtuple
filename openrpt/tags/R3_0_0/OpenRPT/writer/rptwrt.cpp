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
#include <QWindowsStyle>
#include <QStyleFactory>
#include <QSettings>
#include <xsqlquery.h>

#include "reportwriterwindow.h"
#include "../wrtembed/data.h"

#ifdef Q_WS_WIN
#include <windows.h>
#endif

#ifdef Q_WS_MACX
#include <qmacstyle_mac.h>
#endif

#include <QSplashScreen>
//#include "../images/openrpt_qembed.h"

int main(int argc, char** argv) {
#ifdef XQ_WS_WIN
    WSADATA wsaData;
    if(WSAStartup(MAKEWORD(1, 1), &wsaData)) {
        qDebug("Failed to initialize Window Sockets library.");
    }
#endif

    QApplication app(argc, argv);

    QSplashScreen * splash = new QSplashScreen(QPixmap(":/images/openrpt.png"));
    splash->show();

    _databaseURL = "";
    QStringList xml_files;

    if (argc > 1)
    {
      for (int intCounter = 1; intCounter < argc; intCounter++)
      {
        QString argument(argv[intCounter]);

        if (argument.startsWith("-databaseURL=", Qt::CaseInsensitive))
          _databaseURL = argument.right(argument.length() - 13);
        else if(argument.startsWith("-f=", Qt::CaseInsensitive))
          xml_files.append(argument.right(argument.length() - 3));
        else if (argument.toLower() == "-e")
          XSqlQuery::setNameErrorValue("Missing");
        else if(!argument.startsWith("-"))
          xml_files.append(argument);
      }
    }

    if (_databaseURL == "")
    {
        QSettings settings(QSettings::UserScope, "OpenMFG.com", "OpenRPT");
        _databaseURL = settings.value("/OpenRPT/_databaseURL", "pgsql://127.0.0.1/mfg:5432").toString();
    }

    app.addLibraryPath(".");

    _languages.addTranslationToDefault(":/common.qm");
    _languages.addTranslationToDefault(":/wrtembed.qm");
    _languages.addTranslationToDefault(":/renderer.qm");
    _languages.addTranslationToDefault(":/writer.qm");
    _languages.installSelected();

    ReportWriterWindow rwf;

    for(int i = 0; i < xml_files.size(); i++)
      rwf.openReportFile(xml_files.at(i));

    rwf.show();

    app.connect( &app, SIGNAL(lastWindowClosed()), &app, SLOT(quit()) );
    qApp->processEvents();
    splash->finish(&rwf);
    delete splash;
    int ret = app.exec();

#ifdef XQ_WS_WIN
    WSACleanup();
#endif

    return ret;
}
