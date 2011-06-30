/*
 * Copyright (c) 2002-2005 by OpenMFG, LLC
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

#include "dbtools.h"

void parseDatabaseURL(const QString &pDatabaseURL, QString &pServer, QString &pDatabase, QString &pPort)
{
  unsigned int location;
  unsigned int cursor;

//	Parse through the Database URL, pulling out info
//	Grab the Service name, and ignore it for now because we only
//	support PostgreSQL at this time
  location = pDatabaseURL.find("://");
  location += 3;

//	Grab the Server name
  cursor = pDatabaseURL.find("/", location);
  pServer = pDatabaseURL.mid(location, (cursor - location));
  location = cursor + 1;

//	Grab the Database name
  cursor = pDatabaseURL.find(":", location);
  pDatabase = pDatabaseURL.mid(location, (cursor - location));
  location = cursor + 1;

//	Grab the Database port
  pPort = pDatabaseURL.right(pDatabaseURL.length() - location);
}

void buildDatabaseURL(QString &pTarget, const QString &pServer, const QString &pDatabase, const QString &pPort)
{
  pTarget = "psql://" + pServer + "/" + pDatabase + ":" + pPort;
}

