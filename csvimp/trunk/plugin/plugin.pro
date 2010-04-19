#
# This file is part of the xTuple ERP: PostBooks Edition, a free and
# open source Enterprise Resource Planning software suite,
# Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
# It is licensed to you under the Common Public Attribution License
# version 1.0, the full text of which (including xTuple-specific Exhibits)
# is available at www.xtuple.com/CPAL.  By using this software, you agree
# to be bound by its terms.
#

TEMPLATE        = lib
CONFIG         += plugin qt warn_on release
TARGET          = $$qtLibraryTarget(csvimpplugin)
DESTDIR         = ../plugins

QT += xml sql

include(../global.pri)

OBJECTS_DIR = tmp
MOC_DIR     = tmp
UI_DIR      = tmp

INCLUDEPATH += ../csvimpcommon ../csvimpcommon/images \
               ../$${OPENRPT_DIR}/common ../$${OPENRPT_DIR}/MetaSQL
win32:INCLUDEPATH += .
DEPENDPATH  += $${INCLUDEPATH}
LIBS += -L../$${OPENRPT_DIR}/lib -lcommon -lMetaSQL

win32-msvc* {
  PRE_TARGETDEPS += ../$${OPENRPT_DIR}/lib/common.lib   \
                    ../$${OPENRPT_DIR}/lib/MetaSQL.lib  \

} else {
  PRE_TARGETDEPS += ../$${OPENRPT_DIR}/lib/libcommon.a  \
                    ../$${OPENRPT_DIR}/lib/libMetaSQL.a \
}

FORMS    = csvatlaswindow.ui    \
           csvimportprogress.ui \
           csvtoolwindow.ui     \
           logwindow.ui         \
           missingfield.ui      \

HEADERS  = csvimpplugin.h               \
           csvatlas.h                   \
           csvatlaswindow.h             \
           csvdata.h                    \
           csvmap.h                     \
           csvtoolwindow.h              \
           logwindow.h                  \
           missingfield.h               \
           rowcontroller.h              \
           ../csvimpcommon/csvimpdata.h \
           ../csvimpcommon/csvimpplugininterface.h      \

SOURCES  = csvimpplugin.cpp     \
           csvatlas.cpp         \
           csvatlaswindow.cpp   \
           csvdata.cpp          \
           csvmap.cpp           \
           csvtoolwindow.cpp    \
           logwindow.cpp        \
           missingfield.cpp     \
           rowcontroller.cpp    \
           ../csvimpcommon/csvimpdata.cpp \

RESOURCES += ../csvimpcommon/csvimp.qrc
