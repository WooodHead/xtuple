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

#ifndef __REPORTWRITERWINDOW_H__
#define __REPORTWRITERWINDOW_H_

#include <QMainWindow>
#include <QTimerEvent>
#include <QCloseEvent>

//
// Prototypes
//
class QWorkspace;
class QAction;
class ReportHandler;
class QMenu;

//
// Class: ReportWriterWindow
//
class ReportWriterWindow : public QMainWindow {
    Q_OBJECT
    public:
        ReportWriterWindow();
        ~ReportWriterWindow();

    public slots:
        virtual void setCaption();

    protected:
        virtual void closeEvent(QCloseEvent*);
        virtual void timerEvent(QTimerEvent*);

    private:
        QWorkspace * ws;
        int dbTimerId;

        QAction * fileExitAction;

        ReportHandler * handler;

        QMenu *windowMenu;

    private slots:
        void appExit();
        void sPrepareWindowMenu();
};

#endif

