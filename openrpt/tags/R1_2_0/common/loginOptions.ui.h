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

void loginOptions::init()
{
  _database->setFocus();
}

void loginOptions::set(ParameterList &pParams)
{
  QVariant param;
  bool     valid;

  param = pParams.value("databaseURL", &valid);
  if (valid)
  {
    _databaseURL = param.toString();

    QString protocol;
    QString server;
    QString database;
    QString port;
    parseDatabaseURL(_databaseURL, protocol, server, database, port);
    if("odbc" == protocol)
      _driver->setCurrentItem(1);
    else
      _driver->setCurrentItem(0);
    _server->setText(server);
    _database->setText(database);
    _port->setText(port);
  }
}

void loginOptions::sSave()
{
  QStringList protocol;
  protocol << QString("psql");
  protocol << QString("odbc");
  buildDatabaseURL(_databaseURL, protocol[_driver->currentItem()], _server->text(), _database->text(), _port->text());
  QSettings setting;
  setting.setPath("OpenMFG.com", "OpenRPT", QSettings::User);
  setting.writeEntry("/OpenRPT/_databaseURL", _databaseURL);

  accept();
}
