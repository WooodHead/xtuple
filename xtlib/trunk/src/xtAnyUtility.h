// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple

#ifndef _XTANYUTILITY_H_
#define _XTANYUTILITY_H_

#include <boost/any.hpp>
#include <boost/regex.hpp>
#include <string>
#include <vector>
#include <set>

class xtAnyUtility
{
  public:
    static bool                         equal(const boost::any &left, const boost::any &right);
    static std::string                  toString(const boost::any &value);
    static boost::regex                 toRegex(const std::string &value);
    static boost::any                   toAny(const boost::regex &value);
    static boost::any                   toAny(const std::string &value);
    static std::vector<std::string>     toVector(const std::set<std::string> &value);
};

#endif

