/*
 * OpenRPT report writer and rendering engine
 * Copyright (C) 2001-2007 by OpenMFG, LLC
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

#include "data.h"

#include <qobject.h>

#if defined Q_WS_WIN
QString _name = QObject::tr("MQLEdit for Windows");
#elif defined Q_WS_X11
QString _name = QObject::tr("MQLEdit for Linux");
#elif defined Q_WS_MAC
QString _name = QObject::tr("MQLEdit for OS X");
#else
QString _name = QObject::tr("MQLEdit");
#endif


QString _copyright = QObject::tr("Copyright (c) 2002-2007, OpenMFG, LLC.");
QString _version = QObject::tr("2.2.0");
QString _databaseURL;

bool _loggedIn = FALSE;

