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

#include "dspCountTagsByClassCode.h"

#include <QVariant>
#include <QMessageBox>
#include <QStatusBar>
#include <parameter.h>
#include "countTag.h"
#include "rptCountTagsByClassCode.h"

/*
 *  Constructs a dspCountTagsByClassCode as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
dspCountTagsByClassCode::dspCountTagsByClassCode(QWidget* parent, const char* name, Qt::WFlags fl)
    : QMainWindow(parent, name, fl)
{
    setupUi(this);

    (void)statusBar();

    // signals and slots connections
    connect(_close, SIGNAL(clicked()), this, SLOT(close()));
    connect(_cnttag, SIGNAL(populateMenu(QMenu*,QTreeWidgetItem*,int)), this, SLOT(sPopulateMenu(QMenu*)));
    connect(_print, SIGNAL(clicked()), this, SLOT(sPrint()));
    connect(_query, SIGNAL(clicked()), this, SLOT(sFillList()));
    init();
}

/*
 *  Destroys the object and frees any allocated resources
 */
dspCountTagsByClassCode::~dspCountTagsByClassCode()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void dspCountTagsByClassCode::languageChange()
{
    retranslateUi(this);
}

//Added by qt3to4:
#include <QMenu>

void dspCountTagsByClassCode::init()
{
  statusBar()->hide();

  _classCode->setType(ClassCode);
  _dates->setStartNull(tr("Earliest"), omfgThis->startOfTime(), TRUE);
  _dates->setEndNull(tr("Latest"), omfgThis->endOfTime(), TRUE);

  _cnttag->addColumn(tr("Tag #"),        -1,           Qt::AlignLeft   );
  _cnttag->addColumn(tr("Whs."),         _whsColumn,   Qt::AlignCenter );
  _cnttag->addColumn(tr("Item"),         _itemColumn,  Qt::AlignLeft   );
  _cnttag->addColumn(tr("Created (By)"), _dateColumn,  Qt::AlignCenter );
  _cnttag->addColumn(tr("Entered (By)"), _dateColumn,  Qt::AlignCenter );
  _cnttag->addColumn(tr("Posted (By)"),  _dateColumn,  Qt::AlignCenter );
  _cnttag->addColumn(tr("QOH Before"),   _qtyColumn,   Qt::AlignRight  );
  _cnttag->addColumn(tr("Qty. Counted"), _qtyColumn,   Qt::AlignRight  );
  _cnttag->addColumn(tr("Variance"),     _qtyColumn,   Qt::AlignRight  );
  _cnttag->addColumn(tr("%"),            _prcntColumn, Qt::AlignRight  );
  
  sFillList();
}

void dspCountTagsByClassCode::sPrint()
{
  ParameterList params;
  _warehouse->appendValue(params);
  _classCode->appendValue(params);
  _dates->appendValue(params);
  params.append("print");

  if (_showUnposted->isChecked())
    params.append("showUnposted");

  rptCountTagsByClassCode newdlg(this, "", TRUE);
  newdlg.set(params);
}

void dspCountTagsByClassCode::sPopulateMenu(QMenu *pMenu)
{
  pMenu->insertItem(tr("View Count Tag..."), this, SLOT(sView()), 0);
}

void dspCountTagsByClassCode::sView()
{
  ParameterList params;
  params.append("mode", "view");
  params.append("cnttag_id", _cnttag->id());

  countTag newdlg(this, "", TRUE);
  newdlg.set(params);
  newdlg.exec();
}

void dspCountTagsByClassCode::sFillList()
{
  _cnttag->clear();

  if (_dates->allValid())
  {
    QString sql( "SELECT invcnt_id, invcnt_tagnumber, warehous_code,"
                 " item_number,"
                 " (formatDate(invcnt_tagdate) || ' (' || getUsername(invcnt_tag_usr_id) || ')'),"
                 " CASE WHEN (invcnt_cntdate IS NULL) THEN ''"
                 "      ELSE (formatDate(invcnt_cntdate) || ' (' || getUsername(invcnt_cnt_usr_id) || ')')"
                 " END,"
                 " CASE WHEN (NOT invcnt_posted) THEN ''"
                 "      ELSE (formatDate(invcnt_postdate) || ' (' || getUsername(invcnt_post_usr_id) || ')')"
                 " END,"
                 " CASE WHEN (NOT invcnt_posted) THEN ''"
                 "      ELSE (formatQty(invcnt_qoh_before))"
                 " END,"
                 " CASE WHEN (invcnt_qoh_after IS NULL) THEN ''"
                 "      ELSE (formatQty(invcnt_qoh_after))"
                 " END,"
                 " CASE WHEN (NOT invcnt_posted) THEN ''"
                 "      ELSE (formatQty(invcnt_qoh_after - invcnt_qoh_before))"
                 " END,"
                 " CASE WHEN (NOT invcnt_posted) THEN ''"
                 "      WHEN ( (invcnt_qoh_before = 0) AND (invcnt_qoh_after = 0) ) THEN (formatScrap(0))"
                 "      WHEN (invcnt_qoh_before = 0) THEN (formatScrap(1))"
                 "      ELSE (formatScrap((1 - (invcnt_qoh_after / invcnt_qoh_before)) * -1))"
                 " END "
                 "FROM invcnt, itemsite, item, warehous "
                 "WHERE ((invcnt_itemsite_id=itemsite_id)"
                 " AND (itemsite_item_id=item_id)"
                 " AND (itemsite_warehous_id=warehous_id)"
                 " AND (DATE(invcnt_tagdate) BETWEEN :startDate AND :endDate)" );

    if (!_showUnposted->isChecked())
      sql += " AND (invcnt_posted)";

    if (_warehouse->isSelected())
      sql += " AND (itemsite_warehous_id=:warehous_id)";

    if (_classCode->isSelected())
      sql += " AND (item_classcode_id=:classcode_id)";
    else if (_classCode->isPattern())
      sql += " AND (item_classcode_id IN (SELECT classcode_id FROM classcode WHERE (classcode_code ~ :classcode_pattern)))";

    sql += ") "
           "ORDER BY invcnt_tagdate";

    q.prepare(sql);
    _warehouse->bindValue(q);
    _classCode->bindValue(q);
    _dates->bindValue(q);
    q.exec();
    _cnttag->populate(q);
  }
}
