/*
 * Common Public Attribution License Version 1.0. 
 * 
 * The contents of this file are subject to the Common Public Attribution 
 * License Version 1.0 (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License 
 * at http://www.xTuple.com/CPAL.  The License is based on the Mozilla 
 * Public License Version 1.1 but Sections 14 and 15 have been added to 
 * cover use of software over a computer network and provide for limited 
 * attribution for the Original Developer. In addition, Exhibit A has 
 * been modified to be consistent with Exhibit B.
 * 
 * Software distributed under the License is distributed on an "AS IS" 
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See 
 * the License for the specific language governing rights and limitations 
 * under the License. 
 * 
 * The Original Code is PostBooks Accounting, ERP, and CRM Suite. 
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2007 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
 * 
 * Contributor(s): ______________________.
 * 
 * Alternatively, the contents of this file may be used under the terms 
 * of the xTuple End-User License Agreeement (the xTuple License), in which 
 * case the provisions of the xTuple License are applicable instead of 
 * those above.  If you wish to allow use of your version of this file only 
 * under the terms of the xTuple License and not to allow others to use 
 * your version of this file under the CPAL, indicate your decision by 
 * deleting the provisions above and replace them with the notice and other 
 * provisions required by the xTuple License. If you do not delete the 
 * provisions above, a recipient may use your version of this file under 
 * either the CPAL or the xTuple License.
 * 
 * EXHIBIT B.  Attribution Information
 * 
 * Attribution Copyright Notice: 
 * Copyright (c) 1999-2007 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by PostBooks, an open source solution from xTuple
 * 
 * Attribution URL: www.xtuple.org 
 * (to be included in the "Community" menu of the application if possible)
 * 
 * Graphic Image as provided in the Covered Code, if any. 
 * (online at www.xtuple.com/poweredby)
 * 
 * Display of Attribution Information is required in Larger Works which 
 * are defined in the CPAL as a work which combines Covered Code or 
 * portions thereof with code not governed by the terms of the CPAL.
 */

#include "dspTodoByUserAndIncident.h"

#include <QMessageBox>
#include <QSqlError>
#include <QStatusBar>
#include <QVariant>

#include <parameter.h>
#include <openreports.h>
#include <metasql.h>

#include "incident.h"
#include "todoItem.h"

/*
 *  Constructs a dspTodoByUserAndIncident as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
dspTodoByUserAndIncident::dspTodoByUserAndIncident(QWidget* parent, const char* name, Qt::WFlags fl)
    : QMainWindow(parent, name, fl)
{
    setupUi(this);

    (void)statusBar();

    // signals and slots connections
    connect(_close, SIGNAL(clicked()), this, SLOT(close()));
    connect(_print, SIGNAL(clicked()), this, SLOT(sPrint()));
    connect(_query, SIGNAL(clicked()), this, SLOT(sFillList()));
    connect(_todoitem, SIGNAL(populateMenu(QMenu*, QTreeWidgetItem*, int)), this, SLOT(sPopulateMenu(QMenu*)));

    statusBar()->hide();
    
    _usr->setType(User);

    _dueDate->setStartNull(tr("Earliest"), omfgThis->startOfTime(), TRUE);
    _dueDate->setEndNull(tr("Latest"), omfgThis->endOfTime(), TRUE);
    _startDate->setStartNull(tr("Earliest"), omfgThis->startOfTime(), TRUE);
    _startDate->setEndNull(tr("Latest"), omfgThis->endOfTime(), TRUE);

    _todoitem->addColumn(tr("Assigned To"),  _userColumn, Qt::AlignCenter );
    _todoitem->addColumn(tr("Sequence"),    _prcntColumn, Qt::AlignCenter );
    _todoitem->addColumn(tr("Incident"),    _orderColumn, Qt::AlignLeft   );
    _todoitem->addColumn(tr("Task Name"),            100, Qt::AlignCenter );
    _todoitem->addColumn(tr("Status"),	   _statusColumn, Qt::AlignCenter );
    _todoitem->addColumn(tr("Date Due"),     _dateColumn, Qt::AlignCenter );
    _todoitem->addColumn(tr("Date Started"), _dateColumn, Qt::AlignCenter );
    _todoitem->addColumn(tr("Description"),           -1, Qt::AlignLeft   );

    _incident->setEnabled(_selectedIncident->isChecked());
}

/*
 *  Destroys the object and frees any allocated resources
 */
dspTodoByUserAndIncident::~dspTodoByUserAndIncident()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void dspTodoByUserAndIncident::languageChange()
{
    retranslateUi(this);
}

void dspTodoByUserAndIncident::sPopulateMenu(QMenu *pMenu)
{
  int menuItem;

  menuItem = pMenu->insertItem(tr("Edit..."), this, SLOT(sEditTodoItem()), 0);
  pMenu->setItemEnabled(menuItem, _privleges->check("MaintainOtherTodoLists"));

  menuItem = pMenu->insertItem(tr("View..."), this, SLOT(sViewTodoItem()), 0);
  pMenu->setItemEnabled(menuItem, _privleges->check("ViewOtherTodoLists"));

  if (_todoitem->altId() > 0)
  {
    pMenu->insertSeparator();
    menuItem = pMenu->insertItem(tr("Edit Incident"), this, SLOT(sEditIncident()), 0);
    pMenu->setItemEnabled(menuItem, _privleges->check("MaintainIncidents"));
    menuItem = pMenu->insertItem(tr("View Incident"), this, SLOT(sViewIncident()), 0);
    pMenu->setItemEnabled(menuItem, _privleges->check("ViewIncidents") ||
				    _privleges->check("MaintainIncidents"));
  }
}

void dspTodoByUserAndIncident::setParams(ParameterList& params)
{
  if (_usr->isSelected())
    params.append("usr_id", _usr->id());
  else if (_usr->isPattern())
    params.append("usr_pattern", _usr->pattern());
  if (_selectedIncident->isChecked())
    params.append("incdt_id", _incident->id());
  if (_showInactive->isChecked())
    params.append("showInactive");
  if (_showCompleted->isChecked())
    params.append("showCompleted");
  if (_startDate->startDate() > omfgThis->startOfTime())
    params.append("start_date_start", _startDate->startDate());
  if (_startDate->endDate() < omfgThis->endOfTime())
    params.append("start_date_end",   _startDate->endDate());
  if (_dueDate->startDate() > omfgThis->startOfTime())
    params.append("due_date_start",   _dueDate->startDate());
  if (_dueDate->endDate() < omfgThis->endOfTime())
    params.append("due_date_end",     _dueDate->endDate());
}

void dspTodoByUserAndIncident::sFillList()
{
  if (_selectedIncident->isChecked() && _incident->id() <= 0)
  {
    QMessageBox::critical(this, tr("No Incident"),
			  tr("Please select an Incident before Querying."),
			  QMessageBox::Ok, QMessageBox::NoButton);
    _incident->setFocus();
    return;
  }

  _todoitem->clear();

  QString sql = "SELECT todoitem_id, incdt_id, todoitem_seq, incdt_number, "
		"       usr_username, todoitem_name, todoitem_due_date, "
		"       todoitem_start_date, todoitem_status, "
		"       firstLine(todoitem_description) AS todoitem_description "
	        "FROM usr, todoitem LEFT OUTER JOIN"
	        "     incdt ON (todoitem_incdt_id = incdt_id) "
	        "WHERE ((usr_id=todoitem_usr_id)"
		"<? if not exists(\"showInactive\") ?>"
		"  AND todoitem_active "
		"<? endif ?>"
		"<? if not exists(\"showCompleted\") ?>"
		"  AND todoitem_status != 'C' "
		"<? endif ?>"
		"<? if exists(\"usr_id\") ?>"
		"  AND (usr_id=<? value(\"usr_id\") ?>)"
		"<? elseif exists(\"usr_pattern\") ?>"
		"  AND (usr_username ~* <? value(\"usr_pattern\") ?>)"
		"<? endif ?>"
		"<? if exists(\"incdt_id\") ?>"
		"  AND (todoitem_incdt_id=<? value(\"incdt_id\") ?>)"
		"<? endif ?>"
		"<? if exists(\"start_date_start\") ?>"
		"  AND (todoitem_start_date>=<? value(\"start_date_start\") ?>)"
		"<? endif ?>"
		"<? if exists(\"start_date_end\") ?>"
		"  AND (todoitem_start_date<=<? value(\"start_date_end\") ?>)"
		"<? endif ?>"
		"<? if exists(\"due_date_start\") ?>"
		"  AND (todoitem_due_date>=<? value(\"due_date_start\") ?>)"
		"<? endif ?>"
		"<? if exists(\"due_date_end\") ?>"
		"  AND (todoitem_due_date<=<? value(\"due_date_end\") ?>)"
		"<? endif ?>"
		") "
	        "ORDER BY usr_username, todoitem_seq;" ;
  ParameterList params;
  setParams(params);

  MetaSQLQuery mql(sql);
  XSqlQuery todos = mql.toQuery(params);
  todos.exec();
  XTreeWidgetItem *last = 0;
  while (todos.next())
  {
    last = new XTreeWidgetItem(_todoitem, last,
			     todos.value("todoitem_id").toInt(),
			     todos.value("incdt_id").toInt(),
			     todos.value("usr_username").toString(),
			     todos.value("todoitem_seq").toString(),
			     todos.value("incdt_number").isNull() ? "" :
				      todos.value("incdt_number").toString(),
			     todos.value("todoitem_name").toString(),
			     todos.value("todoitem_status").toString(),
			     todos.value("todoitem_due_date").toString(),
			     todos.value("todoitem_start_date").toString(),
			     todos.value("todoitem_description").toString());
    if (todos.value("todoitem_status") != "C")
    {
      if (todos.value("todoitem_due_date").toDate() < QDate::currentDate())
	last->setTextColor("red");
      else if (todos.value("todoitem_due_date").toDate() > QDate::currentDate())
	last->setTextColor("green");
    }
  }
  if (todos.lastError().type() != QSqlError::None)
  {
    systemError(this, todos.lastError().databaseText(), __FILE__, __LINE__);
    return;
  }
}

void dspTodoByUserAndIncident::sPrint()
{
  ParameterList params;
  setParams(params);

  orReport report("TodoByUserAndIncident", params);
  if (report.isValid())
    report.print();
  else
    report.reportError(this);
}

void dspTodoByUserAndIncident::sEditIncident()
{
  ParameterList params;
  params.append("mode", "edit");
  params.append("incdt_id", _todoitem->altId());

  incident newdlg(this, "", TRUE);
  newdlg.set(params);

  if (newdlg.exec() != QDialog::Rejected)
    sFillList();
}

void dspTodoByUserAndIncident::sEditTodoItem()
{
  ParameterList params;
  params.append("mode", "edit");
  params.append("todoitem_id", _todoitem->id());

  todoItem newdlg(this, "", TRUE);
  newdlg.set(params);

  if (newdlg.exec() != QDialog::Rejected)
    sFillList();
}

void dspTodoByUserAndIncident::sViewIncident()
{
  ParameterList params;
  params.append("mode", "view");
  params.append("incdt_id", _todoitem->altId());

  incident newdlg(this, "", TRUE);
  newdlg.set(params);

  newdlg.exec();
}

void dspTodoByUserAndIncident::sViewTodoItem()
{
  ParameterList params;
  params.append("mode", "view");
  params.append("todoitem_id", _todoitem->id());

  todoItem newdlg(this, "", TRUE);
  newdlg.set(params);

  newdlg.exec();
}

