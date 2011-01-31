# 
# This file is part of the xTuple ERP: PostBooks Edition, a free and 
# open source Enterprise Resource Planning software suite, 
# Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
# It is licensed to you under the Common Public Attribution License 
# version 1.0, the full text of which (including xTuple-specific Exhibits) 
# is available at www.xtuple.com/CPAL.  By using this software, you agree 
# to be bound by its terms. 
#
cmake_minimum_required (VERSION 2.6)
project (XTLIB)

SET(CMAKE_MODULE_PATH ${XTLIB_SOURCE_DIR} ${XTLIB_SOURCE_DIR}/cmake)
SET(POSTGRES_ROOT "/usr" CACHE PATH "directory containing postgresql (overrides USERLIB_ROOT)")

INCLUDE(cmake/FindPostgreSQL.txt)
include( cmake/${CMAKE_SYSTEM_NAME}.txt OPTIONAL RESULT_VARIABLE SYSTEM_INCLUDE_FILE )
message( STATUS "System-specific include file for " ${CMAKE_SYSTEM_NAME} ": " ${SYSTEM_INCLUDE_FILE} )

INCLUDE_DIRECTORIES(${POSTGRES_INCLUDE})

add_library (xtlib STATIC
xtAbstractCode.cpp
xtAnyUtility.cpp
xtClassCode.cpp
xtDatabase.cpp
xtError.cpp
xtFieldData.cpp
xtlib.cpp
xtObject.cpp
xtSecurity.cpp
xtStorable.cpp
exceptions/xeInvalidStorable.cpp
exceptions/xeDataNotFound.cpp
interfaces/xiDestroyedObserver.cpp
interfaces/xiObjectStateObserver.cpp
interfaces/xiObserverList.cpp
interfaces/xiObjectModeObserver.cpp
interfaces/xiObserver.cpp
interfaces/xiPropertyChecker.cpp
interfaces/xiPropertyObserver.cpp
)

set_target_properties(xtlib PROPERTIES VERSION 0.0.1 SOVERSION 0)


target_link_libraries ( xtlib
                        boost_date_time
                        boost_regex
                        pq
                       ${POSTGRES_LIBRARIES}
                      )
