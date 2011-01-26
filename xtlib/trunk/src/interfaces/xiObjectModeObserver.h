#ifndef __xiObjectModeObserver_H__
#define __xiObjectModeObserver_H__

#include "xiObserver.h"

class xtObject;

class xiObjectModeObserver : public xiObserver
{
  public:
    virtual ~xiObjectModeObserver();

    virtual void objectModeChanged(xtObject * object, int mode) = 0;
  
  protected:
    xiObjectModeObserver();
};

#endif

