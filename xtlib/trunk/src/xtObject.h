#ifndef __xtObject_H__
#define __xtObject_H__

#include <boost/any.hpp>

#include <set>
#include <string>

#include "xtlib.h"

class xtObjectPrivate;
class xiObjectStateObserver;
class xiObjectModeObserver;
class xiPropertyObserver;
class xiDestroyedObserver;

class xtObject
{
  public:
    xtObject();
    virtual ~xtObject();

    int getObjectState() const;
    int getObjectMode() const;

    boost::any getProperty(const std::string &name, int role = xtlib::ValueRole) const;
    void setProperty(const std::string &name, boost::any value, int role = xtlib::ValueRole);

    // Observer related methods for xiDestroyed interface
    void attachDestroyed(xiDestroyedObserver *observer);
    void detachDestroyed(xiDestroyedObserver *observer);

    // Observer related method for xiObjectStateObserver interface
    void attachObjectStateObserver(xiObjectStateObserver *observer);
    void detachObjectStateObserver(xiObjectStateObserver *observer);

    // Observer related method for xiObjectModeObserver interface
    void attachObjectModeObserver(xiObjectModeObserver *observer);
    void detachObjectModeObserver(xiObjectModeObserver *observer);

    // Observer related method for xiPropertyObserver interface
    void attachPropertyObserver(xiPropertyObserver *observer);
    void detachPropertyObserver(xiPropertyObserver *observer);

    std::set<std::string> getPropertyNames() const;
    std::set<std::string> getPropertyNames(xtlib::ObjectDataRole role) const;

  protected:
    void setObjectState(int state);
    void setObjectMode(int mode);
    void setPropertyP(const std::string &name, boost::any value, int role = xtlib::ValueRole);

  private:
    xtObjectPrivate * _data;
};

#endif // __xtObject_H__
