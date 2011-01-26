#ifndef __xiPropertyChecker_H__
#define __xiPropertyChecker_H__

#include <boost/any.hpp>

class xiPropertyChecker
{
  public:
    virtual ~xiPropertyChecker();

    virtual bool check(boost::any value, int role) = 0;

  protected:
    xiPropertyChecker();
};

#endif // __xiPropertyChecker_H__
