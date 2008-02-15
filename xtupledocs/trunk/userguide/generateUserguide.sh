#!/bin/sh
PROG=`basename $0`

# lets setup some variables that will make it easier to change the script
USERGUIDE=`pwd`
OUTDIR=${TMPDIR:-"$HOME/tmp"}/$PROG
ROOTFILE=userguide.xml
XSLTPROC=xsltproc
OUTFMT=xsl/html/chunk.xsl

usage() {
  echo "$PROG -h"
  echo "$PROG [ -d documentation-dir ] [ -f file ] [ -F output-format-xsl ] [ -o output-dir ] [ -x xml-catalog ]"
  echo
  echo "-h  get this usage message"
  echo "-d  build the documentation from the given directory (default .)"
  echo "-f  build the documentation starting with this file (default $ROOTFILE)"
  echo "-F  path to the top-level stylesheet you want to use (default $OUTFMT)"
  echo "-o  write the output to the named directory (default $TMPDIR/$PROG)"
  echo "-x  use the named XML catalog(s) (default $XML_CATALOG_FILES)"
  echo
  echo "Environment variables:"
  echo "TMPDIR            output gets written to TMPDIR/$PROG"
  echo "XML_CATALOG_FILES file? containing an XML catalog to reach the DocBook DTD"
  echo
  fmt <<EOF
You need to have the DocBook DTD's configured in your xml catalog.
The documentation currently uses DocBook 4.5. The location of this
catalog and how to update it will vary from system to system.
EOF
}

ARGS=`getopt hd:f:o:x: $*`
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
if ! cd "$USERGUIDE"    ; then exit $? ; fi
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

# this command uses xsltproc to process the $ROOTFILE file (last argument)
# using the specified docbook xsl (second to last argument) and specifies
# several different options to customize the output
if ! $XSLTPROC --xinclude                       \
               --stringparam base.dir $OUTDIR/  \
               $OUTFMT                          \
               $ROOTFILE                                ; then exit $? ; fi

# now that the output has been generated we need to copy over the images
if ! mkdir $OUTDIR/images                               ; then exit $? ; fi
if ! cp $USERGUIDE/images/* $OUTDIR/images/.            ; then exit $? ; fi
if ! cp $USERGUIDE/../topics/images/* $OUTDIR/images/.  ; then exit $? ; fi
if ! cp $USERGUIDE/guiclient/images/* $OUTDIR/images/.  ; then exit $? ; fi
