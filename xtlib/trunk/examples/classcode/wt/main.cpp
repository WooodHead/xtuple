// Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.

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
