/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "xeInvalidStorable.h"
#include "../xtlib.h"

class xeInvalidStorablePrivate
{
  public:
    xeInvalidStorablePrivate(xeInvalidStorable *owner);
    virtual ~xeInvalidStorablePrivate();

    std::string           _message;
    std::set<std::string> _missing;
    xeInvalidStorable    *_owner;
};

xeInvalidStorablePrivate::xeInvalidStorablePrivate(xeInvalidStorable *owner)
{
  _owner = owner;
  _message = "invalid xtStorable";
}

xeInvalidStorablePrivate::~xeInvalidStorablePrivate()
{
}

////////////////////////////////////////////////////////////////////////////////

/** \class xeInvalidStorable

  \brief An exception class for reporting invalid xtStorable objects.

  The expectation is that xeInvalidStorable exceptions will only
  be thrown by the xtStorable and xtStorableQuery classes.
 */

/** \brief Default constructor.

  This constructor should not be used unless no information is available
  about why the xtStorable object is invalid.
 */
xeInvalidStorable::xeInvalidStorable()
  : std::exception()
{
  _data = new xeInvalidStorablePrivate(this);
}

/** \brief Constructor that accepts a description of what specifically
           is wrong with the xtStorable.

    Use this constructor to report a specific problem with the xtStorable.

    \param message A \c std::string that will be returned by subsequent
                   calls to what().
 */
xeInvalidStorable::xeInvalidStorable(const std::string &message)
{
  _data = new xeInvalidStorablePrivate(this);
  _data->_message = message;
}

/** \brief Constructor that accepts an xtStorable to analyze.

  Use this constructor to report a problem with a particular xtStorable object.
  The object will be examined for problems that might apply to any
  xtStorable, such as properties that are required but have no values.

  \param storable An xtStorable object to examine for reasons it might be
                  invalid.
 */

xeInvalidStorable::xeInvalidStorable(const xtStorable &storable)
  : std::exception()
{
  _data = new xeInvalidStorablePrivate(this);

  std::set<std::string> req = storable.getPropertyNames(xtlib::RequiredRole);
  if (! req.empty())
  {
    for (std::set<std::string>::iterator it = req.begin();
         it != req.end(); it++)
    {
      boost::any required = storable.getProperty(*it, xtlib::RequiredRole);
      if (! required.empty() && boost::any_cast<bool>(required) &&
          storable.getProperty(*it).empty())
      _data->_missing.insert(*it);
    }
  }
}

/** \brief xeInvalidStorable destructor
 */
xeInvalidStorable::~xeInvalidStorable() throw()
{
}

/** \brief Return a C string describing why the xtStorable object
           is invalid.

    The returned value depends on which constructor was called:
    \li xeInvalidStorable() : a default message.
    \li xeInvalidStorable(const std::string &message) : the \c message.
    \li xeInvalidStorable(const xtStorable &storable) : a string
    describing the problems found with \c storable and the names
    of the invalid properties whenever possible.

    \return A C string describing the problem with the xtStorable object.
 */
const char* xeInvalidStorable::what() const throw()
{
  std::string what = _data->_message;

  if(! _data->_missing.empty())
  {
    what += "\nMissing required data: ";        // TODO: std::endl ?
    for (std::set<std::string>::iterator it = _data->_missing.begin();
         it != _data->_missing.end();
         it++)
      what += *it + " ";
  }

  return what.c_str();
}
