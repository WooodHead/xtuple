/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include <QMessageBox>
#include <QGridLayout>
#include <QSqlError>

#include <metasql.h>

#include "xsqlquery.h"
#include "xcheckbox.h"

#include "addresscluster.h"

void AddressCluster::init()
{
    _titleSingular = tr("Address");
    _titlePlural   = tr("Addresses");
    _query = "SELECT * FROM addr ";

    // handle differences between VirtualCluster and AddressCluster
    _grid->removeWidget(_label);
    _grid->removeWidget(_description);
    _grid->removeWidget(_list);
    _grid->removeWidget(_info);
    delete _description;

    _addrChange    = new XLineEdit(this);
    _number        = new XLineEdit(this);
    _addrLit       = new QLabel(tr("Street\nAddress:"), this);
    _addr1         = new XLineEdit(this);
    _addr2         = new XLineEdit(this);
    _addr3         = new XLineEdit(this);
    _cityLit       = new QLabel(tr("City:"), this);
    _city          = new XLineEdit(this);
    _stateLit      = new QLabel(tr("State:"));
    _state         = new XComboBox(this, "_state");
    _postalcodeLit = new QLabel(tr("Postal Code:"));
    _postalcode    = new XLineEdit(this);
    _countryLit    = new QLabel(tr("Country:"));
    _country       = new XComboBox(this, "_country");
    _active        = new QCheckBox(tr("Active"), this);
    _mapper        = new XDataWidgetMapper(this);

    _addrChange->hide();
#if defined Q_OS_MAC   
    _city->setMinimumWidth(110);
#else
    _city->setMinimumWidth(85);
#endif
    _number->hide();
    _addrLit->setAlignment(Qt::AlignRight | Qt::AlignVCenter);
    _cityLit->setAlignment(Qt::AlignRight | Qt::AlignVCenter);
    _stateLit->setAlignment(Qt::AlignRight | Qt::AlignVCenter);
    _state->setEditable(true);
    _country->setEditable(true);
    _country->setMaximumWidth(250);
    _postalcodeLit->setAlignment(Qt::AlignRight | Qt::AlignVCenter);
    _countryLit->setAlignment(Qt::AlignRight | Qt::AlignVCenter);

    _grid->setMargin(0);
    _grid->setSpacing(2);
    _grid->addWidget(_label,         0, 0, 1, -1);
    _grid->addWidget(_addrLit,       1, 0, 3, 1);
    _grid->addWidget(_addr1,         1, 1, 1, -1);
    _grid->addWidget(_addr2,         2, 1, 1, -1);
    _grid->addWidget(_addr3,         3, 1, 1, -1);
    _grid->addWidget(_cityLit,       4, 0);
    _grid->addWidget(_city,          4, 1);
    _grid->addWidget(_stateLit,      4, 2);
    _grid->addWidget(_state,         4, 3);
    _grid->addWidget(_postalcodeLit, 4, 4);
    _grid->addWidget(_postalcode,    4, 5, 1, 2);
    _grid->addWidget(_countryLit,    5, 0);
    _grid->addWidget(_country,       5, 1, 1, 3);
    _grid->addWidget(_active,        5, 4);

    QHBoxLayout* hbox = new QHBoxLayout;
    hbox->addWidget(_list);
    hbox->addWidget(_info);
    _grid->addLayout(hbox, 5, 5, 1, -1, Qt::AlignRight);

    _grid->setColumnStretch(0, 0);
    _grid->setColumnStretch(1, 3);
    _grid->setColumnStretch(2, 0);
    _grid->setColumnStretch(3, 1);
    _grid->setColumnStretch(4, 0);
    _grid->setColumnStretch(5, 2);

#if defined Q_WS_MAC
    setMinimumSize(_grid->columnCount() * 60, 132);
#endif

    connect(_list,      SIGNAL(clicked()), this, SLOT(sEllipses()));
    connect(_info,      SIGNAL(clicked()), this, SLOT(sInfo()));
    connect(_addr1,     SIGNAL(textChanged(const QString&)), this, SIGNAL(changed()));
    connect(_addr2,     SIGNAL(textChanged(const QString&)), this, SIGNAL(changed()));
    connect(_addr3,     SIGNAL(textChanged(const QString&)), this, SIGNAL(changed()));
    connect(_city,      SIGNAL(textChanged(const QString&)), this, SIGNAL(changed()));
    connect(_state,     SIGNAL(editTextChanged(const QString&)), this, SIGNAL(changed()));
    connect(_postalcode,SIGNAL(textChanged(const QString&)), this, SIGNAL(changed()));
    connect(_country,   SIGNAL(editTextChanged(const QString&)), this, SIGNAL(changed()));

    setFocusProxy(_addr1);
    setFocusPolicy(Qt::StrongFocus);
    setLabel("");
    setActiveVisible(false);
    setInfoVisible(false); // TODO - remove this and implement Info button
    silentSetId(-1);
    _mode = Edit;
}

AddressCluster::AddressCluster(QWidget* pParent, const char* pName) :
    VirtualCluster(pParent, pName)
{
    init();
}

void AddressCluster::populateStateComboBox()
{
  if(_x_metrics == 0)
    return;

  _state->clear();
  XSqlQuery state;
  state.prepare("SELECT DISTINCT -1, addr_state, addr_state AS state "
                "FROM addr ORDER BY state;");
  state.exec();
  _state->populate(state);
}

void AddressCluster::populateCountryComboBox()
{
  if(_x_metrics == 0)
    return;

  _country->clear();
  XSqlQuery country;
  country.prepare("SELECT -1, '','' AS country_name " 
                  "UNION "
                  "SELECT country_id, country_name, country_name "
                  "FROM country ORDER BY country_name;");
  country.exec();
  _country->populate(country);
}

void AddressCluster::setNumber(QString pNumber)
{
  XSqlQuery address;
  address.prepare("SELECT addr_id FROM addr WHERE (addr_number=:addr_number);");
  address.bindValue(":addr_number", pNumber);
  address.exec();
  if (address.first())
    setId(address.value("addr_id").toInt());
  else if (address.lastError().type() != QSqlError::NoError)
    QMessageBox::critical(this, tr("A System Error Occurred at %1::%2.")
                                          .arg(__FILE__)
                                          .arg(__LINE__),
                                  address.lastError().databaseText()); 
}
void AddressCluster::setId(const int pId)
{
  if (pId == _id)
    return;
  silentSetId(pId);
  emit newId(pId);  
}

void AddressCluster::silentSetId(const int pId)
{
    if (pId == -1)
    {
      _id = pId;
      _valid = false;
      clear();
    }
    else
    {
        clear();
        XSqlQuery idQ;
        idQ.prepare(_query + " WHERE addr_id = :id;");
        idQ.bindValue(":id", pId);
        idQ.exec();
        if (idQ.first())
        {
            _id = pId;
            _valid = true;
	    _number->setText(idQ.value("addr_number").toString());
            _addr1->setText(idQ.value("addr_line1").toString());
            _addr2->setText(idQ.value("addr_line2").toString());
            _addr3->setText(idQ.value("addr_line3").toString());
            _city->setText(idQ.value("addr_city").toString());
            _postalcode->setText(idQ.value("addr_postalcode").toString());
            _state->setEditText(idQ.value("addr_state").toString());
            _country->setEditText(idQ.value("addr_country").toString());
            _active->setChecked(idQ.value("addr_active").toBool());
            _notes = idQ.value("addr_notes").toString();

            if (_mapper->model())
            {
               _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_number)), _number->text());
               _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_active)), _active->isChecked());
               _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_addr1)), _addr1->text());
               _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_addr2)), _addr2->text());
               _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_addr3)), _addr3->text());
               _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_city)), _city->text());
               _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_state)), _state->currentText());
               _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_postalcode)), _postalcode->text());
               _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_country)), _country->currentText());    
            }

            c_number     = _number->text();
            c_addr1      = _addr1->text();
            c_addr2      = _addr2->text();
	    c_addr3      = _addr3->text();
	    c_city       = _city->text();
	    c_state      = _state->currentText();
	    c_postalcode = _postalcode->text();
	    c_country    = _country->currentText();
	    c_active     = _active->isChecked();
	    c_notes      = _notes;;
        }
        else if (idQ.lastError().type() != QSqlError::NoError)
            QMessageBox::critical(this, tr("A System Error Occurred at %1::%2.")
                                          .arg(__FILE__)
                                          .arg(__LINE__),
                                  idQ.lastError().databaseText());
    }

    // _parsed = TRUE;
}

void AddressCluster::clear()
{
  _id = -1;
  _valid = false;

  populateStateComboBox();
  populateCountryComboBox();

  // reset cache
  c_active     = true;
  c_addr1      = "";
  c_addr2      = "";
  c_addr3      = "";
  c_city       = "";
  c_state      = "";
  c_postalcode = "";
  c_country    = "";
  c_notes      = "";

  _addr1->clear();
  _addr2->clear();
  _addr3->clear();
  _city->clear();
  _state->clearEditText();
  _postalcode->clear();
  _country->clearEditText();
  _active->setChecked(c_active);
  _selected = false;
}
   
void AddressCluster::setDataWidgetMap(XDataWidgetMapper* m)
{
  m->addMapping(_addrChange , _fieldNameAddrChange,   "text", "defaultText");
  m->addMapping(_active,      _fieldNameActive,       "text", "defaultText");
  m->addMapping(_number,      _fieldNameNumber,       "text", "defaultText");
  m->addMapping(_addr1,       _fieldNameLine1,        "text", "defaultText");
  m->addMapping(_addr2,       _fieldNameLine2,        "text", "defaultText");
  m->addMapping(_addr3,       _fieldNameLine3,        "text", "defaultText");
  m->addMapping(_city,        _fieldNameCity,         "text", "defaultText");
  m->addMapping(_postalcode,  _fieldNamePostalCode,   "text", "defaultText");
  _state->setFieldName(_fieldNameState);
  _state->setDataWidgetMap(m);
  _country->setFieldName(_fieldNameCountry);
  _country->setDataWidgetMap(m);
  _mapper=m;
}
   
/*
   return +N addr_id if save is successful or if found another addr with the same info
   return  0 if there is no address to save
   return -1 if there was an error
   return -2 if there are N contacts sharing this address
  
 */
int AddressCluster::save(enum SaveFlags flag)
{
  if (_number->text() == "" &&
      _addr1->text() == "" && _addr2->text() == "" &&
      _addr3->text() == "" && _city->text() == "" &&
      _state->currentText() == "" && _postalcode->text() == "" &&
      _country->currentText() == "")
  {
    silentSetId(-1);
    return 0;
  }
  
  XSqlQuery datamodQ;
  datamodQ.prepare("SELECT saveAddr(:addr_id,:addr_number,:addr1,:addr2,:addr3," 
		   ":city,:state,:postalcode,:country,:active,:notes,:flag) AS result;");
  datamodQ.bindValue(":addr_id", id());
  if (!_number->text().isEmpty())
    datamodQ.bindValue(":addr_number", _number->text());
  datamodQ.bindValue(":addr1", _addr1->text());
  datamodQ.bindValue(":addr2", _addr2->text());
  datamodQ.bindValue(":addr3", _addr3->text());
  datamodQ.bindValue(":city", _city->text());
  datamodQ.bindValue(":state", _state->currentText());
  datamodQ.bindValue(":postalcode", _postalcode->text());
  datamodQ.bindValue(":country", _country->currentText());
  datamodQ.bindValue(":active", QVariant(_active->isChecked()));
  datamodQ.bindValue(":notes", _notes);
  if (flag == CHECK)
    datamodQ.bindValue(":flag", QString("CHECK"));
  else if (flag == CHANGEALL)
    datamodQ.bindValue(":flag", QString("CHANGEALL"));
  else if (flag == CHANGEONE)
    datamodQ.bindValue(":flag", QString("CHANGEONE"));
  else
    return -1;
    
  datamodQ.exec();
  if (datamodQ.first())
  {
    if (datamodQ.value("result").toInt() > 0)
    {
      _id=datamodQ.value("result").toInt();
      _selected = FALSE;
      _valid = true;
      return id();
    }
    if (datamodQ.value("result").toInt() == -2)
      return -2;
    else
      return -1; //error
  }
  return id();
}

void AddressCluster::check()
{
  //If this is mapped then we need to check whether change flags need to be set
  if (_mapper->model())
  {
    XSqlQuery tx;

    tx.exec("BEGIN;");
    int result=save(CHECK);
    tx.exec("ROLLBACK;");
    if (result == -2)
    {
      int answer = 2;	// Cancel
      answer = QMessageBox::question(this, tr("Question Saving Address"),
                  tr("There are multiple Contacts sharing this Address.\n"
                     "What would you like to do?"),
                  tr("Change This One"),
                  tr("Change Address for All"),
                  0, 0);
       if (answer==0)
         _addrChange->setText("CHANGEONE");
       else if (answer==1)
         _addrChange->setText("CHANGEALL");
       // Make sure the mapper is aware of this change
       if (_mapper->model()->data(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_addrChange))).toString() != _addrChange->text())
         _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_addrChange)), _addrChange->text());     
    }
    else if (result < 0)
    {
      QMessageBox::critical(this, tr("Error"), tr("There was an error checking this Address (%1).").arg(result));
      return;
    }
  }
}

void AddressCluster::sEllipses()
{
  if (_x_preferences && _x_preferences->value("DefaultEllipsesAction") == "search")
    sSearch();
  else
    sList();
}

void AddressCluster::sInfo()
{
    /*
    AddressInfo* newdlg = new AddressInfo(this, "AddressInfo", true));
    if (newdlg)
    {
      int id = newdlg->exec();
      setId(id);
    }
    else
    */
  QMessageBox::critical(this, tr("A System Error Occurred at %1::%2.")
                         .arg(__FILE__)
                         .arg(__LINE__),
                          tr("%1::sInfo() not yet defined").arg(metaObject()->className()));
}

void AddressCluster::sList()
{
  AddressList* newdlg = new AddressList(this);
  if (newdlg)
  {
    int id = newdlg->exec();
    if (id != QDialog::Rejected)
    {
      setId(id);
      _selected = true;
    }
  }
  else
    QMessageBox::critical(this, tr("A System Error Occurred at %1::%2.")
                            .arg(__FILE__)
                            .arg(__LINE__),
                            tr("Could not instantiate a List Dialog"));
}

void AddressCluster::sSearch()
{
  AddressSearch* newdlg = new AddressSearch(this);
  if (newdlg)
  {
    int id = newdlg->exec();
    if (id != QDialog::Rejected)
    {
      setId(id);
      _selected = true;
    }
  }
  else
    QMessageBox::critical(this, tr("A System Error Occurred at %1::%2.")
                            .arg(__FILE__)
                            .arg(__LINE__),
                            tr("Could not instantiate a Search Dialog"));
}

void AddressCluster::setActiveVisible(const bool p)
{
  _active->setHidden(!p);
  if (p)
  {
    _grid->removeWidget(_country);
    _grid->addWidget(_active,  5, 4);
    _grid->addWidget(_country, 5, 1, 1, 3);
  }
  else
  {
    _grid->removeWidget(_active);
    _grid->removeWidget(_country);
    _grid->addWidget(_country, 5, 1, 1, 4);
  }
}

void AddressCluster::setAddrChange(QString p)
{
  _addrChange->setText(p);

  if (_mapper->model() &&
      _mapper->model()->data(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_addrChange))).toString() != _addrChange->text())
    _mapper->model()->setData(_mapper->model()->index(_mapper->currentIndex(),_mapper->mappedSection(_addrChange)), _addrChange->text());
  
}

///////////////////////////////////////////////////////////////////////////

AddressList::AddressList(QWidget* pParent, const char* pName, bool, Qt::WFlags)
  : VirtualList(pParent, 0)
{
    _parent = (AddressCluster*)(pParent);
    if (!pName)
      setObjectName("AddressList");
    else
      setObjectName(pName);
    _id = _parent->_id;
    setWindowTitle(_parent->_titlePlural);

    _listTab->setColumnCount(0);

    _listTab->addColumn(tr("Line 1"),      -1, Qt::AlignLeft, true, "addr_line1");
    _listTab->addColumn(tr("Line 2"),      75, Qt::AlignLeft, true, "addr_line2");
    _listTab->addColumn(tr("Line 3"),      75, Qt::AlignLeft, true, "addr_line3");
    _listTab->addColumn(tr("City"),        75, Qt::AlignLeft, true, "addr_city");
    _listTab->addColumn(tr("State"),       50, Qt::AlignLeft, true, "addr_state");
    _listTab->addColumn(tr("Country"),     50, Qt::AlignLeft, true, "addr_country");
    _listTab->addColumn(tr("Postal Code"), 50, Qt::AlignLeft, true, "addr_postalcode");

    resize(700, size().height());

    sFillList();
}

void AddressList::sFillList()
{
    _listTab->clear();
    XSqlQuery query;
    query.prepare(_parent->_query +
                  _parent->_extraClause +
                  " ORDER BY addr_country, addr_state, addr_postalcode;");
    query.exec();
    query.first();
    if (query.lastError().type() != QSqlError::NoError)
    {
      QMessageBox::critical(this, tr("A System Error Occurred at %1::%2.")
                                    .arg(__FILE__)
                                    .arg(__LINE__),
                            query.lastError().databaseText());
      return;
    }
    else if (query.size() < 1)// no rows found with limit so try without
    {
      query.prepare(_parent->_query +
                  " ORDER BY addr_country, addr_state, addr_postalcode;");
      query.exec();
      query.first();
      if (query.lastError().type() != QSqlError::NoError)
      {
        QMessageBox::critical(this, tr("A System Error Occurred at %1::%2.")
                                      .arg(__FILE__)
                                      .arg(__LINE__),
                              query.lastError().databaseText());
        return;
      }
    }

    _listTab->populate(query);
}

/* do this differently than VirtualList::sSearch(QString&):
   look for any consecutive characters that match, not just the
   first field
 */
void AddressList::sSearch(const QString& pTarget)
{

  QTreeWidgetItem *target = 0;
  for (int i = 0; i < _listTab->topLevelItemCount(); i++)
  {
    target = _listTab->topLevelItem(i);
    if (target == NULL ||
        (target->text(0) + " " + target->text(1) + " " +
         target->text(2) + " " + target->text(3) + " " +
         target->text(4) + " " + target->text(5) + " " +
         target->text(6) + " " + target->text(7)).contains(pTarget.toUpper(),
                                                           Qt::CaseInsensitive))
      break;
  }

  if (target)
  {
    _listTab->setCurrentItem(target);
    _listTab->scrollToItem(target);
  }
}

///////////////////////////////////////////////////////////////////////////

AddressSearch::AddressSearch(QWidget* pParent, Qt::WindowFlags pFlags)
    : VirtualSearch(pParent, pFlags)
{
    // remove the stuff we won't use
    disconnect(_searchNumber,  SIGNAL(toggled(bool)), this, SLOT(sFillList()));
    disconnect(_searchName,    SIGNAL(toggled(bool)), this, SLOT(sFillList()));
    disconnect(_searchDescrip, SIGNAL(toggled(bool)), this, SLOT(sFillList()));

    selectorsLyt->removeWidget(_searchNumber);
    selectorsLyt->removeWidget(_searchName);
    selectorsLyt->removeWidget(_searchNumber);

    delete _searchNumber;
    delete _searchName;
    delete _searchDescrip;

    _listTab->setColumnCount(0);

    _searchStreet     = new XCheckBox(tr("Search Street Address"));
    _searchCity       = new XCheckBox(tr("Search City"));
    _searchState      = new XCheckBox(tr("Search State"));
    _searchCountry    = new XCheckBox(tr("Search Country"));
    _searchPostalCode = new XCheckBox(tr("Search Postal Code"));
    _searchInactive   = new XCheckBox(tr("Show Inactive Addresses"));
    
    _searchStreet->setObjectName("_searchStreet");
    _searchCity->setObjectName("_searchCity");
    _searchState->setObjectName("_searchState");
    _searchCountry->setObjectName("_searchCountry");
    _searchPostalCode->setObjectName("_searchPostalCode");
    _searchInactive->setObjectName("_searchInactive");

    selectorsLyt->addWidget(_searchStreet,     0, 0);
    selectorsLyt->addWidget(_searchCity,       1, 0);
    selectorsLyt->addWidget(_searchState,      2, 0);
    selectorsLyt->addWidget(_searchCountry,    3, 0);
    selectorsLyt->addWidget(_searchPostalCode, 4, 0);
    selectorsLyt->addWidget(_searchInactive,   0, 1);

    connect(_searchStreet,     SIGNAL(toggled(bool)), this, SLOT(sFillList()));
    connect(_searchCity,       SIGNAL(toggled(bool)), this, SLOT(sFillList()));
    connect(_searchState,      SIGNAL(toggled(bool)), this, SLOT(sFillList()));
    connect(_searchCountry,    SIGNAL(toggled(bool)), this, SLOT(sFillList()));
    connect(_searchPostalCode, SIGNAL(toggled(bool)), this, SLOT(sFillList()));
    connect(_searchInactive,   SIGNAL(toggled(bool)), this, SLOT(sFillList()));

    _listTab->addColumn(tr("Line 1"),      -1, Qt::AlignLeft, true, "addr_line1");
    _listTab->addColumn(tr("Line 2"),      75, Qt::AlignLeft, true, "addr_line2");
    _listTab->addColumn(tr("Line 3"),      75, Qt::AlignLeft, true, "addr_line3");
    _listTab->addColumn(tr("City"),        75, Qt::AlignLeft, true, "addr_city");
    _listTab->addColumn(tr("State"),       50, Qt::AlignLeft, true, "addr_state");
    _listTab->addColumn(tr("Country"),     50, Qt::AlignLeft, true, "addr_country");
    _listTab->addColumn(tr("Postal Code"), 50, Qt::AlignLeft, true, "addr_postalcode");

    resize(700, size().height());

    _parent = (AddressCluster*)(pParent);
    setObjectName("virtualSearch");
    setWindowTitle(_parent->_titlePlural);
    _titleLit->setText(_parent->_titlePlural);
    _id = _parent->_id;
}

void AddressSearch::sFillList()
{
    _listTab->clear();
    if (_search->text().isEmpty() ||
        (!_searchStreet->isChecked() && !_searchCity->isChecked() &&
         !_searchState->isChecked()  && !_searchCountry->isChecked() &&
         !_searchPostalCode->isChecked() ))
      return;

    QString sql = _parent->_query +
                  "<? if exists(\"extraClause\") ?> "
                  "  <? value(\"extraClause\") ?> "
                  "<? else ?>"
                  "  WHERE "
                  "<? endif ?> "
                  "<? if exists(\"searchInactive\") ?> "
                  "   true "
                  "<? else ?>"
                  "   addr_active "
                  "<? endif ?>"
                  "<? if reExists(\"search[CPS]\") ?> "
                  "  AND ("
                  "  <? if exists(\"searchStreet\") ?> "
                  "    addr_line1 || '\n' || addr_line2 || '\n' || addr_line3 || '\n' "
                  "  <? else ?>"
                  "    '\n' "
                  "  <? endif ?>"
                  "  <? if exists(\"searchCity\") ?> "
                  "     || addr_city || '\n' "
                  "  <? endif ?>"
                  "  <? if exists(\"searchState\") ?> "
                  "     || addr_state || '\n' "
                  "  <? endif ?>"
                  "  <? if exists(\"searchCountry\") ?> "
                  "     || addr_country || '\n' "
                  "  <? endif ?>"
                  "  <? if exists(\"searchPostalCode\") ?> "
                  "     || addr_postalcode || '\n' "
                  "  <? endif ?>"
                  "  ~* <? value(\"searchText\") ?> )"
                  "<? endif ?>"
                  "ORDER BY addr_country, addr_state, addr_postalcode;";
    ParameterList params;
    if (_searchStreet->isChecked())
      params.append("searchStreet");
    if (_searchCity->isChecked())
      params.append("searchCity");
    if (_searchState->isChecked())
      params.append("searchState");
    if (_searchCountry->isChecked())
      params.append("searchCountry");
    if (_searchPostalCode->isChecked())
      params.append("searchPostalCode");
    if (_searchInactive->isChecked())
      params.append("searchInactive");
    if (! _parent->_extraClause.isEmpty())
      params.append("extraClause", _parent->_extraClause);

    params.append("searchText", _search->text());

    MetaSQLQuery mql(sql);
    XSqlQuery query = mql.toQuery(params);
    query.exec();
    _listTab->populate(query);
    if (query.lastError().type() != QSqlError::NoError)
    {
      QMessageBox::critical(this, tr("A System Error Occurred at %1::%2.")
                                    .arg(__FILE__)
                                    .arg(__LINE__),
                            query.lastError().databaseText());
      return;
    }

}

void AddressCluster::setMode(Mode p)
{
  if (p == _mode)
    return;
  bool enabled = (p == Edit);

  QList<QWidget *> widgets = findChildren<QWidget *>();
  for (int i = 0; i < widgets.size(); i++)
    widgets.at(i)->setEnabled(enabled);
  if (p == Select)
    _list->setEnabled(true);
  _info->setEnabled(true);
}
