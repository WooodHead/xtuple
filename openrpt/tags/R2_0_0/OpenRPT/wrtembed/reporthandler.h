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

/*
 *     A central class that acts as the central pivot to
 * the rest of the Report Writer controls. It contains the
 * menu and toolbar code/connections as well as the mouse
 * handling events.
 */

#ifndef __REPORTHANDLER_H__
#define __REPORTHANDLER_H__

#include <qobject.h>
#include <qstring.h>
#include <qdom.h>
#include <qpoint.h>
#include <q3ptrlist.h>
//Added by qt3to4:
#include <QMouseEvent>

class QWidget;
class QMouseEvent;
class Q3MainWindow;
class QMenuBar;
class QAction;
class Q3Canvas;
class Q3CanvasItem;

class ReportWindow;
class ReportCanvasView;
class ReportGridOptions;
class ReportWriterSectionData;

class ReportHandler : public QObject {
    Q_OBJECT
    public:
        ReportHandler(QObject * parent = 0, const char * name = 0);

        virtual ~ReportHandler();

        // methods called from the ReportCanvasView classes
        // reporting mouse events
        // I choose to have all the mouse handling in a central
        // location to allow for ease in coordination between
        // all the different components
        void sectionMousePressEvent(ReportCanvasView * v, QMouseEvent * e);
        void sectionMouseReleaseEvent(ReportCanvasView * v, QMouseEvent * e);
        void sectionMouseMoveEvent(ReportCanvasView * v, QMouseEvent * e);
        void sectionMouseDoubleClickEvent(ReportCanvasView * v, QMouseEvent * e);

        void docToolBars(Q3MainWindow * mw, Qt::ToolBarDock edge = Qt::DockTop, bool newLine = FALSE);
        QAction * populateMenuBar(QMenuBar * menubar, QAction * exitAction = 0);

        void setParentWindow(QWidget * w);

        bool placeMenusOnWindows() { return _placeMenusOnWindows; }
        void setPlaceMenusOnWindows(bool b) { _placeMenusOnWindows = b; }
        bool placeToolbarsOnWindows() { return _placeToolbarsOnWindows; }
        void setPlaceToolbarsOnWindows(bool b) { _placeToolbarsOnWindows = b; }
        bool allowDBConnect() { return _allowDBConnect; }
        void setAllowDBConnect(bool b) { _allowDBConnect = b; }
        bool noDatabase() { return _noDatabase; }
        void setNoDatabase(bool b) { _noDatabase = b; }

    public slots:
        ReportWindow* fileNew();
        void fileOpen();
        ReportWindow* fileOpen(const QDomDocument &);
        ReportWindow* fileOpen(const QDomDocument &, const QString &, int grade = -1);
        void fileSave();
        void fileSaveAs();
        void fileClose();

        void editDelete();
        void editCut();
        void editCopy();
        void editPaste();
        void editPaste(ReportWindow *, Q3Canvas *, const QPoint &);
        void editPreferences();

        void docTitle();
        void docPageSetup();
        void docQuerySourceList();
        void docSectionEditor();
        void docColorList();
        void docDefinedParams();

        void itemLabel();
        void itemField();
        void itemText();
        void itemLine();
        void itemBarcode();
        void itemImage();
        void itemGraph();

        void dbConnect();
        void dbLoadDoc();
        void dbSaveDoc();

        void sReportsChanged(int, bool);

    signals:
        void messageChanged(const QString & message);
        void messageCleared();
        void dbOpenClosed();
        void reportsChanged(int, bool);

    protected:
        ReportGridOptions * gridOptions;
        ReportWriterSectionData * sectionData;

        void clearSelectedEntity();
        void setSelectedEntity(ReportWindow *, Q3CanvasItem *);
        void addSelectedEntity(ReportWindow *, Q3CanvasItem *);
        void updateSelectedEntity();
        unsigned int selectionCount();
        Q3Canvas * selectionCanvas();
        ReportWindow * selectionReport();

        QWidget * _parentWindow;
        bool _parentWindowIsWorkspace;


    private:
        QAction * fileNewAction;
        QAction * fileOpenAction;
        QAction * fileSaveAction;
        QAction * fileSaveAsAction;
        QAction * fileCloseAction;
        QAction * fileExitAction;

        QAction * editCutAction;
        QAction * editCopyAction;
        QAction * editPasteAction;
        QAction * editDeleteAction;
        QAction * editPreferencesAction;

        QAction * gridShowAction;
        QAction * gridSnapAction;

        QAction * itemLabelAction;
        QAction * itemFieldAction;
        QAction * itemTextAction;
        QAction * itemLineAction;
        QAction * itemBarcodeAction;
        QAction * itemImageAction;
        QAction * itemGraphAction;

        QAction * dbConnectAction;
        QAction * dbLoadAction;
        QAction * dbSaveAction;

        ReportWindow * activeReportWindow();
        void addReportWindow(ReportWindow * rw);
        Q3PtrList<ReportWindow> rwList;

        bool _placeMenusOnWindows;
        bool _placeToolbarsOnWindows;
        bool _allowDBConnect;
        bool _noDatabase;

    private slots:
        void removeReportWindow(QObject * obj);
        void dbMenuAboutToShow();
};

#endif

