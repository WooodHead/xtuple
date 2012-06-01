/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

/* This example shows how to add a button, position it in an existing
   window, and do something interesting when a user clicks on it.
   In this case, the 'something interesting' is expand or collapse
   indented data in a Display window. These are the application windows
   usually found under xTuple ERP's Report submenus.
 */

// The Display class in the C++ app has a method to get its XTreeWidget
var _list = mywindow.list();

/* The sExpand() and sCollapse() functions allow us to do more than
   just expand and collapse the lists if we want to.
 */
function sExpand()
{
  _list.expandAll();
}

function sCollapse()
{
  _list.collapseAll();
}

// Create two QPushButton objects that belong to the window.
var _expand = toolbox.createWidget("QPushButton",   mywindow, "_expand");
var _collapse = toolbox.createWidget("QPushButton", mywindow, "_collapse");

/* Set the text of those buttons.
   qsTr allows the text to be translated while the & creates a hotkey
   that can be used to click the button from the keyboard.
 */
_expand.text   = qsTr("E&xpand All");
_collapse.text = qsTr("C&ollapse All");

// To position the new buttons, first find the layout container that holds _list
var _layout = toolbox.widgetGetLayout(_list);

/* _layout happens to be a QGridLayout and _list is in row 2, column 0. To put
   _expand and _collapse under _list, we place them in rows 3 and 4, col 0.
 */
_layout.addWidget(_expand,   3, 0);
_layout.addWidget(_collapse, 4, 0);

_expand.clicked.connect(sExpand);
_collapse.clicked.connect(sCollapse);
