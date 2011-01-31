Dependencies:
- You must have Doxygen 1.6 or later.
- You must have the environment variable QTDIR set to the Qt installed directory
    and exported.
- You must have the Qt docs installed in QTDIR/doc/html.

Steps to run:

  1 $ svn co the-right-xtlib-code-url
  2 $ cd .../xtlib[/tag/tag_name]
  3 $ # skip the following for now: qmake ; make
  4 $ edit utilities/doxygen/Doxyfile.public
      # set the PROJECT_NUMBER
      # fix the URL in TAGFILES to match the Qt version we're using
  5 $ doxygen utilities/doxygen/Doxyfile.public

The generated docs will be in docs/html

Note: The build in step 3 is required to get the list of widgets
      from the .ui files.

Note: This is copied from .../xtuple/utilities/doxygen
      That is the master Doxygen-handling directory
      and everything else here in xtlib/utilities/doxygen
      is copied from there and altered to add diagrams.
