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

#include <qapplication.h>
#include <qsqldatabase.h>
#include <qsqlerror.h>

#include "graph.h"
#include "graphwindow.h"

#ifdef Q_WS_WIN
#include <windows.h>
#endif

int main(int argc, char* argv[]) {
#ifdef XQ_WS_WIN
    WSADATA wsaData;
    if(WSAStartup(MAKEWORD(1, 1), &wsaData)) {
        qDebug("Error starting up Windows Socket system... libpq will not work.");
    }
#endif

    QApplication app(argc, argv);

    bool haveDB = FALSE;

    QSqlDatabase db = QSqlDatabase::addDatabase("QPSQL7");
    if(db.isValid()) {
        db.setDatabaseName("mfg");
        db.setUserName("cryan");
        db.setPassword("password");
        db.setHostName("192.168.2.100");
        if(db.open()) {
            haveDB = TRUE;
        } else {
            QSqlError err = db.lastError();
            qDebug("Driver:   %s", (const char*)err.driverText());
            qDebug("Database: %s", (const char*)err.databaseText());
            qDebug("Could not make connection to database: sql query will be disabled");
        }
    } else {
        qDebug("Could not load the database driver: sql query will be disabled");
    }

    GraphWindow * gw = new GraphWindow();
    gw->init(haveDB);

    app.setMainWidget(gw);
    gw->show();

    int ret = app.exec();

#ifdef XQ_WS_WIN
    WSACleanup();
#endif

    return ret;
}

