// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple.

/**
    \class xiObserverList
    \brief A list of objects which have been registered to observe changes
           in other objects.

    xtObject uses this class internally to a manage the attachment,
    detachment, and notification of various observer objects.  Each
    xtObject instance, e.g. \c watchme, holds one or more lists of
    xiObserver objects that have requested to be notified
    if something about \c watchme changes. Each of these lists
    is an xiObserverList.

    \see xtObject
    \see xiObserver
 */

#include "xiObserverList.h"
#include "xiObserver.h"

#include <set>

// Stores a list of observers for validation purposes
static std::set<xiObserver *> __globalObservers;
 
// This function is used by xiObserver to be able to remove itself
// from a list when it destroys itself.
void __removeObserverFromGlobalValidList(xiObserver * observer)
{
  __globalObservers.erase(observer);
}

//
// xiObserverListPrivate implementation
//
class xiObserverListPrivate
{
  public:
    xiObserverListPrivate();
    virtual ~xiObserverListPrivate();

    std::set<xiObserver *> _observers;
};

xiObserverListPrivate::xiObserverListPrivate() {}

xiObserverListPrivate::~xiObserverListPrivate() {}

//
// xiObserverList implementation
//

/**
    \brief Construct a default, empty, \c xiObserverList.
 */
xiObserverList::xiObserverList()
{
  _data = new xiObserverListPrivate();
}

/**
    \brief Destruct an \c xiObserverList.
 */
xiObserverList::~xiObserverList()
{
  if(_data)
    delete _data;
}

/**
    \brief Append an observer to the list.
  
    Add the \c observer to the list if it is not already in this list.
  
    \param observer The observer to append.
 */
void xiObserverList::append(xiObserver * observer)
{
  if(!observer)
    return;

  _data->_observers.insert(observer);
  __globalObservers.insert(observer);
}

/**
    \brief Remove an observer from the list.
  
    \param observer The observer to remove.
 */
void xiObserverList::remove(xiObserver * observer)
{
  if(!observer)
    return;

  _data->_observers.erase(observer);
}

/**
    \brief Clears the list of all objects.
 */
void xiObserverList::clear()
{
  _data->_observers.clear();
}

/**
    \brief Returns the size of the list.

    \return The size of the list.
 */
int xiObserverList::size() const
{
  return _data->_observers.size();
}

/**
    \brief Get an observer from the list by index.

    \param idx The index of the observer to return.
    \return Pointer to \c xiObserver in specified index or \c null if \c idx
            is outside the range of the list.
 */
// TODO: is the index into a std::set repeatable? if not, is get(index) useful?
xiObserver * xiObserverList::get(int idx)
{
  std::set<xiObserver *>::iterator it = _data->_observers.begin();
  int i = 0;

  while((i < idx) && (it != _data->_observers.end()))
  {
    it++;
    i++;
  }

  if(it == _data->_observers.end())
    return 0;

  return *it;
}

/**
    \brief Validate that an observer is still valid.

    Validates that a pointer to a particular observer is still in
    the list.

    \param observer Pointer to the observer to validate.
    \return \c true if the observer pointer is still in the list, otherwise
            \c false.
 */
bool xiObserverList::validateObserver(xiObserver * observer)
{
  std::set<xiObserver *>::iterator it = __globalObservers.find(observer);
  if(it == __globalObservers.end())
    return false;

  return true;
}

