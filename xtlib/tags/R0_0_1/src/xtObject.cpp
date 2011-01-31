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
    \class xtObject
    \brief Provides the root object that most other
           objects are derived from.

    Provides a base functionality that all objects in the system
    can rely upon for building data objects that are consistent
    and generic.
 */

#include <map>
#include <stdexcept>

#include "xtObject.h"
#include "interfaces/xiPropertyChecker.h"
#include "interfaces/xiObserverList.h"
#include "interfaces/xiDestroyedObserver.h"
#include "interfaces/xiObjectModeObserver.h"
#include "interfaces/xiObjectStateObserver.h"
#include "interfaces/xiPropertyObserver.h"

//
// xtObject private implementation
//
class xtObjectPrivate
{
  public:
    xtObjectPrivate(xtObject *);
    virtual ~xtObjectPrivate();

    xtObject * _owner;
    xiObserverList _destroyedObservers;
    xiObserverList _stateObservers;
    xiObserverList _modeObservers;
    xiObserverList _propertyObservers;

    void stateChanged();
    void modeChanged();
    void propertyChanged(const std::string &, int role);

    typedef std::map< std::pair<std::string, int> , boost::any> propertyMap;
    propertyMap _properties;

    int _state;
    int _mode;
};

xtObjectPrivate::xtObjectPrivate(xtObject * owner)
{
  _owner = owner;
  _state = xtlib::NullState;
  _mode = xtlib::NewMode;
}

xtObjectPrivate::~xtObjectPrivate()
{
}

void xtObjectPrivate::stateChanged()
{
// The following code block should be standardized for reuse in some way
  // notify listeners about us being deleted
  xiObjectStateObserver * desObs = 0;
  for(int i = 0; i < _stateObservers.size(); i++)
  {
    desObs = (xiObjectStateObserver*)_stateObservers.get(i);
    if(xiObserverList::validateObserver(desObs))
      desObs->objectStateChanged(_owner, _state);
    else
    {
      // ??? We can leave the invalid observer in the list or remove it.
      // Leaving it will require the same objects checked again on each call.
      // Removing it will mess up the sequence causing us to deal with that here.
    }
  }
// end reuse code block
}

void xtObjectPrivate::modeChanged()
{
// The following code block should be standardized for reuse in some way
  // notify listeners about us being deleted
  xiObjectModeObserver * desObs = 0;
  for(int i = 0; i < _modeObservers.size(); i++)
  {
    desObs = (xiObjectModeObserver*)_modeObservers.get(i);
    if(xiObserverList::validateObserver(desObs))
      desObs->objectModeChanged(_owner, _mode);
    else
    {
      // ??? We can leave the invalid observer in the list or remove it.
      // Leaving it will require the same objects checked again on each call.
      // Removing it will mess up the sequence causing us to deal with that here.
    }
  }
// end reuse code block
}

void xtObjectPrivate::propertyChanged(const std::string & name, int role)
{
// The following code block should be standardized for reuse in some way
  // notify listeners about us being deleted
  xiPropertyObserver * desObs = 0;
  for(int i = 0; i < _propertyObservers.size(); i++)
  {
    desObs = (xiPropertyObserver*)_propertyObservers.get(i);
    if(xiObserverList::validateObserver(desObs))
      desObs->propertyChanged(_owner, name, role);
    else
    {
      // ??? We can leave the invalid observer in the list or remove it.
      // Leaving it will require the same objects checked again on each call.
      // Removing it will mess up the sequence causing us to deal with that here.
    }
  }
// end reuse code block
}

//
// xtObject public implementation
//

/**
    \brief Construct a default \c xtObject object.

    Creates an empty \c xtObject instance.
 */
xtObject::xtObject()
{
  _data = new xtObjectPrivate(this);
}

/**
    \brief Destroy an xtObject instance.

    Any observers attached to the destroyed notification list
    will be notified that this object is being destroyed.

    \attention The object may be in an undefined state when
               the notification is sent. Accessing the object
               at at this point could lead to unexpected results.
 */
xtObject::~xtObject()
{
// The following code block should be standardized for reuse in some way
  // notify listeners about us being deleted
  xiDestroyedObserver * desObs = 0;
  for(int i = 0; i < _data->_destroyedObservers.size(); i++)
  {
    desObs = (xiDestroyedObserver*)_data->_destroyedObservers.get(i);
    if(xiObserverList::validateObserver(desObs))
      desObs->destroyed(this);
    else
    {
      // ??? We can leave the invalid observer in the list or remove it.
      // Leaving it will require the same objects checked again on each call.
      // Removing it will mess up the sequence causing us to deal with that here.
    }
  }
// end reuse code block

  delete _data;
}

/**
    \brief Attach the specified observer.

    Adds the observer to the appropriate list, after which the
    observer will be notified if the current xtObject is destroyed.

    \param observer The observer to attach.
 */
void xtObject::attachDestroyed(xiDestroyedObserver * observer)
{
  _data->_destroyedObservers.append(observer);
}

/**
    \brief Detach the specified observer.

    Removes the observer from the appropriate list and the observer
    will no longer be notified if the current xtObject is destroyed.

    \param observer The observer to detach.
 */
void xtObject::detachDestroyed(xiDestroyedObserver * observer)
{
  _data->_destroyedObservers.remove(observer);
}

/**
    \brief Attach the specified observer.

    Adds the observer to the appropriate list, after which the
    observer will be notified if the object state changes.

    \param observer The observer to attach.
 */
void xtObject::attachObjectStateObserver(xiObjectStateObserver * observer)
{
  _data->_stateObservers.append(observer);
}

/**
    \brief Detach the specified observer.

    Removes the observer from the appropriate list and the observer
    will no longer be notified if the current xtObject changes
    state.

    \param observer The observer to detach.
 */
void xtObject::detachObjectStateObserver(xiObjectStateObserver * observer)
{
  _data->_stateObservers.remove(observer);
}

/**
    \brief Returns the current state.

    \return The current state.
 */
int xtObject::getObjectState() const
{
  return _data->_state;
}

/**
    \brief Sets the current state.

    If the new state specified is different from the current state
    then the object will notify any state observers of the change.

    \param val The new state value
 */
void xtObject::setObjectState(int val)
{
  if(_data->_state != val)
  {
    _data->_state = val;
    _data->stateChanged();
  }
}

/**
    \brief Attach the specified observer.

    Adds the observer to the appropriate list, after which the
    observer will be notified if the object mode changes.

    \param observer The observer to attach.
 */
void xtObject::attachObjectModeObserver(xiObjectModeObserver * observer)
{
  _data->_modeObservers.append(observer);
}

/**
    \brief Detach the specified observer.

    Removes the observer from the appropriate list and the observer
    will no longer be notified if the current object changes mode.

    \param observer The observer to detach.
 */
void xtObject::detachObjectModeObserver(xiObjectModeObserver * observer)
{
  _data->_modeObservers.remove(observer);
}

/**
    \brief Returns the current mode.

    \return The current mode.
 */
int xtObject::getObjectMode() const
{
  return _data->_mode;
}

/**
    \brief Sets the current mode.

    If the new mode specified is different from the current mode
    then the object will notify any mode observers of the change.

    \param val The new mode value
 */
void xtObject::setObjectMode(int val)
{
  if(_data->_mode != val)
  {
    _data->_mode = val;
    _data->modeChanged();
  }
}

/**
    \brief Attach the specified observer.

    Adds the observer to the appropriate list, after which
    the observer will be notified if any object properties change.

    \param observer The observer to attach.
 */
void xtObject::attachPropertyObserver(xiPropertyObserver * observer)
{
  _data->_propertyObservers.append(observer);
}

/**
    \brief Detach the specified observer.

    Removes the observer from the appropriate list
    and the observer will no longer get property change notifications.

    \param observer The observer to detach.
 */
void xtObject::detachPropertyObserver(xiPropertyObserver * observer)
{
  _data->_propertyObservers.remove(observer);
}

/**
    \brief Get the value of a property by name, optionally with a specific role.

    Retrieve the value for the property name passed in.
    The default role is \c xtlib::ValueRole. If the given name/role
    combination does not exist then an empty \c boost::any value will
    be returned.

    \param name The property name to get.
    \param role The role to get.
    \return The value for the given name and role if it has been set,
            otherwise \c boost::any::empty.
 */
boost::any xtObject::getProperty(const std::string & name, int role) const
{
  std::pair< std::string, int > key (name, role);
  xtObjectPrivate::propertyMap::const_iterator it = _data->_properties.find(key);

  if(it == _data->_properties.end())
    return boost::any();

  return (*it).second;
}

/**
    \brief Get the names of all properties for this object.

    The result contains the names of all properties of this object,
    regardless of role. The contents are unique - each name only
    appears once in the set, regardless of how many roles have been
    set with this name.

    \return A set of property names for this object.
 */
std::set<std::string> xtObject::getPropertyNames() const
{
  std::set<std::string> propnames;

  for (xtObjectPrivate::propertyMap::const_iterator it = _data->_properties.begin();
       it != _data->_properties.end();
       it++)
  {
    std::string name = it->first.first;
    if (propnames.find(name) == propnames.end())
      propnames.insert(name);
  }

  return propnames;
}

/**
    \brief Get the names of all properties for this object.

    This overload returns the names of all properties for a particular
    role, regardless of the value assigned to that role.  Callers
    who use this set to retrieve values must check to see if the
    value is \c boost::any::empty().

    \param role The role to select property names by.
    \return A set of property names for this object having the role specified.
 */
std::set<std::string> xtObject::getPropertyNames(xtlib::ObjectDataRole role) const
{
  std::set<std::string> propnames;

  for (xtObjectPrivate::propertyMap::const_iterator it = _data->_properties.begin();
       it != _data->_properties.end();
       it++)
  {
    std::string name = it->first.first;
    if (it->first.second == (int)role &&
        propnames.find(name) == propnames.end())
      propnames.insert(name);
  }

  return propnames;
}

/**
    \brief Set a property name to \c value for a given role.

    Updates the property with the specified name to the passed in
    value for the role specified. This public version of the function
    will only allow non-protected roles to be set. An exception
    will be thrown if a protected role is specified. This method
    calls the \c setPropertyP() method.

    The following roles are protected:
      - xtlib::RequiredRole
      - xtlib::PreviousValueRole
      - xtlib::StatusRole
      - xtlib::FieldRole
      - xtlib::CheckerRole

    \param name The property name to set.
    \param value The new value to set.
    \param role The role to set.
    \throw std::runtime_error If the role specified is protected or the value
                              fails the property checker this exception is thrown.

    \sa setPropertyP(), xtlib::ObjectDataRole
 */
void xtObject::setProperty(const std::string & name, boost::any value, int role)
{
  if(role == xtlib::RequiredRole
  || role == xtlib::PreviousValueRole
  || role == xtlib::StatusRole
  || role == xtlib::FieldRole
  || role == xtlib::CheckerRole)
    throw std::runtime_error("setProperty called with protected role id.");

  setPropertyP(name, value, role);
}

/**
    \brief Set a protected property name to \c value for a given role.

    Updates the property with the specified name to the passed in
    value for the role specified. This protected version can be used
    by sub-classes to set the value of roles that are protected.

    \param name The property name to set.
    \param value The new value to set.
    \param role The role to set.
    \throw std::runtime_error If the the value fails the property checker
                              this exception is thrown.
 */
void xtObject::setPropertyP(const std::string & name, boost::any value, int role)
{
  boost::any pChecker = getProperty(name, xtlib::CheckerRole);
  if(!pChecker.empty())
  {
    xiPropertyChecker * pc = 0;
    try {
      pc = boost::any_cast<xiPropertyChecker *>(pChecker);
    } catch (...) {}
    if(pc != 0 && !pc->check(value, role))
      throw std::runtime_error("Unable to set property. Installed property checker returned false.");
  }

  // TODO: do a type check for FieldRole and CheckerRole values?

  std::pair< std::string, int > key (name, role);
  boost::any oldval = getProperty(name, role);
  _data->_properties[key] = value;
  //if(_oldval != value)
    _data->propertyChanged(name, role);
}

