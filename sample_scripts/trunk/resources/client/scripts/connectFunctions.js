/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
// create a function that changes the name of a button when called
this.count = 0;
function buttonclicked() {
  this.count += 1;
  mywindow.findChild("_new").text="New" + this.count;
}

// connect up so when the _edit object is clicked is calls the function
mywindow.findChild("_new").clicked.connect(buttonclicked);
