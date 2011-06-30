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

#include "openreports.h"
#include "barcodes.h"
#include "graph.h"

// global common
#include <xsqlquery.h>
#include <quuencode.h>
#include <parameter.h>

// MetaSQL
#include "../../../MetaSQL/metasql.h"

// report common
#include <parsexmlutils.h>
#include <builtinformatfunctions.h>
#include <pagesizeinfo.h>
#include <labelsizeinfo.h>

//qt
#include <qapplication.h>
#include <qpaintdevicemetrics.h>
#include <qregexp.h>
#include <qcursor.h>
#include <qptrlist.h>
#include <qimage.h>
#include <qpixmap.h>
#include <qwmatrix.h>
#include <qfontmetrics.h>
#include <qfontdatabase.h>
#include <qmap.h>
#include <qcolor.h>
#include <qinputdialog.h>
#include <qmessagebox.h>
#include <qsqldatabase.h>

//standard
#include <math.h>

/*
 * Some debug related stuff
 */
//#define DEBUG_RENDERER
#ifdef DEBUG_RENDERER
#include <stdio.h>
#include <qfile.h>
#include <stdarg.h>

// to avoid file contention we will just
// keep a single global copy of the file
// we write to for our log

#endif

void logMessage(const char * msg, ...) {
#ifdef DEBUG_RENDERER
#define MSG_BUFFER_LENGTH 1024
    static QFile * rptLogFile = 0;

    if(rptLogFile == 0) {
        rptLogFile = new QFile("rptRenderer.log");
        if(rptLogFile != 0) {
            if(!rptLogFile->open(IO_WriteOnly | IO_Append)) {
                delete rptLogFile;
                rptLogFile = 0;
                qDebug("Failed to open log file... using qDebug");
            }
        }
    }

    va_list ap;
    va_start( ap, msg );
    char buf[MSG_BUFFER_LENGTH];
    vsprintf(buf, msg, ap);
    va_end(ap);

    if(rptLogFile != 0) {
        rptLogFile->writeBlock(buf, qstrlen(buf));
        rptLogFile->writeBlock("\n", 1);
    } else {
        qDebug(buf);
    }
#else
    // prevent warnings of unused parameters
    msg = msg;
#endif
}


//
// Private class definitions
// These classes are convienience classes just used here
// so there is no need to expose them to the outside
//
//  Query Class
class orQuery {
    private:
        QString         qstrName;

        QString         qstrQuery;
        XSqlQuery      *qryQuery;

        QSqlDatabase   *_database;

    public:
        orQuery();
        orQuery(const QString &, const QString &, ParameterList, bool doexec, QSqlDatabase * pDb = 0);

        virtual ~orQuery();

        inline bool queryExecuted() const { return (qryQuery != 0); }
        bool execute();

        inline XSqlQuery *getQuery() { return qryQuery; }
        inline const QString &getSql() const { return qstrQuery; }
        inline const QString &getName() const { return qstrName; }

        QStringList     missingParamList;
};

// Data class
class orData {
    private:
        orQuery *qryThis;
        QString qstrField;
        QString qstrValue;
        bool    _valid;

    public:
        orData();

        void  setQuery(orQuery *qryPassed);
        void  setField(const QString &qstrPPassed);

        inline bool  isValid() const { return _valid; }

        const QString &getValue();
};


//
// Class orQuery implementations
//
orQuery::orQuery()
{
  qryQuery = 0;
  _database = 0;
}

orQuery::orQuery( const QString &qstrPName, const QString &qstrSQL,
                  ParameterList qstrlstParams, bool doexec, QSqlDatabase * pDb )
{
    QString qstrParsedSQL(qstrSQL);
    QString qstrParam;
    int     intParamNum;
    int     intStartIndex = 0;

    qryQuery = 0;
    _database = pDb;

    //  Initialize some privates
    qstrName  = qstrPName;

    QRegExp rexp("<\\?.*\\?>");
    if(rexp.search(qstrParsedSQL) == -1) {
        // Parse through the passed SQL populating the parameters
        QRegExp re("(?:%(\\d+))|(?:\\$\"([^\"]*)\")");
        while ((intStartIndex = re.search(qstrParsedSQL,intStartIndex)) != -1)
        {
            QString val = " ";

            QString match = re.cap(0);
            if(match[0] == '$') {
                QString n = re.cap(2).lower();
                val = qstrlstParams.value(n).toString();
                if(val.isNull()) {
                    // add this to the list of missing parameters
                    if(!missingParamList.contains(n)) missingParamList.append(n);
                }
            } else if(match[0] == '%') {
                //  Grab the parameter number
                intParamNum = re.cap(1).toInt();

                //  Replace the parameter hold with the specified paramemter
                //  Verify the parameter index
                if (intParamNum <= (int)qstrlstParams.count()) {
                    val = qstrlstParams.value(intParamNum - 1).toString();
                } else {
                    // add this to the list of missing parameters
                    QString s = QString("%%1").arg(intParamNum);
                    if(!missingParamList.contains(s)) missingParamList.append(s);
                }
            } else {
                // ?!?!? How did we get here.
                qDebug("Match did not start with $ or %%...");
            }

            QString qstrWork = qstrParsedSQL.left(intStartIndex)
                             + val
                             + qstrParsedSQL.right(qstrParsedSQL.length() - intStartIndex - re.matchedLength());
            intStartIndex += val.length();
            qstrParsedSQL = qstrWork;
        }

        qstrQuery = qstrParsedSQL;

        if(doexec) {
            execute();
        }
    } else {
        qstrQuery = qstrParsedSQL;
        MetaSQLQuery mql(qstrParsedSQL);
        qryQuery = new XSqlQuery(mql.toQuery(qstrlstParams, _database));
        qryQuery->first();
    }
}

orQuery::~orQuery()
{
  if(qryQuery != 0)
  {
    delete qryQuery;
    qryQuery = 0;
  }
}

bool orQuery::execute()
{
  if(qryQuery == 0)
  {
    qryQuery  = new XSqlQuery(qstrQuery, _database);
    return qryQuery->first();
  }
  return false;
}

//
// Class orData
//
orData::orData() {
    _valid = false;
    qryThis = 0;
}

void orData::setQuery(orQuery *qryPassed) {
    qryThis = qryPassed;

    if (qstrField.length()) {
        _valid = true;
    }
}

void orData::setField(const QString &qstrPPassed) {
    qstrField = qstrPPassed;

    if (qryThis != 0) {
       _valid = true;
    }
}

const QString &orData::getValue() {
    if (_valid) {
        qstrValue = qryThis->getQuery()->value(qstrField).toString();
    }

    return qstrValue;
}


//
// Class orReportPrivate
//
class orReportPrivate {
    public:
        orReportPrivate();
        ~orReportPrivate();

        QString _reportName;
        int     _reportGrade;

        bool _valid;
        bool _reportExists;
        QDomDocument _docReport;
        ParameterList _lstParameters;

        QSqlDatabase * _database;

        ORReportData * _reportData;

        int _yOffset;      // how far down the current page are we
        int _topMargin;    // value stored in the correct units
        int _bottomMargin; // -- same as above --
        int _leftMargin;   // -- same as above --
        int _rightMargin;  // -- same as above --
        int _maxHeight;    // -- same as above --
        int _maxWidth;     // -- asme as above --
        int _pageCounter;  // what page are we currently on?

        QPtrList<orQuery> _lstQueries;
        QMap<QString, QColor> _colorMap;

        // data for the watermark feature
        bool    _wmStatic;   // is this watermark static text or is the data
                             // pulled from a query source
        QString _wmText;     // the text that is to be rendered as a watermark
        ORDataData _wmData;  // the dynamic source for the watermark text
        QFont   _wmFont;     // the font to use when rendering the _wmText value
                             // on the background of the page. For purposes of
                             // fit, pointSize() of font is ignored and the largest
                             // point size is used that will still allow the entire
                             // text to fit on the page.
        unsigned char _wmOpacity; // a value from 0..255
                                  // with 0   being not visible (white)
                                  // and  255 being fully opaque (black)

        bool    _bgStatic;   // is this image static or pulled from a datasource
        QImage  _bgImage;    // the image that is to be rendered as a background
        ORDataData _bgData;  // the dynamic source for the background image
        QRect   _bgRect;     // area of the page that we print background to
        unsigned char _bgOpacity; // a value from 0..255 : see _wmOpacity
        int     _bgAlign;    // Alignment of background within _bgRect
        bool    _bgScale;    // scale image to fit in _bgRect?
        QImage::ScaleMode _bgScaleMode; // how do we scale the image?

        QImage _cachedBgWmImage;
        bool   _cachedBgWm;

        bool populateData(const ORDataData &, orData &);
        orQuery *getQuerySource(const QString &);

        void createNewPage(QPainter *, QPrinter *);
        int  finishCurPage(QPainter * = 0, QPrinter * = 0, bool = false);

        void renderBackgroundAndWatermark(QPainter *, QPrinter *);
        void renderBackground(QImage &);
        void renderWatermark(QImage &);

        void renderDetailSection(ORDetailSectionData &, QPainter * = 0, QPrinter * = 0);
        int  renderSection(const ORSectionData &, QPainter * = 0, QPrinter * = 0);

        // variables used to determine the context of subTotal checkpoints
        QMap<ORDataData,double> _subtotPageCheckPoints;
        QMap<ORDataData,double> * _subtotContextMap;
        ORDetailSectionData * _subtotContextDetail;
        bool _subtotContextPageFooter;

        double getNearestSubTotalCheckPoint(const ORDataData & d);
};

orReportPrivate::orReportPrivate() {
    _lstQueries.setAutoDelete(true);

    _reportGrade = -1;

    _database = 0;

    _valid = false;
    _reportExists = false;
    _reportData = 0;
    _yOffset = 0;
    _topMargin = _bottomMargin = 0;
    _leftMargin = _rightMargin = 0;
    _maxHeight = _maxWidth = 0;
    _pageCounter = 0;

    QFont::insertSubstitution("Helvetic","Arial");
    _wmStatic = true;
    _wmText = QString::null;
    _wmData.query = QString::null;
    _wmData.column = QString::null;
    _wmFont = QFont("Helvetic");
    _wmOpacity = 25;

    _bgStatic = true;
    _bgImage = QImage();
    _bgData.query = QString::null;
    _bgData.column = QString::null;
    _bgOpacity = 25;
    _bgAlign = Qt::AlignLeft | Qt::AlignTop;
    _bgScale = false;
    _bgScaleMode = QImage::ScaleFree;

    _cachedBgWmImage = QImage();
    _cachedBgWm = false;

    _subtotContextMap = 0;
    _subtotContextDetail = 0;
    _subtotContextPageFooter = false;
}

orReportPrivate::~orReportPrivate() {
    if(_reportData != 0) {
        delete _reportData;
        _reportData = 0;
    }

    _lstQueries.clear();
}

//
// this takes in the ORDataData structure and populates the orData class
// with the proper values needed to query the database.
//
bool orReportPrivate::populateData(const ORDataData & dataSource, orData &dataTarget)
{
    for (unsigned int queryCursor = 0;
           queryCursor < _lstQueries.count(); queryCursor++) {
        if (_lstQueries.at(queryCursor)->getName() == dataSource.query) {
            dataTarget.setQuery(_lstQueries.at(queryCursor));
            dataTarget.setField(dataSource.column);
            return true;
        }
    }

    return false;
}

orQuery *orReportPrivate::getQuerySource(const QString & qstrQueryName)
{
    for (unsigned int queryCursor = 0; queryCursor < _lstQueries.count(); queryCursor++) {
        if (_lstQueries.at(queryCursor)->getName() == qstrQueryName)
            return _lstQueries.at(queryCursor);
    }
    return 0;
}

void orReportPrivate::createNewPage(QPainter * pPainter, QPrinter * pPrinter)
{
    if(_pageCounter > 0) {
        finishCurPage(pPainter, pPrinter);
        if (pPrinter != 0)
            pPrinter->newPage();
    }

    // get the checkpoints for the page footers
    for(QMapIterator<ORDataData,double> it = _subtotPageCheckPoints.begin(); 
        it != _subtotPageCheckPoints.end(); ++it) {
        double d = 0.0;
        ORDataData data = it.key();
        XSqlQuery * xqry = getQuerySource(data.query)->getQuery();
        if(xqry) d = xqry->getFieldTotal(data.column);
        (*it) = d;
    }

    renderBackgroundAndWatermark(pPainter, pPrinter);

    bool lastPage = false;


    _pageCounter++;

    _yOffset = _topMargin;

    if(_pageCounter == 1 && _reportData->pghead_first != 0)
        renderSection(*(_reportData->pghead_first), pPainter, pPrinter);
    else if(lastPage == true && _reportData->pghead_last != 0)
        renderSection(*(_reportData->pghead_last), pPainter, pPrinter);
    else if((_pageCounter % 2) == 1 && _reportData->pghead_odd != 0)
        renderSection(*(_reportData->pghead_odd), pPainter, pPrinter);
    else if((_pageCounter % 2) == 0 && _reportData->pghead_even != 0)
        renderSection(*(_reportData->pghead_even), pPainter, pPrinter);
    else if(_reportData->pghead_any != 0)
        renderSection(*(_reportData->pghead_any), pPainter, pPrinter);
}

int orReportPrivate::finishCurPage(QPainter * pPainter, QPrinter * pPrinter, bool lastPage)
{
    int offset = _maxHeight - _bottomMargin;

    _subtotContextPageFooter = true;
    int retval = 0;
    if(lastPage && _reportData->pgfoot_last != 0) {
        if(pPainter) _yOffset = offset - renderSection(*(_reportData->pgfoot_last));
        retval = renderSection(*(_reportData->pgfoot_last), pPainter, pPrinter);
    } else if(_pageCounter == 1 && _reportData->pgfoot_first) {
        if(pPainter) _yOffset = offset - renderSection(*(_reportData->pgfoot_first));
        retval = renderSection(*(_reportData->pgfoot_first), pPainter, pPrinter);
    } else if((_pageCounter % 2) == 1 && _reportData->pgfoot_odd) {
        if(pPainter) _yOffset = offset - renderSection(*(_reportData->pgfoot_odd));
        retval = renderSection(*(_reportData->pgfoot_odd), pPainter, pPrinter);
    } else if((_pageCounter % 2) == 0 && _reportData->pgfoot_even) {
        if(pPainter) _yOffset = offset - renderSection(*(_reportData->pgfoot_even));
        retval = renderSection(*(_reportData->pgfoot_even), pPainter, pPrinter);
    } else if(_reportData->pgfoot_any != 0) {
        if(pPainter) _yOffset = offset - renderSection(*(_reportData->pgfoot_any));
        retval = renderSection(*(_reportData->pgfoot_any), pPainter, pPrinter);
    }
    _subtotContextPageFooter = false;
    return retval;
}

void orReportPrivate::renderBackgroundAndWatermark(QPainter * pPainter, QPrinter * pPrinter)
{
    // create a special QPainter to render to and pass that in to the renderBackground and
    // renderWatermark functions. This makes the functions much easier to code for since we
    // know the properties of the passed in QPainter will have some know configuration and
    // in addition gets around any limitation having to do with rendering images and text with
    // transparancy to a printer device. 

    if(pPainter == 0) // should never happen but better safe than sorry
        return;

    // first, since this looks like it could be an intensive process, we will check to see
    // if we even need to bother rendering a background and watermark. If neither have to
    // be done then we will just skip it all

    bool staticBg = (_bgStatic && !_bgImage.isNull());
    bool dynamicBg = (!_bgStatic && !_bgData.query.isEmpty() && !_bgData.column.isEmpty());
    bool doBg = (_bgOpacity != 0 && _bgRect.isValid() && (staticBg || dynamicBg));

    bool staticWm = (_wmStatic && !_wmText.isEmpty());
    bool dynamicWm = (!_wmStatic && !_wmData.query.isEmpty() && !_wmData.column.isEmpty());
    bool doWm = (_wmOpacity != 0 && (staticWm || dynamicWm));

    if(doBg || doWm) {
        int printMarginWidth = 0;
        int printMarginHeight = 0;
        if(pPrinter != 0) {
            printMarginWidth = pPrinter->margins().width();
            printMarginHeight = pPrinter->margins().height();
        }

        // determine paper size
        // so we can create the appropate sized image to work with
        QString pageSize = _reportData->page.getPageSize();
        int pageWidth = 0;
        int pageHeight = 0;
        if(pageSize == "Custom") {
            // if this is custom sized sheet of paper we will just use those values
            pageWidth = (int)(_reportData->page.getCustomWidth() * 100.0);
            pageHeight = (int)(_reportData->page.getCustomHeight() * 100.0);
        } else {
            // lookup the correct size information for the specified size paper
            PageSizeInfo pi = PageSizeInfo::getByName(pageSize);
            if(!pi.isNull()) {
                // found it and the values are already stored in the correct units we want
                pageWidth = pi.width();
                pageHeight = pi.height();
            }
        }
        if(!_reportData->page.isPortrait()) {
            int tmp = pageWidth;
            pageWidth = pageHeight;
            pageHeight = tmp;
        }
        if(pageWidth < 1 || pageHeight < 1) {
            // whoops we couldn't fint it.... we will use the values from the painter
            // and add in the margins of the printer to get what should be the correct
            // size of the sheet of paper we are printing to.
            pageWidth = pPainter->viewport().width() + printMarginWidth + printMarginWidth;
            pageHeight = pPainter->viewport().height() + printMarginHeight + printMarginHeight;
        }

        if((!doBg || (doBg && staticBg)) && (!doWm || (doWm && staticWm)) && _cachedBgWm) {
        } else {
            QImage image = QImage(pageWidth, pageHeight, 32);
            if(!image.isNull()) {
                image.fill(0xffffffff);
    
                if(doBg) {
                    renderBackground(image);
                }
                if(doWm) {
                    renderWatermark(image);
                }
    
                pPainter->drawImage(-printMarginWidth, -printMarginHeight, image);
                if((!doBg || (doBg && staticBg)) && (!doWm || (doWm && staticWm))) {
                    _cachedBgWmImage = image;
                    _cachedBgWm = true;
                }
            }
        }
    }
}

void orReportPrivate::renderBackground(QImage & dest)
{
    bool staticBg = (_bgStatic && !_bgImage.isNull());
    bool dynamicBg = (!_bgStatic && !_bgData.query.isEmpty() && !_bgData.column.isEmpty());
    bool doBg = (_bgOpacity != 0 && _bgRect.isValid() && (staticBg || dynamicBg));

    if(_reportData != 0 && doBg) {
        QImage img = _bgImage;
        if(dynamicBg) {
            orData dataThis;
            populateData(_bgData, dataThis);
            QString uudata = dataThis.getValue();

            QByteArray imgdata = QUUDecode(uudata);
            img = QImage(imgdata);
        }
        if(img.isNull()) return;

        if(_bgScale) {
            img = img.smoothScale(_bgRect.width(), _bgRect.height(), _bgScaleMode);
        }

        // determine where the upper left hand corner of the image should
        // be located to have it aligned as specified within the area for
        // the image.
        int sx = _bgRect.left(); // default to LEFT
        int sy = _bgRect.top(); // default to TOP

        if((Qt::AlignHorizontal_Mask & _bgAlign) == Qt::AlignRight) {
            sx = _bgRect.right() - img.width();
        } else if((Qt::AlignHorizontal_Mask & _bgAlign) == Qt::AlignHCenter) {
            sx = _bgRect.center().x() - (img.width() / 2);
        } else {
            sx = _bgRect.left(); // default to LEFT
        }
        if((Qt::AlignVertical_Mask & _bgAlign) == Qt::AlignBottom) {
            sy = _bgRect.bottom() - img.height();
        } else if((Qt::AlignVertical_Mask & _bgAlign) == Qt::AlignVCenter) {
            sy = _bgRect.center().y() - (img.height() / 2);
        } else {
            sy = _bgRect.top(); // default to TOP
        }

        // now we need to render the image on our destination image
        double opacity = _bgOpacity / 255.0;
        double opacity_inv = 1.0 - opacity;
        int dx = 0;
        int dy = 0;
        QRgb s = 0;
        QRgb d = 0;
        for(int y = 0; y < img.height(); y++) {
            for(int x = 0; x < img.width(); x++) {
                dx = sx + x;
                dy = sy + y;
                if(_bgRect.contains(dx, dy)) {
                    s = img.pixel(x, y);
                    if((s & 0x00ffffff) == 0x00ffffff) continue; // if it's white just skip it
                    d = dest.pixel(dx, dy);
                    dest.setPixel(dx, dy, qRgb( (int)((qRed(s) * opacity) + (qRed(d) * opacity_inv)),
                                                (int)((qGreen(s) * opacity) + (qGreen(d) * opacity_inv)),
                                                (int)((qBlue(s) * opacity) + (qBlue(d) * opacity_inv)) ));
                }
            }
        }
    }
}

void orReportPrivate::renderWatermark(QImage & image)
{
    bool staticWm = (_wmStatic && !_wmText.isEmpty());
    bool dynamicWm = (!_wmStatic && !_wmData.query.isEmpty() && !_wmData.column.isEmpty());
    bool doWm = (_wmOpacity != 0 && (staticWm || dynamicWm));
    if(_reportData != 0 && doWm) {
        QString wmText = _wmText;
        if(dynamicWm) {
            if(_wmData.query == "Context Query" && _wmData.column == "page_number")
                wmText = QString("%1").arg(_pageCounter);
            else if(_wmData.query == "Context Query" && _wmData.column == "report_name")
                wmText = _reportData->name;
            else if(_wmData.query == "Context Query" && _wmData.column == "report_title")
                wmText = _reportData->title;
            else if(_wmData.query == "Context Query" && _wmData.column == "report_description")
                wmText = _reportData->description;
            else {
                orData dataThis;
                populateData(_wmData, dataThis);
                wmText = dataThis.getValue();
            }

        }
        if(wmText.isEmpty()) {
            return;
        }

        const double pi = 3.14159265358979323846;

        double w = ((double)image.width() - ((_reportData->page.getMarginLeft() + _reportData->page.getMarginRight()) * 100.0));
        double h = ((double)image.height() - ((_reportData->page.getMarginTop() + _reportData->page.getMarginBottom()) * 100.0));
        double theta = (pi/-2.0) + atan(w / h);
        double l = sqrt((w * w) + (h * h));

        const double sintheta = sin(theta);
        const double costheta = cos(theta);

        double margin_width = _reportData->page.getMarginLeft() * 100.0;
        double margin_height = _reportData->page.getMarginTop() * 100.0;

        int offset = (int)(l * 0.05);
        int l2 = (int)(l * 0.9);

        int x = (int)(sintheta * h) + offset;
        int y = (int)(costheta * h);

        QFont fnt = _wmFont;
        QFontMetrics fm = QFontMetrics(fnt);
        QFontInfo fi(fnt);
        QString family = fi.family();
        QValueList<int> sizes = QFontDatabase().pointSizes(family);
        qHeapSort(sizes);

        for(int i = sizes.size() - 1; i > 0; i--) {
            fnt.setPointSize(sizes[i]);
            fm = QFontMetrics(fnt);
            if(fm.boundingRect(_wmText).width() < l2) {
                break;
            }
        }
        int fh = fm.height();

        y = y - (fh/2);

        QPixmap pm(image.width(), image.height());
        pm.fill();
        QPainter pPainter;
        pPainter.begin(&pm);
        pPainter.setFont(fnt);
        pPainter.translate(margin_width, margin_height);
        pPainter.rotate((theta/pi)*180);
        pPainter.drawText(x, y, l2, fh, Qt::AlignCenter, wmText);
        pPainter.end();
        QImage wm = pm.convertToImage();

        double opacity = _wmOpacity / 255.0;
        double opacity_inv = 1.0 - opacity;
        
        QRgb s = 0;
        QRgb d = 0;
        for(y = 0; y < image.height(); y++) {
            for(x = 0; x < image.width(); x++) {
                s = wm.pixel(x, y);
                if((s & 0x00ffffff) == 0x00ffffff) continue; // if it's white just skip it
                d = image.pixel(x, y);
                image.setPixel(x, y, qRgb( (int)((qRed(s) * opacity) + (qRed(d) * opacity_inv)),
                                           (int)((qGreen(s) * opacity) + (qGreen(d) * opacity_inv)),
                                           (int)((qBlue(s) * opacity) + (qBlue(d) * opacity_inv)) ));
            }
        }
    }
}

void orReportPrivate::renderDetailSection(ORDetailSectionData & detailData, QPainter * pPainter, QPrinter * pPrinter)
{
    if(detailData.detail != 0) {
        orQuery *orqThis        = getQuerySource(detailData.key.query);
        XSqlQuery *query;

        _subtotContextDetail = &detailData;

        if ((orqThis != 0) && ((query = orqThis->getQuery())->size())) {
            QStringList keys;
            QStringList keyValues;
            bool    status;
            int i = 0, pos = 0, cnt = 0;
            ORDetailGroupSectionData * grp = 0;

            query->first();
  
            for(i = 0; i < (int)detailData.groupList.count(); i++) {
                cnt++;
                grp = detailData.groupList[i];
                for(QMapIterator<ORDataData,double> it = grp->_subtotCheckPoints.begin(); 
                    it != grp->_subtotCheckPoints.end(); ++it) {
                    (*it) = 0.0;
                }
                keys.append(grp->column);
                if(!keys[i].isEmpty()) keyValues.append(query->value(keys[i]).toString());
                _subtotContextMap = &(grp->_subtotCheckPoints);
                if(grp->head) renderSection(*(grp->head), pPainter, pPrinter);
                _subtotContextMap = 0;
            }
  
            do {
                int l = query->at();
                if ( renderSection(*(detailData.detail)) + finishCurPage(0, 0, (l+1 == query->size()))
                      + _bottomMargin + _yOffset >= _maxHeight) {
                    if(l > 0) query->prev();
                    createNewPage(pPainter, pPrinter);
                    if(l > 0) query->next();
                }

                renderSection(*(detailData.detail), pPainter, pPrinter);
    
                status = query->next();
                if (status == true && keys.count() > 0) {
                    // check to see where it is we need to start
                    pos = -1; // if it's still -1 by the time we are done then no keyValues changed
                    for(i = 0; i < (int)keys.count(); i++) {
                        if(keyValues[i] != query->value(keys[i]).toString()) {
                            pos = i;
                            break;
                        }
                    }

                    // don't bother if nothing has changed
                    if(pos != -1) {
                        // roll back the query and go ahead if all is good
                        status = query->prev();
                        if(status == true) {
                            // print the footers as needed
                            // any changes made in this for loop need to be duplicated
                            // below where the footers are finished.
                            bool do_break = false;
                            for(i = cnt - 1; i >= pos; i--) {
                                if(do_break)
                                    createNewPage(pPainter, pPrinter);
                                do_break = false;
                                grp = detailData.groupList[i];
                                _subtotContextMap = &(grp->_subtotCheckPoints);
                                if(grp->foot) {
                                    if ( renderSection(*(grp->foot)) + finishCurPage()
                                         + _bottomMargin + _yOffset >= _maxHeight) {
                                        createNewPage(pPainter, pPrinter);
                                    }
                                    renderSection(*(grp->foot), pPainter, pPrinter);
                                }
                                _subtotContextMap = 0;
                                // reset the sub-total values for this group
                                for(QMapIterator<ORDataData,double> it = grp->_subtotCheckPoints.begin(); 
                                    it != grp->_subtotCheckPoints.end(); ++it) {
                                    double d = 0.0;
                                    ORDataData data = it.key();
                                    XSqlQuery * xqry = getQuerySource(data.query)->getQuery();
                                    if(xqry) d = xqry->getFieldTotal(data.column);
                                    (*it) = d;
                                }
                                if(ORDetailGroupSectionData::BreakAfterGroupFoot == grp->pagebreak)
                                    do_break = true;
                            }
                            // step ahead to where we should be and print the needed headers
                            // if all is good
                            status = query->next();
                            if(do_break)
                                createNewPage(pPainter, pPrinter);
                            if(status == true) {
                                for(i = pos; i < cnt; i++) {
                                    grp = detailData.groupList[i];
                                    _subtotContextMap = &(grp->_subtotCheckPoints);
                                    if(grp->head) {
                                        if ( renderSection(*(grp->head)) + finishCurPage()
                                             + _bottomMargin + _yOffset >= _maxHeight) {
                                            query->prev();
                                            createNewPage(pPainter, pPrinter);
                                            query->next();
                                        }
                                        renderSection(*(grp->head), pPainter, pPrinter);
                                    }
                                    _subtotContextMap = 0;
                                    if(!keys[i].isEmpty()) keyValues[i] = query->value(keys[i]).toString();
                                }
                            }
                        }
                    }
                }
            } while (status == true);

            if(keys.size() > 0 && query->prev()) {
                // finish footers
                // duplicated changes from above here
                for(i = cnt - 1; i >= 0; i--) {
                    grp = detailData.groupList[i];
                    _subtotContextMap = &(grp->_subtotCheckPoints);
                    if(grp->foot) {
                        if ( renderSection(*(grp->foot)) + finishCurPage()
                              + _bottomMargin + _yOffset >= _maxHeight) {
                            createNewPage(pPainter, pPrinter);
                        }
                        renderSection(*(grp->foot), pPainter, pPrinter);
                    }
                    _subtotContextMap = 0;
                    // reset the sub-total values for this group
                    for(QMapIterator<ORDataData,double> it = grp->_subtotCheckPoints.begin(); 
                        it != grp->_subtotCheckPoints.end(); ++it) {
                        double d = 0.0;
                        ORDataData data = it.key();
                        XSqlQuery * xqry = getQuerySource(data.query)->getQuery();
                        if(xqry) d = xqry->getFieldTotal(data.column);
                        (*it) = d;
                    }
                    // This can be handled by the BreatAtEnd option for page breaks
                    // otherwise we would always end up with a page break on the last record
                    // where one may not be desirable.
                    //if(ORDetailGroupSectionData::BreakAfterGroupFoot == grp->pagebreak)
                    //    createNewPage(pPainter, pPrinter);
                }
            }
        }
        _subtotContextDetail = 0;
        if(ORDetailSectionData::BreakAtEnd == detailData.pagebreak)
          createNewPage(pPainter, pPrinter);
    }
}

double orReportPrivate::getNearestSubTotalCheckPoint(const ORDataData & d) {
    // use the various contexts setup to determine what we should be
    // doing and try and locate the nearest subtotal check point value
    // and return that value... if we are unable to locate one then we
    // will just return 0.0 which will case the final value to be a
    // running total 

    if(_subtotContextPageFooter) {
        // first check to see if it's a page footer context
        // as that can happen from anywhere at any time.

        // TODO: acutally make this work
        if(_subtotPageCheckPoints.contains(d)) {
            return _subtotPageCheckPoints[d];
        }

    } else if(_subtotContextMap != 0) {
        // next if an explicit map is set then we are probably
        // rendering a group head/foot now so we will use the
        // available their.. if it's not then we made a mistake

        if(_subtotContextMap->contains(d)) {
            return (*_subtotContextMap)[d];
        }

    } else if(_subtotContextDetail != 0) {
        // finally if we are in a detail section then we will simply
        // traverse that details sections groups from the most inner
        // to the most outer and use the first check point we find

        // in actuallity we search from the outer most group to the
        // inner most group and just take the last value found which
        // would be the inner most group

        double dbl = 0.0;
        ORDetailGroupSectionData * grp = 0;
        for(int i = 0; i < (int)_subtotContextDetail->groupList.count(); i++) {
            grp = _subtotContextDetail->groupList[i];
            if(grp->_subtotCheckPoints.contains(d)) {
                dbl = grp->_subtotCheckPoints[d];
            }
        }
        return dbl;

    }

    return 0.0;
}

int orReportPrivate::renderSection(const ORSectionData & sectionData, QPainter * pPainter, QPrinter *) {
    int intHeight = sectionData.height;
    int dpi = 72;
    if(pPainter != 0) {
        QPaintDeviceMetrics pdm(pPainter->device());
        dpi = pdm.logicalDpiX();
    }

    if (sectionData.objects.count() == 0)
        return 0;

    QPtrListIterator<ORObject> it(sectionData.objects);
    ORObject * elemThis;
    while( (elemThis = it.current()) != 0) {
        ++it;
        if (elemThis->isLabel()) {
            ORLabelData * l = elemThis->toLabel();
            QRect rect = l->rect;
            rect.moveBy(_leftMargin, _yOffset);

            if (pPainter != 0) {
                QFont f = l->font;
                f.setPointSizeFloat((100.0/dpi)*f.pointSize());
                pPainter->setFont(f);
                QString str = l->string;
                int tf = l->align;
                if((tf & Qt::AlignRight) == Qt::AlignRight) {
                    tf |= Qt::DontClip;
                    QFontMetrics fm = pPainter->fontMetrics();
                    while(str.length() > 0 && fm.width(str) > rect.width())
                        str = str.right(str.length() - 1);
                }
                pPainter->drawText(rect, tf, str);
            }
        } else if (elemThis->isField()) {
            orData       dataThis;
            ORFieldData* f = elemThis->toField();

            QRect rect = f->rect;
            rect.moveBy(_leftMargin, _yOffset);

            QString str = QString::null;
            if(f->trackTotal) {
                XSqlQuery * xqry = getQuerySource(f->data.query)->getQuery();
                if(f->format.length() > 0 && xqry) {
                    double d_val = xqry->getFieldTotal(f->data.column);
                    if(f->sub_total) {
                        d_val -= getNearestSubTotalCheckPoint(f->data);
                    }
                    if(!f->builtinFormat) {
                        str = QString().sprintf(f->format, d_val);
                    } else {
                        str = QString().sprintf("SELECT %s(%f);",(const char*)getFunctionFromTag(f->format), d_val);
                        XSqlQuery q(str, _database);
                        if(q.first()) {
                            str = q.value(0).toString();
                        } else {
                            str = QString::null;
                        }
                    }
                }
            } else {
                if(f->data.query == "Context Query" && f->data.column == "page_number")
                    str = QString("%1").arg(_pageCounter);
                else if(f->data.query == "Context Query" && f->data.column == "report_name")
                    str = _reportData->name;
                else if(f->data.query == "Context Query" && f->data.column == "report_title")
                    str = _reportData->title;
                else if(f->data.query == "Context Query" && f->data.column == "report_description")
                    str = _reportData->description;
                else {
                    populateData(f->data, dataThis);
                    str = dataThis.getValue();
                }
            }

            if (pPainter != 0) {
                QFont fnt = f->font;
                fnt.setPointSizeFloat((100.0/dpi)*fnt.pointSize());
                pPainter->setFont(fnt);
                int tf = f->align;
                if((tf & Qt::AlignRight) == Qt::AlignRight) {
                    tf |= Qt::DontClip;
                    QFontMetrics fm = pPainter->fontMetrics();
                    while(str.length() > 0 && fm.width(str) > rect.width())
                        str = str.right(str.length() - 1);
                }
                pPainter->drawText(rect, tf, str);
            }
        } else if (elemThis->isText()) {
            orData       dataThis;
            ORTextData * t = elemThis->toText();
            bool         boolShrinkable  = false;
            bool         boolToShrink    = false;

            populateData(t->data, dataThis);
    
            QString qstrValue;
            int     intStretch      = t->rect.top();
            int     intLineCounter  = 0;
            int     intBaseTop      = t->rect.top() + _yOffset;
            int     intRectHeight   = t->rect.height();
            int     intRectWidth    = t->rect.width() - 10;
  
            QFont f = t->font;
            f.setPointSizeFloat((100.0/dpi)*f.pointSize());
            if (pPainter != 0) {
                pPainter->setFont(f);
            }

            qstrValue = dataThis.getValue();
            if (qstrValue.length()) {
                QRect rect = t->rect;
                rect.moveBy(_leftMargin,0);

                int pos = 0;
                int idx;
                QChar separator;
                QRegExp re("\\s");
                QFontMetrics fm(f);
                while(qstrValue.length()) {
                    idx = re.search(qstrValue, pos);
                    if(idx == -1) {
                        idx = qstrValue.length();
                        separator = QChar('\n');
                    } else {
                        separator = qstrValue.at(idx);
                    }

                    if(fm.boundingRect(qstrValue.left(idx)).width() < intRectWidth || pos == 0) {
                        pos = idx + 1;
                        if(separator == '\n') {
                            QString line = qstrValue.left(idx);
                            qstrValue = qstrValue.mid(idx+1,qstrValue.length());
                            pos = 0;

                            rect.setTop(intBaseTop + (intLineCounter * intRectHeight));
                            rect.setBottom(rect.top() + intRectHeight);
                            if (pPainter != 0) {
                                pPainter->drawText(rect, t->align | Qt::DontClip, line);
                                //pPainter->drawRect(rect);
                            } 

                            intStretch += intRectHeight;
                            intLineCounter++;
                        }
                    } else {
                        QString line = qstrValue.left(pos - 1);
                        qstrValue = qstrValue.mid(pos,qstrValue.length());
                        pos = 0;

                        rect.setTop(intBaseTop + (intLineCounter * intRectHeight));
                        rect.setBottom(rect.top() + intRectHeight);
                        if (pPainter != 0) {
                            pPainter->drawText(rect, t->align | Qt::DontClip, line);
                            //pPainter->drawRect(rect);
                        }

                        intStretch += intRectHeight;
                        intLineCounter++;
                    }
                }
      
                intStretch += t->bottompad;
       
                if (intStretch > intHeight)
                    intHeight = intStretch;
            } else {
                if (boolShrinkable)
                    boolToShrink = true;
            }
        } else if (elemThis->isLine()) {
            ORLineData * l = elemThis->toLine();
            if (pPainter != 0) {
                pPainter->setPen(QPen(QColor("black"), l->weight));
                pPainter->drawLine(l->xStart + _leftMargin, l->yStart + _yOffset, l->xEnd + _leftMargin, l->yEnd + _yOffset);
            }
        } else if (elemThis->isBarcode()) {
            ORBarcodeData * bc = elemThis->toBarcode();
            orData       dataThis;
            
            QRect rect = bc->rect;
            rect.moveBy(_leftMargin, _yOffset);

            populateData(bc->data, dataThis);

            if(bc->format == "3of9") {
                render3of9(rect,dataThis.getValue(), bc->align, pPainter);
            } else if(bc->format == "3of9+") {
                renderExtended3of9(rect,dataThis.getValue(), bc->align, pPainter);
            } else if(bc->format == "128") {
                renderCode128(rect, dataThis.getValue(), bc->align, pPainter);
            } else if(bc->format == "ean13") {
                renderCodeEAN13(rect, dataThis.getValue(), bc->align, pPainter);
            } else if(bc->format == "ean8") {
                renderCodeEAN8(rect, dataThis.getValue(), bc->align, pPainter);
            } else if(bc->format == "upc-a") {
                renderCodeUPCA(rect, dataThis.getValue(), bc->align, pPainter);
            } else if(bc->format == "upc-e") {
                renderCodeUPCE(rect, dataThis.getValue(), bc->align, pPainter);
            } else {
                logMessage("Encountered unknown barcode format: %s",(const char*)bc->format);
            }
        } else if (elemThis->isImage()) {
            ORImageData * im = elemThis->toImage();
            QString uudata = im->inline_data;
            if(uudata == QString::null) {
                orData dataThis;
                populateData(im->data, dataThis);
                uudata = dataThis.getValue();
            }

            QByteArray imgdata = QUUDecode(uudata);
            QImage img(imgdata);

            QRect rect = im->rect;
            rect.moveBy(_leftMargin, _yOffset);

            // we need to decode the uudata to an actuall image to load
            // then we need to render that image onto the report with the
            // correct clip|stretch mode 
            if(pPainter != 0) {
                if(im->mode == "stretch") {
                    img = img.smoothScale(rect.width(), rect.height(), QImage::ScaleMin);
                }
                QPixmap pmap(img);
                pPainter->drawPixmap(rect.left(), rect.top(), pmap, 0, 0, rect.width(), rect.height());
            }
        } else if (elemThis->isGraph()) {
            ORGraphData * gData = elemThis->toGraph();

            QRect rect = gData->rect;
            rect.moveBy(_leftMargin, _yOffset);

            if(pPainter) {
                renderGraph(*pPainter, rect, *gData, getQuerySource(gData->data.query)->getQuery(), _colorMap);
            }
        } else {
            logMessage("Encountered and unknown element while rendering a section.");
        }
    }

    if (pPainter != 0)
        _yOffset += intHeight;

    return intHeight;
}

//
// Class orReport
//
orReport::orReport(QSqlDatabase * pDb)
  : _internal(0)
{
  _internal = new orReportPrivate();
  setDatabase(pDb);
}

orReport::orReport(const QString &qstrDomname, QSqlDatabase * pDb)
  : _internal(0)
{
  _internal = new orReportPrivate();
  if(_internal != 0)
  {
    setDatabase(pDb);

    constructor(qstrDomname);
  }
}

orReport::orReport(const QString &qstrDomname, const QStringList &lstPParameters, QSqlDatabase * pDb)
  : _internal(0)
{
  _internal = new orReportPrivate();

  if(_internal != 0) {
    setDatabase(pDb);
    setParamList(lstPParameters);

    constructor(qstrDomname);
  }
}

orReport::orReport(const QString &qstrDomname, const ParameterList &pParams, QSqlDatabase * pDb)
  : _internal(0)
{
  _internal = new orReportPrivate();

  if(_internal != 0) {
    setDatabase(pDb);
    setParamList(pParams);

    constructor(qstrDomname);
  }
}

orReport::orReport(const char *pReportName, const ParameterList &pParams, QSqlDatabase * pDb)
  : _internal(0)
{
  _internal = new orReportPrivate();

  if(_internal != 0) {
    setDatabase(pDb);
    setParamList(pParams);

    constructor(QString(pReportName));
  }
}

void orReport::constructor(const QString &pReportName)
{
  _internal->_reportName = pReportName;
  XSqlQuery report(_internal->_database);
  report.prepare( "SELECT report_grade, report_source "
                  "  FROM report "
                  " WHERE (report_name=:report_name) "
                  "ORDER BY report_grade DESC LIMIT 1;" );
  report.bindValue(":report_name", pReportName);
  report.exec();
  if (report.first())
  {
    _internal->_reportExists = true;
    _internal->_reportGrade = report.value("report_grade").toInt();
    QString errorMessage;
    int     errorLine;

    if (_internal->_docReport.setContent(report.value("report_source").toString(), &errorMessage, &errorLine))
      setDom(_internal->_docReport);
    else
      logMessage("Error %s at line #%d\n", (const char *)errorMessage, errorLine);
  }
  else
    _internal->_reportExists = false;
}

orReport::~orReport()
{
  if(_internal != 0)
  {
    delete _internal;
    _internal = 0;
  }
}

bool orReport::print(QPrinter *prtThis, bool boolSetupPrinter) {
    bool retval = false;
    bool localPrinter = false;

    if(_internal != 0) {
        if (prtThis == 0) {
            prtThis = new QPrinter();
            localPrinter = true;
        }

        if(_internal->_valid && _internal->_reportData) {
            retval = true;
            // if we aren't performing a print setup here i hope this is a second
            // pass as the results of the printout will be _very undefined_ if we
            // haven't setup the printer.
            prtThis->setPageSize(QPrinter::Letter);
            prtThis->setOrientation((_internal->_reportData->page.isPortrait() ? QPrinter::Portrait : QPrinter::Landscape));
            prtThis->setResolution(100); // 100dpi
            if (boolSetupPrinter) {
#ifdef Q_WS_MAC
                retval = prtThis->printSetup();
#else
                // on windows this needs to be called for the orientation to work
                retval = prtThis->setup();
#endif
            }
    
            if(retval == true) {
                QPainter pntPrinter(prtThis);
                retval = pntPrinter.isActive();
                if(retval) {
                    retval = render(&pntPrinter, prtThis);
                    pntPrinter.end();
                }
            }
        }
    
        if (localPrinter && prtThis != 0)
            delete prtThis;
    }

    return retval;
}

//  Render the report to the passed QPainter
bool orReport::render(QPainter *pPainter, QPrinter *pPrinter) {
    QApplication::setOverrideCursor( Qt::WaitCursor );
    bool retval = false;
    LabelSizeInfo label;

#if QT_VERSION >= 0x030100
    QWMatrix::setTransformationMode( QWMatrix::Areas );
#endif

    if(_internal != 0) {

        _internal->_cachedBgWm = false;

        if(_internal->_valid && _internal->_reportData != 0) {
            retval = true;
            // if we are to do Labels lets look up the label definition
            // to make sure we have it before we decide it we are going
            // to continue on with the printing process or not.
            if(_internal->_reportData->page.getPageSize() == "Labels") {
                label = LabelSizeInfo::getByName(_internal->_reportData->page.getLabelType());
                retval = !label.isNull();
            }
    
            if(retval != false) {
                // initialize some of our variables
                _internal->_pageCounter = 0;
                _internal->_yOffset = 0;
    
                if(!label.isNull()) {
                    if(_internal->_reportData->page.isPortrait()) {
                        _internal->_topMargin = label.startY();
                        _internal->_bottomMargin = 0;
                        _internal->_rightMargin = 0;
                        _internal->_leftMargin = label.startX();
                    } else {
                        _internal->_topMargin = label.startX();
                        _internal->_bottomMargin = 0;
                        _internal->_rightMargin = 0;
                        _internal->_leftMargin = label.startY();
                    }
                } else {
                    _internal->_topMargin = (int)(_internal->_reportData->page.getMarginTop() * 100.0);
                    _internal->_bottomMargin = (int)(_internal->_reportData->page.getMarginBottom() * 100.0);
                    _internal->_rightMargin = (int)(_internal->_reportData->page.getMarginRight() * 100.0);
                    _internal->_leftMargin = (int)(_internal->_reportData->page.getMarginLeft() * 100.0);
                }
    
                _internal->_colorMap = _internal->_reportData->color_map;
        
                // get the page setup properly
                // need to add more page sizes
                // i'm assuming Letter at this point for ease
                _internal->_maxWidth = 850;
                _internal->_maxHeight = 1100;
    
                if(!_internal->_reportData->page.isPortrait()) {
                    int tmp = _internal->_maxWidth;
                    _internal->_maxWidth = _internal->_maxHeight;
                    _internal->_maxHeight = tmp;
                }
    
                // ajust the values so that elements are printed in the correct
                // positions regardless of what are actual printing area is
                if(pPrinter != 0) {
                    _internal->_leftMargin -= pPrinter->margins().width();
                    _internal->_topMargin -= pPrinter->margins().height();
                    _internal->_maxHeight -= pPrinter->margins().height();
                }
    
                // initialize all the queries 
                _internal->_lstQueries.clear();
                _internal->_lstQueries.append(  new orQuery( "Context Query",  "SELECT formatDate(CURRENT_DATE) AS report_date,"
                                                            " formatTime(CURRENT_TIMESTAMP) AS report_time",
                                                  ParameterList(), true, _internal->_database ));
                QString tQuery = "select text('0') AS \"0\"";
                QString val = QString::null;
                QRegExp re("'");
                for(unsigned int t = 0; t < _internal->_lstParameters.count(); t++) {
                    Parameter p = _internal->_lstParameters[t];
                    val = p.value().toString();
                    val = val.replace(re, "''");
                    tQuery += QString().sprintf(", text('%s') AS \"%d\"", (const char*)val, t + 1);
                    if(!p.name().isEmpty()) {
                        tQuery += QString().sprintf(", text('%s') AS \"%s\"", (const char*)val, (const char*)p.name());
                    }
                }
                _internal->_lstQueries.append(new orQuery("Parameter Query", tQuery, ParameterList(), true, _internal->_database));
            
                QuerySource * qs = 0;
                unsigned int i = 0;
                for(i = 0; i < _internal->_reportData->queries.size(); i++) {
                    qs = _internal->_reportData->queries.get(i);
                    _internal->_lstQueries.append(new orQuery(qs->name(), qs->query(), _internal->_lstParameters, true, _internal->_database));
                }
                _internal->_subtotPageCheckPoints.clear();
                for(i = 0; i < _internal->_reportData->trackTotal.count(); i++) {
                    // cheater cheater pumpkin eater!
                    // I really should go through the page footers and pull out only those that are listed
                    // but this is quicker to code and I'm in a hurry
                    _internal->_subtotPageCheckPoints.insert(_internal->_reportData->trackTotal[i], 0);

                    XSqlQuery * xqry = _internal->getQuerySource(_internal->_reportData->trackTotal[i].query)->getQuery();
                    if(xqry) xqry->trackFieldTotal(_internal->_reportData->trackTotal[i].column);
                }

                if(!label.isNull()) { // label print run
                    int row = 0;
                    int col = 0;
    
                    // remember the initial margin setting as we will be modifying
                    // the value and restoring it as we move around
                    int margin = _internal->_leftMargin;
    
                    _internal->_yOffset = _internal->_topMargin;
    
                    int w = label.width();
                    int wg = label.xGap();
                    int h = label.height();
                    int hg = label.yGap();
                    int numCols = label.columns();
                    int numRows = label.rows();
                    int tmp;
    
                    // flip the value around if we are printing landscape
                    if(!_internal->_reportData->page.isPortrait()) {
                        w = label.height();
                        wg = label.yGap();
                        h = label.width();
                        hg = label.xGap();
                        numCols = label.rows();
                        numRows = label.columns();
                    }
    
                    for(i = 0; i < _internal->_reportData->sections.count(); i++) {
                        if(_internal->_reportData->sections.at(i)) {
                            ORDetailSectionData * detailData = _internal->_reportData->sections.at(i);
                            if(detailData->detail != 0) {
                                orQuery *orqThis = _internal->getQuerySource(detailData->key.query);
                                XSqlQuery *query;
    
                                if((orqThis != 0) && ((query = orqThis->getQuery())->size())) {
                                    query->first();
                                    do {
                                        tmp = _internal->_yOffset; // store the value as renderSection changes it
                                        _internal->renderSection(*(detailData->detail), pPainter, pPrinter);
                                        _internal->_yOffset = tmp; // restore the value that renderSection modified
    
                                        col ++;
                                        _internal->_leftMargin += w + wg;
                                        if(col >= numCols) {
                                            _internal->_leftMargin = margin; // reset back to original value
                                            col = 0;
                                            row ++;
                                            _internal->_yOffset += h + hg;
                                            if(row >= numRows) {
                                                _internal->_yOffset = _internal->_topMargin;
                                                row = 0;
                                                if(pPrinter) {
                                                    pPrinter->newPage();
                                                }
                                            }
                                        }
                                    } while(query->next());
                                }
                            }
                        }
                    }
    
                } else { // normal print run
                    _internal->createNewPage(pPainter,pPrinter);
        
                    if(_internal->_reportData->rpthead != 0) _internal->renderSection(*(_internal->_reportData->rpthead), pPainter, pPrinter);
    
                    for(i = 0; i < _internal->_reportData->sections.count(); i++) {
                        if(_internal->_reportData->sections.at(i)) {
                            _internal->renderDetailSection(*(_internal->_reportData->sections.at(i)), pPainter, pPrinter);
                        }
                    }
    
                    if(_internal->_reportData->rptfoot != 0) {
                        if ( _internal->renderSection(*(_internal->_reportData->rptfoot)) + _internal->finishCurPage(0, 0, true)
                              + _internal->_bottomMargin + _internal->_yOffset >= _internal->_maxHeight) {
                            _internal->createNewPage(pPainter, pPrinter);
                        }
                        _internal->renderSection(*(_internal->_reportData->rptfoot), pPainter, pPrinter);
                    }
    
                    _internal->finishCurPage(pPainter,pPrinter,true);
                }
            } else {
                // error error on the wall. who is the most ambiguous of them all?
                logMessage("Error with report");
            }
        } else {
            logMessage("error parsing report");
        }
    
        _internal->_lstQueries.clear();
    
        _internal->_cachedBgWmImage = QImage();
        _internal->_cachedBgWm = false;
    }

    QApplication::restoreOverrideCursor();

    return retval;
}

QString orReport::watermarkText() {
    return ( _internal != 0 ? _internal->_wmText : QString::null );
}

void orReport::setWatermarkText(const QString & txt) {
    if(_internal != 0) {
        _internal->_wmText = txt;
    }
}

QFont orReport::watermarkFont() {
    return (_internal != 0 ? _internal->_wmFont : QFont() );
}

void orReport::setWatermarkFont(const QFont & fnt) {
    if(_internal != 0) {
        _internal->_wmFont = fnt;
    }
}

unsigned char orReport::watermarkOpacity() {
    return ( _internal != 0 ? _internal->_wmOpacity : 0 );
}

void orReport::setWatermarkOpacity(unsigned char o) {
    if(_internal != 0) {
        _internal->_wmOpacity = o;
    }
}

QImage orReport::backgroundImage() {
    return ( _internal != 0 ? _internal->_bgImage : QImage() );
}

void orReport::setBackgroundImage(const QImage & img) {
    if(_internal != 0) {
        _internal->_bgImage = img;
    }
}

QRect orReport::backgroundRect() {
    if(_internal != 0) {
        if(_internal->_bgRect.isValid()) {
            return _internal->_bgRect;
        }
    }
    return QRect();
}

void orReport::setBackgroundRect(const QRect & r) {
    setBackgroundRect(r.x(), r.y(), r.width(), r.height());
}

void orReport::setBackgroundRect(int x, int y, int w, int h) {
    if(_internal != 0) {
        _internal->_bgRect.setRect(x, y, w, h);
    }
}

unsigned char orReport::backgroundOpacity() {
    return ( _internal != 0 ? _internal->_bgOpacity : 0 );
}

void orReport::setBackgroundOpacity(unsigned char o) {
    if(_internal != 0) {
        _internal->_bgOpacity = o;
    }
}

int orReport::backgroundAlignment() {
    return ( _internal != 0 ? _internal->_bgAlign : 0 );
}

void orReport::setBackgroundAlignment(int a) {
    if(_internal != 0) {
        _internal->_bgAlign = a;
    }
}

bool orReport::backgroundScale() {
    return ( _internal != 0 ? _internal->_bgScale : false );
}

void orReport::setBackgroundScale(bool scale) {
    if(_internal != 0) {
        _internal->_bgScale = scale;
    }
}

QImage::ScaleMode orReport::backgroundScaleMode() {
    return ( _internal != 0 ? _internal->_bgScaleMode : QImage::ScaleFree );
}

void orReport::setBackgroundScaleMode(QImage::ScaleMode mode) {
    if(_internal != 0) {
        _internal->_bgScaleMode = mode;
    }
}

bool orReport::isValid() {
    if(_internal != 0 && _internal->_valid && doParamsSatisfy())
        return true;
    return false;
}

void orReport::setDatabase(QSqlDatabase * pDb) {
    if(_internal != 0) {
        _internal->_database = pDb;
    }
}

bool orReport::setDom(const QDomDocument & docPReport) {
    if(_internal != 0) {
        _internal->_reportExists = true;
        if(_internal->_reportData != 0)
            delete _internal->_reportData;

        _internal->_docReport = docPReport;

        _internal->_reportData = new ORReportData();
        if(parseReport(_internal->_docReport.documentElement(),*(_internal->_reportData))) {
            _internal->_valid = true;

            // make sure all the watermark values are at their defaults
            _internal->_wmStatic = true;
            _internal->_wmText = QString::null;
            _internal->_wmData.query = QString::null;
            _internal->_wmData.column = QString::null;
            _internal->_wmFont = QFont("Helvetic");
            _internal->_wmOpacity = 25;

            if(_internal->_reportData->wmData.valid) {
                if(_internal->_reportData->wmData.staticText) {
                    _internal->_wmText = _internal->_reportData->wmData.text;
                } else {
                    _internal->_wmStatic = false;
                    _internal->_wmData.query = _internal->_reportData->wmData.data.query;
                    _internal->_wmData.column = _internal->_reportData->wmData.data.column;
                }
                if(!_internal->_reportData->wmData.useDefaultFont) {
                    _internal->_wmFont = _internal->_reportData->wmData.font;
                }
                _internal->_wmOpacity = _internal->_reportData->wmData.opacity;
            }

            // mark sure all the background values are at their defaults
            _internal->_bgStatic = true;
            _internal->_bgImage = QImage();
            _internal->_bgData.query = QString::null;
            _internal->_bgData.column = QString::null;
            _internal->_bgOpacity = 25;
            _internal->_bgAlign = Qt::AlignLeft | Qt::AlignTop;
            _internal->_bgScale = false;
            _internal->_bgScaleMode = QImage::ScaleFree;
            _internal->_bgRect.setX(0);
            _internal->_bgRect.setY(0);
            _internal->_bgRect.setWidth(1);
            _internal->_bgRect.setHeight(1);

            if(_internal->_reportData->bgData.enabled) {
                if(_internal->_reportData->bgData.staticImage) {
                    if(!_internal->_reportData->bgData.image.isEmpty()) {
                        QByteArray imgdata = QUUDecode(_internal->_reportData->bgData.image);
                        QImage img(imgdata);
                        _internal->_bgImage = img;
                    }
                } else {
                    _internal->_bgStatic = false;
                    _internal->_bgData.query = _internal->_reportData->bgData.data.query;
                    _internal->_bgData.column = _internal->_reportData->bgData.data.column;
                }
                _internal->_bgOpacity = _internal->_reportData->bgData.opacity;
                _internal->_bgAlign = _internal->_reportData->bgData.align;
                _internal->_bgScale = (_internal->_reportData->bgData.mode != "clip");
                _internal->_bgScaleMode = QImage::ScaleMin;
                _internal->_bgRect.setX(_internal->_reportData->bgData.rect.x());
                _internal->_bgRect.setY(_internal->_reportData->bgData.rect.y());
                _internal->_bgRect.setWidth(_internal->_reportData->bgData.rect.width());
                _internal->_bgRect.setHeight(_internal->_reportData->bgData.rect.height());
            }

        }
    }
    return isValid();
}

void orReport::setParamList(const QStringList & lstPParameters) {
    ParameterList plist;
    for(unsigned int t = 0; t < lstPParameters.count(); t++) {
        plist.append(Parameter(QString(), lstPParameters[t]));
    }

    setParamList(plist);
}

void orReport::setParamList(const ParameterList & pParamList) {
    if(_internal != 0) {
        _internal->_lstParameters = pParamList;
    }
}

ParameterList orReport::getParamList() {
    ParameterList plist;
    if(_internal != 0) {
        plist = _internal->_lstParameters;
    }
    return plist;
}

bool orReport::doParamsSatisfy() {
    if(_internal == 0 || !_internal->_valid) return false;

    QuerySource * qs = 0;
    unsigned int i = 0;
    for(i = 0; i < _internal->_reportData->queries.size(); i++) {
        qs = _internal->_reportData->queries.get(i);
        orQuery qry(qs->name(), qs->query(), _internal->_lstParameters, false, _internal->_database);
        if(qry.missingParamList.count() > 0) return false;
    }

    return true;
}

bool orReport::doesReportExist() {
    if(_internal != 0) {
        return _internal->_reportExists;
    }
    return false;
}

bool orReport::satisfyParams(QWidget * widget) {
    // get list of missing parameters
    QStringList mlist;
    QStringList::iterator it;
    QuerySource * qs = 0;
    for(unsigned int i = 0; i < _internal->_reportData->queries.size(); i++) {
        qs = _internal->_reportData->queries.get(i);
        orQuery qry(qs->name(), qs->query(), _internal->_lstParameters, true, _internal->_database);
        it = qry.missingParamList.begin();
        for(it = qry.missingParamList.begin(); it != qry.missingParamList.end(); it++) {
            if((*it)[0] != '%' && !mlist.contains(*it)) mlist.append(*it);
        }
    }

    if(mlist.count() == 0) return true; // if the params satisfy then no reason to go further

    bool ok = false;
    QString ret = QString::null;
    for(it = mlist.begin(); it != mlist.end(); it++) {
        ret = QInputDialog::getText(QObject::tr("Missing Report Parameter"), QString(QObject::tr("Enter in a value for the parameter \"%1\":")).arg(*it),
                                     QLineEdit::Normal, QString::null, &ok, widget);
        if(!ok || ret.isEmpty()) return false;
        _internal->_lstParameters.append(Parameter(*it, ret));
    }

    // now that we have gathered up the information we needed we will check
    // one more time and return the value to indicate if everything went as planned
    return doParamsSatisfy();

    return false;
}

int orReport::reportError(QWidget *pParent)
{
  if (!_internal->_reportExists)
    QMessageBox::critical( pParent, QObject::tr("Report Definition Not Found"),
                           QObject::tr( "The report definition for this report, \"%1\" cannot be found.\n"
                                        "Please contact your Systems Administrator and report this issue." )
                           .arg(_internal->_reportName) );
  else
    QMessageBox::critical( pParent, QObject::tr("Unknown Error"),
                           QObject::tr( "An unknown error was encountered while processing your request.\n"
                                        "Please contact your Systems Administrator and report this issue." ) );
//  ToDo  Add support for unsatisfied parameters list and return something meaningful
  return -1;
}
