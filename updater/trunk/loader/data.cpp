#include "data.h"

#include <qobject.h>

#if defined Q_WS_WIN
QString _name = QObject::tr("Update Manager for Windows");
#elif defined Q_WS_X11
QString _name = QObject::tr("Update Manager for Linux");
#elif defined Q_WS_MAC
QString _name = QObject::tr("Update Manager for Mac");
#else
QString _name = QObject::tr("Update Manager");
#endif


QString _copyright = QObject::tr("Copyright (c) 2004-2005, OpenMFG, LLC");
QString _version = QObject::tr("1.0");

QString _user;
int     _usrid;

bool _evaluation = FALSE;
bool _loggedIn = FALSE;
