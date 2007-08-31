TEMPLATE = subdirs
SUBDIRS = common \
          builder \
	  loader

! exists(../openrpt) {
  error("The ../openrpt directory does not exist. Please get the sources for OpenRPT and build those before building the OpenMFG Updater.");
}
