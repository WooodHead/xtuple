#
# This file is part of the xTuple ERP: PostBooks Edition, a free and
# open source Enterprise Resource Planning software suite,
# Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
# It is licensed to you under the Common Public Attribution License
# version 1.0, the full text of which (including xTuple-specific Exhibits)
# is available at www.xtuple.com/CPAL.  By using this software, you agree
# to be bound by its terms.
#

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
INCLUDEPATH += $${OPENRPT_DIR}/common $${OPENRPT_DIR}/MetaSQL
win32:INCLUDEPATH += .

TARGET = csvimp

OBJECTS_DIR = tmp
MOC_DIR     = tmp
UI_DIR      = tmp

LIBS += -L$${OPENRPT_DIR}/lib -lcommon -lMetaSQL

win32-msvc* {
  PRE_TARGETDEPS += $${OPENRPT_DIR}/lib/common.lib      \
                    $${OPENRPT_DIR}/lib/MetaSQL.lib     \

} else {
  PRE_TARGETDEPS += $${OPENRPT_DIR}/lib/libcommon.a      \
                    $${OPENRPT_DIR}/lib/libMetaSQL.a     \
}


# Input
FORMS   += \
           csvatlaswindow.ui    \
           csvimportprogress.ui \
           csvtoolwindow.ui \
           logwindow.ui \
           missingfield.ui \

HEADERS += \
           csvatlas.h \
           csvatlaswindow.h     \
           csvdata.h \
           csvmap.h \
           csvtoolwindow.h \
           data.h \
           logwindow.h \
           missingfield.h \
           rowcontroller.h \

SOURCES += \
           csvatlas.cpp \
           csvatlaswindow.cpp \
           csvdata.cpp \
           csvmap.cpp \
           csvtoolwindow.cpp \
           data.cpp \
           logwindow.cpp \
           main.cpp \
           missingfield.cpp \
           rowcontroller.cpp \

QT += xml sql

RESOURCES += csvimp.qrc

macx:exists(macx.pri) {
  include(macx.pri)
}

win32:exists(win32.pri) {
  include(win32.pri)
}

unix:exists(unix.pri) {
  include(unix.pri)
}
