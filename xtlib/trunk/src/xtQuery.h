#ifndef __xtQuery_H__
#define __xtQuery_H__

#include <string>

class xtQueryPrivate;

class xtQuery
{
  public:
    xtQuery();
    virtual ~xtQuery();

    void exec(const std::string & query);

    bool isValid() const;

    std::string lastErrorString() const;

    int rowCount() const;
    int columnCount() const;
    int getColumnByName(const std::string & name) const;
    std::string getNameByColumn(int column) const;

    std::string getValue(int row, int column) const;
    std::string getValue(int row, const std::string & name) const;

    bool isNull(int row, int column) const;
    bool isNull(int row, const std::string & name) const;

  private:
    xtQueryPrivate * _data;
};

#endif // __xtQuery_H__
