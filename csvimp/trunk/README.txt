CSVimp Notes
=============================
Last updated: Sept. 21, 2007


The following points should be considered when working with 
CSVimp source code:


* Qt must be installed and working properly to successfully
compile CSVimp.

* Because CSVimp shares files used by xtuple, the two
applications should be stored in the same parent directory and
should be compiled side-by-side.

The following describes the preferred method for compiling
CSVimp:

1. Checkout the xtuple module from SVN
2. Checkout the csvimp module from SVN (save in same parent
   directory as used for xtuple module)
3. Compile xtuple
4. Compile CSVimp
