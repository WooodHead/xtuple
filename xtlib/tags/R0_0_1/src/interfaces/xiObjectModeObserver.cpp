/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

/**
    \class xiObjectModeObserver
    \brief An observer interface for watching when the \c mode of an
           object changes.

    The xiObjectModeObserver interface implements notifications of
    object mode change.  Subclasses implementing this interface can
    subscribe to xtObject and its subclasses to be notified when
    the mode of an object is changed.

    xiObjectModeObserver objects can be registered to
    receive notifications of mode changes by attaching
    on the object to be observed:
    \code
    xtObject *watchme = new xtObject();
    xiObjectModeObserver *watcher = new xtClassImplementingModeObserver();
    watchme->attachObjectModeObserver(watcher);
    \endcode

    \see xtObject::attachObjectModeObserver(xiObjectModeObserver *observer)
 */

#include "xiObjectModeObserver.h"

/**
    \brief Construct a default \c xiObjectModeObserver object.

    Protected constructor to prevent direct instantiations
    of this unimplemented object.
 */
xiObjectModeObserver::xiObjectModeObserver() {}

/**
    \brief Destruct an \c xiObjectModeObserver.
 */
xiObjectModeObserver::~xiObjectModeObserver() {}

/**
    \fn void xiObjectModeObserver::objectModeChanged(xtObject * object, int mode)
    \brief This method is called with the object and new mode when
           the mode of \c object is changed.

    Subclasses must implement this function.
    Notifiers will call this function passing the object
    being changed and the new mode of that object.

    \param object The object being changed.
    \param mode The new mode of the object being changed.
 */

