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
}
