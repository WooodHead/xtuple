/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef __xtDatabase_H__
#define __xtDatabase_H__

#include <string>

class xtDatabase
{
  public:
    virtual ~xtDatabase();

    static xtDatabase * getInstance();

    void open(const std::string & options);
    void close();

    bool isOpen() const;

    void begin();
    void commit();
    void rollback();

    std::string lastErrorString() const;

    std::string escapeString(const std::string & original) const;

  private:
    xtDatabase();
};

#endif // __xtDatabase_H__
