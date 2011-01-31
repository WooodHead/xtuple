/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
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

