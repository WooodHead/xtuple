include( ../global.pri )

TEMPLATE = app
CONFIG += qt warn_on
INCLUDEPATH += ../common ../$${OPENRPT_DIR}/common ../$${XTUPLE_DIR}/common

TARGET = updater
OBJECTS_DIR = tmp
MOC_DIR     = tmp
UI_DIR      = tmp

LIBS += -L../$${OPENRPT_DIR}/lib -L../$${XTUPLE_DIR}/lib -lxtuplecommon -L../lib -lcommon -lupdatercommon
macx: LIBS += -lz

DESTDIR = ../bin

#The following line was changed from FORMS to FORMS3 by qt3to4
FORMS3  += loaderwindow.ui
HEADERS += data.h \
           loaderwindow.ui.h
SOURCES += data.cpp \
           main.cpp
#The following line was inserted by qt3to4
QT += xml  sql qt3support 
#The following line was inserted by qt3to4
CONFIG += uic3

