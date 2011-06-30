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

/*
 *     This file contains all the Report Entity classes. Each one is a
 * derivative of ReportEntity, which in turn is derived from QCanvasItem.
 */

#ifndef __REPORTENTITIES_H__
#define __REPORTENTITIES_H__

// qt
#include <q3canvas.h>
#include <qimage.h>

// common
#include <parsexmlutils.h>


// forward declarations
class QuerySourceList;
class ReportWindow;

class QDomNode;
class QDomDocument;
class QDomElement;

//
// ReportEntity
//
class ReportEntity {
    public:
        enum RttiEntities {
            EntityLabel = 1234,
            EntityField = 1235,
            EntityText  = 1236,
            EntityLine  = 1237,
            EntityBarcode = 1238,
            EntityImage = 1239,
            EntityGraph = 1240
        };

        virtual void propertyDialog(QMap<QString,QColor>*, QuerySourceList*, QWidget*) = 0;

        static void buildXML(Q3CanvasItem * item, QDomDocument & doc, QDomElement & parent);
        virtual void buildXML(QDomDocument & doc, QDomElement & parent) = 0;

        static void buildXMLRect(QDomDocument & doc, QDomElement & entity, QRect rect);
        static void buildXMLFont(QDomDocument & doc, QDomElement & entity, QFont font);

        static QFont getDefaultEntityFont();
        static void  setDefaultEntityFont(const QFont &);

    protected:
        ReportEntity();

    private:
        static bool _readDefaultFont;
        static QFont _defaultFont;
};

//
// ReportEntityLabel
//
class ReportEntityLabel : public Q3CanvasRectangle, public ReportEntity {
    public:
        ReportEntityLabel(ReportWindow *, Q3Canvas * canvas);
        ReportEntityLabel(const QString&, ReportWindow *, Q3Canvas * canvas);
        ReportEntityLabel(const QString&, QFont, ReportWindow *, Q3Canvas * canvas);
        ReportEntityLabel(QDomNode & element, ReportWindow *, Q3Canvas * canvas);

        virtual ~ReportEntityLabel();

        void setText(const QString&);
        void setFont(const QFont&);
        void setColor(const QColor&);
        QString text() const;
        QFont font() const;
        QColor color() const;

        int textFlags() const
            { return flags; }
        void setTextFlags(int);

        virtual void propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent);
        virtual void buildXML(QDomDocument & doc, QDomElement & parent);

        //virtual QRect boundingRect() const;

        virtual int rtti() const;
        static int RTTI;

    protected:
        virtual void drawShape(QPainter&);

    private:
        ReportWindow * _rw;
        QRect getTextRect();
        QString txt;
        int flags;
        QFont fnt;
        QColor col;

};

//
// ReportEntityField
//
class ReportEntityField : public Q3CanvasRectangle, public ReportEntity {
    public:
        ReportEntityField(ReportWindow *, Q3Canvas * canvas);
        ReportEntityField(const QString&, const QString&, ReportWindow *, Q3Canvas * canvas);
        ReportEntityField(const QString&, const QString&, QFont, ReportWindow *, Q3Canvas * canvas);
        ReportEntityField(QDomNode & element, ReportWindow *, Q3Canvas * canvas);

        virtual ~ReportEntityField();

        void setQuery(const QString&);
        void setColumn(const QString&);
        void setFont(const QFont&);
        void setColor(const QColor&);
        void setTrackTotal(bool);
        void setTrackTotalFormat(const QString &, bool=FALSE);
        void setUseSubTotal(bool);
        QString query() const;
        QString column() const;
        QFont font() const;
        QColor color() const;
        bool trackTotal();
        bool trackBuiltinFormat();
        bool useSubTotal();
        QString trackTotalFormat();

        int textFlags() const
            { return flags; }
        void setTextFlags(int);

        virtual void propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent);
        virtual void buildXML(QDomDocument & doc, QDomElement & parent);

        virtual int rtti() const;
        static int RTTI;

    protected:
        virtual void drawShape(QPainter&);

    private:
        ReportWindow * _rw;
        QRect getTextRect();
        QString qry;
        QString clmn;
        int flags;
        QFont fnt;
        QColor col;
        bool _trackTotal;
        bool _trackBuiltinFormat;
        bool _useSubTotal;
        QString _trackTotalFormat;

};

//
// ReportEntityText
//
class ReportEntityText : public Q3CanvasRectangle, public ReportEntity {
    public:
        ReportEntityText(ReportWindow *, Q3Canvas * canvas);
        ReportEntityText(const QString&, const QString&, ReportWindow *, Q3Canvas * canvas);
        ReportEntityText(const QString&, const QString&, QFont, ReportWindow *, Q3Canvas * canvas);
        ReportEntityText(QDomNode & element, ReportWindow *, Q3Canvas * canvas);

        virtual ~ReportEntityText();

        void setQuery(const QString&);
        void setColumn(const QString&);
        void setFont(const QFont&);
        void setColor(const QColor&);
        void setBottomPadding(double bp);
        double bottomPadding() const;
        QString query() const;
        QString column() const;
        QFont font() const;
        QColor color() const;

        int textFlags() const
            { return flags; }
        void setTextFlags(int);

        virtual void propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent);
        virtual void buildXML(QDomDocument & doc, QDomElement & parent);

        virtual int rtti() const;
        static int RTTI;

    protected:
        virtual void drawShape(QPainter&);

    private:
        ReportWindow * _rw;
        QRect getTextRect();
        QString qry;
        QString clmn;
        int flags;
        QFont fnt;
        QColor col;
        double bpad;

};

//
// ReportEntityLine
//
class ReportEntityLine : public Q3CanvasLine, public ReportEntity {
    public:
        ReportEntityLine(ReportWindow *, Q3Canvas * canvas);
        ReportEntityLine(QDomNode & element, ReportWindow *, Q3Canvas * canvas);

        unsigned int weight() const;
        void setWeight(int w);

        void propertyDialog(QMap<QString,QColor>*, QuerySourceList*, QWidget * parent);
        virtual void buildXML(QDomDocument & doc, QDomElement & parent);

        virtual int rtti() const;
        static int RTTI;

    protected:
        virtual void drawShape(QPainter&);

    private:
        ReportWindow * _rw;
};

//
// ReportEntityBarcode
//
class ReportEntityBarcode : public Q3CanvasRectangle, public ReportEntity {
    public:
        ReportEntityBarcode(ReportWindow *, Q3Canvas * canvas);
        ReportEntityBarcode(const QString&, const QString&, ReportWindow *, Q3Canvas * canvas);
        ReportEntityBarcode(QDomNode & element, ReportWindow *, Q3Canvas * canvas);

        virtual ~ReportEntityBarcode();

        void setFormat(const QString&);
        void setQuery(const QString&);
        void setColumn(const QString&);
        void setColor(const QColor&);
        void setMaxLength(int i);
        void setAlignment(int i);
        QString format() const;
        QString query() const;
        QString column() const;
        QColor color() const;
        int maxLength();
        int alignment();

        virtual void propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent);
        virtual void buildXML(QDomDocument & doc, QDomElement & parent);

        virtual void setSize(int, int);

        virtual int rtti() const;
        static int RTTI;

    protected:
        virtual void drawShape(QPainter&);

    private:
        QRect getTextRect();
        ReportWindow * _rw;
        QString qry;
        QString clmn;
        QColor col;
        QString frmt;
        int maxlength;
        int _align;

        // all these values are in inches and
        // are for internal use only
        double min_width_data;
        double min_width_total;
        double min_height;

};

//
// ReportEntityImage
//
class ReportEntityImage : public Q3CanvasRectangle, public ReportEntity {
    public:
        ReportEntityImage(ReportWindow *, Q3Canvas * canvas);
        ReportEntityImage(QDomNode & element, ReportWindow *, Q3Canvas * canvas);

        virtual ~ReportEntityImage();

        bool isInline();
        void setInline(bool);

        void setQuery(const QString&);
        void setColumn(const QString&);
        QString query() const;
        QString column() const;

        QString inlineImageData();
        void setInlineImageData(QString);

        void setMode(QString);
        QString mode();


        virtual void propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent);
        virtual void buildXML(QDomDocument & doc, QDomElement & parent);

        virtual int rtti() const;
        static int RTTI;

    protected:
        virtual void drawShape(QPainter&);

    private:
        ReportWindow * _rw;
        bool _img_inline;

        QString qry;
        QString clmn;

        QString _mode;

        QImage  img;
        QString img_data;
        QString _frmt;

};

//
// ReportEntityGraph
//
class ReportEntityGraph : public Q3CanvasRectangle, public ReportEntity {
    public:
        ReportEntityGraph(ReportWindow *, Q3Canvas * canvas);
        ReportEntityGraph(QDomNode & element, ReportWindow *, Q3Canvas * canvas);
        ReportEntityGraph(ORGraphData &, ReportWindow *, Q3Canvas *);

        virtual ~ReportEntityGraph();

        void copyData(ORGraphData &);

        void setQuery(const QString &);
        QString query();

        virtual void propertyDialog(QMap<QString,QColor>*, QuerySourceList * qsl, QWidget * parent);
        virtual void buildXML(QDomDocument & doc, QDomElement & parent);

        virtual int rtti() const;
        static int RTTI;
    protected:
        virtual void drawShape(QPainter&);

    private:
        ReportWindow * _rw;
        ORGraphData _graphData;

};

#endif

