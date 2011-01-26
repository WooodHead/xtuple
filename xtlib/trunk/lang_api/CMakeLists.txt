cmake_minimum_required (VERSION 2.8)
cmake_policy  (SET CMP0015 NEW
              )
project       (CLASSCODE_EXAMPLE)

find_package  (Boost)
if (Boost_FOUND)
  include_directories(${Boost_INCLUDE_DIRS})
endif()

find_package (SWIG REQUIRED)
if(${SWIG_VERSION} VERSION_LESS 2.0.1)
  message(SEND_ERROR "The PHP interface to xtlib requires SWIG version 2.0.1 but ${SWIG_EXECUTABLE} is version ${SWIG_VERSION}")
else(${SWIG_VERSION} VERSION_LESS 2.0.1)
  message(STATUS "SWIG version: ${SWIG_VERSION}")
endif(${SWIG_VERSION} VERSION_LESS 2.0.1)
include      (${SWIG_USE_FILE})

find_path(PHPBINDIR php
          /usr/local/bin
          /usr/bin
          /bin
         )

if(CMAKE_HOST_UNIX)
  execute_process(COMMAND ${PHPBINDIR}/php-config --includes OUTPUT_STRIP_TRAILING_WHITESPACE
                  OUTPUT_VARIABLE PHPINCLDIRS
                 )
elseif(CMAKE_HOST_WIN32)
  message(SEND_ERROR "Support for the PHP classcode example on Windows is still under development")
endif(CMAKE_HOST_UNIX)


if(APPLE)
  set(EXTRA_LINK_FLAGS "-flat_namespace -bundle_loader ${PHPBINDIR}/php")
endif(APPLE)

set_source_files_properties(xtlibPHP5_wrap.cxx
                            PROPERTIES
                              GENERATED     true
                              COMPILE_FLAGS "${PHPINCLDIRS}"
                           )

include (cmake/${CMAKE_SYSTEM_NAME}.txt
         OPTIONAL RESULT_VARIABLE SYSTEM_INCLUDE_FILE)

message(STATUS "System-specific include file for " ${CMAKE_SYSTEM_NAME}
               ": " ${SYSTEM_INCLUDE_FILE})

include_directories   (${CMAKE_SOURCE_DIR}/src
                      )

link_directories      (${CMAKE_BINARY_DIR}/src
                      )

set_source_files_properties(xtlib.i
                            PROPERTIES
                              CPLUSPLUS ON
                              SWIG_FLAGS -includeall
                              SWIG_FLAGS -I${Boost_INCLUDE_DIRS}
                              SWIG_FLAGS -I${CMAKE_SOURCE_DIR}/src
                           )
swig_add_module(xtlib_php php5 xtlib.i xtlibPHP5_wrap.cxx)
  

set_target_properties (xtlib_php
                       PROPERTIES
#                        VERSION 0.0.1
                         SOVERSION 0
                        LINK_FLAGS "${EXTRA_LINK_FLAGS}"
                      )

target_link_libraries (xtlib_php
                       xtlib
                      )
