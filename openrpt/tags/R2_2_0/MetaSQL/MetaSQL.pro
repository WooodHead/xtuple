#
# OpenRPT report writer and rendering engine
# Copyright (C) 2001-2007 by OpenMFG, LLC
#
# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public
# License as published by the Free Software Foundation; either
# version 2.1 of the License, or (at your option) any later version.
#
# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
# Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public
# License along with this library; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
# Please contact info@openmfg.com with any questions on this license.
#

include( ../global.pri )

TEMPLATE = app
CONFIG += qt warn_on

INCLUDEPATH += ../common
DEPENDPATH += ../common

unix:TARGET=metasql
DESTDIR = ../bin
UI_DIR = tmp
MOC_DIR = tmp
OBJECTS_DIR = tmp

LIBS += -L../lib -lcommon

# Input
FORMS   += booledit.ui \
           doubleedit.ui \
           intedit.ui \
           listedit.ui \
           stringedit.ui \
           newvariant.ui \
           parameteredit.ui \
           logoutput.ui \
           resultsoutput.ui \
           mqledit.ui

HEADERS += metasql.h \
           booledit.h \
           doubleedit.h \
           intedit.h \
           listedit.h \
           logoutput.h \
           mqledit.h \
           newvariant.h \
           parameteredit.h \
           resultsoutput.h \
           stringedit.h \
           qlistboxvariant.h \
           data.h

SOURCES += metasql.cpp \
           booledit.cpp \
           doubleedit.cpp \
           intedit.cpp \
           listedit.cpp \
           logoutput.cpp \
           mqledit.cpp \
           newvariant.cpp \
           parameteredit.cpp \
           resultsoutput.cpp \
           stringedit.cpp \
           qlistboxvariant.cpp \
           data.cpp \
           main.cpp

#The following line was inserted by qt3to4
QT +=  sql qt3support 

RESOURCES += ../OpenRPT/images/OpenRPTMetaSQL.qrc
