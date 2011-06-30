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

void login::init()
{
  _splash = 0;

  _captive = false;

  _password->setEchoMode(QLineEdit::Password);
}

int login::set(ParameterList &pParams)
{
  return set(pParams, 0);
}

int login::set(ParameterList &pParams, QSplashScreen *pSplash)
{
  _splash = pSplash;
  
  QVariant param;
  bool     valid;

  param = pParams.value("username", &valid);
  if (valid)
  {
    _username->setText(param.toString());
    _password->setFocus();
    _captive = TRUE;
  }
  else
  {
    _username->setFocus();
    _captive = FALSE;
  }

  param = pParams.value("copyright", &valid);
  if (valid)
    _copyrightLit->setText(param.toString());

  param = pParams.value("version", &valid);
  if (valid)
    _versionLit->setText(tr("Version ") + param.toString());

  param = pParams.value("build", &valid);
  if (valid)
    _build->setText(param.toString());

  param = pParams.value("name", &valid);
  if (valid)
  {
    _nameLit->setText(param.toString());
  }

  param = pParams.value("databaseURL", &valid);
  if (valid)
    _databaseURL = param.toString();
  else
  {
    QSettings settings;
    settings.setPath("OpenMFG.com", "OpenRPT", QSettings::User);
    _databaseURL = settings.readEntry("/OpenRPT/_databaseURL", "pgsql://127.0.0.1/mfg:5432");
  }

  populateDatabaseInfo();

  return 0;
}

void login::sLogin()
{
  QSqlDatabase *db;

// Open the Database Driver
  if (_splash)
  {
    _splash->show();
    _splash->message(tr("Initializing the Database Connector"));
    qApp->processEvents();
  }

  QString databaseURL;
  databaseURL = _databaseURL;
  QString protocol;
  QString hostName;
  QString dbName;
  QString port;
  parseDatabaseURL(databaseURL, protocol, hostName, dbName, port);
  if("odbc" == protocol)
    db = QSqlDatabase::addDatabase("QODBC3");
  else
    db = QSqlDatabase::addDatabase("QPSQL7");
  if (!db)
  {
    QMessageBox::warning( this, tr("No Database Driver"),
                          tr( "A connection could not be established with the specified\n"
                              "Database as the Proper Database Drivers have not been installed.\n"
                                 "Contact your Systems Administator.\n"  ));
    
    if (_splash)
      _splash->hide();
    
    return;
  }

//  Try to connect to the Database
  db->setDatabaseName(dbName);
  db->setHostName(hostName);
  db->setPort(port.toInt());

  _cUsername = _username->text().stripWhiteSpace();
  _cPassword = _password->text().stripWhiteSpace();

  db->setUserName(_cUsername);
  db->setPassword(_cPassword);
  setCursor(QCursor(waitCursor));

  if (_splash)
  {
    _splash->message(tr("Connecting to the Database"));
    qApp->processEvents();
  }
  
  bool result = db->open();

  if (!result)
  {
    if (_splash)
      _splash->hide();
    
    setCursor(QCursor(arrowCursor));

    QMessageBox::critical( this, tr("Cannot Connect to Database Server"),
                           tr( "A connection to the specified Database Server cannot be made.  This may be due to an\n"
                               "incorrect Username and/or Password or that the Database Server in question cannot\n"
                               "support anymore connections.\n\n"
                               "Please verify your Username and Password and try again or wait until the specified\n"
                               "Database Server is less busy.\n\n"
                               "System Error '%1'" ).arg(db->lastError().driverText() ));
    if (!_captive)
    {
      _username->setText("");
      _username->setFocus();
    }
    else
      _password->setFocus();

    _password->setText("");
    return;
  }

  if (_splash)
  {
    _splash->message(tr("Logging into the Database"));
    qApp->processEvents();
  }
  
  setCursor(QCursor(arrowCursor));
  accept();
}

void login::sOptions()
{
  ParameterList params;
  params.append("databaseURL", _databaseURL);

  loginOptions newdlg(this, "", TRUE);
  newdlg.set(params);
  if (newdlg.exec() != QDialog::Rejected)
  {
    _databaseURL = newdlg._databaseURL;
    populateDatabaseInfo();
  }
}

void login::populateDatabaseInfo()
{
  QString protocol;
  QString hostName;
  QString dbName;
  QString port;

  parseDatabaseURL(_databaseURL, protocol, hostName, dbName, port);
  _server->setText(hostName);
  _database->setText(dbName);
}

QString login::username()
{
  return _cUsername;
}

QString login::password()
{
  return _cPassword;
}

