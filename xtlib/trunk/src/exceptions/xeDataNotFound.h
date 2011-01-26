// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple

#ifndef _XEDATANOTFOUND_H_
#define _XEDATANOTFOUND_H_

#include <stdexcept>

class xeDataNotFoundPrivate;

class xeDataNotFound : public std::exception
{
  public:
    xeDataNotFound();
    xeDataNotFound(const std::string &message);
    xeDataNotFound(const std::string &source, const int id);

    virtual ~xeDataNotFound() throw();

    virtual const char* what() const throw();

  private:
    xeDataNotFoundPrivate *_data;
};

#endif
