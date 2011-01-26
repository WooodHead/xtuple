// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple

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
