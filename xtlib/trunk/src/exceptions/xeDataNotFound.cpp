/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "xeDataNotFound.h"

#include <QString>

class xeDataNotFoundPrivate
{
  public:
    xeDataNotFoundPrivate(xeDataNotFound *owner);
    virtual ~xeDataNotFoundPrivate();

    int                _id;
    std::string        _message;
    std::string        _source;
    xeDataNotFound    *_owner;
};

xeDataNotFoundPrivate::xeDataNotFoundPrivate(xeDataNotFound *owner)
{
  _owner = owner;
  _id    = 0;
  _message = "Data not found";
}

xeDataNotFoundPrivate::~xeDataNotFoundPrivate()
{
}

////////////////////////////////////////////////////////////////////////////////

/** \class xeDataNotFound

  \brief An exception for reporting problems retrieving data.

  This exception should only be used in cases where a record is expected to
  exist but doesn't. For example, if an object is saved and immediately
  retrieved, but the retrieval fails because the object cannot be found, an
  xeDataNotFound exception should be thrown. However, a query that might
  legitimately return no objects should not throw an xeDataNotFound.
 */

/** \brief Default constructor.

  This constructor should not be used unless no information is available
  about what data could not be found.
  */
xeDataNotFound::xeDataNotFound()
  : std::exception()
{
  _data = new xeDataNotFoundPrivate(this);
}

/** \brief Constructor that accepts a message describing what
           was not retrieved.

    Use this constructor to report a specific problem. For example:
    \code
      throw xeDataNotFound("Class Code 'ABC' could not be reloaded after saving.");
    \endcode
 */
xeDataNotFound::xeDataNotFound(const std::string &message)
{
  _data = new xeDataNotFoundPrivate(this);
  _data->_message = message;
}

/** \brief Constructor accepting a data source description and an object id.

  Use this constructor to report problems loading a specific object from
  a specific source. For example, to report a problem loading a
  specific class code:
  \code
    throw xeDataNotFound("Class Code", 256);
  \endcode
 */
xeDataNotFound::xeDataNotFound(const std::string &source, const int id)
  : std::exception()
{
  _data = new xeDataNotFoundPrivate(this);

  _data->_source = source;
  _data->_id     = id;
}

/** \brief Destructor.
 */
xeDataNotFound::~xeDataNotFound() throw()
{
}

/** \brief Return a C string describing the data that could not be found.

  The returned value depends on which constructor was called:
  \li xeDataNotFound() : a default message.
  \li xeDataNotFound(const std::string &message) : the \c message.
  \li xeDataNotFound(const std::string &source, const int id) : the internal id
          and a description of the data source to which that id can be traced.

  \return A C string describing the what data could not be found.
 */
const char* xeDataNotFound::what() const throw()
{
  std::string what = _data->_message;

  if(! _data->_source.empty())
  {
    what += " source: " + _data->_source;
    what += QString(" id: %1").arg(_data->_id).toStdString();
  }

  return what.c_str();
}
