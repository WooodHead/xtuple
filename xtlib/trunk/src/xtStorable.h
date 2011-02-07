/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef __xtStorable_H__
#define __xtStorable_H__

#include <string>

#include "xtError.h"
#include "xtObject.h"

class xtStorablePrivate;

class xtStorable : public xtObject
{
  public:
    xtStorable();
    virtual ~xtStorable(); 

    // Database methods
    virtual void load(long long id);
    virtual void reload();
    virtual void save();
    virtual void saveAs();

    // State
    void lock();
    void unlock();
    bool isLocked() const;
    bool isSelfLocked() const;

    bool isDirty() const;
    bool isValid() const;
    xtError getLastError() const;

    // System Data
    long long getId() const;
    QVariant getType(int role = xtlib::ValueRole) const;
    QVariant getCreated(int role = xtlib::ValueRole) const;
    QVariant getCreator(int role = xtlib::ValueRole) const;
    QVariant getModified(int role = xtlib::ValueRole) const;
    QVariant getModifier(int role = xtlib::ValueRole) const;

    // User Data
    bool isDeleted() const;
    virtual void setDeleted(bool deleted);

    std::string getTableName() const; // TODO: public -> xtStorableQuery<T> friend
    std::string getFieldPrefix() const; // TODO: public -> xtStorableQuery<T> friend

  protected:
    virtual void setType(const std::string & type);

    void setTableName(const std::string & name);
    void setFieldPrefix(const std::string & name);

    virtual void doDelete();

  private:
    xtStorablePrivate * _data;
};

#endif // __xtStorable_H__
