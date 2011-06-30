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

#include "reportwriterwindow.h" // The Primary MDI window
#include "../wrtembed/reporthandler.h"       // The Report Window Child
#include "../wrtembed/data.h"

// common
#include <dbtools.h>
#include <xsqlquery.h>

// qt
#include <qsqldatabase.h>
#include <qworkspace.h>
#include <qmenubar.h>
#include <qvbox.h>
#include <qaction.h>
#include <qevent.h>
#include <qstatusbar.h>

// images
#include "../images/OpenReportsIcon.xpm" 

//
// ReportWriterWindow
//
ReportWriterWindow::ReportWriterWindow()
  : QMainWindow(0, tr("OpenMFG: Report Writer"), WDestructiveClose) {
    
    setIcon(QPixmap(OpenReportsIcon_xpm));

    // add the workspace
    QVBox * vbox = new QVBox(this);
    vbox->setFrameStyle(QFrame::StyledPanel | QFrame::Sunken);

    ws = new QWorkspace(vbox);
    ws->setScrollBarsEnabled(TRUE);

    setCentralWidget(vbox);

    // setup the menubar
    fileExitAction = new QAction(tr("Exit"),
                                 tr("E&xit"),ALT+Key_F4,this,"file exit");
    connect(fileExitAction, SIGNAL(activated()), this, SLOT(appExit()));

    handler = new ReportHandler(this, "report handler");

#ifdef NODBSUPPORT
    handler->setNoDatabase(true);
#endif

    menubar = new QMenuBar(this);
    int sepid = handler->populateMenuBar(menubar, fileExitAction);

    windowMenu = new QPopupMenu();
    windowMenu->setCheckable(TRUE);
    connect(windowMenu, SIGNAL(aboutToShow()), this, SLOT(sPrepareWindowMenu()));
    menubar->insertItem(tr("&Windows"), windowMenu, -1, menubar->indexOf(sepid));

    // setup the toolbar
    handler->docToolBars(this);

    statusbar = new QStatusBar(this);

    setCaption();

    dbTimerId = startTimer(60000);

    handler->setParentWindow(ws);

    connect(handler, SIGNAL(dbOpenClosed()), this, SLOT(setCaption()));
    connect(handler, SIGNAL(messageChanged(const QString &)),
            statusbar, SLOT(message(const QString &)));
    connect(handler, SIGNAL(messageCleared()),
            statusbar, SLOT(clear()));
    
}

//
// Perform any cleanup action that needs to take place
//
ReportWriterWindow::~ReportWriterWindow() {
     // everything should be handled by Qt
}


//
// slot implementations
//
void ReportWriterWindow::appExit() {
    close();
}


//
// event handler methods
//
void ReportWriterWindow::timerEvent(QTimerEvent * e) {
    if(e->timerId() == dbTimerId) {
        QSqlDatabase * db = QSqlDatabase::database(QSqlDatabase::defaultConnection,FALSE);
        if(db) {
            QSqlQuery qry("SELECT CURRENT_DATE;");
#if 0
            if(qry.first() == TRUE) {
                // Nothing to do.  We were just creating a little traffic
                qDebug("Keep alive succeeded");
            } else {
                // I really don't care
                qDebug("Keep alive failed");
            }
#endif
        }
    }
}

void ReportWriterWindow::closeEvent(QCloseEvent * e) {
    QWidgetList wl = ws->windowList();
    QWidget * w = 0;
    for(w = wl.first(); w; w = wl.next()) {
        if(!w->close()) return;
    }
    e->accept();
}

void ReportWriterWindow::setCaption() {
    QString caption = QString("%1 %2 %3")
                          .arg(_name)
                          .arg(tr("Version"))
                          .arg(_version);

    QSqlDatabase * db = QSqlDatabase::database(QSqlDatabase::defaultConnection, false);
    if(db) {
        XSqlQuery dbname( "SELECT metric_value, CURRENT_USER AS username "
                          "FROM metric "
                          "WHERE (metric_name='DatabaseName')" );

        if ((dbname.isActive()) && (dbname.size())) {
            QString protocol;
            QString server;
            QString database;
            QString port;

            dbname.next();

            parseDatabaseURL((const QString &)_databaseURL, protocol, server, database, port);

            caption = QString( tr("%1 - %2 on %3/%4 AS %5") )
                            .arg(caption)
                            .arg(dbname.value("metric_value").toString())
                            .arg(server)
                            .arg(database)
                            .arg(dbname.value("username").toString());
        }
    }

    QMainWindow::setCaption(caption);
}

void ReportWriterWindow::sPrepareWindowMenu()
{
  windowMenu->clear();

  int intCascadeid = windowMenu->insertItem(tr("&Cascade"), ws, SLOT(cascade()));
  int intTileid = windowMenu->insertItem(tr("&Tile"), ws, SLOT(tile()));

  windowMenu->insertSeparator();

  int cnt = 0;
  QWidgetList windows = ws->windowList();
  for (unsigned int intCursor = 0; intCursor < windows.count(); intCursor++)
  {
    if(windows.at(intCursor)->isVisible())
    {
      int intMenuid = windowMenu->insertItem(windows.at(intCursor)->caption(), windows.at(intCursor), SLOT(setFocus()));
      windowMenu->setItemChecked(intMenuid, (ws->activeWindow() == windows.at(intCursor)));
      cnt++;
    }
  }

  if (cnt < 1)
  {
    windowMenu->setItemEnabled(intCascadeid, FALSE);
    windowMenu->setItemEnabled(intTileid, FALSE);
  }
}

