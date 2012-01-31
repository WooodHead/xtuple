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
function checkQty()
{
  if(mywindow.findChild("_qty").text > mywindow._balance)
  {
    mywindow.findChild("_post").enabled=false;
    toolbox.messageBox("error", mywindow, "Cannot Over Post",
      "You may not over post qty. Please correct this situation.");
  }
  else
    mywindow.findChild("_post").enabled=true;
}

var qty = mywindow.findChild("_qty");
qty.editingFinished.connect(checkQty);
