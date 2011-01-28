/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef __XTLIB_H__
#define __XTLIB_H__

class xtlib
{
  public:
    xtlib();
    virtual ~xtlib();

  enum ObjectDataRole {
    ValueRole,
    PreviousValueRole,  // Protected
    LabelRole,
    FormatRole,
    RequiredRole, // Protected
    EnabledRole,
    VisibleRole,
    StatusRole,   // i.e. Error, Warning, Emphasis, AltEmphasis... // Protected
    ToolTipRole,
    WhatsThisRole,
    FieldRole,    // Protected
    CheckerRole   // Protected
  };

  enum ObjectMode
  {
    NewMode,
    EditMode,
    ViewMode
  };

  enum ObjectState
  {
    NullState = 0,
    IncompleteState,
    NormalState,
    BusyState
  };

    static bool debug;
};

#endif // XTLIB_H
