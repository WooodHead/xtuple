// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple.

#ifndef __xeException_H__
#define __xeException_H__

/**
    \file xeException.h
    \brief Convenience header file.

    Includes all xtlib exception headers.
 */

/**
    \class std::exception
    \brief The std::exception class is used as base for other xtlib exceptions.

    The std::exception class is the base class for all xtlib-specific
    exceptions. This makes it easier to catch a wider range of exceptions.
 */

#include "xeDataNotFound.h"
#include "xeInvalidStorable.h"

#endif __xeException_H__
