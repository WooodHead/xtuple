/*
 * This file is part of the xtpos package for xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
*/

var _adjust             = mywindow.findChild("_adjust");
var _asset              = mywindow.findChild("_asset");
var _bnkacct            = mywindow.findChild("_bnkacct");
var _bnkacctGroup       = mywindow.findChild("_bnkacctGroup");
var _bnkacctName        = mywindow.findChild("_bnkacctName");
var _bnkaccts           = mywindow.findChild("_bnkaccts");
var _cancel             = mywindow.findChild("_cancel");
var _checkClearing      = mywindow.findChild("_checkClearing");
var _expire             = mywindow.findChild("_expire");
var _insertBankAcct     = mywindow.findChild("_insertBankAcct");
var _removeBankAcct     = mywindow.findChild("_removeBankAcct");
var _insertTerminal     = mywindow.findChild("_insertTerminal");
var _removeTerminal     = mywindow.findChild("_removeTerminal");
var _retailSite         = mywindow.findChild("_retailSite");
var _save               = mywindow.findChild("_save");
var _site               = mywindow.findChild("_site");
var _siteLit            = mywindow.findChild("_siteLit");
var _terminals          = mywindow.findChild("_terminals");

function cancel()
{
  _retailSite.select();
  mywindow.close();
}

function check()
{
  if (_retailSite.mode) // Not New
    return;

  params = new Object();
  params.site = _site.code;

  var data = toolbox.executeDbQuery("retailsite","getapi_retailsite",params);
  if (data.first())
  {
    _retailSite.mode = 1;
    _retailSite.filter = "site = '" + _site.code + "'";
    populate();
  }
  else
    populateItems();
}

function checkBankAccts()
{
  var params = new Object();

  for (row = 0 - 0; row < _bnkaccts.rowCount(); row++)
  {
    if (!_bnkaccts.isRowHidden(row))
    {
      params.name = _bnkaccts.value(row,1);
      var data = toolbox.executeDbQuery("retailsite","getbankaccnt",params);
      if (!data.first())
      {
        throw Error(qsTr("Bank Account %1 is invalid.").arg(params.name));
      }
    }
  }
}

function checkTerminals()
{
  var params = new Object();
  params.site = _site.code;

  for (row = 0 - 0; row < _terminals.rowCount(); row++)
  {
    if (!_terminals.isRowHidden(row))
    {
      params.terminal = _terminals.value(row,1);
      if (! params.terminal)
      {
        _terminals.setFocus();
        throw Error(qsTr("Please give this terminal a name."));
      }
      if (! params.terminal.match(/^[0-9a-z]+$/))
      {
        _terminals.setFocus();
        throw Error(qsTr("Please use alphanumeric characters for the terminal name."));
      }
      var data = toolbox.executeDbQuery("retailsite","getapi_retailsiteterminal",params);
      if (data.first())
      {
        throw Error(qsTr("Terminal %1 already exists on site %2.")
                      .arg(params.terminal).arg(data.value("site")));
      }
    }
  }
}

function populate()
{
  _retailSite.select();

  if (_retailSite.currentIndex() < 0)
    _retailSite.mode = 0; // New

  populateItems();
  _site.enabled = false;
}

function populateItems()
{
  var idx = _retailSite.currentIndex();

  _bnkaccts.populate(idx);
  _terminals.populate(idx);
}

function removeBankAcct()
{
  _bnkacctGroup.enabled = false;
  _bnkacctName.setId(-1);
  // The rest is handled by slot connections on the UI
}

function save()
{
  var params = new Object;
  _expire.setFocus();

  try
  {
    _site["newID(int)"].disconnect(check);

    var errs = [
      { c: _site.id() == -1,               w: _site,          m: qsTr("Please select a site.")                  },
      { c: ! _asset.isValid(),             w: _asset,         m: qsTr("Please select an Asset account.")        },
      { c: ! _adjust.isValid(),            w: _adjust,        m: qsTr("Please select an Adjustment account.")   },
      { c: ! _checkClearing.isValid(),     w: _checkClearing, m: qsTr("Please select a Check Clearing account.")},
      { c: ! _bnkaccts.rowCountVisible(),  w: _bnkaccts,      m: qsTr("Please add at least one bank account.")  },
      { c: ! _terminals.rowCountVisible(), w: _terminals,     m: qsTr("Please add at least one terminal.")      }
    ];

    for (var i = 0; i < errs.length; i++)
      if (errs[i].c)
      {
        errs[i].w.setFocus();
        throw Error(errs[i].m);
      }

    checkBankAccts();
    checkTerminals();

    /* no transaction here; the models don't mark themselves dirty after a
       rollback so resubmit doesn't replay the transaction as it was run before.
    */
    _retailSite.submit();
    _bnkaccts.save();
    _terminals.save();
    mywindow.close();
  }
  catch (e)
  {
    QMessageBox.critical(mywindow, qsTr("Processing Error"), e.message);
    return false;
  }
  finally
  {
    _site["newID(int)"].connect(check);
  }

  return true;
}

function set(input)
{
  if ("mode" in input)
  {
    _retailSite.setMode(input.mode);

    if (input.mode > 0) // Edit or View
      _site.enabled=false;
    if (input.mode == 2) // View
    {
      _save.hide();
      _cancel.text = "Close";
      _bnkaccts.setEnabled(0);
      _insertBankAcct.hide();
      _removeBankAcct.hide();
      _terminals.setEnabled(0);
      _insertTerminal.hide();
      _removeTerminal.hide();
      _bnkacctGroup.hide();
    }
  }
  if ("index" in input)
  {
    _retailSite.setCurrentIndex(input.index);
    _bnkaccts.populate(input.index);
    _terminals.populate(input.index);
  }

  return 0;
}

// Retail Site Connections
_removeBankAcct.clicked.connect(removeBankAcct);
_site["newID(int)"].connect(check);

// Hide site and populate if not multi warehouse
if (metrics.value("MultiWhs") != "t")
{
  _site.setVisible(false);
  _siteLit.setVisible(false);
  _site.allowNull = false;
  _save.hide();
  _cancel.hide();
  _retailSite["newModel(XSqlTableModel*)"].connect(populate);
}
else
{
  _save.clicked.connect(save);
  _cancel.clicked.connect(cancel);
}
