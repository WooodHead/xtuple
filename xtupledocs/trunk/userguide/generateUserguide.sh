#!/bin/sh
# lets setup some variables that will make it easier to change the script
USERGUIDE=/home/cryan/src/openmfg/xtupledocs/userguide
OUTDIR=/home/cryan/tmp2/output
XSLTPROC=xsltproc

# You need to have the appropriate Docbook DTD's setup in your xml catalog.
# At this time 4.5 is the version being used. Depending on your system
# this location for the catalog will vary and how to update it.
#
# This variable sets an alternate location for a catalog.
#XML_CATALOG_FILES=/home/cryan/xmlcatalog

# this command uses xsltproc to process the userguide.xml file (last argument)
# using the specified docbook xsl (second to last argument) and specifies
# several different options to customize the output
$XSLTPROC --xinclude \
          --stringparam base.dir $OUTDIR/ \
          $USERGUIDE/xsl/html/chunk.xsl \
          $USERGUIDE/userguide.xml

# now that the output has been generated we need to copy over the images
mkdir $OUTDIR/images
cp $USERGUIDE/images/* $OUTDIR/images/.
cp $USERGUIDE/../topics/images/* $OUTDIR/images/.
cp $USERGUIDE/guiclient/images/* $OUTDIR/images/.

