#!/bin/bash

PROG=`basename $0`
REFGUIDEDIR=postbooks
ROOTNAME=`basename $1`
STARTDIR=`pwd`

if [ ! -d postbooks ] ; then
  echo "$PROG: there must be a directory here named 'postbooks' holding the html help files"
  exit 1
fi

if [ -z "$ROOTNAME" ] ; then
  echo "$PROG: base name of output file is required"
  exit 1
fi

QHCPFILE=${ROOTNAME}.qhcp
QHPFILE=${ROOTNAME}.qhp

cat > "$STARTDIR/$QHCPFILE" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<QHelpCollectionProject  version="1.0">
  <assistant>
    <title>xTuple Documentation</title>
    <startPage>qthelp://xtuple.org/postbooks/index.html</startPage>
    <cacheDirectory>.xTupleDocs</cacheDirectory>
  </assistant>
  <docFiles>
    <generate>
      <file>
        <input>$ROOTNAME.qhp</input>
        <output>XTupleGUIClient.qch</output>
      </file>
    </generate>
    <register>
      <file>XTupleGUIClient.qch</file>
    </register>
  </docFiles>
</QHelpCollectionProject>
EOF

TOC=`awk '/<title>/ { sub(".*<title>",  "");
                      sub("</title>.*", "");
                      gsub("&nbsp;",    " ");
                      printf("      <section title=\"%s\" ref=\"%s\" />\n",
                             $0, FILENAME);
                    }' $REFGUIDEDIR/ch[0-9][0-9].html`
FILES=`find $REFGUIDEDIR -type d | awk '{ printf("      <file>%s/*</file>\n",
                                                 $0) }'`
cat > "$STARTDIR/$QHPFILE" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<QtHelpProject version="1.0">
  <namespace>xtuple.org</namespace>
  <virtualFolder>postbooks</virtualFolder>
  <filterSection>
    <toc>
$TOC
    </toc>
    <files>
$FILES
    </files>
  </filterSection>
</QtHelpProject>
EOF

pwd
qcollectiongenerator "$STARTDIR/$ROOTNAME.qhcp" -o "$STARTDIR/XTupleGUIClient.qhc"

rm "$STARTDIR/$QHCPFILE" "$STARTDIR/$QHPFILE"
