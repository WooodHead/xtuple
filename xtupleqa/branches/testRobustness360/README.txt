Trunk File for xtupleqa
Last updated: October 29, 2010
=====================================

This directory contains scripts and other information related to
QA procedures for testing xTuple ERP.

Directory location:
https://postbooks.svn.sourceforge.net/svnroot/postbooks/xtupleqa/trunk

Linux info:
-----------

Here are the basic steps for getting Squish and your Linux environment
configured to run the first automated test for xTuple ERP, PopulateEmptyDB.

0) Install xTuple ERP and the PostgreSQL database server. You can
   use either a binary installer or do things manually. In the directory
   where the Qt libraries exist (this will be under .../xTuple/Client if
   you use a binary installer or in a distinct Qt directory if you don't),
   make sure the shared libraries all end with the .so prefix. If they
   don't, you may need to create symbolic links:

   For example, if all of the shared libraries after a binary install
   look like this:
	libQtCore.so.4
   then run this:
        $ cd .../xTuple/Client
	$ for i in *.4 ; do
	>   if [ ! -e `basename $i .4` ] ; then
	>     ln -s $i `basename $i .4`
	>   fi
	> done

1) Download and install Squish following the installation instructions
   from FrogLogic:
   For xTuple ERP 3.0-3.4       use squish-3.4.3-qt44x-linux32
       xTuple ERP 3.5.x & 3.6.x     squish-4.0.1-qt46x-linux32

   When the installer asks for the libQtCore.so, you have two choices.
   If you have the same version of Qt installed on your system
   as was used to build the xTuple ERP aplication, set the
   path to libQtCore.so in your Qt installation. If you don't
   have Qt installed, then set the path to libQtCore.so in
   your xTuple ERP installation directory.

  Select JavaScript as the preferred scripting language.

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

4) Create a file /home/crypto/xTuple.key and place some simple text
   in it:
   $ sudo su root
   # mkdir -p /home/crypto
   # echo "this is a dumb encryption key" > /home/crypto/xTuple.key
   # exit

5) Start Squish, either by double-clicking on the squish icon or
   running the following in a Shell window:
     $ wherever-you-installed-squish/bin/squish

6) Load the test in the Squish GUI:
     File -> Open Test Suite...
   Navigate to .../xtupleqa/[trunk]/PopulateEmptyDB
   Click on the file suite.conf

7) Create a data file to drive the test in your environment. Right-click
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

8) Now tell Squish where to find the xTuple ERP application:
     Edit -> Preferences...
     Click on the Server Settings tab
     Select AUT Paths
     Click Add...
     Navigate to the directory where you installed the xTuple ERP application
     If you used an xTuple Installer then select Client
     If you used a nightly build or similar bundle, select bin
     Click OK to select that folder

   Now tell Squish to test the xTuple ERP application itself:
     Select Attachable AUTs
     Click Add...
     Type "xtuple" (without the quotes)
     You'll get a warning about shell scripts; click OK
     Click Add... again
     Type "xtuple.bin"
     Click OK

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

Windows info:
-------------

Here are the basic steps for getting Squish and your Windows environment
configured to run the first automated test for xTuple ERP, PopulateEmptyDB.

0) Install xTuple ERP and the PostgreSQL database server. You can
   use either a binary installer or do things manually.

1) Download and install Squish following the installation instructions
   from FrogLogic:
   For xTuple ERP 3.0-3.4       use squish-3.4.3-qt44x-win32-mingw
       xTuple ERP 3.5.x & 3.6.x     squish-4.0.1-qt46x-win32-mingw

   When the installer asks for the libQtCore.dll, you have two choices.
   If you have the same version of Qt installed on your system
   as was used to build the xTuple ERP aplication, set the
   path to libQtCore.dll in your Qt installation. If you don't
   have Qt installed, then set the path to libQtCore.dll in
   your xTuple ERP installation directory.

  Select JavaScript as the preferred scripting language.

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

4) Create a file C:\crypto\xTuple.key and place some simple text
   in it.

5) Start Squish, either by double-clicking on the squish icon or
   running the following in a Shell window:
     $ wherever-you-installed-squish/bin/squish

6) Load the test in the Squish GUI:
     File -> Open Test Suite...
   Navigate to .../xtupleqa/[trunk]/PopulateEmptyDB
   Click on the file suite.conf

7) Create a data file to drive the test in your environment. Right-click
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

8) Now tell Squish where to find the xTuple ERP application:
     Edit -> Preferences...
     Click on the Server Settings tab
     Select AUT Paths
     Click Add...
     Navigate to the directory where you installed the xTuple ERP application
     If you used an xTuple Installer then select Client
     If you used a nightly build or similar bundle, select bin
     Click OK to select that folder

   Now tell Squish to test the xTuple ERP application itself:
     Select Attachable AUTs
     Click Add...
     Type "xtuple" (without the quotes)
     Click OK

   Click OK to close the Preferences window.

You should now be able to run the PopulateEmptyDB test. Select that test
in the left-hand navigation pane and Test Suite -> Execute or click the
Execute button on the toolbar.

