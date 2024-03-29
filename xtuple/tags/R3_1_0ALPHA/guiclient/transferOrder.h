/*
 * Common Public Attribution License Version 1.0. 
 * 
 * The contents of this file are subject to the Common Public Attribution 
 * License Version 1.0 (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License 
 * at http://www.xTuple.com/CPAL.  The License is based on the Mozilla 
 * Public License Version 1.1 but Sections 14 and 15 have been added to 
 * cover use of software over a computer network and provide for limited 
 * attribution for the Original Developer. In addition, Exhibit A has 
 * been modified to be consistent with Exhibit B.
 * 
 * Software distributed under the License is distributed on an "AS IS" 
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See 
 * the License for the specific language governing rights and limitations 
 * under the License. 
 * 
 * The Original Code is xTuple ERP: PostBooks Edition 
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2008 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
 * 
 * Contributor(s): ______________________.
 * 
 * Alternatively, the contents of this file may be used under the terms 
 * of the xTuple End-User License Agreeement (the xTuple License), in which 
 * case the provisions of the xTuple License are applicable instead of 
 * those above.  If you wish to allow use of your version of this file only 
 * under the terms of the xTuple License and not to allow others to use 
 * your version of this file under the CPAL, indicate your decision by 
 * deleting the provisions above and replace them with the notice and other 
 * provisions required by the xTuple License. If you do not delete the 
 * provisions above, a recipient may use your version of this file under 
 * either the CPAL or the xTuple License.
 * 
 * EXHIBIT B.  Attribution Information
 * 
 * Attribution Copyright Notice: 
 * Copyright (c) 1999-2008 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by xTuple ERP: PostBooks Edition
 * 
 * Attribution URL: www.xtuple.org 
 * (to be included in the "Community" menu of the application if possible)
 * 
 * Graphic Image as provided in the Covered Code, if any. 
 * (online at www.xtuple.com/poweredby)
 * 
 * Display of Attribution Information is required in Larger Works which 
 * are defined in the CPAL as a work which combines Covered Code or 
 * portions thereof with code not governed by the terms of the CPAL.
 */

#ifndef TRANSFERORDER_H
#define TRANSFERORDER_H

#include "guiclient.h"
#include "xmainwindow.h"
#include <parameter.h>

#include "taxCache.h"
#include "toitemTableModel.h"

#include "ui_transferOrder.h"

class transferOrder : public XMainWindow, public Ui::transferOrder
{
    Q_OBJECT

public:
    transferOrder(QWidget* parent = 0, const char* name = 0, Qt::WFlags fl = Qt::WType_TopLevel);
    ~transferOrder();

    virtual	bool save( bool partial );
    virtual	void setViewMode();
    static	void newTransferOrder( int , int );
    static	void editTransferOrder( int pId, bool enableSaveAndAdd );
    static	void viewTransferOrder( int pId );

public slots:
    virtual SetResponse set(const ParameterList & pParams );

    virtual void clear();
    virtual void closeEvent( QCloseEvent * pEvent );
    virtual void dragEnterEvent( QDragEnterEvent * pEvent );
    virtual void dropEvent( QDropEvent * pEvent );
    virtual void populate();
    virtual void populateOrderNumber();
    virtual void sAction();
    virtual void sCalculateTotal();
    virtual void sClear();
    virtual void sDelete();
    virtual void sEdit();
    virtual void sFillItemList();
    virtual void sFreightChanged();
    virtual void sHandleButtons();
    virtual void sHandleDstWhs(const int);
    virtual void sHandleOrderNumber();
    virtual void sHandleShipchrg( int pShipchrgid );
    virtual void sHandleSrcWhs(const int);
    virtual void sHandleTransferOrderEvent(int);
    virtual void sHandleTrnsWhs(const int);
    virtual void sIssueLineBalance();
    virtual void sIssueStock();
    virtual void sNew();
    virtual void sPopulateMenu(QMenu * pMenu);
    virtual void sReturnStock();
    virtual void sSave();
    virtual void sSaveAndAdd();
    virtual void sSetUserEnteredOrderNumber();
    virtual void sTaxAuthChanged();
    virtual void sTaxDetail();

protected:
    virtual void keyPressEvent( QKeyEvent * e );
    virtual void recalculateTax();

protected slots:
    virtual void languageChange();
    virtual void sCurrencyChanged();
    virtual void sQEDelete();
    virtual bool sQESave();
    virtual void sTabChanged(int);

private:
    bool 		deleteForCancel();
    void		getWhsInfo(const int, const QWidget*);
    bool		insertPlaceholder();
    void		setToheadid(const int);

    int			_cachedTabIndex;
    bool		_captive;
    bool		_doAuthorize;
    bool		_ffShipto;
    int			_freighttaxid;
    bool		_ignoreSignals;
    int			_lineMode;
    int			_mode;
    QString		_oops;
    int			_orderNumberGen;
    int			_originalPrjid;
    bool		_passPrecheck;
    QString		_port;
    ToitemTableModel*	_qeitem;
    QString		_response;
    bool		_saved;
    int			_shiptoid;
    int			_toheadid;
    int			_taxauthidCache;
    bool		_userEnteredOrderNumber;
    int			_whstaxauthid;
    QString		doServer;

    taxCache _taxCache;

};

#endif // TRANSFERORDER_H
