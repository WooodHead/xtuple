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

#ifndef __REPORTSECTION_H__
#define __REPORTSECTION_H__

#include <q3canvas.h>
//Added by qt3to4:
#include <Q3PtrList>
#include <Q3Frame>
#include <QLabel>
#include <QVBoxLayout>
#include <QMouseEvent>

// forward declarations
class QLabel;
class QDomNode;
class QDomDocument;
class QDomElement;

class ReportWindow;
class ReportGridOptions;
class ReportPageOptions;
class ReportCanvasView;
class ReportCanvas;
class QVBoxLayout;


//
// Class ReportSection
//
//     This class is the base to all Report Section's visual representation.
// It contains the basic data and interface that all the sections need to work.
//
class ReportSection : public QWidget {
    Q_OBJECT
    public:
        ReportSection(ReportWindow * rptwin,  QWidget * parent, const char * name = 0);
        virtual ~ReportSection();

        void setTitle(const QString & s);

        void buildXML(QDomDocument & doc, QDomElement & section);
        void initFromXML(QDomNode & section);

    protected slots:
        void resizeBarDragged(int delta);

    protected:
        QLabel * title;
        ReportCanvas * canvas;
        ReportGridOptions * grid;
        ReportCanvasView * canvasview;
};

class ReportSectionDetail;
class ReportSectionDetailGroup : public QObject {
    Q_OBJECT
    public:
        ReportSectionDetailGroup(const QString &, ReportSectionDetail *, QWidget * parent, const char * name = 0);
        ~ReportSectionDetailGroup();

        enum PageBreak {
          BreakNone = 0,
          BreakAfterGroupFooter = 1
        };

        void setTitle(const QString & s);
        QString getTitle();
        void setColumn(const QString &);
        QString column();

        void showGroupHead(bool yes = TRUE);
        bool isGroupHeadShowing();
        void showGroupFoot(bool yes = TRUE);
        bool isGroupFootShowing();
        void setPageBreak(int);
        int  pageBreak() const;

        ReportSection * getGroupHead();
        ReportSection * getGroupFoot();

    protected:
        QString _name;
        QString _column;

        ReportSection * _head;
        ReportSection * _foot;

        ReportSectionDetail * _rsd;

        int _pagebreak;
};

class ReportSectionDetail : public QWidget {
    Q_OBJECT
    public:
        ReportSectionDetail(ReportWindow * rptwin, QWidget * parent, const char * name = 0);
        virtual ~ReportSectionDetail();

        enum PageBreak {
          BreakNone = 0,
          BreakAtEnd = 1
        };

        void setTitle(const QString & s);
        QString getTitle();
        void setQuery(const QString &);
        QString query();
        void setPageBreak(int);
        int pageBreak() const;

        ReportSection * getDetail();

        void buildXML(QDomDocument & doc, QDomElement & section);
        void initFromXML(QDomNode & node);

        ReportWindow * reportWindow();

        int groupSectionCount();
        ReportSectionDetailGroup * getSection(int i);
        void insertSection(int idx, ReportSectionDetailGroup * rsd);
        int findSection(const QString & name);
        void removeSection(int idx, bool del = FALSE);

        void adjustSize();

    protected:
        QString _query;

        QString _name;
        ReportSection * _detail;
        ReportWindow * _rw;
       
        Q3PtrList<ReportSectionDetailGroup> groupList;

        QVBoxLayout * vboxlayout;

        int _pagebreak;
};

class ReportResizeBar : public QFrame {
    Q_OBJECT
     public:
         ReportResizeBar(QWidget * parent = 0, Qt::WFlags f = 0);

     signals:
         void barDragged(int delta);

     protected:
         void mouseMoveEvent(QMouseEvent * e);
};

//
// Class ReportCanvas
//
//     Overrides the drawForeground() method to do the grid.
//
class ReportCanvas : public Q3Canvas {
    Q_OBJECT
    public:
        ReportCanvas(int w, int h);
        virtual ~ReportCanvas();

    public slots:
        void setGridOptions(ReportGridOptions * g);
        void setPageOptions(ReportPageOptions * rpo);

    protected:
        void drawForeground(QPainter & painter, const QRect & clip);

    private slots:
        void gridOptionsChanged();
        void pageOptionsChanged();

    private:
        ReportGridOptions * grid;
        ReportPageOptions * page;
};

//
// Class ReportCanvasView
//
//     Override QCanvasView to provide some of the functionality
// we need to do what we want.
//
class ReportCanvasView : public Q3CanvasView {
    Q_OBJECT
    public:
        ReportCanvasView(ReportWindow *, QWidget * parent = 0, const char * name = 0);
        ReportCanvasView(ReportWindow *, Q3Canvas * canvas, QWidget * parent = 0, const char * name = 0);
        virtual ~ReportCanvasView();

        ReportWindow * document();

    public slots:
        void resizeContents(int w, int h);

    protected:
        void contentsMouseMoveEvent(QMouseEvent * e);
        void contentsMousePressEvent(QMouseEvent * e);
        void contentsMouseReleaseEvent(QMouseEvent * e);
        void contentsMouseDoubleClickEvent(QMouseEvent * e);

    private:
        ReportWindow * _rw;
};

#endif

