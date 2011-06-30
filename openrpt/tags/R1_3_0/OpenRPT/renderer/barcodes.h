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

#ifndef __BARCODES_H__
#define __BARCODES_H__

#include <qrect.h>
#include <qstring.h>

//
// 3of9
//
void render3of9(const QRect &, const QString &, int align, QPainter *);

//
// 3of9+
//
void renderExtended3of9(const QRect &, const QString &, int align, QPainter *);

//
// Code 128
//
void renderCode128(const QRect &, const QString &, int align, QPainter *);

//
// Code EAN/UPC
//
void renderCodeEAN13(const QRect &, const QString &, int align, QPainter *);
void renderCodeEAN8(const QRect &, const QString &, int align, QPainter *);
void renderCodeUPCA(const QRect &, const QString &, int align, QPainter *);
void renderCodeUPCE(const QRect &, const QString &, int align, QPainter *);

#endif

