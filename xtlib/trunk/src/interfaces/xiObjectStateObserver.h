#ifndef __xiObjectStateObserver_H__
#define __xiObjectStateObserver_H__

#include "xiObserver.h"

class xtObject;

class xiObjectStateObserver : public xiObserver
{
  public:
    virtual ~xiObjectStateObserver();

    virtual void objectStateChanged(xtObject * object, int state) = 0;
  
  protected:
    xiObjectStateObserver();
};

#endif

