exists(../../openrpt) {
  OPENRPT_DIR = ../../openrpt
}

exists(../openrpt) {
  OPENRPT_DIR = ../openrpt
}

! exists($${OPENRPT_DIR}) {
  error("Could not set the OPENRPT_DIR qmake variable.")
}

exists(../xtuple) {
  XTUPLE_DIR = ../xtuple
}
exists(../xtuple/trunk) {
  XTUPLE_DIR = ../xtuple/trunk
}
exists(../../xtuple) {
  XTUPLE_DIR = ../../xtuple
}
exists(../../xtuple/trunk) {
  XTUPLE_DIR = ../../xtuple/trunk
}

! exists($${XTUPLE_DIR}) {
  error("Could not set the XTUPLE_DIR qmake variable.")
}

message("Looking for OpenRPT code in $${OPENRPT_DIR}.")
message("Looking for xTuple code in $${XTUPLE_DIR}.")

TEMPLATE = subdirs
SUBDIRS = common \
          builder \
	  loader
