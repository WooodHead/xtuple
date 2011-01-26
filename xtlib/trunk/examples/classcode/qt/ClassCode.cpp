#include "ClassCode.h"

#include <xtAnyUtility.h>
#include <xtClassCode.h>

#include <exception>

#include <QMessageBox>
#include <QDebug>

ClassCode::ClassCode(xtClassCode * pcode, QWidget * parent)
  : QDialog(parent)
{
  setupUi(this);

  cc = pcode;
  if(cc)
  {
    code->setText(QString::fromStdString(xtAnyUtility::toString(cc->getCode())));
    desc->setText(QString::fromStdString(xtAnyUtility::toString(cc->getDescription())));
    modified->setText(QString("%1 %2")
      .arg(QString::fromStdString(xtAnyUtility::toString(cc->getProperty("modifier"))))
      .arg(QString::fromStdString(xtAnyUtility::toString(cc->getProperty("modified")))));
  }
}

ClassCode::~ClassCode()
{
}

void ClassCode::accept()
{
  if(cc)
  {
    try
    {
      cc->setCode(code->text().toStdString());
      cc->setDescription(desc->text().toStdString());
      cc->save();
    }
    catch (std::exception & e)
    {
      QMessageBox::critical(this, "Error", QString("There was an error saving the Class Code: %1").arg(e.what()));
      return;
    }
  }
  QDialog::accept();
}

