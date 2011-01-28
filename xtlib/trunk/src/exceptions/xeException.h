/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
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
