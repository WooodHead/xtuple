/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2010 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#ifndef __XCOMBOBOXPLUGIN_H__
#define __XCOMBOBOXPLUGIN_H__

#include "xcombobox.h"

#include <QDesignerCustomWidgetInterface>
#include <QtPlugin>

class XComboBoxPlugin : public QObject, public QDesignerCustomWidgetInterface
{
    Q_OBJECT
    Q_INTERFACES(QDesignerCustomWidgetInterface)

  public:
    XComboBoxPlugin(QObject *parent = 0) : QObject(parent), initialized(false) {}

    bool isContainer() const { return false; }
    bool isInitialized() const { return initialized; }
    QIcon icon() const { return QIcon(); }
    QString domXml() const
    {
      return "<widget class=\"XComboBox\" name=\"xcomboBox\">\n"
             "</widget>\n";
    }
    QString group() const { return "xTuple Custom Widgets"; }
    QString includeFile() const { return "xcombobox.h"; }
    QString name() const { return "XComboBox"; }
    QString toolTip() const { return ""; }
    QString whatsThis() const { return ""; }
    QWidget *createWidget(QWidget *parent) { return new XComboBox(parent); }
    void initialize(QDesignerFormEditorInterface *) { initialized = true; }

  private:
    bool initialized;
};

#endif
