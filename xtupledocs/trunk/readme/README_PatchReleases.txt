Working with Patch Releases
xTuple ERP
====================================
Last Updated: August 10, 2010

CONTENTS:
Overview
Upgrading to a Patch Release
Starting Fresh with a Patch Release
====================================

Overview
====================================
xTuple patch releases are intentionally designed to be small
in scope. They typically include a small number of discrete bug
fixes--and nothing more. This gives xTuple patch releases the
dual advantage of having minimal impact on your business, while
at the same time making them easy to upgrade to.

Patch releases (also known as "dot releases") are any releases
which use the third and last segment of a version number. For
example:

4.0.0 - Major release
4.1.0 - Minor release
4.1.1 - Patch release

Upgrading to a Patch Release
====================================

To migrate your already existing xTuple database from an
earlier version to a patch release, follow these steps:

1. Locate the upgrade scripts you will need. For example, the
script 'pb352to353.gz' will take you from PostBooks version
3.5.2 to PostBooks version 3.5.2. The number of upgrade scripts
you need will vary depending on how far behind the patch
release your current version is.

2. Make a backup copy of your current database.

3. Log in to your current database with the Updater application

4. Using the Updater, open the first upgrade script you need
and then run it. Continue this process for as many scripts as
you need to run to reach the patch release version

5. Locate the GUI client application for the patch release
version

6. Log in to your upgraded database using the new GUI client
application

7. That's it!

Starting Fresh with a Patch Release
====================================

At the present time, xTuple does not provide installers for
its patch releases. If you want to start fresh with a patch
release--meaning you don't have an existing xTuple database
you need to migrate forward--then please see the documentation
available on the xTuple community website for more information
about installing xTuple. Here are some links you may find 
helpful:

http://www.xtuple.org/InstallingTheDatabase

http://www.xtuple.org/docs/admin-and-setup/general-information