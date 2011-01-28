#
# This file is part of the xTuple ERP: PostBooks Edition, a free and
# open source Enterprise Resource Planning software suite,
# Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
# It is licensed to you under the Common Public Attribution License
# version 1.0, the full text of which (including xTuple-specific Exhibits)
# is available at www.xtuple.com/CPAL.  By using this software, you agree
# to be bound by its terms.
#
cmake_minimum_required (VERSION 2.8)
  cmake_policy  (SET CMP0015 NEW
                )
  project       (CLASSCODE_EXAMPLE)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} ${XTLIB_EXAMPLES_SOURCE_DIR}/cmake)

find_package(Wt)
if(Wt_NOT_FOUND)
  message(SEND_ERROR "Could not find the required Wt package")
endif(Wt_NOT_FOUND)

# need a convenient way to determine Wt version
# this will not compile correctly with any version of Wt
# prior to version 3.1.6
# linux distros are currently (as of 1/25/2011) 
# distributing version 3.1.3
# also note the inconvenience that in order to build
# recent releases of Wt (3.1.7+) and if using
# GNU g++ compiler it needs to be version 4.5+
# has not been tested with non GNU g++ compilers
# but if an older version is used it requires
# all code linked to Wt to include a specific definition
message(STATUS "NOTE: The required version of Wt is 3.1.6 or higher, any previous
    versions will fail to compile")

  include_directories   (../../../src
                         ${Wt_INCLUDES}
                        )
  link_directories      (../../../src
                         ${Wt_INCLUDES}
                        )

  add_executable        (classcode_wt
                         main.cpp
                         classcodeapp.cpp
                        )
  set_target_properties(classcode_wt
                        PROPERTIES VERSION 0.0.1
                       )
  target_link_libraries(classcode_wt
                        boost_regex
                        boost_signals
                        ${Wt_LIBRARIES}
                        xtlib
                       )
