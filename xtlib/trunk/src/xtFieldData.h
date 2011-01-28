/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef __xtFieldData_H__
#define __xtFieldData_H__

#include <string>

class xtFieldData {
  public:
    enum Type
    {
      Serial = 0,
      String,
      Integer,
      Numeric,
      Bool,
      Timestamp,
      TimestampTZ,
      Date,
      Time,
      Reference
    };
    xtFieldData(const std::string & pFieldName = "",
                enum Type pType = String);
    xtFieldData(const xtFieldData & orig);

    xtFieldData& operator=(const xtFieldData & orig);

    std::string fieldName;
    enum Type type;
};

#endif // __xtFieldData_H__

