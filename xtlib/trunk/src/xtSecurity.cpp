/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
/**
    \class xtSecurity
    \brief A security object for specifying the logical user and checking privnames.

    Used by the other various classes to query a security model that determines if a user
    does or does not have a named priviledge.

 */

#include <stdexcept>

#include "xtSecurity.h"

#include <QString>
#include <QSqlQuery>
#include <QVariant>

//
// Internal data
//

static std::string _logicalUsername = "domain";


//
// xtSecurity class implementation
//

xtSecurity::xtSecurity()
{
}

xtSecurity::~xtSecurity()
{
}

bool xtSecurity::hasPriv(const std::string & privname)
{
  QString sql = "SELECT priv_name"
                "  FROM usrpriv, priv"
                " WHERE((usrpriv_priv_id=priv_id)"
                "   AND (usrpriv_username=:logicalUsername)"
                "   AND (priv_name=:privname))"
                " UNION "
                "SELECT priv_name"
                "  FROM priv, grppriv, usrgrp"
                " WHERE((usrgrp_grp_id=grppriv_grp_id)"
                "   AND (grppriv_priv_id=priv_id)"
                "   AND (usrgrp_username=:logicalUsername)"
                "   AND (priv_name=:privname));";
  QSqlQuery query;
  query.prepare(sql);
  query.bindValue(":logicalUsername", QString::fromStdString(_logicalUsername));
  query.bindValue(":privname", QString::fromStdString(privname));
  query.exec();

  if(!query.first())
    return false;

  return true;
}

void xtSecurity::setLogicalUser(const std::string & username)
{
  _logicalUsername = username;
}

std::string xtSecurity::logicalUser()
{
  return _logicalUsername;
}

