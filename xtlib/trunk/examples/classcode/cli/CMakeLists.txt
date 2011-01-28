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

# link_directories must precede add_executable
  include_directories   (../../../src
                        )
#  link_directories      (../../../src
#  link_directories      ( ../../../src/build
#                        )

  add_executable        (classcode_cli
                         main.cpp
                        )
  set_target_properties(classcode_cli
                        PROPERTIES VERSION 0.0.1
                       )
  target_link_libraries(classcode_cli
                        boost_regex
                        xtlib
                       )
