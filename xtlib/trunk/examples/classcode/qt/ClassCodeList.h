#ifndef __ClassCodeList_H__
#define __ClassCodeList_H__

#include <QWidget>

#include <set>

#include "ui_ClassCodeList.h"

class xtClassCode;

class ClassCodeList : public QWidget, protected Ui::ClassCodeList
{
  Q_OBJECT

  public:
    ClassCodeList();
    virtual ~ClassCodeList();

  public slots:
    virtual void sQuery();
    virtual void sEdit();
    virtual void sNew();
};

#endif // __ClassCodeList_H__

