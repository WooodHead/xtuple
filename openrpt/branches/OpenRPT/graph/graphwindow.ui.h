/*
 * Copyright (c) 2002-2005 by OpenMFG, LLC
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

#include <qsqlquery.h>

void GraphWindow::_dataTable_valueChanged( int r, int s)
{
    if(!_noUpdate)
        _graph->setSetValue(r, s, _dataTable->text(r, s).toDouble());
}

void GraphWindow::_labelTable_valueChanged( int r, int s)
{
    if(!_noUpdate)
        _graph->setReferenceLabel(r, _labelTable->text(r, s));
}

void GraphWindow::_btnClear_clicked()
{
    _noUpdate = TRUE;
    for(int r = 0; r < _labelTable->numRows(); r++) {
        _labelTable->setText(r, 0, QString::null);
        for(int c = 0; c < _dataTable->numCols(); c++) {
            _dataTable->setText(r, c, QString::null);
        }
    }
    _graph->clear();
    _noUpdate = FALSE;
}

void GraphWindow::init(bool haveDB)
{
    _noUpdate = FALSE;
    _gbSql->setEnabled(haveDB);
}

void GraphWindow::_btnSql_clicked()
{
    _noUpdate = TRUE;
    _btnClear_clicked();
    QString sql = _editSql->text();
    QSqlQuery qry = QSqlQuery(sql);
    _graph->populateFromResult(qry);
    _noUpdate = FALSE;
}
