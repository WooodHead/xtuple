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
 *     This file contains the class definitions used for rendering reports
 * and is based largely on top of the openReports.h file done by Jeffrey Lyon.
 */

#ifndef __ORRENDERER_H__
#define __ORRENDERER_H__

class orReportPrivate;
class QWidget;
class ParameterList;
class QSqlDatabase;

#include <qstringlist.h>
#include <qpainter.h>
#include <qprinter.h>
#include <qimage.h>
#include <qfont.h>
#include <qdom.h>


class orReport {
  private:
    void constructor(const QString &);

    orReportPrivate *_internal;

  public:
    orReport(QSqlDatabase * = 0);
    orReport(const QString &, QSqlDatabase * = 0);
    orReport(const QString &, const QStringList &, QSqlDatabase * = 0);
    orReport(const char *, const ParameterList &, QSqlDatabase * = 0);
    orReport(const QString &, const ParameterList &, QSqlDatabase * = 0);
    ~orReport();

    bool    render(QPainter *, QPrinter * = 0);
    bool    print(QPrinter * = 0, bool = TRUE);

    void    setWatermarkText(const QString &);
    void    setWatermarkFont(const QFont &);
    void    setWatermarkOpacity(unsigned char);      // 0..255 : default 25

    QString watermarkText();
    QFont   watermarkFont();
    unsigned char watermarkOpacity();

    void    setBackgroundImage(const QImage &);
    void    setBackgroundRect(const QRect &);
    void    setBackgroundRect(int, int, int, int); 
    void    setBackgroundOpacity(unsigned char);     // 0..255 : default 25
    void    setBackgroundAlignment(int);             // Qt::AlignmentFlags
    void    setBackgroundScale(bool);
    void    setBackgroundScaleMode(QImage::ScaleMode);

    QImage  backgroundImage();
    QRect   backgroundRect();
    unsigned char backgroundOpacity();
    int     backgroundAlignment();
    bool    backgroundScale();
    QImage::ScaleMode backgroundScaleMode();
    
    void    setDatabase(QSqlDatabase *);

    bool    setDom(const QDomDocument &docPReport);
    void    setParamList(const QStringList &);
    void    setParamList(const ParameterList &);
    ParameterList getParamList();
    bool    isValid();
    bool    doesReportExist();
    bool    doParamsSatisfy();
    bool    satisfyParams(QWidget *);
    int     reportError(QWidget *);
};

#endif

