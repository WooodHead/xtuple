/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef _XEINVALIDSTORABLE_H_
#define _XEINVALIDSTORABLE_H_

#include "../xtStorable.h"

class xeInvalidStorablePrivate;

class xeInvalidStorable : public std::exception
{
  public:
    xeInvalidStorable();
    xeInvalidStorable(const std::string &message);
    xeInvalidStorable(const xtStorable &storable);

    virtual ~xeInvalidStorable() throw();

    virtual const char* what() const throw();

  private:
    xeInvalidStorablePrivate *_data;
};

#endif
