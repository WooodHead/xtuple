#!/bin/sh
# lets setup some variables that will make it easier to change the script
USERGUIDE=/home/cryan/src/openmfg/xtupledocs/userguide
OUTDIR=/home/cryan/tmp2/output
DOCBOOK_XSL=/usr/share/sgml/docbook/xsl-stylesheets-1.65.1-2
XSLTPROC=/home/cryan/src/libxslt-1.1.22/xsltproc/xsltproc

# You need to have the appropriate Docbook DTD's setup in your xml catalog.
# At this time 4.5 is the version being used. Depending on your system
# this location for the catalog will vary and how to update it.

# This variable sets an alternate location for a catalog.
#XML_CATALOG_FILES=/home/cryan/xmlcatalog

# this command uses xsltproc to process the userguide.xml file (last argument)
# using the specified docbook xsl (second to last argument) and specifies
# several different options to customize the output
$XSLTPROC --xinclude \
          --stringparam generate.section.toc.level 3 \
          --stringparam toc.section.depth 3 \
          --stringparam section.autolabel 1 \
          --stringparam section.label.includes.component.label 1 \
          --stringparam show.comments 0 \
          --stringparam chunk.section.depth 2 \
          --stringparam chunk.first.sections 1 \
          --stringparam chunk.separate.lots 1 \
          --stringparam base.dir $OUTDIR/ \
          $DOCBOOK_XSL/html/chunk.xsl \
          $USERGUIDE/userguide.xml

# now that the output has been generated we need to copy over the images
mkdir $OUTDIR/images
cp $USERGUIDE/images/* $OUTDIR/images/.
cp $USERGUIDE/../topics/images/* $OUTDIR/images/.
cp $USERGUIDE/guiclient/images/* $OUTDIR/images/.

