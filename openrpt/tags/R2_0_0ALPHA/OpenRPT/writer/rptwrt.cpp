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
#include <q3paintdevicemetrics.h>
#include <qwindowsstyle.h>
#include <qstylefactory.h>
#include <qsettings.h>

#include "reportwriterwindow.h"
#include "../wrtembed/data.h"

#ifdef Q_WS_WIN
#include <windows.h>
#endif

#ifdef Q_WS_MACX
#include <qmacstyle_mac.h>
#endif

#include <qsplashscreen.h>
//#include "../images/openrpt_qembed.h"

int main(int argc, char** argv) {
#ifdef Q_WS_WIN
    WSADATA wsaData;
    if(WSAStartup(MAKEWORD(1, 1), &wsaData)) {
        qDebug("Failed to initialize Window Sockets library.");
    }
#endif

    QApplication app(argc, argv);

    QSplashScreen * splash = new QSplashScreen(QPixmap(":/images/openrpt.png"));
    splash->show();

    _databaseURL = "";

    if (argc > 1) {

        for (int intCounter = 1; intCounter < argc; intCounter++) {
            QString argument(argv[intCounter]);

            if (argument.contains("-databaseURL=")) {
                _databaseURL    = argument.right(argument.length() - 13);
            }
        }
    }

    if (_databaseURL == "")
    {
        QSettings settings;
        settings.setPath("OpenMFG.com", "OpenRPT", QSettings::UserScope);
        _databaseURL = settings.readEntry("/OpenRPT/_databaseURL", "pgsql://127.0.0.1/mfg:5432");
    }

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

    ReportWriterWindow * rwf = new ReportWriterWindow();

    app.setMainWidget( rwf );
    rwf->show();

    app.connect( &app, SIGNAL(lastWindowClosed()), &app, SLOT(quit()) );
    qApp->processEvents();
    splash->finish(rwf);
    delete splash;
    int ret = app.exec();

#ifdef Q_WS_WIN
    WSACleanup();
#endif

    return ret;
}
