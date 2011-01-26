#ifndef __xtDatabase_H__
#define __xtDatabase_H__

#include <string>

class xtDatabase
{
  public:
    virtual ~xtDatabase();

    static xtDatabase * getInstance();

    void open(const std::string & options);
    void close();

    bool isOpen() const;

    void begin();
    void commit();
    void rollback();

    std::string lastErrorString() const;

    std::string escapeString(const std::string & original) const;

  private:
    xtDatabase();
};

#endif // __xtDatabase_H__
