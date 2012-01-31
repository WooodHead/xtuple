/*
 * This file is part of the xtdesktop package for xTuple ERP: PostBooks edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
var _interfaceWorkspace = mywindow.findChild("_interfaceWorkspace");

_interfaceWorkspace.toggled.connect(desktopNotice);

function desktopNotice()
{
  if (_interfaceWorkspace.checked &&
      !preferences.boolean("NoDesktopNotice"))
    toolbox.openWindow("desktopNotice", mywindow, Qt.WindowModal, Qt.Dialog);
}
