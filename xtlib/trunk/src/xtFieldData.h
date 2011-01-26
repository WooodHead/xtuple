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

