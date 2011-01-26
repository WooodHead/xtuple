Guide for using the PHP classcode example
-----------------------------------------
Last update: 1/21/2011 Cole

Once cmake has been run and xtlib and the PHP extension library have been generated,
the new extension needs to be made available to the webserver. This guide assumes a
Linux/Mac OS X system that is running Apache webserver with the Apache modrewrite and
PHP available and in use.


Enabling Apache to use the libxtlib.so extension
------------------------------------------------
The generated extension file must have read/execute permissions such that the webserver
can have access to it. There should be a php.ini file in your system that Apache reads
on every webserver startup. 

For Mac OS X there is no default php.ini file.
@TO-DO: add instructions for generating default file for production environments

For Debian Linux distrobutions the php.ini file resides in /etc/php5/apache2/php.ini

Will most likely need sudo to modify this file. Open the file and navigate to the 
section for extensions and add a line with the correct path to the file:

extension=/path/to/your/build/dir/libxtlib.so

Once you have added this line, save the file and restart your webserver.

For Mac OS X use the command `sudo /usr/sbin/apachectl restart`
For Debian Linux use the command `sudo service apache2 restart`

This should make the library available to PHP.


Installing the classcode example
--------------------------------
This guide will help you install the example in the root webserver directory as opposed to
a user directory. If you wish to use a user directory this becomes a little more complex
and no support is currently available in this guide for this method.

Navigate to the webserver root directory:

For Mac OS X use the command `cd /Library/Webserver/Documents`
For Debian Linux use the command `cd /var/www`

Now create a directory to house the example

Use the command `sudo mkdir classcode; cd classcode`

Now copy the contents of the example directory into this new directory
Easily accomplished by navigating to that directory or by specifying it
from command line (replacing the `.' in the appropriate command below)

For Mac OS X use the command `sudo rsync -r --exclude=.svn . /Library/Webserver/Documents/classcode/`
For Debian Linux use the command `sudo rsync -r --exclude=.svn . /var/www/classcode/`

If you're using a different directory than the one the guide recommends there are additional
changes you will need to make to some files that are not currently included with this guide.

Copy the generated xtlib.php file from the build directory for the PHP classcode example to
the new example root directory (e.g. the 'classcode' directory you just created).

If you're in the example directory still:

For Mac OS X use the command `sudo cp ../../../build/lang_api/xtlib.php /Library/Webserver/Documents/classcode/`
For Debian Linux use the command `sudo cp ../../../build/lang_api/xtlib.php /var/www/classcode/`

Assuming modrewrite for Apache is enabled and you've already restarted the webserver, use your
browser to navigate to http://localhost/classcode/ and it should work as is. If not, you will
need to enable this module for Apache.

**NOTE: For Mac OS X, possibly Linux, even with the modrewrite module enabled, you will need to
        modify the httpd.conf file (located at /etc/apache2/httpd.conf by default) for Apache so 
        it will allow the provided .htaccess file to be used. To do this, find where it has
        blocks of the <Directory> instruction and add one of your own like the following and then 
        restart the webserver:

        <Directory "/Library/Webserver/Documents/classcode">
            Options Indexes FollowSymLinks
            Allow Override All
            Order allow,deny
            Allow from all
        </Directory>

It is on by default for Mac OS X.
For Debian Linux do the following

cd /etc/apache2/mods-enabled
sudo ln -s ../mods-available/rewrite.load rewrite.load
sudo service apache2 restart

This should have enabled the module and you can navigate to the above url again.
