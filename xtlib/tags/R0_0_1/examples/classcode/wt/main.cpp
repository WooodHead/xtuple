/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

/** \section ex_classcode Class Code Example
  
    The Class Code example is a simple application to retrieve a
    Class Code, edit it, and save the changes.

 */
#include <Wt/WApplication>
#include "classcodeapp.h"

using namespace Wt;

WApplication *createApplication(const WEnvironment &env)
{
  return new ClassCodeApp(env);
}

int main(int argc, char **argv)
{
  return WRun(argc, argv, &createApplication);
}
