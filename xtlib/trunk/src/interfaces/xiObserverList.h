#ifndef __xiObserverList_H__
#define __xiObserverList_H__

class xiObserver;
class xiObserverListPrivate;

class xiObserverList
{
  public:
    xiObserverList();
    virtual ~xiObserverList();

    void append(xiObserver * observer);
    void remove(xiObserver * observer);
    void clear();
    int size() const;
    xiObserver *get(int idx);

    static bool validateObserver(xiObserver * observer);

  private:
    xiObserverListPrivate * _data;
};

#endif

