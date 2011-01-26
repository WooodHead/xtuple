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
