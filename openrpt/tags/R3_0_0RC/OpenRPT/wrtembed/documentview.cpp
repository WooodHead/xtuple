/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2008 by OpenMFG, LLC
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

#include "documentview.h"
#include "documentscene.h"
#include "reportgridoptions.h"
#include "reportpageoptions.h"
#include "reporthandler.h"
#include "graphicsitems.h"
#include "graphicssection.h"

// common
#include <xsqlquery.h>

// qt
#include <QtGui>
#include <QSqlError>
#include <QWheelEvent>

// images
#include <document.xpm>

DocumentView::DocumentView(QWidget * parent)
  : QGraphicsView(parent)
{
  _scale = 1.0;
}

DocumentView::DocumentView(QGraphicsScene * gs, QWidget * parent)
  : QGraphicsView(gs, parent)
{
  _scale = 1.0;
}

void DocumentView::wheelEvent(QWheelEvent * e)
{
  e->accept();
  _scale = 1.0 + (e->delta() / 1000.0);
  _scale = qMax(0.5, _scale);
  _scale = qMin(2.0, _scale);

  scale(_scale, _scale);

  //QGraphicsView::wheelEvent(e);
}
