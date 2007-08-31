include( ../global.pri )

TEMPLATE = lib
CONFIG += qt warn_on thread staticlib

INCLUDEPATH += $(QTDIR)/src/3rdparty/zlib

TARGET = updatercommon
DESTDIR = ../lib
OBJECTS_DIR = tmp
MOC_DIR = tmp
UI_SOURCES_DIR = tmp

HEADERS = package.h \
          script.h \
          loadreport.h \
          prerequisite.h \
          tarfile.h \
          gunzip.h
SOURCES = package.cpp \
          script.cpp \
          loadreport.cpp \
          prerequisite.cpp \
          tarfile.cpp \
          gunzip.cpp
#The following line was inserted by qt3to4
QT += xml  qt3support 
