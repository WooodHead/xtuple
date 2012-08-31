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

#include <QPrinter>
#include <QPrintEngine>
#include <QFile>
#include <QBuffer>
#include <QtDebug>
#include <QHostInfo>
#include <QTextCodec>
#include "zebrapaintengine.h"



ZebraPaintEngine::ZebraPaintEngine(ReportPrinter *parentPrinter) : LabelPaintEngine(parentPrinter, "^"), m_Offset(0)
{
}


bool 	ZebraPaintEngine::begin ( QPaintDevice * pdev )
{
  int height = m_parentPrinter->paperRect().height() * (resolution()/72.0); // ?? doc says that paperRect() is in device coordinates, but we get it in PS points

  m_Offset = height * density();

  QString init = m_CmdPrefix + "XA";

  if(!customInitString().isEmpty()) {
    init += customInitString();
  }
  else {
    init += QString("%1LL%2,0%3CI8").arg(m_CmdPrefix).arg(m_Offset).arg(m_CmdPrefix);
  }

  init += "\n";

  m_printBuffer.append(init);
  return true;
}


void 	ZebraPaintEngine::addEndMessage ()
{
  QString printMode = m_parentPrinter->getParam("printmode");
  if(printMode.isEmpty()) {
    printMode = "T";
  }
  m_printBuffer += QString("%1MM%2").arg(m_CmdPrefix).arg(printMode);
  m_printBuffer += QString("%1PQ%2%3").arg(m_CmdPrefix).arg(m_parentPrinter->copyCount()).arg(m_parentPrinter->getParam("printqty_options"));
  m_printBuffer += QString("%1XZ\n").arg(m_CmdPrefix);
}


void ZebraPaintEngine::drawText ( const QPointF &p, const QString & text, const QFont &font, int width )
{
  QTransform transform = painter()->worldTransform();

  int xInDots = (int)(transform.dy());
  int yInDots = m_Offset - (int)(transform.dx());

  int averageCarWidth = width / text.length();

  QString output = QString(m_CmdPrefix + "FO%1,%2" + m_CmdPrefix + "FW%3").arg(xInDots).arg(yInDots).arg(transformRotationCmd());
  output += QString(m_CmdPrefix + "A0,0,%4" + m_CmdPrefix + "FD" + text + m_CmdPrefix + "FS\n").arg(averageCarWidth);

  QTextCodec *codec = QTextCodec::codecForName("IBM 850");
  m_printBuffer.append(codec->fromUnicode(output));
}


void ZebraPaintEngine::drawBarcode ( const QPointF & p, const QString &format, int height, int narrowBar, QString barcodeData )
{
  QString barcodeFont;
  if(format == "3of9" || format == "3of9+")
    barcodeFont = "B3";
  else if(format == "128")
    barcodeFont = "BC";
  else if(format == "ean13" || format == "upc-a")
    barcodeFont = "B8";
  else if(format == "ean8")
    barcodeFont = "B8";
  else if(format == "upc-e")
    barcodeFont = "B9";
  else if(format == "i2of5")
    barcodeFont = "BI";
  else {
    drawText(p, "ERR: " + format);
  }

  QTransform transform = painter()->worldTransform();

  int yInDots = m_Offset - (int)(transform.dx());
  int xInDots = (int)(transform.dy());

  qreal narrowWidthRatio = 2.5;

  m_printBuffer += QString(m_CmdPrefix + "FO%1,%2" + m_CmdPrefix + "FW%3").arg(xInDots).arg(yInDots).arg(transformRotationCmd());
  m_printBuffer += QString(m_CmdPrefix + "BY%1,%2,%3" + m_CmdPrefix + barcodeFont + m_CmdPrefix + "FD" + barcodeData + m_CmdPrefix + "FS\n").arg(narrowBar).arg(narrowWidthRatio).arg(height);
}


void ZebraPaintEngine::drawImage ( const QRectF & rectangle, const QImage & image, const QRectF & sr, Qt::ImageConversionFlags flags )
{
  QTransform transform = painter()->worldTransform();

  int xInDots = (int)(rectangle.top() + transform.dy());
  int yInDots = m_Offset - (int)(rectangle.left() + transform.dx());

  QImage monoImage = image.convertToFormat(QImage::Format_Mono);

  m_printBuffer += QString("%1DYIMAGE,P,G,%2,0,:Z64:").arg(m_CmdPrefix).arg(monoImage.byteCount());
  QByteArray encodedImage;
  QBuffer buffer(&encodedImage);
  buffer.open(QIODevice::Append);
  monoImage.save(&buffer, "PNG");
  encodedImage = encodedImage.toBase64();
  m_printBuffer.append(encodedImage);

  qint16 icrc = qChecksum(encodedImage.data(), encodedImage.length());
  char crc[sizeof(icrc)];
  memcpy (crc, &icrc, sizeof(icrc));
  m_printBuffer += ":";
  m_printBuffer.append(crc,sizeof(icrc));
  m_printBuffer += "\n";

  m_printBuffer += QString(m_CmdPrefix + "FO%1,%2" + m_CmdPrefix + "XGR:IMAGE.GRF,1,1," + m_CmdPrefix + "FS\n").arg(xInDots).arg(yInDots);
}


void 	ZebraPaintEngine::drawLines ( const QLineF * lines, int lineCount )
{
  for (int i=0; i< lineCount; i++) {

    QTransform transform = painter()->worldTransform();

    int xInDots = (int)(lines[i].x1() + transform.dx());
    int yInDots = m_Offset - (int)(lines[i].y1() + transform.dy());

    int length = (int) lines[i].length();
    int widthInDots = 0;
    int heightInDots = 0;

    qreal angle = lines[i].angle();
    if(angle==0) {
      widthInDots = length;
      heightInDots = 0;
    }
    else if(angle<=90) {
      widthInDots = 0;
      heightInDots = length;
    }
    else if(angle<=180) {
      widthInDots = length;
      heightInDots = 0;
      xInDots -= length;
    }
    else {
      widthInDots = 0;
      heightInDots = length;
      yInDots += length;
    }

    int thickness = painter()->pen().width();
    if(thickness<=0) {
      thickness = 1;
    }

    m_printBuffer += QString(m_CmdPrefix + "FO%1,%2").arg(xInDots).arg(yInDots);
    m_printBuffer += QString(m_CmdPrefix + "GB%1,%2,%3" + m_CmdPrefix + "FS\n").arg(widthInDots).arg(heightInDots).arg(thickness);
  }
}


void 	ZebraPaintEngine::drawRects ( const QRectF * rects, int rectCount )
{
  for (int i=0; i< rectCount; i++) {

    QTransform transform = painter()->worldTransform();

    int xInDots = (int)(rects[i].left() + transform.dx());
    int yInDots = m_Offset - (int)(rects[i].top() + transform.dy());

    int width = (int)(rects[i].width());
    int height = (int)(rects[i].height());

    int thickness = painter()->pen().width();
    if(painter()->brush().style() != Qt::NoBrush && painter()->brush().color()==Qt::black) {
      thickness = qMin(width, height); // filled rectangle
    }
    else if(thickness<=0) {
      thickness = 1;
    }

    m_printBuffer += QString(m_CmdPrefix + "FO%1,%2").arg(xInDots).arg(yInDots);
    m_printBuffer += QString(m_CmdPrefix + "GB%1,%2,%3" + m_CmdPrefix + "FS\n").arg(width).arg(height).arg(thickness);
  }
}

