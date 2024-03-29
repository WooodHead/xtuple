/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "createRecurringItems.h"

#include <QMessageBox>
#include <QSqlError>
#include <QVariant>

#include "storedProcErrorLookup.h"
#include "submitAction.h"

createRecurringItems::createRecurringItems(QWidget* parent, const char* name, Qt::WindowFlags fl)
    : XWidget(parent, name, fl)
{
  setupUi(this);

  connect(_create,    SIGNAL(clicked()),     this, SLOT(sCreate()));
  connect(_invoices,  SIGNAL(toggled(bool)), this, SLOT(sHandleButtons()));
  connect(_incidents, SIGNAL(toggled(bool)), this, SLOT(sHandleButtons()));
  connect(_projects,  SIGNAL(toggled(bool)), this, SLOT(sHandleButtons()));
  connect(_todoItems, SIGNAL(toggled(bool)), this, SLOT(sHandleButtons()));
}

createRecurringItems::~createRecurringItems()
{
  // no need to delete child widgets, Qt does it all for us
}

void createRecurringItems::languageChange()
{
  retranslateUi(this);
}

void createRecurringItems::sHandleButtons()
{
  _create->setEnabled(_invoices->isChecked()  ||
                      _incidents->isChecked() ||
                      _projects->isChecked()  ||
                      _todoItems->isChecked());
}

void createRecurringItems::sCreate()
{
  struct {
    XCheckBox *widget;
    QString    arg;        // to createRecurringItems()
  } list[] = {
    { _invoices,   "I"     },
    { _incidents,  "INCDT" },
    { _projects,   "J"     },
    { _todoItems,  "TODO"  }
  };

  QStringList errors;
  int         count = 0;

  XSqlQuery createq;
  createq.prepare("SELECT createRecurringItems(NULL, :what) AS result;");

  for (unsigned int i = 0; i < sizeof(list) / sizeof(list[0]); i++)
  {
    if (list[i].widget->isChecked())
    {
      createq.bindValue(":what", list[i].arg);
      createq.exec();
      if (createq.first())
      {
        int result = createq.value("result").toInt();
        if (result < 0)
          errors.append(storedProcErrorLookup("createRecurringItems", result));
        else
          count += result;
      }
      else if (createq.lastError().type() != QSqlError::NoError)
        errors.append(createq.lastError().text());

    }
  }
  if (! errors.isEmpty())
  {
    QMessageBox::critical(this, tr("Processing Errors"),
                          tr("<p>%n error(s) occurred during processing:"
                             "<ul><li>%1</li></ul>", "", errors.size())
                          .arg(errors.join("</li><li>")));
    return;
  }
  else
    QMessageBox::information(this, tr("Processing Complete"),
                             tr("<p>%n record(s) were created.", "", count));

  close();
}
