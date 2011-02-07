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

  \brief A utility class to mediate between the \c QVariant class
         and xTuple classes.

    xtlib keeps values of a number of data types in \c QVariant
    variables.  These types come from standard C++, the standard
    C++ library, the Qt library, and xtlib itself.  xtAnyUtility
    provides standard ways not provided by the Qt library itself
    for xtlib to handle \c QVariant values.

*/

#include "xtAnyUtility.h"
#include <stdexcept>

/** \brief Compare two \c QVariant values.

  equal() compares two \c QVariant values in a type-sensitive way.
  If the two values have the same type, they are cast to instances of
  that type and compared using the \c == operator.

  \param left  One value to compare.
  \param right The other value to compare.

  \return \c true if the two parameters have the same type
	  and the same value within that type, including \c
	  QVariant(), otherwise \c false.

  \throw std::runtime_error equal() cannot compare \c left and \c right
                             because it does not recognize the type of the
                             parameters.

 */
bool xtAnyUtility::equal(const QVariant &left, const QVariant &right)
{
/*
  if (left.type() != right.type())
    return false;

  if(left.isNull() && right.isNull())
    return true;

  if (left.type() == QVariant::String)
    return left.toString() == right.toString();
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
*/
  return left == right;
}

/** \brief Convert a \c QVariant value to a standard string.

    This method converts a \c QVariant value to a standard string.

    \param value The \c QVariant value to convert to a string.

    \return A string representation of the \c QVariant value passed in.

    \throw std::runtime_error The type of the \c QVariant is not known or
                               the string does not fit in the allocated buffer.
*/
std::string xtAnyUtility::toString(const QVariant &value)
{
  QString str;
  if(value.type() == QVariant::RegExp)
    str = value.toRegExp().pattern();
  else
    str = value.toString();
  return str.toStdString();
}

/** \brief Convert a standard string to a \c QVariant object.

    This method converts a standard string to a \c QVariant object.

    \param value The standard string to be converted.

    \return A \c QVariant object.

*/
QVariant xtAnyUtility::toAny(const std::string &value)
{
    return QVariant(QString::fromStdString(value));
}

/** \brief Convert a QVariant to a \c QVariant object.

    This method converts a QRegExp object to a \c QVariant object.

    \param value The QRegExp to be converted.

    \return A \c QVariant object.

*/
QVariant xtAnyUtility::toAny(const QRegExp &value)
{
    return QVariant(value);
}

/** \brief Convert a standard string to a \c QRegExp object.

    This method converts a standard string to a \c QRegExp object.

    \param value The standard string to be converted.

    \return A \c QRegExp object.

*/
QRegExp xtAnyUtility::toRegex(const std::string &value)
{
    return QRegExp(QString::fromStdString(value));
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
