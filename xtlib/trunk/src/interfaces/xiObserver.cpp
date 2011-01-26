/**
    \class xiObserver
    \brief A common base class for all observers.

    xiObserver is the base class for a hierarchy of interfaces.
    The various subclasses of xiObserver help safeguard against dangling
    pointers and watch for changes to particular aspects of xtObject
    instances.
    All interface subclasses should inherit this
    class as virtual.

    Concrete classes should never inherit from xiObserver directly. Instead
    they should inherit and implement one of its interface subclasses.
 */

#include "xiObserver.h"

// implemented in xiObserverList.cpp
void __removeObserverFromGlobalValidList(xiObserver*);

/**
    \brief Construct a default \c xiObserver object.

    Protected constructor to prevent direct instantiations
    of this unimplemented object.
 */
xiObserver::xiObserver()
{
}

/**
    \brief Destruct an \c xiObserver.
 */
xiObserver::~xiObserver()
{
  // Working in conjunction with xiObserverList remove ourselves
  __removeObserverFromGlobalValidList(this); 
}

