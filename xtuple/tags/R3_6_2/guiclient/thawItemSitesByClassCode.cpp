/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "thawItemSitesByClassCode.h"

#include <qvariant.h>

/*
 *  Constructs a thawItemSitesByClassCode as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 *  The dialog will by default be modeless, unless you set 'modal' to
 *  true to construct a modal dialog.
 */
thawItemSitesByClassCode::thawItemSitesByClassCode(QWidget* parent, const char* name, bool modal, Qt::WFlags fl)
    : XDialog(parent, name, modal, fl)
{
    setupUi(this);


    // signals and slots connections
    connect(_close, SIGNAL(clicked()), this, SLOT(reject()));
    connect(_thaw, SIGNAL(clicked()), this, SLOT(sThaw()));
    init();

    //If not multi-warehouse hide whs control
    if (!_metrics->boolean("MultiWhs"))
    {
      _warehouseLit->hide();
      _warehouse->hide();
    }
}

/*
 *  Destroys the object and frees any allocated resources
 */
thawItemSitesByClassCode::~thawItemSitesByClassCode()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void thawItemSitesByClassCode::languageChange()
{
    retranslateUi(this);
}


void thawItemSitesByClassCode::init()
{
  _classCode->setType(ParameterGroup::ClassCode);
}

void thawItemSitesByClassCode::sThaw()
{
  QString sql( "SELECT thawItemsite(itemsite_id) "
               "FROM itemsite, item "
               "WHERE ( (itemsite_freeze)"
               " AND (itemsite_item_id=item_id)"
               " AND (itemsite_warehous_id=:warehous_id)" );

  if (_classCode->isSelected())
    sql += " AND (item_classcode_id=:classcode_id)";
  else if (_classCode->isPattern())
    sql += " AND (item_classcode_id IN (SELECT classcode_id FROM classcode WHERE (classcode_code ~ :classcode_pattern)))";

  sql += ");";

  q.prepare(sql);
  q.bindValue(":warehous_id", _warehouse->id());
  _classCode->bindValue(q);
  q.exec();

  accept();
}

