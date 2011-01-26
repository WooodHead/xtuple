#ifndef __ClassCode_H__
#define __ClassCode_H__

#include <QDialog>

#include "ui_ClassCode.h"

class xtClassCode;

class ClassCode : public QDialog, public Ui::ClassCode
{
  Q_OBJECT

  public:
    ClassCode(xtClassCode * pcode, QWidget * parent = 0);
    virtual ~ClassCode();

  public slots:
    virtual void accept();

  private:
    xtClassCode * cc;
};

#endif // __ClassCode_H__
