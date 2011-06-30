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

#ifndef __REPORTWINDOW_H__
#define __REPORTWINDOW_H__

#include <qmainwindow.h>
#include <qptrvector.h>
#include <qstring.h>
#include <qcolor.h>
#include <qmap.h>

#include "reportsection.h"
#include "parsexmlutils.h"

//class ReportSection;
//class ReportSectionDetail;

class ReportGridOptions;
class ReportPageOptions;
class QuerySourceList;
class QVBox;
class QIODevice;
class QDomDocument;
class ReportHandler;

//
// Class ReportWindow
//
//     The ReportWindow is the Window used to display a document in
// the ReportWriterWindow MDI.
//
class ReportWindow : public QMainWindow {
    Q_OBJECT
    public:
        ReportWindow(ReportGridOptions * rgo, QWidget * parent, const char * name = 0);
        ~ReportWindow();

        QuerySourceList * qsList;
        QMap<QString, QColor> _colorMap;
        ReportPageOptions * pageOptions;
        ReportGridOptions * gridOptions;

        void sectionEditor();
        void colorList();
        void docInfoEditor();
        void docPageSetup();
        void querySourceList();


        ReportSection * getReportHead();
        void removeReportHead();
        void insertReportHead();

        ReportSection * getReportFoot();
        void removeReportFoot();
        void insertReportFoot();

        ReportSection * getPageHeadFirst();
        void removePageHeadFirst();
        void insertPageHeadFirst();

        ReportSection * getPageHeadOdd();
        void removePageHeadOdd();
        void insertPageHeadOdd();

        ReportSection * getPageHeadEven();
        void removePageHeadEven();
        void insertPageHeadEven();

        ReportSection * getPageHeadLast();
        void removePageHeadLast();
        void insertPageHeadLast();

        ReportSection * getPageHeadAny();
        void removePageHeadAny();
        void insertPageHeadAny();

        ReportSection * getPageFootFirst();
        void removePageFootFirst();
        void insertPageFootFirst();

        ReportSection * getPageFootOdd();
        void removePageFootOdd();
        void insertPageFootOdd();

        ReportSection * getPageFootEven();
        void removePageFootEven();
        void insertPageFootEven();

        ReportSection * getPageFootLast();
        void removePageFootLast();
        void insertPageFootLast();

        ReportSection * getPageFootAny();
        void removePageFootAny();
        void insertPageFootAny();

        int detailSectionCount();
        ReportSectionDetail * getSection(int i);
        void insertSection(int idx, ReportSectionDetail * rsd);
        int findSection(const QString & name);
        void removeSection(int idx, bool del = FALSE);

        void setReportTitle(const QString &);
        void setReportDescription(const QString &);
        void setReportName(const QString &);
        QString reportTitle();
        QString reportDescription();
        QString reportName();

        bool save();
        bool save(QIODevice * iod);
        bool saveAs();
        bool saveToDb();

        QDomDocument document();

        QWidget * vbox;
        QString filename;
        bool lastSaveToDb;
        QString dbRecordName;
        int dbRecordGrade;
        
        void addColorDef(QString, QColor);

        bool isModified();

        // Watermark Properties
        int     watermarkOpacity();
        void    setWatermarkOpacity(int);
        QFont   watermarkFont();
        void    setWatermarkFont(QFont);
        bool    watermarkUseDefaultFont();
        void    setWatermarkUseDefaultFont(bool);
        bool    watermarkUseStaticText();
        void    setWatermarkUseStaticText(bool);
        QString watermarkText();
        void    setWatermarkText(QString);
        QString watermarkColumn();
        void    setWatermarkColumn(QString);
        QString watermarkQuery();
        void    setWatermarkQuery(QString);

        // Background Properties
        bool    bgEnabled();
        void    setBgEnabled(bool);
        bool    bgStatic();
        void    setBgStatic(bool);
        QString bgImage();
        void    setBgImage(QString);
        QString bgQuery();
        void    setBgQuery(QString);
        QString bgColumn();
        void    setBgColumn(QString);
        QString bgResizeMode();
        void    setBgResizeMode(QString);
        int     bgAlign();
        void    setBgAlign(int);
        int     bgBoundsX();
        void    setBgBoundsX(int);
        int     bgBoundsY();
        void    setBgBoundsY(int);
        int     bgBoundsWidth();
        void    setBgBoundsWidth(int);
        int     bgBoundsHeight();
        void    setBgBoundsHeight(int);
        int     bgOpacity();
        void    setBgOpacity(int);

        void addDefinedParameter(const QString &, const ORParameter &);
        void editDefinedParameters();

        ReportHandler * handler() { return _handler; }
        ReportHandler * _handler;

    public slots:
        void setModified(bool = TRUE);
        virtual void setCaption();

    protected:
        virtual void closeEvent(QCloseEvent * e);

        QString _title;
        QString _name;
        QString _descr;

        QVBoxLayout * vboxlayout;

        ReportSection * rptHead;
        ReportSection * pageHeadFirst;
        ReportSection * pageHeadOdd;
        ReportSection * pageHeadEven;
        ReportSection * pageHeadLast;
        ReportSection * pageHeadAny;

        ReportSection * pageFootFirst;
        ReportSection * pageFootOdd;
        ReportSection * pageFootEven;
        ReportSection * pageFootLast;
        ReportSection * pageFootAny;
        ReportSection * rptFoot;

        QPtrList<ReportSectionDetail> detailList;
        QMap<QString,ORParameter> _definedParams;

        // Watermark variables
        bool    _wmUseStaticText;
        QString _wmText;
        QString _wmColumn;
        QString _wmQuery;
        bool    _wmUseDefaultFont;
        QFont   _wmFont;
        int     _wmOpacity;

        // background variables
        bool    _bgEnabled;
        bool    _bgStatic;
        QString _bgImage;
        QString _bgQuery;
        QString _bgColumn;
        QString _bgResizeMode;
        int     _bgAlign;
        int     _bgBoundsX;
        int     _bgBoundsY;
        int     _bgBoundsWidth;
        int     _bgBoundsHeight;
        int     _bgOpacity;

    private:
        bool _modified; // true if this document has been modified, false otherwise

};

#endif

