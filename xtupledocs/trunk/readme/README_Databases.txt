PostBooks Databases Overview
====================================
Last Updated: August 6, 2010


Thank you for your interest in PostBooks, an OSI-certified open
source application from xTuple. This file provides a brief overview
of the steps required to manually prepare your PostgreSQL server
to run a PostBooks database.

Of course, the easiest way to get started is to use the xTuple all-
in-one installer. The xTuple installer is available for Windows,
Mac, and Linux. You can download the installer from the
PostBooks-installers directory on the PostBooks SourceForge page. The
all-in-one installer will install both the xTuple client and the
xTuple databases--as well as other tools you can use for database
administration. Using the installer is the easiest way to ensure
your xTuple installation will work for you "out of the box."

For more advanced users who prefer not to use the PostBooks installer,
the following steps will get you started:

1. Install and configure PostgreSQL. (For more information, see the
INSTALL.txt file.)

2. Run the 'init.sql' script to create the user 'admin' and the
group 'xtrole'. (For more information, see the INSTALL.txt file.)

3. Create a new PostgreSQL Database and then restore the xTuple
Database schema into it. There are several starter schema to choose
from, including the following:

* empty.backup - This is an empty database with no data

* quickstart.backup - This database contains a basic Chart of
Accounts and also the Account Assignments required to run the full
range of transactions

* demo.backup - This database (if available) contains a suite of
sample data built on top of the 'quickstart' database

To learn more about loading the xTuple Database schema, please see
the INSTALL.txt file.

4. Once a database has been loaded, simply connect to it using your
PostBooks client application.