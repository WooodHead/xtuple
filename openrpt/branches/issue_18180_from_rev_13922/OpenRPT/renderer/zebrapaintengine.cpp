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
#include <QtDebug>
#include <QHostInfo>
#include <QTextCodec>
#include "zebrapaintengine.h"



ZebraPaintEngine::ZebraPaintEngine(ReportPrinter *parentPrinter) : LabelPaintEngine(parentPrinter, "^"), m_Offset(0)
{
}


void ZebraPaintEngine::drawText ( const QPointF &p, const QString & text, const QFont &font )
{
}


void ZebraPaintEngine::drawBarcode ( const QPointF &p, const QString & text )
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



void ZebraPaintEngine::drawImage ( const QRectF & rectangle, const QImage & image, const QRectF & sr, Qt::ImageConversionFlags flags )
{
}


void 	ZebraPaintEngine::drawLines ( const QLineF * lines, int lineCount )
{
}


void 	ZebraPaintEngine::drawRects ( const QRectF * rects, int rectCount )
{
}
