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
 * The Original Code is PostBooks Accounting, ERP, and CRM Suite. 
 * 
 * The Original Developer is not the Initial Developer and is __________. 
 * If left blank, the Original Developer is the Initial Developer. 
 * The Initial Developer of the Original Code is OpenMFG, LLC, 
 * d/b/a xTuple. All portions of the code written by xTuple are Copyright 
 * (c) 1999-2007 OpenMFG, LLC, d/b/a xTuple. All Rights Reserved. 
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
 * Copyright (c) 1999-2007 by OpenMFG, LLC, d/b/a xTuple
 * 
 * Attribution Phrase: 
 * Powered by PostBooks, an open source solution from xTuple
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

// lotserialcluster.h
// Created 11/04/2006 GJM
// Copyright (c) 2006-2007, OpenMFG, LLC

#ifndef _lotserialCluster_h

#define _lotserialCluster_h

#include "virtualCluster.h"

class LotserialCluster;

class OPENMFGWIDGETS_EXPORT  LotserialList : public VirtualList
{
  Q_OBJECT

  friend class LotSerialLineEdit;

  public:
    LotserialList(QWidget*, Qt::WindowFlags = 0);

  private:
    LotserialCluster* _parent;
};

class OPENMFGWIDGETS_EXPORT  LotserialSearch : public VirtualSearch
{
  Q_OBJECT

  friend class LotSerialLineEdit;

  public:
    LotserialSearch(QWidget*, Qt::WindowFlags = 0);

  private:
    LotserialCluster* _parent;
};

class OPENMFGWIDGETS_EXPORT LotserialLineEdit : public VirtualClusterLineEdit
{
    Q_OBJECT

    Q_PROPERTY(bool strict	READ	strict	WRITE setStrict);

    friend class LotserialCluster;

    public:
	LotserialLineEdit(QWidget*, const char* = 0);

	inline virtual int	itemId() const		{ return _itemid; };
	inline virtual bool	strict() const		{ return _strict; };

    public slots:
	virtual void clear();
	virtual void sParse();
	virtual void setItemId(const int);
	inline virtual void	setStrict(const bool p)	{ _strict = p; };

    protected slots:
	virtual LotserialList*		listFactory();
	virtual LotserialSearch*	searchFactory();
	// virtual LotserialInfo*		infoFactory();

    private:
	int	_itemid;
	bool	_strict;
};

class OPENMFGWIDGETS_EXPORT LotserialCluster : public VirtualCluster
{
    Q_OBJECT

    Q_PROPERTY(bool strict	READ	strict	WRITE setStrict);

    friend class LotserialLineEdit;

    public:
	LotserialCluster(QWidget*, const char* = 0);

	virtual int	itemId() const;
	virtual bool	strict() const;

    public slots:
	virtual void	setItemId(const int);
	virtual void	setStrict(const bool);
};

#endif
