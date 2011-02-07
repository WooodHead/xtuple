/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
/** \class xtAbstractCode
    \brief An abstract implementation of a code.

    Most applications use a lot of \e codes, which are in essence
    simple pairings of abbreviated values with longer, meaningful descriptions.
    xtAbstractCode encapsulates the core functionality to manipulate
    codes and their descriptions.

    It is intended to be subclassed for each individual type
    of code, not used directly.
 */

#include "xtlib.h"
#include "xtAbstractCode.h"
#include "xtFieldData.h"
#include "interfaces/xiPropertyChecker.h"

//
// xtAbstractCodePrivate implementation
//
class xtAbstractCodePrivate
{
  public:
    xtAbstractCodePrivate(xtAbstractCode *);
    virtual ~xtAbstractCodePrivate();

    xtAbstractCode * _parent;

    class NotEmptyChecker : public xiPropertyChecker
    {
      xtAbstractCodePrivate * self;
      public:
        NotEmptyChecker(xtAbstractCodePrivate * parent) : self(parent) {}
        bool check(const QVariant & value, int role)
        {
          if(role == xtlib::ValueRole && value.type() == QVariant::String)
          {
            QString str = value.toString();
            if(str.isEmpty())
              return false;
          }
          return true;
        }
    };
    xiPropertyChecker * notEmpty;
};

xtAbstractCodePrivate::xtAbstractCodePrivate(xtAbstractCode * parent)
{
  _parent = parent;
  notEmpty = new NotEmptyChecker(this);
}

xtAbstractCodePrivate::~xtAbstractCodePrivate()
{

}

//
// xtAbstractCode implementation
//

/**
    \brief Construct an abstract code.
 */
xtAbstractCode::xtAbstractCode()
  : xtStorable()
{
  _data = new xtAbstractCodePrivate(this);

  setCode(QVariant());
  setPropertyP("code", QVariant(true),    xtlib::RequiredRole);
  setPropertyP("code", QVariant("Code"), xtlib::LabelRole);
  setPropertyP("code", QVariant::fromValue(xtFieldData("code",  xtFieldData::String)), xtlib::FieldRole);
  setPropertyP("code", QVariant::fromValue(_data->notEmpty), xtlib::CheckerRole);

  setDescription(QVariant());
  setPropertyP("description", QVariant("Description"), xtlib::LabelRole);
  setPropertyP("description", QVariant::fromValue(xtFieldData("descrip",  xtFieldData::String)), xtlib::FieldRole);
}

/**
    \brief Convenience function to get the code property.

    By default this returns the code itself. By specifying a role,
    it can be used to get any of the other properties associated
    with the code.

    \param role The role value to return.
    \return A value as \c QVariant.

    \sa xtObject::getProperty()
 */
QVariant xtAbstractCode::getCode(int role) const
{
  return getProperty("code", role);
}

/**
    \brief Convenience function to set the code property.

    \param code The value to set.
    \param role The role value to set.

    \sa xtObject::setProperty()
 */
void xtAbstractCode::setCode(const QVariant & code, int role)
{
  setProperty("code", code, role);
}

/**
    \brief Convenience function to get the description property.

    By default this returns the description itself. By specifying
    a role, it can be used to get any of the other properties
    associated with the description.

    \param role The role value to return.
    \return A value as \c QVariant.

    \sa xtObject::getProperty()
 */
QVariant xtAbstractCode::getDescription(int role) const
{
  return getProperty("description", role);
}

/**
    \brief Convenience function to set the description property.

    \param description The value to set.
    \param role The role value to set.

    \sa xtObject::setProperty()
 */
void xtAbstractCode::setDescription(const QVariant & description, int role)
{
  setProperty("description", description, role);
}
