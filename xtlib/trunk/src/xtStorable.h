// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple

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
    boost::any getType(int role = xtlib::ValueRole) const;
    boost::any getCreated(int role = xtlib::ValueRole) const;
    boost::any getCreator(int role = xtlib::ValueRole) const;
    boost::any getModified(int role = xtlib::ValueRole) const;
    boost::any getModifier(int role = xtlib::ValueRole) const;

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
