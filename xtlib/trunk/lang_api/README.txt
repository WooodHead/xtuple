-----------------------------------------
NOTES ON BUILDING PHP5 INTERFACE TO XTLIB
-----------------------------------------

This directory contains code to build a PHP5 interface to xtlib.
We're using SWIG to generate the language bindings.  As of Jan,
2011, our thoughts are that we will be able to build interfaces to
other languages but don't need to do so yet.  We expect that the
basic configuration for SWIG can be modified through #ifdef's in
the .i files to generate bindings for other languages, sharing the
bulk of the SWIG configuration across languages.

-------------------------------
PREREQUISITES
-------------------------------

To use the library and PHP interface:
- A running web server           - tested with Apache 2.2.15
- PHP5 enabled on the web server - tested with PHP 5.3.3, Zend engine 2.3.0

To build the library and PHP interface [ on Linux and Mac; currently untried on Windows]:
- basic C++ development tools
- CMake v2.8 or higher
- SWIG v2.0.1 or higher
- PCRE (required to build SWIG) - tested with PCRE 8.02

-------------------------------
BUILDING AND TESTING: SHORT VER
-------------------------------
 1$ cd $XTLIBDIR
 2$ mkdir build
 3$ cd build
 4$ cmake ..
 5$ make
 6$ sudo cp $XTLIBDIR/build/lang_api/libxtlib_php.so $PHPEXTENSIONSDIR
 7# restart web server
   mac$ sudo /usr/sbin/apachectl restart
   lin$ sudo service apache2 restart
 8> see the README.txt in $XTLIBDIR/examples/classcode/php for
    installing and running the PHP example

--------------------------------
ENVIRONMENT NOTES
--------------------------------

Some builds of PHP do not support dynamic loading of extensions
with dl(). Since dl() is called by the SWIG-generated PHP if the
xtlib PHP extension is not already loaded, either build your own
PHP with debugging and non-thread-safe options or modify the php.ini
configuration file to include the extension (see platform notes
below).

The systems we tested have SWIG 1.3 available but we found problems
with the PHP interface generated with this release. Build SWIG 2.x
from source. This requires PCRE, so you may need to build PCRE, too
(see Online Resources below).
  $ cd .../pcre-8.02
  $ ./configure 
  $ make
  $ sudo make install
  $ cd .../swig-2.0.1
  $ ./configure -with-php # what else?
  $ make
  $ sudo make install

Notes for Ubuntu 10.10 x86

- The PHP extension dir for the pre-built PHP binary is
  /usr/lib/php5/20090626+lfs
- The pre-built binary of PHP supports the dl() function so there
  is no need to load the extension from the php.ini.

Notes for MAC OS X 10.6 Snow Leopard
- You can start the Apache web server with
  System Preferences -> Sharing -> Web Sharing
- To enable PHP5 in your web server, edit /etc/apache2/httpd.conf
  and restart the web server
- The PHP extension dir for the pre-built PHP binary is
  /usr/lib/php/extensions/no-debug-non-zts-20090626
- The pre-built binary of PHP for MAC OS X 10.6 does not support
  the dl() function, so copy /etc/php.ini.default to /etc/php.ini
  if no /etc/php.ini exists, add "extension=libxtlib_php.so" to
  php.ini, and restart the web server.

-------------------------------
CURRENT ISSUES
-------------------------------

Target language native syntax preservation
- Especially with regards to data-typing and arbitrary pointer
  type-casting functions requiring knowledge of underlying data-types
  inconsistently that should be relatively transparent to end-developer

Target language data-access methods
- Completely lack support for native hash-tables (in almost ALL
  scripting languages)
- PHP generates "Parse error: syntax error, unexpected T_EMPTY,
  expecting T_STRING in $WEBROOT/xtlib.php on line 3408" because
  there is a name collision between PHP and sdt::vector::empty()

Build
- $XTLIB/src/xtCurrencyConversion.h:9: Error: Nothing known about
  namespace 'boost::gregorian'
  Rerunning 'make' does not report this error and the build runs
  to completion, but we don't yet know what the effect is on run-time
  usage of the xtCurrencyConversion class
- There are build warnings about PHP5 not supporting multiple
  inheritance, but the affect of this on run-time usages of classes
  with multiple inheritance is not yet known
- Documentation
- Convert this to Dev Guide chapter?

-------------------------------
Online Resources
-------------------------------
www.swig.org                      // SWIG main site
www.swig.org/Doc2.0/Php.html      // SWIG and PHP
www.swig.org/Doc2.0/SWIGPlus.html // SWIG and C++
www.dabeaz.com/cgi-bin/wiki.pl    // SWIG wiki
www.pcre.org                      // PCRE main site (needed to build SWIG)

-------------------------------
Page(s) of Interest Specific to PHP/SWIG
-------------------------------
http://old.nabble.com/char-**-to-php-array-of-strings,-can't-free-with--typemap(newfree)-td11880875.html

Instructions for SWIG were fairly straight-forward but lacked in
any detail in terms of platform specific compilation and execution.
There is a WIKI (url listed under Online Resources) where a few
individuals had posted information about how to compile modules
from C, but nearly all were for older MAC OS X releases, and even
the few that were related to 10.6 (Snow Leopard) were not directly
relevant because they were for Perl or Python (instead of PHP).

**NOTE: For just about every question/answer site where someone was
asking a question about using SWIG to develop PHP extensions and
were having an issue - they were advised to do it the 'long way'.
I don't know if it will be necessary, but it did become a prevalent
idea that automated PHP extensions was neither easy nor perfect.

**NOTE: The troubles I experienced in general when attempting to
create a PHP5 module from C or C++ was almost certainly hindered
by my novice experience with all of this. It may very well be that
this is an incredibly useful and easy process (well, definitely
easy once you know how) that will not pose as much a hurdle for the
more experienced developer.

--------------------------------
IMPLEMENTATION/PREP NOTES
--------------------------------

Target languages will each pose new problems relative to the
complexity of the underlying C++ being exposed. Not all features
of C++ have comparable implementations natively and thus should be
identified and either avoided or a plan/workaround decided beforehand.
The simpler the exposed function - devoid of complex data-types or
unnecessary overloading or inheritance - the better and easier the
wrapping becomes.

- It is necessary to identify and aggregate any functions/variables
  that need to be exposed to the target language
- It would help to be able to have them in separate files for inclusion
    - Without being in separate files this means that each function
      must either be explicitly stated for inclusion/wrapping
    - And functions/classes/variables not intended for exposure
      need to be 'ignored'

- There needs to be a naming convention for consistency in any
  target language for overloaded, expanded or renamed functionalities
  and overloaded operators for non-standard objects.
    - For overloaded operators it is necessary to rename them as
      functions to be callable from within the the object in the
      target language
    - For any template class/function (in C++) to be available to
      the target language a typedef needs to be set for the known
      type
	- This is done in the SWIG interface file NOT in the code
	  (for many reasons)
        - e.g. %template(intList) List<int>;
	    - This allows wrapper code to be written and compilable
              for a List for type int and would be accessed in the
              target language via `intList` as the object
        - Overloading is only supported by SOME languages...

--------------------------------
USAGE
--------------------------------

The community of SWIG users generating PHP interfaces seems to be
small.  Support for the language isn't well documented.  The methods
we've found to work may not be the best ways to accomplish our
goals.

In simple terms, SWIG scans declared interfaces to a C/C++ library's
code base and generates C code to create bindings to other programming
languages.  This is in turn is compiled and linked to the C/C++
library, creating a second library that is the PHP extension,
allowing access to your C++ code from within PHP.

[C++ Functions] => [C PHP Extension Code] => PHP
PHP => [C PHP Extension Code] => [C++ Functions]

The liaison between the base C++ library and PHP is the SWIG interface
script.  It is a description of the C++ structures, functions, ...,
that it needs to expose. The conventions used for conversion are
complex/detailed and require hands-on experience and careful reading
of the SWIG documentation.

The following command line example would generate php_example.h,
example_wrap.cpp, example.php files from the example.i and a
collection of header files describing the base C++ library:

  ~$ swig -c++ -php5 example.i

The -c++ flag tells SWIG that the base code is C++. The default is C.
The -php5 flag tells SWIG to generate code for PHP5. Do not use
-php, which generates code for PHP4.

To build the PHP5 extension, compile the generated code and link
it into a shared library, either including the base library in the
link or linking to the base library if it itself is shared. For
example, on a Mac OS X machine:

  ~$ g++ `php-config --includes` -dynamic -flat_namespace -bundle -bundle_loader /usr/bin/php -fpic -o example.so *.cpp

Note that OS X has more build options, including several types of
shared library(!). Check the CMakeLists.txt and associated generated
make files for the current state of our knowledge.

/****************************************************************************
@TO-DO: complete documentation concerning xtlib attempts
/****************************************************************************


Have to write custom meta file => xtlib.i

~$ swig -c++ -php5 xtlib.i

on x86 linux 
~$ g++ `php-config --includes` -I../src.r6766 -L/usr/local/lib -shared -fpic -o xtlib.so *.cpp -lxtlib

on x86_64 mac os x 10.6
~$ g++ `php-config --includes` -I../xtlib/src.r6766 -L../xtlib/src.r6766 -dynamic -flat_namespace -bundle -bundle_loader /usr/bin/php -fpic -o xtlib.so *.cpp -lxtlib



could have used script...
ls |grep .*\.h$ |awk '{ print "#include \"../src.r6766/"$1"\"" }' >> ../swigtest/xtlib.i
ls |grep .*\.h$ |awk '{ print "%include \"../src.r6766/"$1"\"" }' >> ../swigtest/xtlib.i

xtlib.i must have the includes in hierarchical order of dependency (so classes already know about parent classes)
necessary because of code generation technique and order of includes at compile-time

needed to include
typemaps.i
std_string.i
(possibly more?) these are the conversion between types and the pointer instantiated to that type for dereferencing

used in xtlib.i
%rename(xtfield_data_equals) xtFieldData::operator=(const xtFieldData &);

need final ordering
