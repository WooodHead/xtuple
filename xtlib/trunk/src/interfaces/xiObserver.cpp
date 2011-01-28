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

