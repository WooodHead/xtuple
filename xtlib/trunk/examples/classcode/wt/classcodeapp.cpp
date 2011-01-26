// Copyright (c) 2010 by OpenMFG LLC, d/b/a xTuple.

#include "classcodeapp.h"

#include <ostream>
#include <vector>

#include <boost/any.hpp>
#include <boost/regex.hpp>

#include <xtAnyUtility.h>
#include <xtClassCode.h>
#include <xtDatabase.h>
#include <xtStorableQuery.h>

#include <Wt/WColor>
#include <Wt/WContainerWidget>
#include <Wt/WGridLayout>
#include <Wt/WLabel>
#include <Wt/WLineEdit>
#include <Wt/WPushButton>
#include <Wt/WSpinBox>
#include <Wt/WStandardItem>
#include <Wt/WStandardItemModel>
#include <Wt/WTableView>
#include <Wt/WTextArea>

ClassCodeApp::ClassCodeApp(const WEnvironment &env)
  : WApplication(env)
{
  setTitle("Wt Application to manipulate Class Codes");

  WContainerWidget *_ctr = new WContainerWidget(WApplication::instance()->root());
  WGridLayout *grid = new WGridLayout();
  _ctr->setLayout(grid);

  _code      = new WLineEdit(_ctr);
  _codeLit   = new WLabel(_ctr);
  _codeQBE   = new WLineEdit(_ctr);
  _descrip   = new WLineEdit(_ctr);
  _descripLit= new WLabel(_ctr);
  _descripQBE= new WLineEdit(_ctr);
  _list      = new WTableView(_ctr);
  _query     = new WPushButton("Query",       _ctr);
  _save      = new WPushButton("Save",        _ctr);
  _saveas    = new WPushButton("Save as New", _ctr);
  _revert    = new WPushButton("Revert",      _ctr);
  _status    = new WTextArea(_ctr);

  _codeLit->setBuddy(_code);
  _codeQBE->setEmptyText("code query");
  _descripLit->setBuddy(_descrip);
  _descripQBE->setEmptyText("description query");
  _list->setMinimumSize(100, 100);
  _list->setModel(new WStandardItemModel(0, 3, this));
  _list->setSelectionBehavior(Wt::SelectRows);
  _list->setSelectionMode(Wt::SingleSelection);
  _status->setMinimumSize(100, 50);
  _status->setReadOnly(true);
  
  int row = 0;
  grid->setRowResizable(0, true);
  grid->addWidget(_query,      row,   0);
  grid->addWidget(_codeQBE,    row,   1);
  grid->addWidget(_descripQBE, row++, 2);
  grid->addWidget(_list,       row++, 0, 1, 3);
  grid->addWidget(_codeLit,    row,   0);
  grid->addWidget(_code,       row++, 1, 1, 2);
  grid->addWidget(_descripLit, row,   0);
  grid->addWidget(_descrip,    row++, 1, 1, 2);
  grid->addWidget(_saveas,     row,   0);
  grid->addWidget(_save,       row,   1);
  grid->addWidget(_revert,     row++, 2);
  grid->addWidget(_status,     row,   0, -1, 2);

  _code->changed().connect(this,    &ClassCodeApp::codeChanged);
  _descrip->changed().connect(this, &ClassCodeApp::descripChanged);
  _list->selectionChanged().connect(this, &ClassCodeApp::selectionChanged);
  _query->clicked().connect(this,   &ClassCodeApp::filllist);
  _revert->clicked().connect(this,  &ClassCodeApp::revert);
  _saveas->clicked().connect(this,  &ClassCodeApp::saveas);
  _save->clicked().connect(this,    &ClassCodeApp::save);

  xtClassCode example;
  std::set<std::string> propList = example.getPropertyNames();
  for (std::set<std::string>::const_iterator it = propList.begin();
       it != propList.end();
       it++)
    for (int role = xtlib::ValueRole; role <= xtlib::CheckerRole; role++)
      if (! example.getProperty(*it, role).empty())
        propertyChanged(&example, *it, role);
  _list->model()->setHeaderData(0, Wt::Horizontal, std::string("Id"));
  _list->model()->setHeaderData(1, Wt::Horizontal, example.getCode(xtlib::LabelRole));
  _list->model()->setHeaderData(2, Wt::Horizontal, example.getDescription(xtlib::LabelRole));

  // TODO: add login screen
  try {
    _db = xtDatabase::getInstance();
    _db->open("dbname=xtlib user=admin");
  }
  catch (std::exception &e)
  {
    _status->setText(e.what());
    std::cerr << e.what() << std::endl;
  }

  _classcode = new xtClassCode();
  _classcode->attachPropertyObserver(this);

  filllist();
}

ClassCodeApp::~ClassCodeApp()
{
  std::cerr << "Destroying ClassCodeApp" << std::endl;
  if (_classcode)
    delete _classcode;
  _classcode = 0;
  _db->close();
  std::cerr << "db closed" << std::endl;
}

// is it possible to tie widgets to fields to avoid the switch and if/elseif
// and possibly even the connect calls to ClassCodeApp::*Changed?
void ClassCodeApp::propertyChanged(xtObject *obj, const std::string &name, int role)
{
  try {
    boost::any val = obj->getProperty(name, role);

    std::string strval = xtAnyUtility::toString(val);
    std::cerr << name << "'s property " << role << " changed: "
              << strval << " type " << val.type().name() << std::endl;

    switch (role)
    {
      case xtlib::ValueRole:
        if ("code" == name && strval != _code->text())
          _code->setText(strval);
        else if ("description" == name && strval != _descrip->text())
          _descrip->setText(strval);
        break;

      case xtlib::LabelRole:
        if ("code" == name && strval != _codeLit->text())
          _codeLit->setText(strval);
        else if ("description" == name && strval != _descripLit->text())
          _descripLit->setText(strval);
        break;
        
      case xtlib::RequiredRole:
        {
          WCssDecorationStyle requiredStyle = _code->decorationStyle();
          requiredStyle.setForegroundColor(WColor(0xff, 0x00, 0x00, 0x00));

          if (! val.empty() && boost::any_cast<bool>(val))
          {
            if ("code" == name)
            {
              _codeLit->setDecorationStyle(requiredStyle);
              _code->setEmptyText("required");
            }
            else if ("description" == name)
            {
              _descripLit->setDecorationStyle(requiredStyle);
              _descrip->setEmptyText("required");
            }
          }
        }

      default:
        break;
    }
  }
  catch (std::exception &e)
  {
    std::cerr << "Exception in PropertyChanged: " << e.what() << std::endl;
  }
}

void ClassCodeApp::codeChanged()
{
  std::cerr << "code field changed " << _code->text() << std::endl;
  if (_classcode)
    _classcode->setCode(_code->text().toUTF8());
}

void ClassCodeApp::descripChanged()
{
  std::cerr << "descrip field changed " << _descrip->text() << std::endl;
  if (_classcode)
    _classcode->setDescription(_descrip->text().toUTF8());
}

void ClassCodeApp::filllist()
{
  xtClassCode example;

  try {
    _list->model()->removeRows(0, _list->model()->rowCount());
    example.setProperty("code",        boost::regex(_codeQBE->text().toUTF8()));
    example.setProperty("description", boost::regex(_descripQBE->text().toUTF8()));
    xtStorableQuery<xtClassCode> sq(&example);
    sq.exec();
    std::set<xtClassCode*> codes = sq.result();
    if (codes.empty())
      _status->setText(std::string("No Class Codes Found"));
    else
    {
      _status->setText(boost::lexical_cast<std::string>(codes.size()) + std::string(" Class Codes Found"));
      int row = 0;
      for (std::set<xtClassCode*>::iterator cc = codes.begin();
           cc != codes.end();
           cc++, row++)
      {
        _list->model()->insertRow(row);
        _list->model()->setData(row, 0, (*cc)->getId());
        _list->model()->setData(row, 1, xtAnyUtility::toString((*cc)->getCode()));
        _list->model()->setData(row, 2, xtAnyUtility::toString((*cc)->getDescription()));
      }
    }
  }
  catch (std::exception &e)
  {
    _status->setText(std::string("problem querying xtClassCode: ") + e.what());
    std::cerr << "problem querying xtClassCode: " << e.what() << std::endl;
  }
}

void ClassCodeApp::revert()
{
  std::cerr << "revert button clicked" << std::endl;
  if (_classcode)
    _classcode->reload();
}

void ClassCodeApp::save()
{
  std::cerr << "save button clicked" << std::endl;
  if (_classcode)
  {
    try
    {
      _classcode->save();
      _classcode->reload();
      filllist();
      _status->setText("classcode saved");
    }
    catch (std::exception &e)
    {
      _status->setText(std::string("error saving: ") + e.what());
    }
  }
}

void ClassCodeApp::saveas()
{
  std::cerr << "save as new button clicked" << std::endl;

  if (_classcode)
  {
    try
    {
      _classcode->saveAs();
      _classcode->reload();
      filllist();
      _status->setText("new classcode saved");
    }
    catch (std::exception &e)
    {
      _status->setText(std::string("error saving: ") + e.what());
    }
  }
}

void ClassCodeApp::selectionChanged()
{
  try {
    std::cerr << "selection changed" << std::endl;
    WModelIndexSet selection = _list->selectedIndexes();
    WModelIndexSet::iterator sel = selection.begin();
    long long id = boost::any_cast<long long>( (*sel).data() );
    std::cerr << "got id: " << id << std::endl;
    if (_classcode)
      _classcode->load(id);
  }
  catch (std::exception &e)
  {
    std::cerr << "selectionChanged exception: " << e.what() << std::endl;
  }
}
