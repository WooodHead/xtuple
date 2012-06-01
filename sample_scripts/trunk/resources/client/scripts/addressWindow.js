/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
var _addr   = mywindow.findChild("_addr");
var _cancel = mywindow.findChild("_cancel");
var _save   = mywindow.findChild("_save");

function set(input)
{
  if ("addr_id" in input)
  {
    _addr.id = input.addr_id;
    mainwindow.sReportError("_addr.id is now " + _addr.id);
  }
  else
  {
    mainwindow.sReportError("no addr_id passed to set()");
    return 5;
  }

  if ("mode" in input)
  {
    if (input.mode == "view")
    {
      _addr.enabled = false;
      _save.enabled = false;
      _cancel.text  = "Close";
    }
  }

  return 0;
}

function sSave()
{
  var result = _addr.save("CHECK");
  if (result == -2)
  {
    var choice = QMessageBox.question(mywindow, qsTr("Conflict"),
                               qsTr("<p>This address is shared. Would you like "
                                  + "to save the changes as a new address or "
                                  + "save the changes to all uses of this address?"),
                                  QMessageBox.SaveAll, QMessageBox.Save);
    if (choice == QMessageBox.Save)
      result = _addr.save(1);
    else if (choice == QMessageBox.SaveAll)
      result = _addr.save(2);                                    
  }
  // not else-if
  if (result < 0)
    QMessageBox.critical(mywindow, qsTr("Save Error"),
                         qsTr("There was an error saving the address"));
  else
    mywindow.close();
}

_save.clicked.connect(sSave);
_cancel.clicked.connect(mywindow, "close");
