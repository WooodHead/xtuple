/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef __xtError_H__
#define __xtError_H__

#include <string>

class xtErrorPrivate;

class xtError
{
  public:
    enum ErrorType {
      NoError,
      ConnectionError,
      StatementError,
      TransactionError,
      UnknownError
    };

    xtError(int number = 0, const std::string & text = std::string(), ErrorType type = NoError);
    virtual ~xtError();

    int getNumber() const;
    virtual void setNumber(int number);

    const std::string & getText() const;
    virtual void setText(const std::string & text);

    enum ErrorType getType() const;
    virtual void setType(enum ErrorType type);

  private:
    xtErrorPrivate * _data;
};

#endif // __xtError_H__

