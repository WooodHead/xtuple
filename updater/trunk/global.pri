#
# This file is part of the xTuple ERP: PostBooks Edition, a free and
# open source Enterprise Resource Planning software suite,
# Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
# It is licensed to you under the Common Public Attribution License
# version 1.0, the full text of which (including xTuple-specific Exhibits)
# is available at www.xtuple.com/CPAL.  By using this software, you agree
# to be bound by its terms.
#

exists(../../../openrpt) {
  OPENRPT_DIR = ../../../openrpt
}
exists(../../openrpt) {
  OPENRPT_DIR = ../../openrpt
}
exists(../openrpt) {
  OPENRPT_DIR = ../openrpt
}

! exists($${OPENRPT_DIR}) {
  error("Could not set the OPENRPT_DIR qmake variable.")
}

exists(../../../xtuple) {
  XTUPLE_DIR = ../../xtuple
}
exists(../../../xtuple/trunk) {
  XTUPLE_DIR = ../../xtuple/trunk
}
exists(../../xtuple) {
  XTUPLE_DIR = ../../xtuple
}
exists(../../xtuple/trunk) {
  XTUPLE_DIR = ../../xtuple/trunk
}
exists(../xtuple) {
  XTUPLE_DIR = ../xtuple
}
exists(../xtuple/trunk) {
  XTUPLE_DIR = ../xtuple/trunk
}

message("Looking for OpenRPT code in $${OPENRPT_DIR}.")
message("Looking for xTuple code in $${XTUPLE_DIR}.")

macx {
  CONFIG += x86 ppc
  CONFIG += release
}
