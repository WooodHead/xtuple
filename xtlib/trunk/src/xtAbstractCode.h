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
