/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
// two ways to do this
// first you can reference the object name directly
// but this has the disadvantage of either not knowing
// where in the layout an object is or that the object
// can be moved.
mywindow.widget._new.enabled=false;

// the other way is to use findChild() which is more portable and maintainable
mywindow.findChild("_new").visible = false;
