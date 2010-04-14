/*
 * This file is part of the xTuple ERP: PostBooks Edition, a free and
 * open source Enterprise Resource Planning software suite,
 * Copyright (c) 1999-2009 by OpenMFG LLC, d/b/a xTuple.
 * It is licensed to you under the Common Public Attribution License
 * version 1.0, the full text of which (including xTuple-specific Exhibits)
 * is available at www.xtuple.com/CPAL.  By using this software, you agree
 * to be bound by its terms.
 */

#include "csvatlaswindow.h"

#include <QCloseEvent>
#include <QDomDocument>
#include <QFile>
#include <QFileDialog>
#include <QInputDialog>
#include <QMessageBox>
#include <QSpinBox>
#include <QSqlDatabase>
#include <QSqlField>
#include <QSqlIndex>
#include <QSqlQuery>
#include <QSqlRecord>
#include <QTextStream>

#include <metasqlhighlighter.h>

#include "csvatlas.h"
#include "missingfield.h"
#include "rowcontroller.h"

#define DEBUG false

CSVAtlasWindow::CSVAtlasWindow(QWidget *parent) : QMainWindow(parent)
{
  setupUi(this);

  _filename    = QString::null;
  _atlas       = new CSVAtlas();
  _selectedMap = QString::null;
  sMapChanged(0);

  MetaSQLHighlighter *tmp = new MetaSQLHighlighter(_preSql);
                      tmp = new MetaSQLHighlighter(_postSql);
}

CSVAtlasWindow::~CSVAtlasWindow()
{
}

void CSVAtlasWindow::languageChange()
{
  retranslateUi(this);
}

void CSVAtlasWindow::fileNew()
{
  _map->clear();
  _filename = QString::null;
  sMapChanged(0);
  if(_atlas)
  {
    delete _atlas;
    _atlas = 0;
  }
  _atlas = new CSVAtlas();
}

void CSVAtlasWindow::fileOpen()
{
  QString filename = QFileDialog::getOpenFileName(this, tr("Open Atlas File"),
                                                  _filename,
                                                  QString("XML Files (*.xml);;All files (*)"));
  if(filename.isNull())
    return;

  _map->clear();
  sMapChanged(0);
  if(_atlas)
  {
    delete _atlas;
    _atlas = 0;
  }

  QFile file(filename);

  QDomDocument doc = QDomDocument();
  QString errMsg;
  int errLine, errCol;
  if(doc.setContent(&file, &errMsg, &errLine, &errCol))
  {  
    _atlas = new CSVAtlas(doc.documentElement());
    _map->addItems(_atlas->mapList());
    sMapChanged(0);
    _filename = filename;
  }
  else
    QMessageBox::warning(this, tr("Error Reading File"),
                         tr("<p>An error was encountered while trying to read "
                            "the file %1:<br>%2<br>Line %3, Column %4")
                           .arg(filename, errMsg).arg(errLine).arg(errCol));

  if(!_atlas)
    _atlas = new CSVAtlas();
}


void CSVAtlasWindow::fileSave()
{
  if(_filename.isEmpty())
  {
    fileSaveAs();
    if(_filename.isEmpty())
      return;
  }
  sMapChanged(_map->currentIndex());

  QDomDocument doc = QDomDocument("openCSVAtlasDef");
  doc.appendChild(_atlas->createElement(doc));

  QFile file(_filename);
  if(file.open(QIODevice::WriteOnly))
  {
    QTextStream ts(&file);
    ts << doc.toString();
    file.close();
  }
  else
    QMessageBox::warning(this, tr("Error Opening File"),
                         tr("Could not open the file %1 for writing to.")
                         .arg(_filename));
}

void CSVAtlasWindow::fileSaveAs()
{
  QString filename = QFileDialog::getSaveFileName(this, tr("Save Atlas File"),
                                                  _filename, QString::null);
  if(filename.isEmpty())
    return;

  _filename = filename;
  fileSave();
}

void CSVAtlasWindow::filePrint()
{
  QMessageBox::information(this, tr("Not yet implimented"), tr("This feature has not yet been implimented."));
}

void CSVAtlasWindow::helpIndex()
{
  QMessageBox::information(this, tr("Not yet implimented"), tr("This feature has not yet been implimented."));
}

void CSVAtlasWindow::helpContents()
{
  QMessageBox::information(this, tr("Not yet implimented"), tr("This feature has not yet been implimented."));
}

void CSVAtlasWindow::helpAbout()
{
  QMessageBox::information(this, tr("Not yet implimented"), tr("This feature has not yet been implimented."));
}

void CSVAtlasWindow::sRenameMap()
{
  QMessageBox::information(this, tr("Not yet implimented"), tr("This feature has not yet been implimented."));
}

void CSVAtlasWindow::sAddMap()
{
  QSqlDatabase db = QSqlDatabase::database();
  if(db.isValid())
  {
    bool ok = FALSE;
    QString name = QString::null;
    while(true)
    {
      name = QInputDialog::getText(this, tr("Map Name"), tr("Map Name:"), QLineEdit::Normal, name, &ok);
      if(ok)
      {
        if(name.isEmpty())
        {
          QMessageBox::warning(this, tr("Must enter a value"), tr("You must enter a value"));
          continue;
        }

        if(_atlas->mapList().contains(name))
        {
          QMessageBox::warning(this, tr("Must enter unique name"), tr("The new map name you entered already exists. Please enter in a unique map name."));
          continue;
        }

        break;
      }
      else
        return;
    }

    QStringList tables;
    QSqlQuery qry;
    qry.exec( "SELECT tablename FROM ( "
              "SELECT schemaname || '.' || viewname AS tablename from pg_views "
              "WHERE schemaname IN ('api','public') "
              "UNION "
              "SELECT schemaname || '.' || tablename AS tablename from pg_tables "
              "WHERE schemaname IN ('api','public') ) "
              "AS data "
              "ORDER by tablename; " );
    while(qry.next())
      tables.append(qry.value(0).toString());

    QString table = QInputDialog::getItem(this, tr("Select Table"), tr("Table:"), tables, 0, FALSE, &ok);
    if(!ok)
      return;

    CSVMap map(name);
    map.setTable(table);
    _atlas->setMap(map);

    _map->clear();
    _map->insertItems(-1, _atlas->mapList());
    _map->setCurrentIndex(_atlas->mapList().indexOf(name));
    sMapChanged(_map->currentIndex());
  }
  else
    QMessageBox::critical(this, tr("No Database"), tr("Could not get the database connection."));
}

void CSVAtlasWindow::sDeleteMap()
{
  _atlas->removeMap(_map->currentText());
  _map->clear();
  _map->insertItems(-1, _atlas->mapList());
  if(_map->currentIndex() >= _atlas->mapList().size())
    _map->setCurrentIndex(qMax(_atlas->mapList().size() - 1, 0));
  sMapChanged(_map->currentIndex());
  if (DEBUG)
  {
    qDebug("CSVAtlasWindow::sDeleteMap - _map contains :");
    for (int i = 0; i < _map->count(); i++)
      qDebug("\t%d [%s]", i, qPrintable(_map->itemText(i)));
  }
}

void CSVAtlasWindow::sMapChanged( int )
{
  CSVMap map;
  if(!_selectedMap.isEmpty())
  {
    map = _atlas->map(_selectedMap);
    if(tr("Insert") == _action->currentText())
      map.setAction(CSVMap::Insert);
    else if(tr("Update") == _action->currentText())
      map.setAction(CSVMap::Update);
    else if(tr("Append") == _action->currentText())
      map.setAction(CSVMap::Append);
    map.setDescription(_description->toPlainText());
    map.setSqlPre(_preSql->toPlainText().trimmed());
    map.setSqlPreContinueOnError(_sqlPreContinueOnError->isChecked());
    map.setSqlPost(_postSql->toPlainText().trimmed());
    for(int r = 0; r < _fields->rowCount(); r++)
    {
      CSVMapField field = map.field(_fields->item(r, 1)->data(Qt::EditRole).toString());
      field.setName(_fields->item(r, 1)->data(Qt::EditRole).toString());

      if (qobject_cast<QCheckBox*>(_fields->cellWidget(r, 0)))
        field.setIsKey(qobject_cast<QCheckBox*>(_fields->cellWidget(r,0))->isChecked());
      else
        field.setIsKey(FALSE);

      field.setType(QVariant::nameToType(_fields->item(r, 2)->data(Qt::EditRole).toString().toAscii().data()));

      if (qobject_cast<QComboBox*>(_fields->cellWidget(r, 4)))
        field.setAction(CSVMapField::nameToAction(qobject_cast<QComboBox*>(_fields->cellWidget(r, 4))->currentText()));
      else
        field.setAction(CSVMapField::Action_Default);

      if (qobject_cast<QSpinBox*>(_fields->cellWidget(r, 5)))
        field.setColumn(qobject_cast<QSpinBox*>(_fields->cellWidget(r,5))->value());
      else
        field.setColumn(0);

      if (qobject_cast<QComboBox*>(_fields->cellWidget(r, 6)))
        field.setIfNullAction(CSVMapField::nameToIfNull(qobject_cast<QComboBox*>(_fields->cellWidget(r, 6))->currentText()));
      else
        field.setIfNullAction(CSVMapField::Nothing);

      if (qobject_cast<QSpinBox*>(_fields->cellWidget(r, 7)))
        field.setColumnAlt(qobject_cast<QSpinBox*>(_fields->cellWidget(r, 7))->value());
      else
        field.setColumnAlt(1);

      if (qobject_cast<QComboBox*>(_fields->cellWidget(r, 8)))
        field.setIfNullActionAlt(CSVMapField::nameToIfNull(qobject_cast<QComboBox*>(_fields->cellWidget(r, 8))->currentText()));
      else
        field.setIfNullActionAlt(CSVMapField::Nothing);

      field.setValueAlt(_fields->item(r, 9)->data(Qt::EditRole).toString());
      map.setField(field);
    }
    map.simplify();
    _atlas->setMap(map);
  }
 
  QSqlDatabase db = QSqlDatabase::database();
  if (db.isValid())
  {
    _fields->setRowCount(0);
    if(_map->count() && ! _map->currentText().isEmpty())
    {
      // CODE TO SELECT MAP
      _selectedMap = _map->currentText();
      map = _atlas->map(_selectedMap);

      _table->setTitle(tr("Table: ") + map.table());
      _table->setEnabled(TRUE);

      _action->setCurrentIndex(map.action());
      _description->setText(map.description());
      _preSql->setText(map.sqlPre());
      _sqlPreContinueOnError->setChecked(map.sqlPreContinueOnError());
      _postSql->setText(map.sqlPost());

      QSqlRecord record = db.record(map.table());
      QStringList fieldnames;
      if (record.isEmpty())
      {
        QMessageBox::warning(this, tr("No Existing Table"),
                             tr("<p>The table %1 does not exist in this "
                                "database. You may continue to use and edit "
                                "this map but only those fields that are known "
                                "will be shown.").arg(map.table()));
        fieldnames = map.fieldList();
      }
      else
      {
        QStringList fList = map.fieldList();

        for(int i = 0; i < fList.size(); ++i)
        {
          CSVMapField f = map.field(fList.at(i));
          if(!record.contains(fList.at(i)))
          {
            map.removeField(fList.at(i));
            MissingField diag(this, f.name(), record);
            if(diag.exec() == QDialog::Accepted)
            {
              f.setName(diag._fields->currentText());
              map.setField(f);
            }
            _atlas->setMap(map);
          }
        }

        for (int i = 0; i < record.count(); i++)
          fieldnames.append(record.fieldName(i));
      }

      _fields->setRowCount(fieldnames.size());
      for(int row = 0; row < fieldnames.size(); ++row)
      {
        CSVMapField mf = map.field(fieldnames.at(row));

        QCheckBox *check = new QCheckBox(_fields);
        if(!mf.isEmpty())
          check->setChecked(mf.isKey());
        _fields->setCellWidget(row, 0, check);

        _fields->setItem(row, 1, new QTableWidgetItem(fieldnames.at(row)));
        if (record.isEmpty())
        {
          _fields->setItem(row, 2,
                           new QTableWidgetItem(QVariant::typeToName(mf.type())));
          _fields->setItem(row, 3, new QTableWidgetItem(tr("Unknown")));
        }
        else
        {
          _fields->setItem(row, 2,
                           new QTableWidgetItem(QVariant::typeToName(record.field(row).type())));
          _fields->setItem(row, 3, new QTableWidgetItem(
                           (record.field(row).requiredStatus() == QSqlField::Required) ? tr("Yes") :
                           (record.field(row).requiredStatus() == QSqlField::Optional) ? tr("No")  :
                           tr("Unknown")));
        }

        QComboBox *actcombo = new QComboBox(_fields);
        actcombo->addItems(CSVMapField::actionList());
        if (! mf.isEmpty())
          actcombo->setCurrentIndex(mf.action());
        _fields->setCellWidget(row, 4, actcombo);

        QSpinBox *colspinner = new QSpinBox(_fields);
        colspinner->setRange(1, 999);
        colspinner->setPrefix(tr("Column "));
        if(!mf.isEmpty())
          colspinner->setValue(mf.column());
        _fields->setCellWidget(row, 5, colspinner);

        QComboBox *nullcombo = new QComboBox(_fields);
        nullcombo->addItems(CSVMapField::ifNullList());
        if (! mf.isEmpty())
          nullcombo->setCurrentIndex(mf.ifNullAction());
        _fields->setCellWidget(row, 6, nullcombo);

        QSpinBox *altspinner = new QSpinBox(_fields);
        altspinner->setRange(1, 999);
        altspinner->setPrefix(tr("Column "));
        if (! mf.isEmpty())
          altspinner->setValue(mf.columnAlt());
        _fields->setCellWidget(row, 7, altspinner);

        QComboBox *altnullcombo = new QComboBox(_fields);
        altnullcombo->addItems(CSVMapField::ifNullList(TRUE));
        if (! mf.isEmpty())
          altnullcombo->setCurrentIndex(mf.ifNullActionAlt());
        _fields->setCellWidget(row, 8, altnullcombo);

        _fields->setItem(row, 9, new QTableWidgetItem(mf.valueAlt()));

        RowController *control = new RowController(_fields, row, colspinner);
        control->setAction(actcombo);
        control->setColumn(colspinner);
        control->setIfNull(nullcombo);
        control->setAltColumn(altspinner);
        control->setAltIfNull(altnullcombo);
        control->setAltValue(_fields->item(row, 9));
        control->finishSetup();
      }
    }
    else
    {
      _selectedMap = QString::null;
      _table->setTitle(tr("Table: "));
      _table->setEnabled(FALSE);
    }
  }
  else
    QMessageBox::critical(this, tr("No Database"), tr("Could not get the database connection."));
}

void CSVAtlasWindow::closeEvent( QCloseEvent * e)
{
  sMapChanged(_map->currentIndex());
  e->accept();
}

CSVAtlas* CSVAtlasWindow::getAtlas()
{
  sMapChanged(_map->currentIndex());
  return _atlas;
}
