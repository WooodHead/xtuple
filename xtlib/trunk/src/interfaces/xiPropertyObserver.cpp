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
    \class xiPropertyObserver
    \brief An observer interface for watching when properties of an
           xtObject are changed.

    This interface implements notifications of properties being changed
    on an xtObject.
    Subclasses implementing this interface can subscribe to xtObject
    and its subclasses to be notified when the any property of the
    object have been changed.

    This example shows parts of a GUI application that works with class codes.
    In the header file the interface is inherited and its
    implementation declared:
    \dontinclude classcode/wt/classcodeapp.h
    \skip class ClassCodeApp
    \until propertyChanged

    Then in the source file the property observer is connected to an
    xtClassCode object:
    \dontinclude classcode/wt/classcodeapp.cpp
    \skip new xtClassCode
    \until attachPropertyObserver

    The propertyChanged method is implemented to watch several roles and
    adjust the GUI to reflect internal changes in the values of these
    properties:
    \skipline ::propertyChanged
    \until switch
    
    If the xtlib::ValueRole of the code or description changes, the 
    GUI updates the editor fields on the display:
    \until break

    If the xtlib::LabelRole changes, for example the application is dynamically
    translated, the GUI label fields are changed:
    \until break

    and so on.
 */

#include "xiPropertyObserver.h"

/**
    \brief Construct a default \c xiPropertyObserver object.

    Protected constructor to prevent direct instantiations
    of this unimplimented object.
 */
xiPropertyObserver::xiPropertyObserver() {}

/**
    \brief Deconstruct an \c xiPropertyObserver.
 */
xiPropertyObserver::~xiPropertyObserver() {}

/**
    \fn void xiPropertyObserver::propertyChanged(xtObject * object, const std::string & property, int role)
    \brief Called with the objects properties are changed.

    Classes can derive and implement this function so that
    notifiers will call this function passing the object
    being changed as well as the property name and property role.

    \param object The object being changed.
    \param property The property name being changed.
    \param role The role of the property being changed.
 */

