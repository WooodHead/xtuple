/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
/** \class xtClassCode
    \brief An object for working with a Class Code.

    Class Codes are used for Inventory control and provide a
    mechanism for categorizing Items regardless of Item Type.
 */

#include "xtClassCode.h"

#include <stdexcept>

#include <QDebug>
#include <QSqlQuery>

//
// xtClassCode implementation
//

/**
    \brief Construct an empty \c xtClassCode.
 */
xtClassCode::xtClassCode()
  : xtAbstractCode()
{
  setTableName("classcode");
  setFieldPrefix("classcode_");
}

void xtClassCode::doDelete()
{
  QString sql = "SELECT deleteClassCode(%1) AS result;";
  sql = sql.arg(getId());
  if(xtlib::debug)
    qDebug() << "executing: " << sql;
  QSqlQuery query;
  query.exec(sql);
  if(query.first())
  {
    if(query.value(0).toInt() < 0)
    {
      throw std::runtime_error("Can not delete Class Code as one or more items reference it.");
    }
  }
}
