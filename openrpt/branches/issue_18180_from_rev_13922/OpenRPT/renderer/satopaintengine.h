/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2012 by OpenMFG, LLC
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 * Please contact info@openmfg.com with any questions on this license.
 */

#ifndef SATOPAINTENGINE_H
#define SATOPAINTENGINE_H

#include <QPaintEngine>
#include "reportprinter.h"

class SatoPaintEngine : public QPaintEngine
{
public:
  SatoPaintEngine(ReportPrinter *parentPrinter);

  virtual bool 	begin ( QPaintDevice * pdev );

  virtual void 	drawEllipse ( const QRectF & rect );
  virtual void 	drawEllipse ( const QRect & rect );
  virtual void 	drawImage ( const QRectF & rectangle, const QImage & image, const QRectF & sr, Qt::ImageConversionFlags flags = Qt::AutoColor );
  virtual void 	drawLines ( const QLineF * lines, int lineCount );
  virtual void 	drawPath ( const QPainterPath & path );
  virtual void 	drawPixmap ( const QRectF & r, const QPixmap & pm, const QRectF & sr );
  virtual void 	drawPoints ( const QPointF * points, int pointCount );
  virtual void 	drawPoints ( const QPoint * points, int pointCount );
  virtual void 	drawPolygon ( const QPointF * points, int pointCount, PolygonDrawMode mode );
  virtual void 	drawPolygon ( const QPoint * points, int pointCount, PolygonDrawMode mode );
  virtual void 	drawRects ( const QRectF * rects, int rectCount );
  virtual void 	drawTextItem ( const QPointF & p, const QTextItem & textItem );
  virtual void 	drawTiledPixmap ( const QRectF & rect, const QPixmap & pixmap, const QPointF & p );

  virtual bool 	end ();
  virtual Type 	type () const;
  virtual void 	updateState ( const QPaintEngineState & state );

  virtual bool newPage();

  void			setPrintToBuffer() {m_printToBuffer = true;}
  QByteArray	getBuffer() const {return m_printBuffer;}

protected:
  virtual QString rotation0Cmd() const { return "%0"; }
  virtual QString rotation90Cmd() const { return "%3"; }
  virtual QString rotation180Cmd() const { return "%2"; }
  virtual QString rotation270Cmd() const { return "%1"; }
  bool    isProportionnal ( const QFont &font ) const;

private:

  ReportPrinter *m_parentPrinter;
  QByteArray m_printBuffer;
  QString   m_CmdPrefix;
  bool		m_printToBuffer;

  QTransform m_Rotation90;
  QTransform m_Rotation180;
  QTransform m_Rotation270;

  QList<QRect> m_ReverseZones;

  QString transformRotationCmd();
  void	drawBarcode ( const QPointF & p, const QString &text );
  void drawText ( const QPointF &p, const QString & text, const QFont &font = QFont());

};

#endif // SATOPAINTENGINE_H
