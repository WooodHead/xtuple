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

#include <QVariant>
#include <QRegExp>

#include <string>
#include <vector>
#include <set>

class xtAnyUtility
{
  public:
    static bool                         equal(const QVariant &left, const QVariant &right);
    static std::string                  toString(const QVariant &value);
    static QRegExp                      toRegex(const std::string &value);
    static QVariant                     toAny(const QRegExp &value);
    static QVariant                     toAny(const std::string &value);
    static std::vector<std::string>     toVector(const std::set<std::string> &value);
};

#endif

