/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

var _dockDesktop;
var _desktopList;

/*!
  Initializes Desktop Selector dock widget and places it in the main window.
*/
function initDockDesktop()
{
  _dockDesktop = toolbox.loadUi("dockList").findChild("_dockList");
  _dockDesktop.windowTitle = qsTr("Desktop");
  mainwindow.addDockWidget(0x1,_dockDesktop);

  // Set columns on list
  _desktopList = _dockDesktop.findChild("_list");
  _desktopList.objectName = "_desktopList";
  _desktopList.addColumn(qsTr("Desktop"), -1, Qt.AlignLeft, true, "");
  _desktopList.headerHidden = true;

  // Connect selections to stacked widget
  _desktopList["newId(int)"].connect(_desktopStack["setCurrentIndex(int)"]);
}


