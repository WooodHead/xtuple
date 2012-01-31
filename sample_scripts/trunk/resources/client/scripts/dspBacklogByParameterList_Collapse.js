/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
function expandClicked()
{
mywindow.findChild("_soitem").collapseAll();
}

var btnView = mywindow.findChild("_soitem");
var layout = toolbox.widgetGetLayout(btnView);
var newbutton = toolbox.createWidget("QPushButton", mywindow, "_expandButton");
newbutton.text="C&ollapse All";
toolbox.layoutBoxInsertWidget(layout, 3, newbutton);
newbutton.clicked.connect(expandClicked);
