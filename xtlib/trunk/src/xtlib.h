// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple.

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
