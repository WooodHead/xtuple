/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
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

