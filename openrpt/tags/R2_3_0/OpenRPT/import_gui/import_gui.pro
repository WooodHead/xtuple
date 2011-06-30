#
# OpenRPT report writer and rendering engine
# Copyright (C) 2001-2008 by OpenMFG, LLC
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

include( ../../global.pri )

TEMPLATE = app
CONFIG += qt warn_on
INCLUDEPATH += ../common ../../common .

TARGET=importrptgui

OBJECTS_DIR = tmp
MOC_DIR     = tmp
UI_DIR      = tmp

LIBS += -L../../lib -lcommon

DESTDIR = ../../bin

# Input
#The following line was changed from FORMS to FORMS3 by qt3to4
FORMS   += importwindow.ui

HEADERS += data.h \
           importwindow.h \
           ../common/builtinSqlFunctions.h \		# MANU
           listboxreportitem.h

SOURCES += data.cpp \
           importwindow.cpp \
           ../common/builtinSqlFunctions.cpp \		# MANU
           listboxreportitem.cpp \
           main.cpp

#The following line was inserted by qt3to4
QT += xml  sql qt3support 

