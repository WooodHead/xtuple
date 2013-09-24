#!/bin/sh
# Copyright (c) 2008 by OpenMFG, LLC, d/b/a/ xTuple . All rights reserved.
PROG=`basename $0`

# lets setup some variables that will make it easier to change the script
USERGUIDE=`pwd`
OUTDIR=${TMPDIR:-"$HOME/tmp"}/$PROG
ROOTFILE=referenceguide.xml
XSLTPROC=xsltproc
OUTFMT=xsl/html/chunk.xsl
SOURCEDIR=$USERGUIDE/../../xtuple/trunk

if [ ! -d "$SOURCEDIR" ] ; then
  SOURCEDIR=$USERGUIDE/../../xtuple
fi


usage() {
  echo "$PROG -h"
  echo "$PROG [ -d documentation-dir ] [ -f file ] [ -F output-format-xsl ] [ -s root-of-application-source-files ] [ -o output-dir ] [ -x xml-catalog ]"
  echo
  echo "-h  get this usage message"
  echo "-d  build the documentation from the given directory (default .)"
  echo "-f  build the documentation starting with this file (default $ROOTFILE)"
  echo "-F  path to the top-level stylesheet you want to use (default $OUTFMT)"
  echo "-s  path to the application source files (default $SOURCEDIR)"
  echo "-o  write the output to the named directory (default $TMPDIR/$PROG)"
  echo "-x  use the named XML catalog(s) (default $XML_CATALOG_FILES)"
  echo
  echo "Environment variables:"
  echo "TMPDIR            output gets written to TMPDIR/$PROG"
  echo "XML_CATALOG_FILES list of XML catalog files to search the DocBook DTD"
  echo
  fmt <<EOF
Some parts of the documentation, such as the splash screen, are pulled
from the application source files, hence the -s option.

You need to have the DocBook DTD's configured in your xml catalog.
The documentation currently uses DocBook 4.5. The location of this
catalog and how to update it will vary from system to system.
EOF
}

ARGS=`getopt hd:f:F:s:o:x: $*`
if [ $? != 0 ] ; then
  usage
  exit 1
fi
set -- $ARGS
while [ "$1" != -- ] ; do
  case "$1" in
    -h) usage
        exit 0
        ;;
    -d) USERGUIDE="$2"
        shift
        ;;
    -f) ROOTFILE="$2"
        shift
        ;;
    -F) OUTFMT="$2"
        shift
        ;;
    -s) SOURCEDIR="$2"
        shift
        ;;
    -o) OUTDIR="$2"
        shift
        ;;
    -x) XML_CATALOG_FILES="$2"
        if [ ! -f "$XML_CATALOG_FILES" ] ; then
          echo "$PROG: cannot find $XML_CATALOG_FILES"
          exit 1
        fi
        export XML_CATALOG_FILES
        shift
        ;;
    *)  echo "$PROG: unknown option $2"
        usage
        exit 1
        ;;
  esac
  shift
done
shift # past the --

if [ ! -d "$USERGUIDE" ] ; then
  echo "$PROG: cannot find the $USERGUIDE directory"
  exit 2
fi
cd "$USERGUIDE"                                                 || exit 2
if [ ! -f "$ROOTFILE" ] ; then
  echo "$PROG: cannot find $USERGUIDE/$ROOTFILE"
  exit 2
fi
if [ ! -d "$OUTDIR" ] && ! mkdir -p "$OUTDIR" ; then
  echo "$PROG: $OUTDIR does not exist"
  exit 2
fi
if [ ! -f "$OUTFMT" ] ; then
  echo "$PROG: cannot find $OUTFMT"
  exit 2
fi

if [ ! -d "$SOURCEDIR" ] ; then
  echo "$PROG: cannot find $SOURCEDIR"
  exit 2
fi

if [ -f "$USERGUIDE/xsl/html/xtupletitlepages.xml" ] ; then
  $XSLTPROC --output $USERGUIDE/xsl/html/xtupletitlepages.xsl \
            $USERGUIDE/xsl/html/titlepage.xsl                 \
            $USERGUIDE/xsl/html/xtupletitlepages.xml            || exit 3
fi

# this command uses xsltproc to process the $ROOTFILE file (last argument)
# using the specified docbook xsl (second to last argument) and specifies
# several different options to customize the output
$XSLTPROC --xinclude                            \
               --stringparam base.dir $OUTDIR/  \
               $OUTFMT                          \
               $ROOTFILE                                        || exit 3

# now that the output has been generated we need to copy over the images
if [ ! -d $OUTDIR/images ] ; then
  mkdir $OUTDIR/images                                          || exit 4
fi
cp $USERGUIDE/images/* $OUTDIR/images/.                         || exit 4
cp $USERGUIDE/guiclient/images/* $OUTDIR/images/.               || exit 4
cp $SOURCEDIR/common/images/splashXTuple.png $OUTDIR/images/.   || exit 4
if [ ! -d $OUTDIR/css ] ; then
  mkdir $OUTDIR/css                                             || exit 4
fi
cp $USERGUIDE/../css/* $OUTDIR/css/.                            || exit 4
