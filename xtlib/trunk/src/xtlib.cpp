/** \mainpage xtLib Orientation

  \section xtlib_intro Introduction

  xtlib is a research project by xTuple to test some ideas for
  reimplementing xTuple ERP using the Domain Model pattern instead
  of the Transaction Script pattern as described in Martin Fowler's
  \a "Patterns of Enterprise Application Architecture"
  at http://martinfowler.com/eaaCatalog/

  This documentation is intended to help readers get a rough idea
  of the structure of the project's code. Only features that have
  already been implemented are documented in any detail.  Aspects
  that have not been used or implemented yet are displayed without
  further comment.
*/

/** \file xtlib.h
    \brief Header file for library constants.

    Contains the constant enumerations use throughout the 
    xtlib library.
 */

/** \file xtlib.cpp
    \brief Implmentation file for xtlib class.

    Contains the implementation details for the xtlib class
    along with some central doxygen information that does not
    fit elsewhere.
 */

/** \class xtlib
    \brief Core class with miscellaneous values and enumerations.
 */

#include "xtlib.h"

bool xtlib::debug = false;

xtlib::xtlib()
{
}

xtlib::~xtlib()
{
}

