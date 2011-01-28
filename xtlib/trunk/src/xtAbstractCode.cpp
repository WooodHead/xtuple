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

    std::vector<xtEntity *> _vent;

    class NotEmptyChecker : public xiPropertyChecker
    {
      xtAbstractCodePrivate * self;
      public:
        NotEmptyChecker(xtAbstractCodePrivate * parent) : self(parent) {}
        bool check(boost::any value, int role)
        {
          if(role == xtlib::ValueRole && value.type() == typeid(std::string))
          {
            std::string str = boost::any_cast<std::string>(value);
            if(str.empty())
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

  setCode(boost::any());
  setPropertyP("code", boost::any(true),    xtlib::RequiredRole);
  setPropertyP("code", std::string("Code"), xtlib::LabelRole);
  setPropertyP("code", xtFieldData("code",  xtFieldData::String), xtlib::FieldRole);
  setPropertyP("code", _data->notEmpty, xtlib::CheckerRole);

  setDescription(boost::any());
  setPropertyP("description", std::string("Description"), xtlib::LabelRole);
  setPropertyP("description", xtFieldData("descrip",  xtFieldData::String), xtlib::FieldRole);
}

/**
    \brief Convenience function to get the code property.

    By default this returns the code itself. By specifying a role,
    it can be used to get any of the other properties associated
    with the code.

    \param role The role value to return.
    \return A value as \c boost::any.

    \sa xtObject::getProperty()
 */
boost::any xtAbstractCode::getCode(int role) const
{
  return getProperty("code", role);
}

/**
    \brief Convenience function to set the code property.

    \param code The value to set.
    \param role The role value to set.
    \return A value as \c boost::any.

    \sa xtObject::setProperty()
 */
void xtAbstractCode::setCode(boost::any code, int role)
{
  setProperty("code", code, role);
}

/**
    \brief Convenience function to get the description property.

    By default this returns the description itself. By specifying
    a role, it can be used to get any of the other properties
    associated with the description.

    \param role The role value to return.
    \return A value as \c boost::any.

    \sa xtObject::getProperty()
 */
boost::any xtAbstractCode::getDescription(int role) const
{
  return getProperty("description", role);
}

/**
    \brief Convenience function to set the description property.

    \param description The value to set.
    \param role The role value to set.
    \return A value as \c boost::any.

    \sa xtObject::setProperty()
 */
void xtAbstractCode::setDescription(boost::any description, int role)
{
  setProperty("description", description, role);
}
