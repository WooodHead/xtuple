#ifndef __xtClassCode_H__
#define __xtClassCode_H__

#include "xtAbstractCode.h"

class xtClassCode : public xtAbstractCode
{
  public:
    xtClassCode();

  protected:
    virtual void doDelete();
};

#endif // __xtClassCode_H__
