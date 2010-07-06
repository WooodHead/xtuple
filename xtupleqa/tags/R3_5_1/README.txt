Trunk File for xtupleqa
Last updated: October 21, 2009
=====================================

This directory contains scripts and other information related to
QA procedures for testing xTuple ERP.

Directory location:
https://postbooks.svn.sourceforge.net/svnroot/postbooks/xtupleqa/trunk

Linux info:
-----------

Here are the basic steps for getting Squish and your Linux environment
configured to run ttthe first automated test for xTuple ERP, PopulateEmptyDB.

1) Download and install Squish following the installation instructions
   from FrogLogic. For xTuple ERP 3.X, you should use
   squish-3.4.3-qt44x-linux32.

   When the installer asks for the libQtCore.so, you have two choices.
   If you have the same version of Qt installed on your system
   as was used to build the xTuple ERP aplication, set the
   path to libQtCore.so in your Qt installation. If you don't
   have Qt installed, then set the path to libQtCore.so in
   your xTuple ERP installation directory.

2) Check out the test sources (you've probably already done this if
   you are reading this file!-):
     $ svn checkout https://postbooks.svn.sourceforge.net/svnroot/postbooks/xtupleqa/trunk xtupleqa
   or
     $ svn checkout https://postbooks.svn.sourceforge.net/svnroot/postbooks/xtupleqa

   Alternatively, if you already have them checked out, update your
   existing checkout:
     $ cd wherever-your-xtupleqa-is
     $ svn update

3) Create an xTuple ERP empty database:
   - If you have just created a PostgreSQL database server instance,
     run the init-*.sql file for the version of the xTuple ERP
     application you are testing.
   - Create a new PostgreSQL database.
   - Restore the xTuple ERP empty database .backup file to this
     new database.

4) Start Squish, either by double-clicking on the squish icon or
   running the following in a Shell window:
     $ wherever-you-installed-squish/bin/squish

5) Load the test in the Squish GUI:
     File -> Open Test Suite...
   Navigate to .../xtupleqa/[trunk]/PopulateEmptyDB
   Click on the file suite.conf

6) Create a data file to drive the test in your environment. Right-click
   on the Test Data folder and select New Testdata. Change the name that
   appears to login.tsv. Right-click on the header line to add and name
   columns with the following names:

   HOST, DB, PORT, PASSWORD, ROLE, USERNAME, REALNAME

   On each line, type the hostname or IP address of your database
   server, the name of the database you want to test with (it should be
   a freshly created database loaded with the xTuple ERP empty database
   contents loaded), the port on which to contact your database server,
   the password to use for the given test role, and the username and
   human name to associate with each role. Separate each value with a
   tab and type the values in the same order as the column headings above.

   For PopulateEmptyDB, you'll need to create lines for the following roles:
   CONFIGURE - this should be a database administrator
   RUNREGISTER - this should be a non-administrative user

7) Now tell Squish where to find the xTuple ERP application.
   Select Preferences... in the Edit menu, click on the Server
   Settings tab, and select the AUT Paths line. Click the Add...
   button.  Navigate to the directory where you installed the xTuple
   ERP application, and select bin.  Click OK to select that folder.
   Click OK to close the Preferences window.

You should now be able to run the PopulateEmptyDB test. Select that test
in the left-hand navigation pane and Test Suite -> Execute or click the
Execute button on the toolbar.

Macintosh OSX info:
-------------------

Here are the basic steps for getting Squish and your Mac configured
to run the first automated test for xTuple ERP, PopulateEmptyDB.
OSX has some properties that make configuring Squish a little more
complex than other platforms. In addition, xTuple ERP uses Qt a little
differently than FrogLogic expected, so you need a special version of
Squish.

In addition, you need to configure your Mac to "enable access for
assistive devices":
  Apple -> System Preferences... -> Universal Access
and click on "Enable access for assistive devices".

1) Download and install Squish following the installation instructions
   from FrogLogic. As of late March, 2009, the version to use is
     squish-20090323-qt432zenqx-maci386-gcc4.0

   When the installer asks for the libQtCore.dylib, you have two
   choices. If you have the same version of Qt installed on your
   system as was used to build the xTuple ERP application, set the
   path to libQtCore.dylib in your Qt installation. If you don't
   have Qt installed, then you need to take two steps:
   - Set the path to
     app-installation-dir/xtuple.app/Contents/Frameworks/lib/libQtCore.dylib
   - In a Terminal window:
     $ cd app-installation-dir/xtuple.app/Contents/Frameworks/lib
     $ cp libQtCore.4.dylib libQtCore.dylib

2) Follow steps 2-3 from the Linux description above

4) Start Squish, either by double-clicking on the squish icon or
   running the following in a Terminal window:
     $ open wherever-you-installed-squish/bin/squish.app

6) Follow steps 5-6 from the Linux description above

7) Now tell Squish where to find the xTuple ERP application.
   Select Preferences... in the Squish menu, click on the Server
   Settings tab, and select the AUT Paths line. Click the Add...
   button.  Navigate to the directory where you installed the xTuple
   ERP application, expand xtuple.app, expand Contents, and select
   MacOS.  Click OK to select that MacOS folder.
   Click OK to close the Preferences window.

You should now be able to run the PopulateEmptyDB test. Select that
test in the left-hand navigation pane and Test Suite -> Execute or
click the Execute button on the toolbar.
