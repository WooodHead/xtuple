// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple.

/**
    \class xiObjectStateObserver
    \brief An observer interface for watching when the \c state of an object
           changes.

    This interface implements notifications of object state change.
    Subclasses implementing this interface can subscribe to xtObject
    and its subclasses to be notified when the state of an object is changed.

    xiObjectStateObserver objects can be registered to
    receive notifications of state changes by attaching
    on the object to be observed:
    \code
    xtObject *watchme = new xtObject();
    xiObjectStateObserver *watcher = new xtClassImplementingStateObserver();
    watchme->attachObjectStateObserver(watcher);
    \endcode
 */

#include "xiObjectStateObserver.h"

/**
    \brief Construct a default \c xiObjectStateObserver object.

    Protected constructor to prevent direct instantiations
    of this unimplemented object.
 */
xiObjectStateObserver::xiObjectStateObserver() {}

/**
    \brief Destruct an \c xiObjectStateObserver.
 */
xiObjectStateObserver::~xiObjectStateObserver() {}

/**
    \fn void xiObjectStateObserver::objectStateChanged(xtObject * object, int state)
    \brief This method is called with the object and new state when state of
           \c object is changed.

    Subclasses must implement this function.
    Notifiers will call this function passing the object
    being changed and the new state of that object.

    \param object The object being changed.
    \param state The new state of the object being changed.
 */
