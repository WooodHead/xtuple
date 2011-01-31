/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */
#ifndef CLASSCODEAPP_H
#define CLASSCODEAPP_H

#include "interfaces/xiPropertyObserver.h"

#include <Wt/WApplication>

class xtClassCode;
class xtDatabase;

using namespace Wt;

class ClassCodeApp : public Wt::WApplication, public xiPropertyObserver
{
  public:
    ClassCodeApp(const Wt::WEnvironment &env);
    ~ClassCodeApp();

    virtual void propertyChanged(xtObject *obj, const std::string &name, int role);

  protected:
    virtual void codeChanged();
    virtual void descripChanged();
    virtual void filllist();
    virtual void save();
    virtual void saveas();
    virtual void revert();
    virtual void selectionChanged();

  private:
    xtClassCode  *_classcode;
    WContainerWidget *_ctr;
    WLineEdit    *_code;
    WLabel       *_codeLit;
    WLineEdit    *_codeQBE;
    xtDatabase   *_db;
    WLineEdit    *_descrip;
    WLineEdit    *_descripQBE;
    WLabel       *_descripLit;
    WTableView   *_list;
    WPushButton  *_query;
    WPushButton  *_saveas;
    WPushButton  *_revert;
    WPushButton  *_save;
    WTextArea    *_status;
};

#endif
