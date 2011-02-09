/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#include "ClassCodeList.h"

#include <QSqlQuery>

#include <xtClassCode.h>
#include <xtStorableQuery.h>
#include <xiPropertyObserver.h>

#include <QMessageBox>
#include <QListWidget>
#include <QListWidgetItem>
#include <QRegExp>

#include "ClassCode.h"

class MyListWidgetItem : public QListWidgetItem, public xiPropertyObserver
{
  public:
    MyListWidgetItem(xtClassCode * pcode) : QListWidgetItem()
    {
      code = pcode;
      if(code)
      {
        setText(QString::fromStdString(xtAnyUtility::toString(code->getCode())));
        code->attachPropertyObserver(this);
      }
    }

   virtual void propertyChanged(xtObject * pcode, const std::string & pname, int role)
   {
     if(pcode && role == xtlib::ValueRole && pname == "code")
     {
       setText(QString::fromStdString(xtAnyUtility::toString(pcode->getProperty("code"))));
     }
   }

   xtClassCode * code;
};

ClassCodeList::ClassCodeList() : QWidget()
{
  setupUi(this);

  connect(query, SIGNAL(clicked()), this, SLOT(sQuery()));
  connect(edit,  SIGNAL(clicked()), this, SLOT(sEdit()));
  connect(newCC, SIGNAL(clicked()), this, SLOT(sNew()));
}

ClassCodeList::~ClassCodeList()
{
}

void ClassCodeList::sQuery()
{
  list->clear();
  try
  {
    xtClassCode ex;
    if(codeOpt->currentIndex() == 1)
      ex.setCode(code->text());
    else if(codeOpt->currentIndex() == 2)
      ex.setCode(QRegExp(code->text()));
    if(descOpt->currentIndex() == 1)
      ex.setDescription(desc->text());
    else if(descOpt->currentIndex() == 2)
      ex.setDescription(QRegExp(desc->text()));

    xtStorableQuery<xtClassCode> sq(&ex);
    sq.exec();
    std::set<xtClassCode*> codes = sq.result();
    if(codes.empty())
    {
      QMessageBox::information(this, "Not Found", "No Class Codes were found matching your criteria.");
      return;
    }
    for(std::set<xtClassCode*>::const_iterator ci = codes.begin(); ci != codes.end(); ci++)
      list->addItem(new MyListWidgetItem((*ci)));
  }
  catch(std::exception &e)
  {
    QMessageBox::critical(this, "Error", QString("Error querying for Class Codes: %1").arg(e.what()));
  }
}

void ClassCodeList::sEdit()
{
  if(!list->currentItem())
    return;

  MyListWidgetItem * item = static_cast<MyListWidgetItem*>(list->currentItem());
  if(item)
  {
    ClassCode ccDlg(item->code, this);
    ccDlg.exec();
  }
}

void ClassCodeList::sNew()
{
  xtClassCode * cc = new xtClassCode();
  if(cc)
  {
    ClassCode ccDlg(cc, this);
    if(ccDlg.exec() == QDialog::Accepted)
      list->addItem(new MyListWidgetItem(cc));
  }
}
