#
# This file is part of the xTuple ERP: PostBooks Edition, a free and
# open source Enterprise Resource Planning software suite,
# Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
# It is licensed to you under the Common Public Attribution License
# version 1.0, the full text of which (including xTuple-specific Exhibits)
# is available at www.xtuple.com/CPAL.  By using this software, you agree
# to be bound by its terms.
#

exists(../../../xtuple) {
  XTUPLE_DIR = ../../../xtuple
}
exists(../../xtuple) {
  XTUPLE_DIR = ../../xtuple
}
exists(../xtuple) {
  XTUPLE_DIR = ../xtuple
}

exists($${XTUPLE_DIR}/trunk) {
  XTUPLE_DIR = $${XTUPLE_DIR}/trunk
}

! exists($${XTUPLE_DIR}) {
  error("Could not set the XTUPLE_DIR qmake variable.")
}

exists(../../../openrpt) {
  OPENRPT_DIR = ../../../openrpt
}
exists(../../openrpt) {
  OPENRPT_DIR = ../../openrpt
}
exists(../openrpt) {
  OPENRPT_DIR = ../openrpt
}

! exists($${OPENRPT_DIR}) {
  error("Could not set the OPENRPT_DIR qmake variable.")
}

TEMPLATE = app
CONFIG += qt warn_on release
INCLUDEPATH += $${XTUPLE_DIR}/common
INCLUDEPATH += $${OPENRPT_DIR}/common
win32:INCLUDEPATH += .

TARGET = csvimp

OBJECTS_DIR = tmp
MOC_DIR     = tmp
UI_DIR      = tmp

LIBS += -L$${XTUPLE_DIR}/lib -lxtuplecommon
LIBS += -L$${OPENRPT_DIR}/lib -lcommon

# Input
#The following line was changed from FORMS to FORMS3 by qt3to4
FORMS3   += csvtoolwindow.ui \
           csvloadprogress.ui \
           csvimportprogress.ui \
           logwindow.ui \
           missingfield.ui \
           csvatlaswindow.ui

HEADERS += csvdata.h \
           csvmap.h \
           csvatlas.h \
           rowcontroller.h \
           data.h

SOURCES += csvdata.cpp \
           csvmap.cpp \
           csvatlas.cpp \
           rowcontroller.cpp \
           data.cpp \
           main.cpp

#The following line was inserted by qt3to4
QT += xml  sql 
#The following line was inserted by qt3to4
CONFIG += uic3

RESOURCES += csvimp.qrc

QT += qt3support
macx {
  CONFIG += x86 ppc
}

