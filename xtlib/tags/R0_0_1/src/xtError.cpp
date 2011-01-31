/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
/** \class xtError
    \brief A generic error class.
 */

#include "xtError.h"

//
// xtErrorPrivate implementation
//
class xtErrorPrivate
{
  public:
    xtErrorPrivate();
    virtual ~xtErrorPrivate();

    int _number;
    std::string _text;
    enum xtError::ErrorType _type;
};

xtErrorPrivate::xtErrorPrivate()
{
  _number = -1;
  _type = xtError::NoError;
}

xtErrorPrivate::~xtErrorPrivate() {}

//
// xtError implementation
//
xtError::xtError(int number, const std::string & text, ErrorType type)
{
  _data = new xtErrorPrivate();
  _data->_number = number;
  _data->_text = text;
  _data->_type = type;
}

xtError::~xtError()
{
  if(_data)
    delete _data;
}

int xtError::getNumber() const
{
  return _data->_number;
}

void xtError::setNumber(int number)
{
  _data->_number = number;
}

const std::string & xtError::getText() const
{
  return _data->_text;
}

void xtError::setText(const std::string & text)
{
  _data->_text = text;
}

enum xtError::ErrorType xtError::getType() const
{
  return _data->_type;
}

void xtError::setType(enum ErrorType type)
{
  _data->_type = type;
}

