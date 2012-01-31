/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
function randomClicked()
{
  QMessageBox.information(mywindow, qsTr("Something Happened"),
                          qsTr("The Random button was clicked."));
}

var btnDelete = mywindow.findChild("_delete");
var layout    = toolbox.widgetGetLayout(btnDelete);
var newbutton = toolbox.createWidget("QPushButton", mywindow, "_scriptButton");

newbutton.text = qsTr("Random");
toolbox.layoutBoxInsertWidget(layout, -1, newbutton, 0, 0);

newbutton.clicked.connect(randomClicked);
