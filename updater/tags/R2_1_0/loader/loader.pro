#
# This file is part of the xTuple ERP: PostBooks Edition, a free and
# open source Enterprise Resource Planning software suite,
# Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
# It is licensed to you under the Common Public Attribution License
# version 1.0, the full text of which (including xTuple-specific Exhibits)
# is available at www.xtuple.com/CPAL.  By using this software, you agree
# to be bound by its terms.
#

include( ../global.pri )

TEMPLATE = app
CONFIG += qt warn_on
INCLUDEPATH += ../common ../$${OPENRPT_DIR}/common ../$${XTUPLE_DIR}/common
DEPENDPATH  += ../common

TARGET = updater
OBJECTS_DIR = tmp
MOC_DIR     = tmp
UI_DIR      = tmp

LIBS += -L../$${OPENRPT_DIR}/lib -L../$${XTUPLE_DIR}/lib -lxtuplecommon -L../lib -lupdatercommon -lcommon
macx: LIBS += -lz
macx: PRE_TARGETDEPS += ../lib/libupdatercommon.a

DESTDIR = ../bin

FORMS   += loaderwindow.ui
HEADERS += loaderwindow.h
SOURCES += loaderwindow.cpp \
           main.cpp

QT += xml sql

