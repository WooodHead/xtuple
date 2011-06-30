#
# Copyright (c) 2002-2007 by OpenMFG, LLC
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
#
# If you do not wish to be bound by the terms of the GNU General Public
# License, DO NOT USE THIS SOFTWARE.  Please contact OpenMFG, LLC at
# info@openmfg.com for details on how to purchase a commercial license.
#

include( ../../global.pri )

TEMPLATE = lib
CONFIG += qt warn_on staticlib

INCLUDEPATH = ../../common ../common ../images


DESTDIR = ../../lib
MOC_DIR = tmp
UI_DIR = tmp
OBJECTS_DIR = tmp
QT += xml sql qt3support 
#VERSION = 0.1.0

#The following line was changed from FORMS to FORMS3 by qt3to4
FORMS   += labeleditor.ui \
           queryeditor.ui \
           querylist.ui \
           pagesetup.ui \
           sectioneditor.ui \
           detailsectiondialog.ui \
           fieldeditor.ui \
           texteditor.ui \
           barcodeeditor.ui \
           reportproperties.ui \
           reportparameter.ui \
           reportparameterlist.ui \
           reportparameterlistitem.ui \
           imageeditor.ui \
           coloreditor.ui \
           colorlist.ui \
           grapheditor.ui \
           detailgroupsectiondialog.ui \
           editpreferences.ui \
           dbfiledialog.ui

HEADERS += reportentities.h\
           reportgridoptions.h\
           reportsection.h\
           reportwindow.h\
           reporthandler.h \
           labeleditor.h \
           queryeditor.h \
           querylist.h \
           pagesetup.h \
           sectioneditor.h \
           detailsectiondialog.h \
           fieldeditor.h \
           texteditor.h \
           barcodeeditor.h \
           reportproperties.h \
           reportparameter.h \
           reportparameterlist.h \
           reportparameterlistitem.h \
           imageeditor.h \
           coloreditor.h \
           colorlist.h \
           grapheditor.h \
           detailgroupsectiondialog.h \
           editpreferences.h \
           dbfiledialog.h \
           data.h \
           ../common/querysource.h \
           ../common/labelsizeinfo.h \
           ../common/pagesizeinfo.h \
           ../common/parsexmlutils.h \
           ../common/reportpageoptions.h \
           ../common/builtinformatfunctions.h
SOURCES += reportentities.cpp\
           reportgridoptions.cpp\
           reportsection.cpp\
           reportwindow.cpp\
           reporthandler.cpp \
           labeleditor.cpp \
           queryeditor.cpp \
           querylist.cpp \
           pagesetup.cpp \
           sectioneditor.cpp \
           detailsectiondialog.cpp \
           fieldeditor.cpp \
           texteditor.cpp \
           barcodeeditor.cpp \
           reportproperties.cpp \
           reportparameter.cpp \
           reportparameterlist.cpp \
           reportparameterlistitem.cpp \
           imageeditor.cpp \
           coloreditor.cpp \
           colorlist.cpp \
           grapheditor.cpp \
           detailgroupsectiondialog.cpp \
           editpreferences.cpp \
           dbfiledialog.cpp \
           data.cpp \
           ../common/querysource.cpp \
           ../common/labelsizeinfo.cpp \
           ../common/pagesizeinfo.cpp \
           ../common/parsexmlutils.cpp \
           ../common/reportpageoptions.cpp \
           ../common/builtinformatfunctions.cpp

RESOURCES += ../images/OpenRPTWrtembed.qrc

