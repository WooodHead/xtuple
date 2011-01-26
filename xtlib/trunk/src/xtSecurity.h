#ifndef __xtSecurity_H__
#define __xtSecurity_H__

#include <string>

class xtSecurity
{
  public:
    virtual ~xtSecurity();

    static bool hasPriv(const std::string & privname);

    static void setLogicalUser(const std::string & username);
    static std::string logicalUser();

  private:
    xtSecurity();
};


#endif // __xtSecurity_H__
