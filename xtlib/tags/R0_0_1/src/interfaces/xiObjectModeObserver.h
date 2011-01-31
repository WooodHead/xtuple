/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
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

