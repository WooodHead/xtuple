#ifndef __xiDestroyedObserver_H__
#define __xiDestroyedObserver_H__

#include "xiObserver.h"

class xtObject;

class xiDestroyedObserver : public xiObserver
{
  public:
    virtual ~xiDestroyedObserver();

    virtual void destroyed(xtObject * object) = 0;
  
  protected:
    xiDestroyedObserver();
};

#endif

