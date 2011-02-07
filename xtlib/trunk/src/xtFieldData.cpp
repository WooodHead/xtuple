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
    \class xtFieldData
    \brief \c xtFieldData holds details relating an xtObject property
           to a database field.

    Classes that derive from the \c xtStorable class use this to set
    their properties' \c xtlib::FieldData roles. This allows xtStorable to
    know which properties need to be stored. The xtFieldData object itself
    describes the field name and data type to use when loading and storing
    a particular property's xtlib::ValueRole value.
 */

#include "xtFieldData.h"

/**
    \enum xtFieldData::Type
    \brief Data type enumeration.

    Specifies the different data types that a field can have.
*/
/**
    \var xtFieldData::Type xtFieldData::Serial
    An integer that is automatically incremented by the storage system.
*/
/**
    \var xtFieldData::Type xtFieldData::Numeric
    A floating point number.
*/
/**
    \var xtFieldData::Type xtFieldData::Timestamp
    The date and time in UTC.
*/
/**
    \var xtFieldData::Type xtFieldData::TimestampTZ
    The local date and time, including the time zone.
 */

/**
    \var xtFieldData::fieldName
    \brief The field name used in the backend storage system.
 */

/**
    \var xtFieldData::type
    \brief The type of the field.
 */

/**
    \brief Construct a new object with the specified values.

    If no values are specified then defaults will be used.

    \param pFieldName The name of the field.
    \param pType The type of the field.
 */
xtFieldData::xtFieldData(const std::string & pFieldName,
                         enum Type pType)
{
  fieldName = pFieldName;
  type = pType;
}

/**
    \brief Construct a new \c xtFieldData object from an existing object.

    \param orig The original object to copy.
 */
xtFieldData::xtFieldData(const xtFieldData & orig)
{
  fieldName = orig.fieldName;
  type = orig.type;
}

/**
    \brief Copies the values of orig to this object.

    \param orig The original object to copy.
    \return A reference to this objects modified self.
 */
xtFieldData& xtFieldData::operator=(const xtFieldData & orig)
{
  fieldName = orig.fieldName;
  type = orig.type;
  return *this;
}

