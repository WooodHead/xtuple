/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

// Script: postOperations
// This script will prevent users from posting more qty than the balance
// remaining on the selected operation. This takes advantage of the
// _balance dynamic property set by the postOperations screen as of 3.0.0RC

var _post = mywindow.findChild("_post");
var _qty = mywindow.findChild("_qty");

function checkQty()
{
  if(_qty.toDouble() > _balance)
  {
    _post.enabled=false;
    QMessageBox.warning(mywindow, qsTr("Cannot Over Post"),
                        qsTr("<p>You may not overpost qty. "
                         + "Either reduce the quantity or cancel."));
  }
  else
    _post.enabled=true;
}

_qty.editingFinished.connect(checkQty);
