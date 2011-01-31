/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef __xtAbstractCode_H__
#define __xtAbstractCode_H__

#include "xtStorable.h"
#include <vector>

class xtEntity;
class xtAbstractCodePrivate;

class xtAbstractCode : public xtStorable
{
  public:
    xtAbstractCode();

    // User Data
    boost::any getCode(int role = xtlib::ValueRole) const;
    virtual void setCode(boost::any code, int role = xtlib::ValueRole);

    boost::any getDescription(int role = xtlib::ValueRole) const;
    virtual void setDescription(boost::any description, int role = xtlib::ValueRole);

  private:
    xtAbstractCodePrivate * _data;
};

#endif // __xtAbstractCode_H__
