#ifndef __xiPropertyObserver_H__
#define __xiPropertyObserver_H__

#include <string>

#include "xiObserver.h"

class xtObject;

class xiPropertyObserver : public xiObserver
{
  public:
    virtual ~xiPropertyObserver();

    virtual void propertyChanged(xtObject * object, const std::string & property, int role) = 0;
  
  protected:
    xiPropertyObserver();
};

#endif

