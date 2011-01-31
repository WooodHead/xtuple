/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
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
