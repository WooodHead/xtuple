// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple.

/**
    \class xiDestroyedObserver
    \brief An observer interface for watching when objects are destroyed.
  
    Implementing the xiDestroyedObserver interface allows a class to
    receive notifications of object destruction.
    Subclasses implementing this interface can subscribe to xtObject
    and it's derivatives to be notified when the object is destroyed.
    Notification is sent from the xtObject destructor method.
 */

#include "xiDestroyedObserver.h"

/**
    \brief Construct a default xiDestroyedObserver object.
  
    Protected constructor to prevent direct instantiations
    of this unimplemented object.
 */
xiDestroyedObserver::xiDestroyedObserver() {}

/**
    \brief Destruct an xiDestroyedObserver.
 */
xiDestroyedObserver::~xiDestroyedObserver() {}

/**
    \fn void xiDestroyedObserver::destroyed(xtObject * object)
    \brief This method is called when \c object is being destroyed.
   
    Subclasses of xiDestroyedObserver must implement this function.
    The destructor of \c object will call this function passing the object
    being destroyed.

    \attention The \c object may be in a undefined state
               and attempts to access the \c object could
               lead to unexpected results.

    \param object The object being destroyed.
 */
