/*
 * Copyright (c) 2002-2007 by OpenMFG, LLC
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 * If you do not wish to be bound by the terms of the GNU General Public
 * License, DO NOT USE THIS SOFTWARE.  Please contact OpenMFG, LLC at
 * info@openmfg.com for details on how to purchase a commercial license.
 */

#include "mqledit.h"

#include "parameteredit.h"
#include "logoutput.h"
#include "resultsoutput.h"

#include "data.h"

#include <QSqlDatabase>
#include <QFileDialog>

/*
 *  Constructs a MQLEdit as a child of 'parent', with the
 *  name 'name' and widget flags set to 'f'.
 *
 */
MQLEdit::MQLEdit(QWidget* parent, const char* name, Qt::WFlags fl)
    : QMainWindow(parent, name, fl)
{
    setupUi(this);

    (void)statusBar();

    // signals and slots connections
    connect(fileNewAction, SIGNAL(activated()), this, SLOT(fileNew()));
    connect(fileOpenAction, SIGNAL(activated()), this, SLOT(fileOpen()));
    connect(fileSaveAction, SIGNAL(activated()), this, SLOT(fileSave()));
    connect(fileSaveAsAction, SIGNAL(activated()), this, SLOT(fileSaveAs()));
    connect(filePrintAction, SIGNAL(activated()), this, SLOT(filePrint()));
    connect(fileExitAction, SIGNAL(activated()), this, SLOT(fileExit()));
    connect(editFindAction, SIGNAL(activated()), this, SLOT(editFind()));
    connect(helpIndexAction, SIGNAL(activated()), this, SLOT(helpIndex()));
    connect(helpContentsAction, SIGNAL(activated()), this, SLOT(helpContents()));
    connect(helpAboutAction, SIGNAL(activated()), this, SLOT(helpAbout()));
    connect(fileDatabaseConnectAction, SIGNAL(activated()), this, SLOT(fileDatabaseConnect()));
    connect(fileDatabaseDisconnectAction, SIGNAL(activated()), this, SLOT(fileDatabaseDisconnect()));
    connect(viewParameter_ListAction, SIGNAL(activated()), this, SLOT(showParamList()));
    connect(toolsParse_QueryAction, SIGNAL(activated()), this, SLOT(parseQuery()));
    connect(toolsExecute_QueryAction, SIGNAL(activated()), this, SLOT(execQuery()));
    connect(viewLog_OutputAction, SIGNAL(activated()), this, SLOT(showLog()));
    connect(viewResultsAction, SIGNAL(activated()), this, SLOT(showResults()));
    connect(viewExecuted_SQLAction, SIGNAL(activated()), this, SLOT(showExecutedSQL()));

    QSqlDatabase db = QSqlDatabase();
    if(_loggedIn && db.isValid() && db.isOpen()) {
	_loggedIn = true;
    } else {
	_loggedIn = false;
    }
    
    fileDatabaseConnectAction->setEnabled(!_loggedIn);
    fileDatabaseDisconnectAction->setEnabled(_loggedIn);
    
    _pEdit = new ParameterEdit(this);
    _log = new LogOutput(this);
    _sql = new LogOutput(this);
    _results = new ResultsOutput(this);
}

/*
 *  Destroys the object and frees any allocated resources
 */
MQLEdit::~MQLEdit()
{
    // no need to delete child widgets, Qt does it all for us
}

/*
 *  Sets the strings of the subwidgets using the current
 *  language.
 */
void MQLEdit::languageChange()
{
    retranslateUi(this);
}

#include <q3filedialog.h>
#include <qmessagebox.h>
#include <qapplication.h>
#include <qsqldatabase.h>
#include <q3table.h>
#include <qsqlrecord.h>
#include <qsqldriver.h>
//Added by qt3to4:
#include <QSqlError>
#include <QTextStream>

#include <parameter.h>
#include <xsqlquery.h>
#include <login.h>

#include "data.h"
#include "metasql.h"

void MQLEdit::fileNew()
{
    if(askSaveIfModified()) {
	// now that we have that out of the way we are free to go ahead and do our stuff
	_text->clear();
	_text->setModified(FALSE);
	_fileName = QString::null;
    }
}


void MQLEdit::fileOpen()
{
    if(askSaveIfModified()) {
	QString fileName = QFileDialog::getOpenFileName(this);
	if(!fileName.isEmpty()) {
	    QFile file(fileName);
	    if(file.open(QIODevice::ReadOnly)) {
		QTextStream stream(&file);
		_text->setText(stream.read());
		_text->setModified(FALSE);
		_fileName = fileName;
	    }
	}
    }
}


void MQLEdit::fileSave()
{
    if(_fileName.isEmpty()) {
	saveAs();
    } else {
	save();
    }
}


void MQLEdit::fileSaveAs()
{
    saveAs();
}


void MQLEdit::filePrint()
{
    QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void MQLEdit::fileExit()
{
    if(askSaveIfModified()) {
	QApplication::exit();
    }
}


void MQLEdit::editFind()
{
    QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void MQLEdit::helpIndex()
{
    QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void MQLEdit::helpContents()
{
    QMessageBox::information(this, tr("Not Yet Implemented"), tr("This function has not been implemented."));
}


void MQLEdit::helpAbout()
{
    QMessageBox::about(this, tr("About MetaSQL Editor"), tr("About MetaSQL Editor version 2.1.0"));
}

//
// Checks to see if the document has been modified and asks the
// user if they would like to save the document before they continue
// with the operation they are trying to perform.
//
// Returns TRUE if the operation can continue otherwise returns FALSE
// and the calling process should not perform any actions.
//
bool MQLEdit::askSaveIfModified()
{
    if(_text->isModified()) {
	int ret = QMessageBox::question(this, tr("Document Modified!"),
					tr("Would you like to save your changes before continuing?"),
			      QMessageBox::Yes | QMessageBox::Default,
			      QMessageBox::No,
			      QMessageBox::Cancel | QMessageBox::Escape);
	switch(ret) {
	case QMessageBox::Yes:
	    if(saveAs() == false) return false; // the save was canceled so take no action
	    break;
	case QMessageBox::No: break;
	case QMessageBox::Cancel: return false;
	default:
	    QMessageBox::warning(this, tr("Warning"), tr("Encountered an unknown response. No action will be taken."));
	    return false;
	
	};
    }
    return true;
}

//
// This functions saves the document returning TRUE if the save was completed successfully
// or FALSE is the save was canceled or encountered some other kind of error.
//
bool MQLEdit::save()
{
   if(_fileName.isEmpty()) {
	QMessageBox::warning(this, tr("No file Specified"), tr("No file was specified to save to."));
	return false;
    }
    
    QFile file(_fileName);
    if (file.open(QIODevice::WriteOnly)) {
	QTextStream stream(&file);
	stream << _text->text();
	_text->setModified(false);
    } else {
	QMessageBox::warning(this, tr("Error Saving file"), tr("There was an error while trying to save the file."));
	return false;
    }
    return true;
}

//
// This function asks the user what name they would like to save the document as then saves
// the document to the disk with the given name. This function will return TRUE if the save
// was successfull otherwise it will return FALSE if the user canceled the save or some other
// error was encountered.
//
bool MQLEdit::saveAs()
{
    QString fileName = QFileDialog::getSaveFileName(this, QString::null, _fileName);
    if(fileName.isEmpty()) {
	return false;
    }
    
    _fileName = fileName;
    return save();
}


void MQLEdit::fileDatabaseConnect()
{
  if (!_loggedIn) {
    ParameterList params;
    params.append("name", _name);
    params.append("copyright", _copyright);
    params.append("version", _version);

    if(!_databaseURL.isEmpty())
      params.append("databaseURL", _databaseURL);

    login newdlg(0, "", TRUE);
    newdlg.set(params, 0);

    if (newdlg.exec() != QDialog::Rejected)
    {
      _databaseURL = newdlg._databaseURL;
      _loggedIn = true;
    }
  }
  fileDatabaseConnectAction->setEnabled(!_loggedIn);
  fileDatabaseDisconnectAction->setEnabled(_loggedIn);
}


void MQLEdit::fileDatabaseDisconnect()
{
    QSqlDatabase db = QSqlDatabase::database();
    if(db.isValid()) {
	db.close();
    }
    _loggedIn = false;
    fileDatabaseConnectAction->setEnabled(!_loggedIn);
    fileDatabaseDisconnectAction->setEnabled(_loggedIn);
}


void MQLEdit::showParamList()
{
    _pEdit->show();
}


void MQLEdit::parseQuery()
{
    _sql->_log->clear();
    _log->_log->clear();
    _log->_log->append(tr("---- Parsing Query ----\n"));
    MetaSQLQuery mql(_text->text());
    _log->_log->append(mql.parseLog());
    if(mql.isValid()) {
        _log->_log->append(tr("Query parsed."));
    } else {
        _log->_log->append(tr("ERROR: Invalid query!"));
    }
    showLog();
}


void MQLEdit::execQuery()
{
    if(!_loggedIn) {
	QMessageBox::warning(this, tr("Not Connected"), tr("You must be connected to a database in order to execute a query."));
	return;
    }

    _results->_table->setNumRows(0);
    _results->_table->setNumCols(0);
    
    _sql->_log->clear();
    _log->_log->clear();
    _log->_log->append(tr("---- Parsing Query ----\n"));
    MetaSQLQuery mql(_text->text());
    _log->_log->append(mql.parseLog());
    if(mql.isValid()) {
	_log->_log->append(tr("Query parsed."));
	_log->_log->append(tr("---- Executing Query ----"));
	ParameterList plist = _pEdit->getParameterList();
	XSqlQuery qry = mql.toQuery(plist);
        _sql->_log->append(qry.executedQuery());
	if(qry.isActive()) {
            QSqlRecord rec = qry.driver()->record(qry);
	    int ncols = rec.count();
            _results->_table->setNumCols(ncols);
            Q3Header * header = _results->_table->horizontalHeader();
            int c;
            for(c = 0; c < ncols; c++) {
                header->setLabel(c, rec.fieldName(c));
            }
            int nrows = 0;
            while(qry.next()) {
                _results->_table->setNumRows(nrows + 1);
                for(c = 0; c < ncols; c++) {
                    _results->_table->setText(nrows, c, qry.value(c).toString());
                }
                nrows++;
            }
            showResults();
	} else {
	    _log->_log->append(tr("Failed to execute query."));
	    QSqlError err = qry.lastError();
	    _log->_log->append(err.text());
	}
    } else {
	_log->_log->append(tr("ERROR: Invalid query!"));
	showLog();
    }   
}


void MQLEdit::showLog()
{
    _log->show();
}


void MQLEdit::showResults()
{
    _results->show();
}


void MQLEdit::showExecutedSQL()
{
    _sql->show();
}
