include( ../global.pri )

TEMPLATE = app
CONFIG += qt warn_on thread

DESTDIR = ../bin

INCLUDEPATH += ../common
LIBS += -L../lib -lupdatercommon

MOC_DIR = tmp
UI_DIR = tmp
OBJECTS_DIR = tmp

HEADERS += packagewindow.ui.h
#The following line was changed from INTERFACES to FORMS3 by qt3to4
FORMS3 += packagewindow.ui \
              texteditdialog.ui \
              providerdialog.ui \
              newprereqdialog.ui \
              queryeditor.ui
SOURCES += main.cpp
#The following line was inserted by qt3to4
QT += xml  qt3support 
#The following line was inserted by qt3to4
CONFIG += uic3

