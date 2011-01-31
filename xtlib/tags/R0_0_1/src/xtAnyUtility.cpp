/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

/** \class xtAnyUtility

  \brief A utility class to mediate between the \c boost::any class
         and xTuple classes.

    xtlib keeps values of a number of data types in \c boost::any
    variables.  These types come from standard C++, the standard
    C++ library, the Boost library, and xtlib itself.  xtAnyUtility
    provides standard ways not provided by the Boost library itself
    for xtlib to handle \c boost::any values.

*/

#include "xtAnyUtility.h"
#include <stdexcept>
#include <boost/regex.hpp>
#include <boost/lexical_cast.hpp>
#include <boost/date_time/posix_time/posix_time.hpp>

using namespace boost;

/** \brief Compare two \c boost::any values.

  equal() compares two \c boost::any values in a type-sensitive way.
  If the two values have the same type, they are cast to instances of
  that type and compared using the \c == operator.

  \param left  One value to compare.
  \param right The other value to compare.

  \return \c true if the two parameters have the same type
	  and the same value within that type, including \c
	  any::empty(), otherwise \c false.

  \throw std::runtime_error equal() cannot compare \c left and \c right
                             because it does not recognize the type of the
                             parameters.

 */
bool xtAnyUtility::equal(const boost::any &left, const boost::any &right)
{
  if (left.type() != right.type())
    return false;

  if(left.empty() && right.empty())
    return true;

  if (left.type() == typeid(std::string))
    return any_cast<std::string>(left) == any_cast<std::string>(right);
  else if (left.type() == typeid(int))
    return any_cast<int>(left) == any_cast<int>(right);
  else if (left.type() == typeid(bool))
    return any_cast<bool>(left) == any_cast<bool>(right);
  else if (left.type() == typeid(regex))
    return any_cast<regex>(left) == any_cast<regex>(right);
  else if (left.type() == typeid(posix_time::ptime))
    return any_cast<posix_time::ptime>(left) == any_cast<posix_time::ptime>(right);
  else
  {
    std::string msg = std::string("cannot compare ") + left.type().name() +
                      std::string(" values");
    throw std::runtime_error(msg);
  }
}

/** \brief Convert a \c boost::any value to a standard string.

    This method converts a \c boost::any value to a standard string.

    \param value The \c boost::any value to convert to a string.

    \return A string representation of the \c boost::any value passed in.

    \throw std::runtime_error The type of the \c boost:any is not known or
                               the string does not fit in the allocated buffer.
*/
std::string xtAnyUtility::toString(const boost::any &value)
{
  if(value.empty())
    return std::string();

  if (value.type() == typeid(std::string))
    return any_cast<std::string>(value);
  else if (value.type() == typeid(int))
  {
    char result[1024];
    int size = sprintf(result, "%-d", any_cast<int>(value));
    if (size > sizeof(result))
      throw std::runtime_error("buffer overrun");
    return result;
  }
  else if (value.type() == typeid(bool))
    return any_cast<bool>(value) ? "true" : "false";
  else if (value.type() == typeid(long long))
    return lexical_cast<std::string>(any_cast<long long>(value));
  else if (value.type() == typeid(long))
    return lexical_cast<std::string>(any_cast<long>(value));
  else if (value.type() == typeid(short))
    return lexical_cast<std::string>(any_cast<short>(value));
  else if (value.type() == typeid(int))
    return lexical_cast<std::string>(any_cast<int>(value));
  else if (value.type() == typeid(float))
    return lexical_cast<std::string>(any_cast<float>(value));
  else if (value.type() == typeid(double))
    return lexical_cast<std::string>(any_cast<double>(value));
  else if (value.type() == typeid(posix_time::ptime))
  {
    posix_time::ptime ts = any_cast<posix_time::ptime>(value);
    return posix_time::to_simple_string(ts);
  }
  else if (value.type() == typeid(regex))
    return any_cast<regex>(value).str();
  else
  {
    std::string msg = std::string("cannot convert ") + value.type().name() +
                      std::string(" to a string");
    throw std::runtime_error(msg);
  }
}

/** \brief Convert a standard string to a \c boost::any object.

    This method converts a standard string to a \c boost::any object.

    \param value The standard string to be converted.

    \return A \c boost::any object.

*/
any xtAnyUtility::toAny(const std::string &value)
{
    return any(value);
}

/** \brief Convert a boost::regex to a \c boost::any object.

    This method converts a boost:regex object to a \c boost::any object.

    \param value The boost:regex to be converted.

    \return A \c boost::any object.

*/
any xtAnyUtility::toAny(const regex &value)
{
    return any(value);
}

/** \brief Convert a standard string to a \c boost::regex object.

    This method converts a standard string to a \c boost::regex object.

    \param value The standard string to be converted.

    \return A \c boost::regex object.

*/
regex xtAnyUtility::toRegex(const std::string &value)
{
    //this forced a link against libboost_regex
    //but should be avoidable?
    return regex(value);
}

/** \brief Convert a standard std::set<std::string> to a \c std::vector<std::string> object.

    This method converts a standard std::set<std::string> to a \c std::vector<std::string> object.

    \param value The std::set<std::string> to be converted.

    \return A \c std::vector<std::set> object.

*/
std::vector<std::string> xtAnyUtility::toVector(const std::set<std::string> &value)
{
    std::vector<std::string> vec;
    std::set<std::string>::iterator it;
    for(it=value.begin();it!=value.end();it++)
        vec.push_back((*it));
    return vec;
}
